import "../globals.css";
import ImageBox from "./ImageBox";
import { getCookie ,getCSRFToken} from "../modules/Cookies";
interface UserCardProps {
  name: string;
  dpURL: string;
  username:string;

}

const Contact: React.FC<UserCardProps> = ({
  name,
  dpURL,
  username,

}: any) => {
    const addUser=async ()=>{
      const formData = {
        username: username,
        token:getCookie("token")
      };
      const response = await fetch('http://127.0.0.1:8000/query/addchats/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken() || '', // Make sure to pass the CSRF token
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log("status", data.status)
      if (data.status === 'success') {
        alert('add user succesfull!');

      } else {
        alert(data.message || 'add user unsuccesfull!');
      }
    } 
  return (
    <div className="flex chat-card mt-2" onClick={addUser}>
      <ImageBox imageURL={dpURL} />
      <div className="flex-col pl-5 pt-5 w-[60%]">
        <div className="flex items-center justify-between w-full">
          <p className="name-flex">{name}</p>
          <p className="name-flex text-xs pt-6">{username}</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
