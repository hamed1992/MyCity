import React, { Component, createRef } from 'react';
import { Map, TileLayer, Marker, Popup, MapControl, withLeaflet } from 'react-leaflet';

export default class MyMap extends Component {
  state = {
    center: {
      lat: 31.698956,
      lng: 76.732407,
    },
    marker: {
      lat: 31.698956,
      lng: 76.732407,
    },
    zoom: 13,
    draggable: true,
  }

  refmarker = createRef(this.state.marker)

  toggleDraggable = () => {
    this.setState({ draggable: !this.state.draggable });
  }

  updateMarker = (e) => {
    // const marker = e.marker;
    this.setState({
      marker: e.marker.getLatLng(),
    });
    console.log(e.marker.getLatLng());
  }

  
onViewportChanged = viewport => {
    const { center } = viewport;
    this.props.changePostion(marker.leafletElement.getLatLng())
    console.log("hamed")
    console.log(viewport);
  };

  render() {
    const position = [this.props.mapViewPort.lat, this.props.mapViewPort.lng];
    const markerPosition = [this.props.mark.lat, this.props.mark.lng];

    return (
      <div className="map-root">
        <Map center={position} zoom={this.state.zoom} style={{
                        height:"700px"
                    }}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            draggable={true}
            // onDragend={this.updatePosition}
            onViewportChanged={this.onViewportChanged}
            position={markerPosition}
            animate={true}
            ref={this.refmarker}>
            <Popup minWidth={90}>
              <span onClick={this.toggleDraggable}>
                {this.state.draggable ? 'DRAG MARKER' : 'MARKER FIXED'}
              </span>
            </Popup>
          </Marker>
        </Map>
        <style jsx>{`
                .map-root {
                  height: 100%;
                }
                .leaflet-container {
                 height: 400px !important;
                 width: 80%;
                 margin: 0 auto;
               }
           `}
        </style>
      </div>
    );
  }
}