import React from 'react';
import Backdrop from "./backdrop";

const Alert = (props) => {
    return (
        <div>
            <Backdrop show={props.show} close={props.close}/>
            <div className={`px-4 py-2 font-bold md:text-sm text-xs rounded-sm flex flex-col items-center
                fixed z-50 left-1/2 transform -translate-x-1/2 
                ${props.type==="info" && "bg-blue-400"}
                ${props.type==="warning" && "bg-yellow-400"}
                ${props.type==="success" && "bg-green-400"}
                ${props.type==="failure" && "bg-red-400"}
                ${props.show ? "top-1/10 opacity-100" : "top-0 -translate-y-full opacity-0"} 
                transition-all duration-500 ease-out`}>
            <p>{props.children}</p>
            <button className="border border-white text-white text-xs font-bold focus:outline-none my-1 rounded-sm px-4" onClick={props.close}>ok</button>
            
            </div>
        </div>
    );

}

export default Alert;