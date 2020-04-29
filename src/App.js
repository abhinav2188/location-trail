import React,{useState} from 'react';
import Location from "./components/location";
import earth from "./svgs/worldwide (1).svg";
var intervalID;

function App() {
  const [coordinates,setCoordinates] = useState([]);
  const[msg,setMsg] = useState("");
  const[locationEnabled, setLocationEnabled] = useState(false);
 
  function getLocation(position) {
    console.log("location");
    
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition( position => {
        setLocationEnabled(true);
        setCoordinates( prevState => ([
          ...prevState, {
          latitude : position.coords.latitude,
          longitude : position.coords.longitude,
          timeStamp : new Date(position.timestamp).toLocaleString()
        }]));  
      } , error => {
        setLocationEnabled(false);
        if(error.PERMISSION_DENIED){
          setMsg("location permission denied");
        }else if(error.POSITION_UNAVAILABLE){
          setMsg("location unavailable");
        }else if(error.TIMEOUT){
          setMsg("location request timeout");
        }else{
          setMsg(error.message);
        }
      })
    }else{
      setMsg("Geolocation is not supported by this browser.");
    }
    }
  
  function startLocationTrail(){
    getLocation();
    intervalID = setInterval(() => {
      getLocation(); 
      console.log("loc")
    },10000);
  }
  function stopLocationTrail(){
    setLocationEnabled(false);
    console.log(intervalID);
    clearInterval(intervalID);
  }

   return (
    <div className="p-4 ">
      <img className={`w-6 ml-auto ${locationEnabled ? "opacity-100" : "opacity-25"}`} src={earth} alt=""/>
      <div className="md:w-1/2 mx-auto">
        <h2 className="text-lg text-center font-bold my-4 px-4">
          <p className="my-2">A simple location trailing app to get your current location trail. Click on the
          <button className="bg-green-400 rounded shadow-sm mx-1 font-bold px-1" onClick={startLocationTrail}>start</button> 
          button and enable geolocation to start your location trail.</p>
          <p className="my-2">to stop location trail click
          <button onClick={stopLocationTrail} className={`px-1 rounded shadow-sm mx-1 font-bold ${locationEnabled ? " bg-red-500" : "bg-gray-400"}`} disabled={!locationEnabled}>stop</button>
          </p>
        </h2>
        <div className="md:p-8 p-4">
          {coordinates.reverse(-1).map( (coordinate,index) => (
            <Location key={index} latitude={coordinate.latitude} longitude={coordinate.longitude} timeStamp={coordinate.timeStamp} />
          ))}
          <p>{msg}</p>
        </div>

      </div>
    </div>
  );
}

export default App;
