import { useState, useEffect } from "react";
import "../globals.css";
import ChatThread from "./ChatThread";
import Contact from "./Contact";
import { getCookie, getCSRFToken } from "../modules/Cookies";

const ChatHistory = ({ activeView,getChatId ,setTrigger}: any) => {
  const [inputUsername, setInputUsername] = useState<string>("");
  const [contacts, setContacts] = useState<any[]>([]); // Ensure contacts is initialized as an empty array
  const [chatHistory, setChatHistory] = useState<any[]>([]); // Ensure contacts is initialized as an empty array
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading
  const [loadingchathistory, setloadingchathistory] = useState<boolean>(true); // State to manage loading
  const [selectedChat, setSelectedChat] = useState<number>(-1);

  const getChatHistory=async()=>{
    setloadingchathistory(true);
    const formData = {
      token: getCookie("token"),
    };
    const response = await fetch("http://127.0.0.1:8000/query/getchats/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken() || "", // Make sure to pass the CSRF token
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
      console.log("status", data.status);
      if (data.status === "success") {
        setChatHistory(data.active_chats || []); // Ensure contacts is always an array
        console.log("loaded history",data);
      } else {
        alert(data.message || "Invalid search");
        setChatHistory([]); // Ensure contacts is always an array
      }
      setloadingchathistory(false);
    } 
    

  

  // Fetch contacts from the backend
  const getContacts = async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const formData = {
        token: getCookie("token"),
      };
      const response = await fetch("http://127.0.0.1:8000/query/getcontacts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken() || "", // Make sure to pass the CSRF token
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("status", data.status);
      if (data.status === "success") {
        setContacts(data.contact_list || []); // Ensure contacts is always an array
        console.log("loaded contacts",data);
      } else {
        alert(data.message || "Invalid search");
        setContacts([]); // Ensure contacts is always an array
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      alert("Failed to fetch contacts");
      setContacts([]); // Ensure contacts is always an array
    } finally {
      setLoading(false); // Set loading to false after fetching is complete
    }
  };


  // Fetch contacts when the component mounts
  useEffect(() => {
    getContacts();
    getChatHistory();

  }, []); // Empty dependency array ensures it only runs once when the component mounts

  // Add a username to the contacts
  const addUsername = async () => {
    const formData = {
      username: inputUsername,
      token: getCookie("token"),
    };
    const response = await fetch("http://127.0.0.1:8000/query/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken() || "", // Make sure to pass the CSRF token
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log("status", data.status);
    if (data.status === "success") {
      alert(data.message || "Contact added");
      getContacts(); // Re-fetch contacts after adding a new one
    } else {
      alert(data.message || "Invalid search");
    }
  };

  // Handle input change for the username field
  const handleChangeInputUsername = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newText = e.target.value;
    setInputUsername(newText);
  };

  // Conditional rendering based on loading state
  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }

  // activeView = 1;

  return (
    <div className="chat-history w-[20%]">
      {activeView == 0 ? (
        <div className="w-full h-full">
          {/* Display chat history when activeView is 0 */}
          {chatHistory.map((chatId: any, index: number) => (
            <ChatThread
            position={index}
              chatId={chatId}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              callback={getChatId}
              setTrigger={setTrigger}
            />
          ))}
        </div>
      ) : (
        <div>
          {activeView == 1 ? (
            <div className="w-full h-full mt-1">
              {/* Input and Add Button */}
              <div className="flex w-full h-[20%] justify-center">
                <input
                  className="h-9 m-2 pl-8"
                  type="text"
                  placeholder="Enter username"
                  onChange={handleChangeInputUsername}
                />
                <button
                  className="m-2 bg-purple hover:bg-gray text-gray font-bold py-2 px-4 rounded"
                  onClick={addUsername}
                >
                  Add
                </button>
              </div>
              {/* Render the contacts */}
              {contacts.length > 0 ? (
                contacts.map((contact: any, index: number) => (
                  <Contact
                    key={index}
                    name={contact.name}
                    dpURL={""}
                    username={contact.username}

                  />
                ))
              ) : (
                <div>No contacts available</div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
