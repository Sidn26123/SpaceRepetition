from django.contrib import admin
from django.urls import path,include
app_name = "users"
from rest_framework.authtoken import views as v
from rest_framework.authtoken.views import obtain_auth_token  # <-- Here

from .views import (
    Register,
    Logout,
    UserInfo,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .serializers import MyTokenObtainPairSerializer, MyTokenObtainPairView
urlpatterns = [
    path('auth/register', Register.as_view(), name='register'),
    # path('auth/login', Login.as_view(), name='login'),
    path('auth/logout', Logout.as_view(), name='logout'),
    # path('user/update-profile', UpdateProfile.as_view(), name='update-profile'),
    path('auth/login', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/info', UserInfo.as_view(), name='user-info'),

]
