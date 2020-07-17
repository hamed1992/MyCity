import {useEffect, useState} from "react";
import HistoryItem from "./components/HistoryItem";
import Router from "next/router";
import BreadCrumb from "./../../components/breadcrumb/BreadCrumb";
import { motion } from "framer-motion";
import { stagger } from "./../../utility/utils";
import silverAge from "./../../services/Api";
import SweetAlert from "react-bootstrap-sweetalert";
import map from 'lodash/map'
function History({ error, orders },props) {
  const [showAlert , setShowAlert] = useState(error.has_error ? true : false)
  useEffect(() => {
    setShowAlert(error.has_error ? true : false)
  }, [error])
  const onConfirm = () => {
    setShowAlert(false)
    Router.push("/")
  };
  const onCancel = () => {};
  return (
    <motion.div  initial="initial" animate="animate" exit="exit" className="pt-16">
      <BreadCrumb paths="تاریخچه سفارشات" />
      <div className="alert-pan">
      {showAlert ? (
        <SweetAlert
          error
          title={error.error_msg}
          onConfirm={onConfirm}
          confirmBtnText="تایید"
          confirmBtnBsStyle="info"
          onCancel={onCancel}
        >
          
        </SweetAlert>
      ) : null}
      </div>
      <motion.div
        variants={stagger}
      >
        <div className="xs:px-1 md:px-4">
          {map(orders , order=>{
            return (
              <HistoryItem key={order.id}  order={order} />
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

History.getInitialProps = async (ctx) => {
  var orders = [];
  let error = {};
  const data = await silverAge
    .PostDataInServer("shop/orders/list", {})
    .then((res) => {
      console.log("hamed", res);
      res.success === 0
        ? (error = { has_error: true, error_msg: res.user_message })
        : (orders = res.results.orders.data);
    });
  return { orders: orders, error };
};

export default History;
