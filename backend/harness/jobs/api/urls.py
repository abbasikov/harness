from jobs.api.views import *
from django.urls import path

app_name = 'jobs'

urlpatterns = [
    path('/', JobListView.as_view()),
    path('/create/', JobCreateView.as_view()),
    path('/detail/<int:id>/', JobDetailView.as_view()),
    path('/top-skills/', MostUsedSkillsView.as_view())
]
