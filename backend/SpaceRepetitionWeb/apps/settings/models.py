from django.db import models
from apps.users.models import User
# Create your models here.
class Settings(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    value = models.CharField(max_length=255)

class GlobalSettings(models.Model):
    name = models.CharField(max_length=30)
    value = models.CharField(max_length=255)