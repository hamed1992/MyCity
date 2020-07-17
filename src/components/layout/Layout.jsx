import React, { Fragment } from "react";
import Head from "next/head";
function Layout({ children }) {
  return (
    <Fragment>
      <Head>
        <title>فروشگاه شهر من</title>
      </Head>
      <div className="max-w-xl mx-auto overflow-hidden relative h-screen shadow-xs lg:py-4">
        <div className="container-wrapper">{children}</div>
      </div>
    </Fragment>
  );
}

export default Layout;
