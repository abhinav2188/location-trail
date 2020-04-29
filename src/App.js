import React,{useState} from 'react';
import LocationTrail from "./components/LocationTrail";
import earth from "./svgs/worldwide (1).svg";
import Alert from "./components/UI/alert";
import Map from "./components/map";

var intervalID;

function App() {
  const [coordinates,setCoordinates] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({
    lat:"",
    lon:""
  })
  const[msg,setMsg] = useState("");
  const[locationEnabled, setLocationEnabled] = useState(false);
  const[locationFilter,setLocationFilter] = useState({
    timeFrame : 1000,
  });

  const onFilterChange = (event) => {
    let name = event.target.name;
    let value = event.target.value * 1000;
    setLocationFilter( prevState => ({...prevState , [name] : value }));
  }

 
  function getLocation() {
    console.log("location");
    
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition( position => {
        setLocationEnabled(true);
        setCurrentPosition({
          lat:position.coords.latitude,
          lon:position.coords.longitude
        });
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
          setMsg("unknown error occured! try again later");
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
    },locationFilter.timeFrame);
  }
  function stopLocationTrail(){
    setLocationEnabled(false);
    console.log(intervalID);
    clearInterval(intervalID);
  }
   return (

    <div className="bg-purple-800 h-screen py-4 px-2">
    <Alert show={msg!==""} type="failure" close={() => setMsg("")}>{msg}</Alert>
    <div className="bg-white md:p-4 p-2 md:w-2/3 mx-auto md:text-base text-sm h-full flex md:flex-row flex-col rounded shadow-lg">

      {/* introductory part, control functions */}
      <div className="font-bold md:my-0 my-4 px-4 md:w-1/2">
        <h2 className="my-2 text-2xl flex items-center">Get your Location Trail 
        <img className={`md:w-8 w-6 inline-block mx-2 transtion-all duration-100 ${locationEnabled ? "opacity-100" : "opacity-25"}`} src={earth} alt=""/>
        </h2> 
        <p>Step 1 : Select time frame 
        {
        !locationEnabled && 
        <select className="border px-2 rounded focus:outline-none mx-1" name="timeFrame" onChange={onFilterChange}>
          <option value="1">1s</option>
          <option value="5">5s</option>
          <option value="30">30s</option>
          <option value="60">1m</option>
        </select>
        }
        </p>
        <p>Step 2: Click 
        <button className={`px-1 rounded shadow-sm mx-1 font-bold ${!locationEnabled ? " bg-green-400" : "bg-gray-400"}`} onClick={startLocationTrail}>start</button> 
        </p>
        <p>Step 3: Enable geolocation </p>
        <p className="text-purple-500">Make sure to turn on your location to get promt in mobile devices</p>
        <p className="my-2">To stop location trail click
        <button onClick={stopLocationTrail} className={`px-1 rounded shadow-sm mx-1 font-bold ${locationEnabled ? " bg-red-500" : "bg-gray-400"}`} disabled={!locationEnabled}>stop</button>
        </p>
        <p className="my-2">To clear location trail click
        <button onClick={() => setCoordinates([])} className={`px-1 rounded shadow-sm mx-1 font-bold ${coordinates.length!==0 ? " bg-yellow-500" : "bg-gray-400"}`} >clear</button>
        </p>
        <div className="mt-4">
          <Map position={currentPosition}/>
        </div>

      </div>
        {/* Location trail */}
      <div className="md:w-1/2 flex-grow overflow-y-scroll py-2">
      <LocationTrail coordinates={coordinates} />
      </div>
    </div>

    </div>
  );
}

export default App;
