import { useEffect, useState } from "react";
import BreadCrumb from "./../../components/breadcrumb/BreadCrumb";
import { useNumberSeprator } from "./../../hooks";
import { fadeInUp } from "./../../utility/utils";
import { motion } from "framer-motion";
import { createRipples } from "react-ripples";
import silverAge from "./../../services/Api";
import SweetAlert from "react-bootstrap-sweetalert";
import Router from "next/router";

const MyRipples = createRipples({
  color: "#31bcd8",
  during: 1800,
});
const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
function HistoryDetail({ order, factor, error }) {
  const [showAlert, setShowAlert] = useState(error.has_error ? true : false);
  useEffect(() => {
    setShowAlert(error.has_error ? true : false);
  }, [error]);
  const onConfirm = () => {
    setShowAlert(false);
    Router.push("/");
  };
  const onCancel = () => {};

  return (
    <div className="pt-16">
      <BreadCrumb paths="جزییات سفارش" />
      <div className="alert-pan">
        {showAlert ? (
          <SweetAlert
            error
            title={error.error_msg}
            onConfirm={onConfirm}
            confirmBtnText="تایید"
            confirmBtnBsStyle="info"
            onCancel={onCancel}
          ></SweetAlert>
        ) : null}
      </div>
      <motion.div initial="initial" animate="animate" exit="exit">
        <motion.div variants={stagger} className="p-2">
          <div
            className="p-2 rounded-md rounded-b-none flex justify-center items-center"
            style={{ background: "#69d2e7" }}
          >
            <i className="fal fa-check-square text-white ml-2"></i>
            <span className="text-white text-sm">کد سفارش:</span>
            <span className="mr-auto text-white text-sm">
              {order?.tracking_code}
            </span>
          </div>
          <motion.div
            variants={stagger}
            className="p-2 bg-gray-200 rounded-md rounded-t-none shadow-md pt-4"
          >
            <div className="flex pb-4 border-b border-gray-500 ">
              <motion.img
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ easing: [0.6, -0.05, 0.01, 0.99], duration: 0.4 }}
                className="xs:w-16 xs:h-16 md:w-24 md:h-24 rounded-md rounded-bl-none ml-4"
                src="/../assets/images/1.jpeg"
                alt="#"
              />

              <div className="flex-grow">
                <motion.h1
                  variants={fadeInUp}
                  className="text-gray-900 text-md font-bold"
                >
                  {order?.order_details[0]?.product.name}
                </motion.h1>
                <motion.div
                  variants={fadeInUp}
                  className="flex justify-between md:mt-4 xs:md2"
                >
                  <span className="text-sm text-orange-500">
                    {order?.order_status?.title}
                  </span>
                </motion.div>
              </div>
            </div>
            <div className="grid grid-cols-2 xs:gap-2 md:gap-4 my-4">
              <motion.div variants={fadeInUp} className="flex flex-col mb-4">
                <span className="text-sm text-gray-600 mb-2">تاریخ تحویل:</span>
                <span className="text-sm text-gray-900">
                  {order?.delivery_date}
                </span>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex flex-col">
                <span className="text-sm text-gray-600 mb-2">ساعت تحویل:</span>
                <span className="text-sm text-gray-900">
                  {order?.delivery_hour}
                </span>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex flex-col">
                <span className="text-sm text-gray-600 mb-2">تاریخ سفارش:</span>
                <span className="text-sm text-gray-900">
                  {order?.created_at}
                </span>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex flex-col">
                <span className="text-sm text-gray-600 mb-2">
                  مبلغ قابل پرداخت:
                </span>
                <span className="text-sm text-gray-900">
                  {useNumberSeprator(order?.payable_price)} تومان{" "}
                </span>
              </motion.div>
            </div>
            {/* <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ easing: [0.6, -0.05, 0.01, 0.99], duration: 0.4 }}
            >
              <MyRipples className="block w-full my-2">
                <button
                  className="btn w-full teal-btn text-center text-white items-center p-2 rounded-md"
                  // type="submit"
                  // onClick={updateProfile}
                >
                  اسکن بارکد
                </button>
              </MyRipples>
            </motion.div> */}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
HistoryDetail.getInitialProps = async (ctx) => {
  let order,
    factor,
    error = {};
  const data = await silverAge
    .getDataInServer(`shop/orders/${ctx.query.id ? ctx.query.id : 1}/view`)
    .then((res) => {
      res.success === 0
        ? (error = { has_error: true, error_msg: res.user_message })
        : ((order = res.results.order), (factor = res.results.factor_details));
    });
  return { order, factor, error };
};
export default HistoryDetail;
