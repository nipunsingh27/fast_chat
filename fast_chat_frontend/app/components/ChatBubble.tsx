import "../globals.css";

interface UserCardProps {
  msg: string;
  sender: string;
  other:string;
}

const ChatBubble: React.FC<UserCardProps> = ({ msg, sender, other }: any) => {
  return (
    <div className="chat-bubble-root">
      {sender !== other? (
        <div className="chat-bubble bg-purple " >{msg}</div>
      ) : (
        <div className="chat-bubble bg-white ">{msg}</div>
      )}
    </div>
  );
};

export default ChatBubble;
