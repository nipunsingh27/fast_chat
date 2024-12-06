from django.db import models
import pickle

# a=["a",5,4]
# b=pickle.dumps(a).hex()
# c=bytes.fromhex(b)
# print(pickle.loads(c))

MAX_CHAR_FIELD=2**40

class User(models.Model):
    username = models.CharField(max_length=20, primary_key=True, unique=True, null=False)
    name = models.CharField(max_length=50,null=False)
    email = models.EmailField(unique=True, null=False)
    password = models.CharField(max_length=128, null=False)
    contact_list=models.CharField(max_length=MAX_CHAR_FIELD,default=pickle.dumps([]).hex())
    active_chats=models.CharField(max_length=MAX_CHAR_FIELD,default=pickle.dumps([]).hex())
    dp_url=models,models.CharField(max_length=1024)

    def __str__(self):
        return f"{self.username} {self.name} {self.email}"

class Token(models.Model):
    username = models.OneToOneField(User, on_delete=models.CASCADE, unique=True, null=False)
    token = models.CharField(max_length=128, unique=True, primary_key=True, null=False)
    
    def __str__(self):
        return f"{self.username} {self.token}"
    
    
class Chats(models.Model):
    id=models.IntegerField(null=False, unique=True,primary_key=True)
    isSingle=models.BooleanField(null=False)
    participants=models.CharField(max_length=MAX_CHAR_FIELD, default=pickle.dumps([]).hex())
    chatname=models.CharField(max_length=20,null=False,default="my chat")
    def __str__(self):
        return f"{self.id}"

class Message(models.Model):
    id=models.IntegerField(null=False, unique=True,primary_key=True)
    chatid=models.IntegerField(null=False,default=-1)
    time=models.CharField(null=False,max_length=20)
    content=models.CharField(max_length=1024,null=False)
    sender=models.CharField(max_length=20,null=True)
    def __str__(self):
        return f"{self.id}"