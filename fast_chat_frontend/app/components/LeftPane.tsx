import { useState } from 'react';
import '../globals.css'
import Link from "next/link";

const LeftPane = ({setParentActiveOption}:any) => {
    const [activeOption , setActiveOption]=useState<number>(0);
    const setActiveOption0=()=>{
        setActiveOption(0);
        setParentActiveOption(0);
    }
    const setActiveOption1=()=>{
        setActiveOption(1);
        setParentActiveOption(1);
    }
    const setActiveOption2=()=>{
        setActiveOption(2);
        setParentActiveOption(2);
    }
    return (
            <div className="left-pane ">
            <div className='ml-4  mt-4'>
            <box-icon name='coffee' size='lg'></box-icon>
            </div>
            <div className='ml-4  mt-[100%]'onClick={setActiveOption0}>
                <box-icon name='message-dots' size='lg'></box-icon>
                {activeOption==0? (<div> <hr className='small-hr'/></div>):(<div> </div>)}
            </div>
            <div className='ml-4  mt-4' onClick={setActiveOption1}><box-icon name='contact' type='solid' size='lg' ></box-icon>{activeOption==1? (<div> <hr className='small-hr'/></div>):(<div> </div>)}</div>
            <div className='ml-4  mt-4'onClick={setActiveOption2}><box-icon name='group' size='lg'></box-icon>{activeOption==2? (<div> <hr className='small-hr'/></div>):(<div> </div>)}</div>
            <div className='ml-4  mt-[500%]'><Link  href="/signin"><box-icon name='log-out-circle' size='lg'></box-icon></Link></div>
            
        </div>
    );
}


export default LeftPane