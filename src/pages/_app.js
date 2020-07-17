import "./../assets/css/style.css";
import "./../../public/assets/css/global.css"
import {useEffect } from 'react'
import Router from 'next/router'
import Layout from "../components/layout/Layout";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import silverAge from './../services/Api'
import NProgress from 'nprogress';


Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())

function App({ Component, pageProps, router }) {
  useEffect(() => {
    const token = Cookies.get('token');
    silverAge.setHeaderForAxios(token);
    }, [])
  return (
    <Layout>
      <Head>
      {/* <link href="./assets/css/nprogress.css" rel="stylesheet" />
          <link href="./assets/css/DatePicker.css" rel="stylesheet" />
          <link href="./assets/css/all.css" rel="stylesheet" />
          <link href="./assets/css/fontawesome.min.css" rel="stylesheet" />
          <link href="./assets/css/style.css" rel="stylesheet" /> */}
      </Head>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </Layout>
  );
}
export default App;
