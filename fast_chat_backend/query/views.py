from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json
from user.models import User,Token,Chats,Message
import pickle
from datetime import datetime
import pytz

# Create your views here.
@csrf_exempt
def add_user(request):
    form_data = {}
    if request.method == 'POST':
        form_data = json.loads(request.body)
        username = form_data.get('username')
        token = form_data.get('token')
        if token and Token.objects.filter(token=token).first():
            token=Token.objects.filter(token=token).first()
            if username:
                user = User.objects.filter(username=token.username.username).first()
                user2add = User.objects.filter(username=username).first()
                if user2add:
                    newcontactlist=pickle.loads(bytes.fromhex\
                        (user.contact_list))
                    if user2add.username not in newcontactlist and user2add.username !=user.username:
                        newcontactlist.append(user2add.username)
                        user.contact_list=pickle.dumps(newcontactlist).hex()
                        user.save()
                        response_data = {
                        "status": "success",
                        "message": "username added"
                        }
                        status_code = 200
                        response_json = json.dumps(response_data, indent=4)
                    else:
                        response_data = {
                        "status": "error",
                        "message": "username already exist"
                        }
                        status_code = 200
                        response_json = json.dumps(response_data, indent=4)
                    
                    
                else:
                    response_data = {
                        "status": "error",
                        "message": "username not found"
                    }
                    status_code = 401
                    response_json = json.dumps(response_data, indent=4)
            else:
                response_data = {
                        "status": "error",
                        "message": "invalid request"
                    }
                status_code = 401
                response_json = json.dumps(response_data, indent=4)
        else:
            response_data = {
                    "status": "error",
                    "message": "unauthorised access"
                }
            status_code = 401
            response_json = json.dumps(response_data, indent=4)
        
        return HttpResponse(response_json, content_type="application/json", status=status_code)
    else:
          return HttpResponse("This view handles POST requests for form submissions.", content_type="text/plain", status=405)


def populate_contacts(contact_list):
    populated_contact_list=[]
    for username  in contact_list:
        user=User.objects.filter(username=username).first()
        user_data={"name": user.name,"username": user.username}
        populated_contact_list.append(user_data)
        
    return populated_contact_list

@csrf_exempt
def get_contacts(request):
    form_data={}
    if request.method == 'POST':
        form_data = json.loads(request.body)
        token = form_data.get('token')
        if token and Token.objects.filter(token=token).first():
            token=Token.objects.filter(token=token).first()
            user=User.objects.filter(username=token.username.username).first()
            contact_list=pickle.loads(bytes.fromhex(user.contact_list))
            contact_list=sorted(contact_list)
            response_data = {
            "status": "success",
            "contact_list":populate_contacts(contact_list),
            "message": "username added"
            }
            status_code = 200
            response_json = json.dumps(response_data, indent=4)
        else:
            response_data = {
                "status": "error",
                "message": "unauthorised access"
            }
            status_code = 401
            response_json = json.dumps(response_data, indent=4)
        return HttpResponse(response_json, content_type="application/json", status=status_code)
            
    else:
        return HttpResponse("This view handles POST requests for form submissions.", content_type="text/plain", status=405)


@csrf_exempt
def add_chat(request):
    form_data={}
    if request.method == 'POST':
        form_data = json.loads(request.body)
        token = form_data.get('token')
        username = form_data.get('username')
        if token and Token.objects.filter(token=token).first():
            token=Token.objects.filter(token=token).first()
            if username and User.objects.filter(username=username) and username!=token.username.username:
                participants=[username,token.username.username]
                participants.sort()
                participants=pickle.dumps(participants).hex()
                id=hash(participants)
                if Chats.objects.filter(id=id).first():
                    response_data = {
                    "status": "error",
                    "message": "chat already exists"
                    }
                    status_code = 401
                    response_json = json.dumps(response_data, indent=4)
                else:
                    chat=Chats(id=id,isSingle=True,participants=participants)
                    chat.save()
                    user=User.objects.filter(username=token.username.username).first()
                    active_chats=pickle.loads(bytes.fromhex(user.active_chats))
                    active_chats.append(id)
                    user.active_chats=pickle.dumps(active_chats).hex()
                    user.save()
                    user=User.objects.filter(username=username).first()
                    active_chats=pickle.loads(bytes.fromhex(user.active_chats))
                    active_chats.append(id)
                    user.active_chats=pickle.dumps(active_chats).hex()
                    user.save()
                    response_data = {
                    "status": "success",
                    "message": "chat added"
                    }
                    status_code = 200
                    response_json = json.dumps(response_data, indent=4)
            else:
                response_data = {
                "status": "error",
                "message": "invalid username"
                }
                status_code = 401
                response_json = json.dumps(response_data, indent=4)
        else:
            response_data = {
                "status": "error",
                "message": "unauthorised access"
            }
            status_code = 401
            response_json = json.dumps(response_data, indent=4)
        return HttpResponse(response_json, content_type="application/json", status=status_code)
            
    else:
        return HttpResponse("This view handles POST requests for form submissions.", content_type="text/plain", status=405)


@csrf_exempt
def get_chat(request):
    form_data={}
    if request.method == 'POST':
        form_data = json.loads(request.body)
        token = form_data.get('token')
        if token and Token.objects.filter(token=token).first():
            token=Token.objects.filter(token=token).first()
            user=User.objects.filter(username=token.username.username).first()
            active_chats=pickle.loads(bytes.fromhex(user.active_chats))
            active_chats = [str(i) for i in active_chats]
            
            print(active_chats)
            response_data = {
                "status": "success",
                "active_chats": active_chats
            }
            status_code = 200
            response_json = json.dumps(response_data, indent=4)
        else:
            response_data = {
                "status": "error",
                "message": "unauthorised access"
            }
            status_code = 401
            response_json = json.dumps(response_data, indent=4)
        return HttpResponse(response_json, content_type="application/json", status=status_code)
    else:   
        return HttpResponse("This view handles POST requests for form submissions.", content_type="text/plain", status=405)



def order_date(date1):
    date1=date1.time.split(":")
    s=""
    for i in range (len(date1)):
        x=date1[i]
        s+=x
    return int(s)

@csrf_exempt
def get_chat_detail(request):
    form_data={}
    if request.method == 'POST':
        form_data = json.loads(request.body)
        token = form_data.get('token')
        chatid = int(form_data.get('chatid'))
        if token and Token.objects.filter(token=token).first():
            token=Token.objects.filter(token=token).first()
            chat=Chats.objects.filter(id=chatid).first()
            if chat:
                chatname=""
                if chat.isSingle:
                    participants=pickle.loads(bytes.fromhex(chat.participants))
                    for username in participants:
                        if username!=token.username.username:
                            chatname=username                          
                else:
                    chatname=chat.chatname
                dpUrl=""
                message_list=list(Message.objects.filter(chatid=chatid))
                message_list.sort(key=order_date)
                if len(message_list)>0:
                    last_message=message_list[-1]
                    time=last_message.time[-8:-3]
                    content=last_message.content[:10]
                else:
                    last_message=""
                    time=""
                    content=""
                
                response_data = {
                "status": "success",
                "message":{"chatname":chatname,"dpurl":dpUrl,"time":time,"content":content}
                }
                status_code = 200
                response_json = json.dumps(response_data, indent=4)
                
            else:
                response_data = {
                "status": "error",
                "message": "chat not found"
                }
                status_code = 401
                response_json = json.dumps(response_data, indent=4)
        
        else:
            response_data = {
                "status": "error",
                "message": "unauthorised access"
            }
            status_code = 401
            response_json = json.dumps(response_data, indent=4)
        return HttpResponse(response_json, content_type="application/json", status=status_code)
    else:   
        return HttpResponse("This view handles POST requests for form submissions.", content_type="text/plain", status=405)

@csrf_exempt
def get_chat_message(request):
    form_data = {}
    if request.method == 'POST':
        form_data = json.loads(request.body)
        token = form_data.get('token')
        chatid = form_data.get('chatid')
        
        if chatid == "":
            response_data = {
                "status": "success",
                "user": "none"
            }
            status_code = 200
            response_json = json.dumps(response_data, indent=4)
        elif token and Token.objects.filter(token=token).first():
            token = Token.objects.filter(token=token).first()
            user = token.username
            active_chats = pickle.loads(bytes.fromhex(user.active_chats))
            
            if chatid and int(chatid) in active_chats:
                name = ""
                participants = Chats.objects.filter(id=int(chatid)).first()
                participants = pickle.loads(bytes.fromhex(participants.participants))
                
                for participant in participants:
                    if participant != user.username:
                        name = participant
                        break
                
                active = True
                dpUrl = ""
                
                # Fetch messages and convert to serializable format
                messages = list(Message.objects.filter(chatid=int(chatid)))
                messages.sort(key=order_date)
                message_list = []
                for message in messages:
                    message_list.append({
                        "sender": message.sender,
                        "content": message.content,
                        "time": message.time[-8:-3]
                    })
                
                response_data = {
                    "status": "success",
                    "name": name,
                    "active": active,
                    "dpURL": dpUrl,
                    "messages": message_list
                }
                status_code = 200
                response_json = json.dumps(response_data, indent=4)
            else:
                response_data = {
                    "status": "error",
                    "message": "cannot find chat id"
                }
                status_code = 401
                response_json = json.dumps(response_data, indent=4)
        else:
            response_data = {
                "status": "error",
                "message": "unauthorized access"
            }
            status_code = 401
            response_json = json.dumps(response_data, indent=4)
        
        return HttpResponse(response_json, content_type="application/json", status=status_code)
    else:
        return HttpResponse("This view handles POST requests for form submissions.", content_type="text/plain", status=405)

@csrf_exempt
def add_message(request):
    if request.method == 'POST':
        form_data = json.loads(request.body)
        token = form_data.get('token')
        chatid = form_data.get('chatid')
        content = form_data.get('content')
        
        if token and Token.objects.filter(token=token).first():
            token = Token.objects.filter(token=token).first()
            user = token.username
            
            # Check if chat exists and user is part of the chat
            chat = Chats.objects.filter(id=int(chatid)).first()
            if chat:
                participants = pickle.loads(bytes.fromhex(chat.participants))
                if user.username in participants:
                    # Create and save the message
                    timezone = pytz.timezone('Asia/Kolkata')
                    new_message = Message(
                        chatid=int(chatid),
                        sender=user.username,
                        content=content,
                        time=datetime.now(timezone).strftime("%Y:%m:%d:%H:%M:%S")  # Adjust format as needed
                    )
                    print(new_message.time)
                    new_message.save()
                    
                    response_data = {
                        "status": "success",
                        "message": "Message added successfully"
                    }
                    status_code = 200
                else:
                    response_data = {
                        "status": "error",
                        "message": "User is not part of this chat"
                    }
                    status_code = 401
            else:
                response_data = {
                    "status": "error",
                    "message": "Chat not found"
                }
                status_code = 404
        else:
            response_data = {
                "status": "error",
                "message": "Unauthorized access"
            }
            status_code = 401

        response_json = json.dumps(response_data, indent=4)
        return HttpResponse(response_json, content_type="application/json", status=status_code)
    else:
        return HttpResponse("This view handles POST requests for adding messages.", content_type="text/plain", status=405)


@csrf_exempt
def get_message(request):
    if request.method == 'POST':
        form_data = json.loads(request.body)
        token = form_data.get('token')
        chatid = form_data.get('chatid')
        
        if token and Token.objects.filter(token=token).first():
            token = Token.objects.filter(token=token).first()
            user = token.username
            active_chats = pickle.loads(bytes.fromhex(user.active_chats))
            
            if chatid and int(chatid) in active_chats:
                # Retrieve chat details
                chat = Chats.objects.filter(id=int(chatid)).first()
                participants = pickle.loads(bytes.fromhex(chat.participants))
                for participant in participants:
                    if participant != user.username:
                        name = participant
                        break
                else:
                    name = ""
                
                # Retrieve messages
                messages = list(Message.objects.filter(chatid=int(chatid)))
                messages.sort(key=order_date)
                
                response_data = {
                    "status": "success",
                    "name": name,
                    "active": True,
                    "dpURL": "",  # Add logic for dpURL if necessary
                    "messages": [{"sender": msg.sender, "content": msg.content, "time": msg.time[-8:-3]} for msg in messages]
                }
                status_code = 200
            else:
                response_data = {
                    "status": "error",
                    "message": "Chat ID not found or user is not part of the chat"
                }
                status_code = 401
        else:
            response_data = {
                "status": "error",
                "message": "Unauthorized access"
            }
            status_code = 401

        response_json = json.dumps(response_data, indent=4)
        return HttpResponse(response_json, content_type="application/json", status=status_code)
    else:
        return HttpResponse("This view handles POST requests for retrieving messages.", content_type="text/plain", status=405)
