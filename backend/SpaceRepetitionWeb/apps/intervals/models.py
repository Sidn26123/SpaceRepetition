from django.db import models
from apps.users.models import User
# Create your models here.
class IntervalTemplate(models.Model):
    name = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    color = models.CharField(max_length=255, null = True)
    is_deleted = models.BooleanField(default=False)

class IntervalDetail(models.Model):
    template = models.ForeignKey(IntervalTemplate, on_delete=models.CASCADE)
    value = models.IntegerField()