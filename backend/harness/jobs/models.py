from django.db import models


class Skill(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class Job(models.Model):
    title = models.CharField(max_length=250)
    description = models.TextField()
    skills = models.ManyToManyField(
        Skill, related_name='job_skills', through='JobSkill', blank=True)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class JobSkill(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.job.title} has {self.skill.title}"
