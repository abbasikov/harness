from django.http.response import Http404
from django.db.models import Count
from rest_framework import status, filters
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView

from jobs.models import *
from jobs.api.serializers import *


class JobListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = JobSerializer
    pagination_class = None
    queryset = Job.objects.all()


class JobDetailView(RetrieveAPIView):
    permission_classes = (AllowAny, )
    serializer_class = JobSerializer

    def get_object(self):
        try:
            job = Job.objects.get(id=self.kwargs.get('id'))
            return job
        except Job.DoesNotExist:
            raise Http404("Job does not exit")


class JobCreateView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request):
        skills = request.data.get('skills')
        title = request.data.get('title')
        description = request.data.get('description')
        try:
            job = Job(title=title, description=description)
            job.save()
            for skill in skills:
                obj = Skill.objects.get(title=skill)
                job.skills.add(obj)

            return Response({'job': JobSerializer(job).data}, status=status.HTTP_200_OK)
        except Exception as e:
            raise Http404(f"Could create the job listing. Error: {e}")


class SkillCreateView(APIView):
    permissions_classes = (AllowAny, )

    def post(self, request):
        skills = request.data.get('skills')
        try:
            final = []
            for skill in skills:
                obj, created = Skill.objects.get_or_create(title=skill)
                final.append(obj)
            skills = SkillSerializer(final, many=True)
            return Response({'skills': skills.data}, status=status.HTTP_200_OK)
        except Exception as e:
            raise Http404(f"Couldn't create skills. Error: {e}")


class MostUsedSkillsView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = JobSkillSerializer
    pagination_class = None

    def get_queryset(self):
        qs = JobSkill.objects.annotate(skill_count=Count('skill'))[:10]
        return qs
