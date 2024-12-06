import '../globals.css'

const ImageBox = ({imageURL}:any) => {
    return (
        <div className='image-box'>
          <img src={imageURL} className='small-dp'/>
        </div>
    );
}


export default ImageBox