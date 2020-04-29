import React from 'react';

const backdrop= (props) => props.show? 
    <div 
        className={`z-30 bg-black w-screen h-screen fixed top-0 left-0 transition-opacity duration-500 ease-out
        ${props.show?'opacity-75':'opacity-0'}`} 
        onClick={() => props.close()}
        ></div> 
    :null ;

export default backdrop;