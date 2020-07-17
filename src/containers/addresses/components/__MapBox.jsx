import React,{useEffect,useState} from "react";
import dynamic from "next/dynamic";
const MapWithNoSSR = dynamic(() => import("../../../components/map/Map"), {
  ssr: true,
});

function MapBox() {
    const [mapViewPort, setMapViewPort] = useState({
        lat: 36.30937713898048,
        lng: 59.55333182102399,
        zoom: 6,
      });
      const chanePositon = data =>{
        console.log("positions: ",data)
      }
  return (
    <div>
      <MapWithNoSSR mapViewPort={mapViewPort} mark={mapViewPort} changePostion={chanePositon} />
    </div>
  );
}

export default MapBox;
