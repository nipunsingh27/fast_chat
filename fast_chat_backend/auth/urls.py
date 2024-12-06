from django.urls import path
from .views import signin_view, signup_view,validate_token

urlpatterns = [
     path('signin/', signin_view, name='signin'),
     path('signup/', signup_view, name='signup'),
     path('validate-token/', validate_token, name='validate_token'),
]