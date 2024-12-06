from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.html import escape
from user.models import User, Token  # Import your User model
import json
import random

@csrf_exempt
def signin_view(request):
    form_data = {}
    if request.method == 'POST':
        form_data = json.loads(request.body)
        
        username = form_data.get('username')
        password = form_data.get('password')
        token = form_data.get('token')
        if username:
            user = User.objects.filter(username=username).first()
            response_json={}
            if user:
                if user.password==password:
                
                    token = Token.objects.filter(username=user).first() # Access token from the OneToOneField relation
                    if token:
                        # Generate a new token
                        newToken = hex(random.randint(0, 2**64))[2:]

                        while Token.objects.filter(token=newToken).exists():
                            newToken = hex(random.randint(0, 2**64))[2:]
                        token.delete()
                        token = Token(username=user, token=newToken)
                        token.save()  # Update only the token field
                    else:
                        newToken = hex(random.randint(0, 2**64))[2:]
                        while Token.objects.filter(token=newToken).exists():
                            newToken = hex(random.randint(0, 2**64))[2:]

                        token = Token(username=user, token=newToken)
                        token.save()
                        
                    user = User.objects.filter(username=username).first()
                    token = Token.objects.filter(username=user).first()
                    
                    response_data = {
                        "status": "success",
                        "message": "Login successful!",
                        "user": {
                            "username": user.username,
                            "email": user.email,
                            "token": token.token
                        }
                    }
                    status_code = 200

                else:

                    response_data = {
                        "status": "error",
                        "message": "Invalid username or password."
                    }
                    status_code = 401
                

                response_json = json.dumps(response_data, indent=4)
                
                return HttpResponse(response_json, content_type="application/json", status=status_code)
            elif token:
                token = Token.objects.filter(token=token).first()
                if token:
                    user = User.objects.filter(username=token.username.username).first()
                    response_data = {
                        "status": "success",
                        "message": "Login successful!",
                        "user": {
                            "username": user.username,
                            "email": user.email,
                            "token": token.token
                        }
                        
                    }
                    status_code = 200
                else:
                    response_data = {
                        "status": "error",
                        "message": "Unauthorized access."
                    }
                    status_code = 401
                
                response_json = json.dumps(response_data, indent=4)

            else:
                response_data = {
                    "status": "error",
                    "message": "username not found"
                }
                status_code = 401
                response_json = json.dumps(response_data, indent=4)
            return HttpResponse(response_json, content_type="application/json", status=status_code)

    return HttpResponse("This view handles POST requests for form submissions.", content_type="text/plain", status=405)


@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        form_data = json.loads(request.body)
        username = form_data.get('username')
        name = form_data.get('name')
        password = form_data.get('password')
        email = form_data.get('email')
        # Check if the user already exists
        existing_user_username = User.objects.filter(username=username).first()
        existing_user_email = User.objects.filter(email=email).first()
        
        if existing_user_username:
            response_data = {
                "status": "error",
                "message": "Username already exists."
            }
            status_code = 400
        elif existing_user_email:
            response_data = {
                "status": "error",
                "message": "Email already exists."
            }
            status_code = 400
        else:
            # Create a new user
            new_user = User(username=username, email=email, password=password, name=name)
            new_user.save()
            
            response_data = {
                "status": "success",
                "message": "User created successfully!",
                "user": {
                    "username": new_user.username,
                    "email": new_user.email
                }
            }
            status_code = 201
        
        response_json = json.dumps(response_data, indent=4)
        
        return HttpResponse(response_json, content_type="application/json", status=status_code)

    return HttpResponse("This view handles POST requests for form submissions.", content_type="text/plain", status=405)

@csrf_exempt
def validate_token(request):
    if request.method == 'POST':
        form_data = json.loads(request.body)
        token = form_data.get('token')
        user = Token.objects.filter(token=token).first().username
        response_json={}
        if user:
            response_data = {
                "status": "success",
                "message": "Valid Token",
                "user": {
                    "username": user.username,
                    "name": user.name,
                }
            }
            status_code = 201
            response_json = json.dumps(response_data, indent=4)
        else:
            response_data = {
                "status": "error",
                "message": "Unauthorized Access",
            }
            status_code = 201
            response_json = json.dumps(response_data, indent=4)
            
        return HttpResponse(response_json, content_type="application/json", status=status_code)
    return HttpResponse("This view handles POST requests for form submissions.", content_type="text/plain", status=405)
