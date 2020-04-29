import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup} from "react-leaflet";

const map = (props) => {
    const position = [props.position.lat,props.position.lon];
    const zoom = 13;
    return (
        <LeafletMap center={position} zoom={zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <Marker position={position}>
            <Popup>Your Current Location</Popup>
          </Marker>
        </LeafletMap>
    );
}

export default map;