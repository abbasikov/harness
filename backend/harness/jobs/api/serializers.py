from rest_framework import serializers
from jobs.models import *


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'


class JobSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True)

    class Meta:
        model = Job
        fields = ['pk', 'title', 'description', 'skills']


class JobSkillSerializer(serializers.ModelSerializer):
    skill = SkillSerializer()

    class Meta:
        model = JobSkill
        fields = ['skill']
