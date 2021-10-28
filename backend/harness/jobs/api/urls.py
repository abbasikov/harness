from jobs.api.views import *
from django.urls import path

app_name = 'jobs'

urlpatterns = [
    path('jobs/', JobListView.as_view()),
    path('jobs/create/', JobCreateView.as_view()),
    path('jobs/detail/<int:id>/', JobDetailView.as_view()),
    path('skills/top/', MostUsedSkillsView.as_view()),
    path('skills/create/', SkillCreateView.as_view())
]
