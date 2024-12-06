import '../globals.css'
import 'boxicons';
const SearchField = () => {
    return (
        <div className='flex search-field'>
            <div className='flex search-input'>
                <box-icon name='search-alt-2' size='md' color='gray '></box-icon>
                <input  placeholder='Search for contacts, chats' className='outline-none'/>
            </div>
        </div>
    );
}


export default SearchField