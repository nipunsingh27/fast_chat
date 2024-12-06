import { useEffect, useState } from "react";
import ChatBubble from "./ChatBubble";
import { getCookie } from "../modules/Cookies";
const SingleChat = ({chats,other}:any) => {
  if(chats){}else{chats=[]}
  return (
    <div className="flex flex-col w-full h-full justify-end">
      {chats.map((chat: any, index: number) => (
        <div key={index} className="flex w-full mb-5">
          {chat.sender !== other ? (
            <div className="flex w-full justify-end items-end">
              <p className="mr-6">{chat.time}</p>
              <ChatBubble msg={chat.content} sender={chat.sender} other={other}/>
            </div>
          ) : (
            <div className="flex w-full items-end">
              <ChatBubble msg={chat.content} sender={chat.sender} other={other}/>
              <p>{chat.time}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SingleChat;
