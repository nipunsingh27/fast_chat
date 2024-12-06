import "../globals.css";
import ImageBox from "./ImageBox";
import Bubble from "./Bubble";
import { useState, useEffect } from "react";
import { getCookie, getCSRFToken } from "../modules/Cookies";


interface UserCardProps {
chatId:number;
selectedChat:number;
position:number;
setSelectedChat:any;
callback:any;
setTrigger:any;
}

const ChatThread: React.FC<UserCardProps> = ({
  chatId,
  selectedChat,
  position,
  setSelectedChat,
  callback,
  setTrigger

}: any) => {
  const [dpURL,setDpURL] = useState<string>('');
  const [time,setTime] = useState<string>('');
  const [name,setName] = useState<string>('');
  const [lastMessage,setLastMessage] = useState<string>('');
  const [unreadMessage,setUnreadMessage] = useState<number>(0);
  console.log("key",position,selectedChat);
  const getChatDetail=async()=>{
    const formData = {
      token:getCookie('token'),
      chatid:chatId
    };
    const response = await fetch('http://127.0.0.1:8000/query/getchatdetail/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCSRFToken() || '', // Make sure to pass the CSRF token
      },
      body: JSON.stringify(formData)
    });

  const data = await response.json();
    console.log("get chat detail status", data.status)
    if (data.status === 'success') {
      alert('Sign in successful!');
      setDpURL(data.message.dpurl);
      setTime(data.message.time);
      setName(data.message.chatname);
      setLastMessage(data.message.content);

    } else {
      alert(data.message || 'Sign in failed');
    }
  }
  useEffect(() => {
   getChatDetail();

  }, []); 
  const setSelection=()=>
  {
    setTrigger((prevTrigger:any) => !prevTrigger);
    if(position==selectedChat){
      setSelectedChat(-1);
      callback("");
      
    }
    else{ 
      setSelectedChat(position);
      callback(chatId);
    }
  }
  return (
    <div className={`flex chat-card mt-2 bg-${selectedChat==position?'purple':'gray'}`} onClick={setSelection}>
      <ImageBox imageURL={dpURL} />
      <div className="flex-col pl-5 pt-3 w-[60%]">
        <div className="flex items-center justify-between w-full">
          <p className="name-flex">{name}</p>
          <p>{time}</p>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="name-flex">{lastMessage}</p>
          {unreadMessage===0 ? (
              <div></div>
          ):(
            <div className="ml-auto">
                <Bubble num={unreadMessage} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatThread;
