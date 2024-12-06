import '../globals.css'
import SearchField from './SerchField';
import UserCard from './UserCard';

const TopPane = () => {
    return (
        <div className="top-pane">
            <SearchField/>


            <div className='polygon-shape'>
                <UserCard/>
            </div>
           
        </div>
    );
}


export default TopPane