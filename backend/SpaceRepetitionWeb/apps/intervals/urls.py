from django.contrib import admin
from django.urls import path,include
app_name = "interval"

from .views import (
    GetIntervalDetailView,
    GetIntervalsOfUserView,
    AddIntervalView,
    UpdateIntervalView,
    DeleteIntervalView,
    AddIntervalItem,
    DeletedIntervalItem
)
urlpatterns = [
    path('detail', GetIntervalDetailView.as_view(), name='interval-detail'),
    path('get-user', GetIntervalsOfUserView.as_view(), name='get-intervals-of-user'),
    path('add-template', AddIntervalView.as_view(), name='add-interval'),
    path('update', UpdateIntervalView.as_view(), name='update-interval'),
    path('delete-template', DeleteIntervalView.as_view(), name='delete-interval'),
    path('add-item', AddIntervalItem.as_view(), name='add-interval-item'),
    path('delete-item', DeletedIntervalItem.as_view(), name='delete-interval-item'),
]
