from django.db import models
from apps.studys.models import Study
from apps.users.models import User
# Create your models here.
class Trash(models.Model):
    study = models.ForeignKey(Study, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)