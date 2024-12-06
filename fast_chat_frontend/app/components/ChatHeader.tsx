import "../globals.css";
import 'boxicons'
interface UserCardProps {
  name: string;
  active: boolean;
  dpURL: string;
}

const ChatHeader: React.FC<UserCardProps> = ({ name, active, dpURL }: any) => {
  return (
    <div className="chat-header">
      <div className="flex w-full">
        <img src={dpURL} className="large-dp ml-20" />
        <div className="h-full w-[60%]">
          <p className="text-3xl ml-8 mt-2">{name}</p>
          {active ? (
            <div className="flex items-center ml-8 mt-1">
              <div className="green-ball"></div>
              <div className="ml-2">
                <p className="m-0 text-gray">active</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center ml-8 mt-1">
                <div className="red-ball"></div>
                <div className="ml-2">
                  <p className="m-0 text-gray">inactive</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex">
          <div className="m-3"><box-icon name='phone-call' size='md'></box-icon></div>
          <div  className="m-3"><box-icon name='video' size='md'></box-icon></div>
        
        
        </div>
      </div>
      <hr className="center-hr "/>
    </div>
  );
};

export default ChatHeader;
