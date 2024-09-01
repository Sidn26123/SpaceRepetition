from django.db import models
from django.dispatch import receiver
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    #add additional fields in here
    avatar = models.CharField(max_length=255, null=True, blank=True)
    search_fields = ['username']
    class Meta:
        app_label = 'users'