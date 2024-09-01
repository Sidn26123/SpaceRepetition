from django.db import models
from apps.users.models import User
from apps.intervals.models import IntervalTemplate
from django.utils import timezone
# Create your models here.
class Study(models.Model):
    content = models.TextField()
    study_time = models.DateField(default=timezone.now, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    difficulty = models.ForeignKey(IntervalTemplate, on_delete=models.CASCADE)
    is_deleted = models.BooleanField(default=False)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)

class ReviewStudy(models.Model):
    study = models.ForeignKey(Study, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    review_time = models.DateField(default=timezone.now, blank=True)
    is_deleted = models.BooleanField(default=False)
    is_learned = models.BooleanField(default=False)
    count = models.IntegerField(default=0)
    # class Meta:
        # unique_together = ('study', 'creator')