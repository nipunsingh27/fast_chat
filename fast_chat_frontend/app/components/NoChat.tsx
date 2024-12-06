import '../globals.css'

const NoChat = ({user}: any) => {
    user=null;
    return (
        <div className="flex justify-center items-center h-full flex-col">
            <p className="text-xl text-gray">Pick a friend and start</p>
            <p className="text-6xl text-gray mt-8">Fast Chatting</p>
        </div>
    
    );
}

export default NoChat;
