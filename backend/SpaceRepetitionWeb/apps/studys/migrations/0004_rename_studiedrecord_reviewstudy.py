# Generated by Django 5.0.7 on 2024-08-07 18:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('studys', '0003_remove_studiedrecord_updated_at_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='StudiedRecord',
            new_name='ReviewStudy',
        ),
    ]
