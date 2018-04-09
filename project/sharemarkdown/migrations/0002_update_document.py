# Generated by Django 2.0.2 on 2018-04-06 18:56

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sharemarkdown', '0001_init_schema'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='content',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='document',
            name='public',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='editright',
            name='granted_date',
            field=models.DateField(blank=True, default=datetime.datetime.now),
        ),
        migrations.AddField(
            model_name='viewright',
            name='granted_date',
            field=models.DateField(blank=True, default=datetime.datetime.now),
        ),
    ]