from rest_framework import serializers
from jobs.models import *


class SkillSerializer(serializers.ModelSerializer):
    job_count = serializers.SerializerMethodField()

    def get_job_count(self, obj):
        try:
            return obj.job_count
        except:
            return None

    class Meta:
        model = Skill
        fields = '__all__'


class JobSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True)

    class Meta:
        model = Job
        fields = ['pk', 'title', 'description', 'skills']
