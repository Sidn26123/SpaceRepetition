# Generated by Django 5.0.7 on 2024-08-08 17:44

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('studys', '0011_alter_reviewstudy_review_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reviewstudy',
            name='review_time',
            field=models.DateField(blank=True, default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='study',
            name='study_time',
            field=models.DateField(blank=True, default=django.utils.timezone.now),
        ),
    ]
