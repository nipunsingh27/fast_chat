import { useState } from 'react';
import 'boxicons';

interface ChatFooterProps {
    onSendMessage: (message: string) => void; // Function to handle sending messages
}

const ChatFooter = ({ onSendMessage }: ChatFooterProps) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            onSendMessage(message); // Call the function to send the message
            setMessage(''); // Clear the input field
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage(); // Send message when Enter key is pressed
        }
    };

    return (
        <div className="chat-footer">
            <hr className="center-hr mt-2" />
            <div className="flex">
                <input
                    type="text"
                    placeholder="start typing here..."
                    className="send-message-field"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <div className="flex items-center">
                    <div className="m-3">
                        <box-icon name='microphone' size='md'></box-icon>
                    </div>
                    <div className="m-3">
                        <box-icon name='plus' size='md'></box-icon>
                    </div>
                    <div className="m-3" onClick={handleSendMessage}>
                        <box-icon name='send' size='md'></box-icon>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatFooter;
