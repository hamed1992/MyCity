import React, { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { animationVariant } from "./../../utility/utils";
// import Map from './components/Map'
const MapWithNoSSR = dynamic(() => import("./components/Map"), {
  ssr: false,
});
function AddAddress() {
  const [browser, setBrowser] = useState(false);
  var hamed = false;
  useEffect(() => {
    setBrowser(true);
    // hamed = true;
  }, []);
  
  return (
    <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={animationVariant}
      >
        
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossorigin=""
        />
      </Head>
      <div className="h-screen" style={{direction:"ltr"}}>
        <MapWithNoSSR />
      </div>
      </motion.div>
  );
}

export default AddAddress;
