'use client';
import React, { useState } from 'react';
import '../globals.css'
import ChatHistory from '../components/ChastHistory';

import LeftPane from '../components/LeftPane';
import TopPane from '../components/TopPane';
import ChatPage from '../components/ChatPage';
import { getCookie } from "../modules/Cookies";

const handleSignIn = async (token:string, setStatus:any) => {
 
    const formData = {"token":token}
  try {
    const response = await fetch('http://127.0.0.1:8000/auth/validate-token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCSRFToken() || '', // Make sure to pass the CSRF token
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    console.log("status", data.status);

    if (data.status === 'success') {
      setStatus(true);
    } else {
      alert(data.message || 'Sign in failed');
      setStatus(false);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during sign-in.');
  }
};

const getCSRFToken = () => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, 10) === 'csrftoken=') {
        cookieValue = decodeURIComponent(cookie.substring(10));
        break;
      }
    }
  }
  return cookieValue;
};


const Chat = () => {
  const [viewIdex,setViewIndex]=useState<number>(0);
  const [loggedIn,setLoggedIn] = useState<boolean>(false);
  const [chatId,setChatId]=useState<string>("");
  const [trigger, setTrigger] = useState(false);
  const token = getCookie("token");
  if(token) handleSignIn(token,setLoggedIn);

  if(loggedIn){
    return (
      <div className='flex chat-container'>
          <LeftPane setParentActiveOption={setViewIndex}/>
          <div className='fulldiv'>
            <TopPane/>
            <div className='flex chat-area mt-5 w-full'>
              <ChatHistory activeView={viewIdex} getChatId={setChatId} setTrigger={setTrigger}/>
              <ChatPage trigger={trigger} chatId={chatId}/>
            </div>
          </div>
      </div>
    );
  }
  else{
    <div>
      log in
    </div>
  }
  
};

export default Chat;
