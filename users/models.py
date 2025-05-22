from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    phone = models.CharField(max_length=20, blank=True)
    bio = models.TextField(max_length=500, blank=True)

    def __str__(self) -> str:
        return self.email