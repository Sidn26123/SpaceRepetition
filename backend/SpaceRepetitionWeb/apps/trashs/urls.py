from django.contrib import admin
from django.urls import path,include
app_name = "trash"

from .views import (
    GetTrashItems,
    DeleteTrashItem,
    AddTrashItem,
)
urlpatterns = [
    path('add', AddTrashItem.as_view(), name='add-trash'),
    path('delete', DeleteTrashItem.as_view(), name='delete-trash'),
    path('get', GetTrashItems.as_view(), name='get-trash'),
]
