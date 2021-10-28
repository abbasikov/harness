from django.db import models


class Skill(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class Job(models.Model):
    title = models.CharField(max_length=250)
    description = models.TextField()
    skills = models.ManyToManyField(
        Skill, blank=True)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
