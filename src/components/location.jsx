import React from 'react';

const location = (props) => {
    return (
        <div className="border-l border-blue-400 h-16 rounded-sm flex flex-col  relative mx-2">
            <svg className="w-10 absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 " viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="25" fill="blue" />
                <circle cx="50" cy="50" r="40" fill="blue" opacity="0.5">
                <animate attributeType="CSS" attributeName="r" 
                    from="40" to="30" dur="1s" repeatCount="indefinite"/>
                </circle>
            </svg>
            {/* <span className="text-sm self-end mb-1">{props.timeStamp}</span> */}
            <span className="ml-4 pl-4 transform -translate-y-1/2">Longitude : {props.longitude} Latitude : {props.latitude}</span>
        </div>
    );
}

export default location;