# Generated by Django 5.0.7 on 2024-08-08 14:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('intervals', '0005_alter_intervaltemplate_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='intervaltemplate',
            name='color',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
