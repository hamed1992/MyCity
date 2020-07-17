import React, { useState, createRef } from "react";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  MapControl,
  withLeaflet,
} from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

export default MyMap = ({ mapViewPort }) => {
  const [map, setMap] = useState(mapViewPort);

  refmarker = createRef(this.state.marker);

  toggleDraggable = () => {
    this.setState({ draggable: !this.state.draggable });
  };

  updateMarker = (e) => {
    // const marker = e.marker;
    this.setState({
      marker: e.marker.getLatLng(),
    });
  };

  updatePosition = () => {
    const marker = this.refmarker.current;
    if (marker != null) {
      this.setState({
        marker: marker.leafletElement.getLatLng(),
      });
    }
  };

  const onViewportChanged = ()=>{
    
  }
  const position = [map.lat, map.lng];
  return (
    <div className="map-root">
      <Map
        animate={true}
        center={position}
        zoomControl={false}
        scrollWheelZoom={false}
        onViewportChanged={onViewportChanged}
        viewport={mapViewport}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://google.com">tourgram</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker
                                                        position={position}

                                                    >
                                                    </Marker> */}
        <ZoomControl position="topleft" />
      </Map>
      <style jsx>
        {`
          .map-root {
            height: 100%;
          }
          .leaflet-container {
            height: 100% !important;
            width: 100%;
            margin: 0 auto;
          }
        `}
      </style>
    </div>
  );
};
