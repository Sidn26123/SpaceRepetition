import time
from django.conf import settings
from django.core.files import File

def handle_avatar_name(file_name):
    return str(time.time()) + "_" + file_name

def fetch_avatar_file(avatar_name):
    with open(settings.AVATARS_PATH + avatar_name, 'rb') as f:
        image_file = File(f)
    return image_file

def save_avatar(file):
    with open(settings.AVATARS_PATH + file.name, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)
    return file.name