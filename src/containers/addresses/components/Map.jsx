import React, { useState, useEffect } from "react";
import Router from "next/router";
import Head from "next/head";
import { createRipples } from "react-ripples";
import silverAge from "./../../../services/Api";
import SweetAlert from "react-bootstrap-sweetalert";
import CircleProgressBar from "../../../components/layout/CircleProgressBar";
import { Map, TileLayer, Marker, Viewport, ZoomControl } from "react-leaflet";

import { map_token } from "./../../../constants";
// import ReactMapGL  from 'react-map-gl'

const MyRipples = createRipples({
  color: "#31bcd8",
  during: 1800,
});

function MapBox() {
  const [mapViewPort, setMapViewPort] = useState({
    width: "100%",
    height: "100vh",
    lat: 36.30937713898048,
    lng: 59.55333182102399,
    zoom: 12,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [show_loading, setShow_loading] = useState(false);

  const [values, setValues] = useState({
    name: "",
    address: "",
    error: "",
    toas_msg: "",
    hasError: false,
    showAlert: false,
  });
  const [showAddressModal, setShowAddressModal] = useState(false);
  const position = [mapViewPort.lat, mapViewPort.lng];

  const onViewportChanged = (viewport) => {
    console.log("hamed", viewport);
    setMapViewPort({
      ...mapViewPort,
      lat: viewport.center[0],
      lng: viewport.center[1],
      zoom:viewport.zoom
    });
  };
  const nextStep = () => setShowAddressModal(true);
  const closeAddressModal = () => {
    if (values.name.trim() === "" || values.address.trim() === "") {
      setValues({ ...values, error: "لطفا تمام مقادیر را وارد نمایید" });
    } else {
      setValues({ ...values, error: "" });
      saveAddress();
    }
  };
  const onConfirm = () => {
    setValues({
      ...values,
      showAlert: false,
    });
    Router.push("/");
  };
  const onCancel = () => {};
  const saveAddress = () => {
    setShow_loading(true);
    const { name, address } = values;
    const { lat, lng } = mapViewPort;

    silverAge
      .saveAddress(name, address, lat, lng)
      .then((res) => {
        console.log("response", res);
        setValues({
          ...values,
          name: "",
          address: "",
          toas_msg: "با موفقیت ذخیره شد",
          hasError: false,
          showAlert: true,
        });
        setShowAddressModal(false);
        setShow_loading(false);
        Router.push("/");
      })
      .catch((err) => {
        setShow_loading(false);
        console.log("err", err);
        setValues({
          ...values,
          name: "",
          address: "",
          toas_msg: "با خطا مواجه شد ‌لطفا مجدد تلاش نمایید",
          hasError: true,
          showAlert: true,
        });
        setShowAddressModal(false);
      });
  };

  return (
    <div className="relative  h-screen">
      <Head>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
    crossorigin="" />
      </Head>

      <div className="alert-pan">
        {values.showAlert ? (
          values.hasError ? (
            <SweetAlert
              error
              title={values.toas_msg}
              onConfirm={onConfirm}
              confirmBtnText="تایید"
              confirmBtnBsStyle="info"
              onCancel={onCancel}
            ></SweetAlert>
          ) : (
            <SweetAlert
              success
              title={values.toas_msg}
              onConfirm={onConfirm}
              confirmBtnText="تایید"
              confirmBtnBsStyle="info"
              onCancel={onCancel}
            ></SweetAlert>
          )
        ) : null}
      </div>
      <Head>
        <link rel="stylesheet" href="/assets/css/style.css" />
      </Head>
      <span
        onClick={() => Router.back()}
        className="close-map rounded-full bg-white shadow-lg absolute flex justify-center items-center"
      >
        <i className="fal fa-times text-gray-800"></i>
      </span>
      <Map
      className="h-screen"
        animate={true}
        center={position}
        zoomControl={false}
        scrollWheelZoom={false}
        onViewportChanged={onViewportChanged}
        viewport={mapViewPort}
        zoom={6}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://google.com">tourgram</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topleft" />
      </Map>
      {/* </Map> */}
      {/* <Map center={position} onViewportChanged={onViewportChanged}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Map> */}

      <div className="map-mark absolute">
        <i className="fas fa-map-marker-alt"></i>
      </div>
      <div className="p-2 bg-white map-confirm absolute bottom-0 right-0">
        <MyRipples className="w-full">
          <button
            className="btn w-full teal-btn text-center text-white items-center p-4 rounded-md"
            onClick={nextStep}
          >
            تایید
          </button>
        </MyRipples>
      </div>
      {showAddressModal && (
        <div className="address-modal absolute w-full h-full top-0 right-0 flex justify-center items-center">
          <div
            className="modal-overlay"
            onClick={() => setShowAddressModal(false)}
          ></div>
          <div className="address-modal-body bg-white flex flex-col pt-4">
            <h3 className="title text-lg text-gray-900 p-2 text-center mb-4">
              مشخصات آدرس را وارد نمایید
            </h3>
            <div className="px-4 flex flex-col mb-4 ">
              <span className="text-gray-900 text-md mb-2 text-center">
                نام این آدرس
              </span>
              <input
                className="border-b border-gray-200 p-2 text-md rtl focus:border-teal-500 text-gray-800"
                type="text"
                placeholder="مثل خانه , شرکت و ..."
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
            </div>
            <div className="px-4 flex flex-col ">
              <span className="text-gray-900 text-md mb-2 text-center">
                جزییات آدرس
              </span>
              <input
                className="border-b border-gray-200 p-2 text-md rtl focus:border-teal-500 text-gray-800"
                type="text"
                placeholder="مثل خیابان , کوچه , پلاک و ..."
                value={values.address}
                onChange={(e) =>
                  setValues({ ...values, address: e.target.value })
                }
              />
            </div>
            <span className="error-msg text-red-500 text-xs block text-center mt-4 px-6">
              {values.error}
            </span>
            <MyRipples className="w-full mt-auto">
              <button
                className="btn w-full teal-btn text-center text-white items-center p-4"
                onClick={closeAddressModal}
              >
                اضافه کردن این آدرس
                <CircleProgressBar is_show={show_loading} />
              </button>
            </MyRipples>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapBox;
