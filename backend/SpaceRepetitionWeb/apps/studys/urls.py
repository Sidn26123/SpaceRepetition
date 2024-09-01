from django.contrib import admin
from django.urls import path,include
app_name = "studys"

from .views import (
    StudyInDay,
    AddStudyView,
    UpdateStudyView,
    DeleteStudyView,
    GetNeedToLearn,
    GetLearnedStudyInTimeSpacesView,
    GetTotalLearnedStudyInTimeSpacesView,
    UpdateReviewStudy,
    # GetFinishedStudyInSpacesView,
)
urlpatterns = [
    path('study', StudyInDay.as_view(), name='study-in-day'),
    path('add', AddStudyView.as_view(), name='add-study'),
    path('update', UpdateStudyView.as_view(), name='update-study'),
    path('delete', DeleteStudyView.as_view(), name='delete-study'),
    path('review', GetNeedToLearn.as_view(), name='get-need-to-learn'),
    path('update-review', UpdateReviewStudy.as_view(), name='update-review-study'),
    path('learned-data', GetLearnedStudyInTimeSpacesView.as_view(), name='get-learned-study-in-time-spaces'),
    path('learned-data-chart', GetTotalLearnedStudyInTimeSpacesView.as_view(), name='get-total-learned-study-in-time-spaces'),
    # path('finished-study-data', GetFinishedStudyInSpacesView.as_view(), name='get-finished-study-in-spaces'),
]
