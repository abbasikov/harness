from django.http.response import Http404
from django.db.models import Count
from rest_framework import status, filters
from rest_framework import permissions
from rest_framework.permissions import AllowAny
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


class JobCreateView(CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = JobSerializer
    queryset = Job.objects.all()


class SkillCreateView(CreateAPIView):
    permissions_classes = (AllowAny, )
    serializer_class = SkillSerializer
    queryset = Skill.objects.all()


class MostUsedSkillsView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = JobSkillSerializer
    pagination_class = None

    def get_queryset(self):
        qs = JobSkill.objects.annotate(skill_count=Count('skill'))[:10]
        return qs
