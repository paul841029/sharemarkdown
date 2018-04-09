from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import User
from datetime import datetime


class Folder(models.Model):
    parent_folder = models.ForeignKey('self', on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    owner = User()


class Document(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    file_name = models.CharField(max_length=30)
    public = models.BooleanField(default=False)
    content = models.TextField(default='')
    parent_folder = models.ForeignKey(Folder, on_delete=models.CASCADE)
    viewers = models.ManyToManyField(User, through='ViewRight', related_name='can_be_viewed_by')
    editors = models.ManyToManyField(User, through='EditRight', related_name='can_be_edited_by')


class EditRight(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    granted_date = models.DateField(default=datetime.now, blank=True)


class ViewRight(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    granted_date = models.DateField(default=datetime.now, blank=True)