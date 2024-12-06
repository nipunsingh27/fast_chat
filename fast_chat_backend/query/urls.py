from django.urls import path
from .views import add_user,get_contacts,add_chat,get_chat,get_chat_detail,get_chat_message, add_message, get_message
urlpatterns = [
    path('add/', add_user, name='adduser'),
    path('getcontacts/', get_contacts, name='getcontacts'),
    path('addchats/', add_chat, name='addchats'),
    path('getchats/', get_chat, name='getchats'),
    path('getchatdetail/', get_chat_detail, name='getchatdetail'),
    path('getchatmessage/', get_chat_message, name='getchatmessage'), 
    path('addmessage/', add_message, name='addmessage'), 
    path('getmessage/', get_message, name='getmessage'), 
    
]