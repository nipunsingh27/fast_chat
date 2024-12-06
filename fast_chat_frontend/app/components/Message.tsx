import "../globals.css";
import ChatBubble from "./ChatBubble";
const Message = ({ messages }: any) => {
  return (
    <div className="h-full">
      {messages.map((msg:any, index:number) => (
        <div>
            <ChatBubble msg={msg.msg} sender={msg.sender}/>
        </div>
      ))}
    </div>
  );
};

export default Message;
