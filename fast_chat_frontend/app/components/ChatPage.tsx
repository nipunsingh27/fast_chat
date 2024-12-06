import '../globals.css';
import NoChat from './NoChat';
import ChatHeader from './ChatHeader';
import SingleChat from './SingleChat';
import ChatFooter from './ChatFooter';
import { useState, useEffect } from 'react';
import { getCookie, getCSRFToken } from "../modules/Cookies";

interface User {
    name: string;
    active: boolean;
    dpURL: string;
    messages: Message[];
}

interface Message {
    time: string;
    sender: string;
    msg: string;
}

const ChatPage = ({ chatId, trigger }: any) => {
    const [user, setUser] = useState<User | null>(null);

    const getChatDetail = async () => {
        const formData = {
            token: getCookie('token'),
            chatid: chatId
        };
        try {
            const response = await fetch('http://127.0.0.1:8000/query/getchatmessage/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCSRFToken() || '', // Pass the CSRF token
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to fetch chat messages');
            }

            const data = await response.json();
            if (data.status === 'success') {
                setUser({
                    name: data.name,
                    active: data.active,
                    dpURL: data.dpURL,
                    messages: data.messages
                });
                if (data.user === "none") setUser(null);
            } else {
                alert(data.message || 'Failed to fetch chat details');
            }
        } catch (error) {
            console.error('Error fetching chat details:', error);
        }
    };

    const handleSendMessage = async (message: string) => {
        const formData = {
            token: getCookie('token'),
            chatid: chatId,
            content: message
        };
        try {
            const response = await fetch('http://127.0.0.1:8000/query/addmessage/', { // Replace with your endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCSRFToken() || '', // Pass the CSRF token
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.status === 'success') {
                // Fetch updated chat details to include the new message
                getChatDetail();
            } else {
                alert(data.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    useEffect(() => {
        // Initial fetch
        getChatDetail();

        // Polling every 2 seconds
        const interval = setInterval(() => {
            getChatDetail();
        }, 2000);

        // Cleanup on component unmount
        return () => clearInterval(interval);
    }, [chatId, trigger]);

    

    return (
        <div className='chat-page'>
            {user === null ? (
                <div className='h-full'>
                    <NoChat />
                </div>
            ) : (
                <div className='w-full h-full'>
                    <ChatHeader name={user.name} active={user.active} dpURL={user.dpURL} />
                    <div className='chat-scroll'>
                        <SingleChat chats={user.messages} other={user.name} />
                    </div>
                    <ChatFooter onSendMessage={handleSendMessage} />
                </div>
            )}
        </div>
    );
};

export default ChatPage;
