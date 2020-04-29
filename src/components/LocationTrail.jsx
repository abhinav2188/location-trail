import React from 'react';
import Location from "./location";


const LocationTrail = (props) => {
    return(
        <div className="md:p-8 p-4">
          {props.coordinates.reverse(-1).map( (coordinate,index) => (
            <Location key={index} latitude={coordinate.latitude} longitude={coordinate.longitude} timeStamp={coordinate.timeStamp} />
          ))}
        </div>
    );
}

export default LocationTrail;