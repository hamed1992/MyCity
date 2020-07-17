import { useState, useEffect } from "react";
import BreadCrumb from "./../../components/breadcrumb/BreadCrumb";
import AddressItem from "./components/AddressItem";
import Link from "next/link";
import { createRipples } from "react-ripples";
import { motion } from "framer-motion";
import { stagger } from "./../../utility/utils";
import silverAge from "./../../services/Api";
import SweetAlert from "react-bootstrap-sweetalert";
import map from "lodash/map";
import Router from 'next/router'
import CircleProgressBar from "../../components/layout/CircleProgressBar";

const MyRipples = createRipples({
  color: "#31bcd8",
  during: 1800,
});

function Addresses({ addresses, error }) {
  const [showAlert, setShowAlert] = useState(error.has_error ? true : false);

  const [addressesList, setAddressesList] = useState(addresses);
  const [edittedItem, setEdittedItem] = useState({});
  const [showEdittedItem, setShowEdittedItem] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [show_loading, setShow_loading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    address: "",
    error: "",
    toas_msg: "",
    hasError: false,
    showAlert: false,
    showRemoveAlert:false
  });

  useEffect(() => {
    setShowAlert(error.has_error ? true : false);
    return () => {};
  }, [error]);
  const onConfirm = () => {
    setShowAlert(false);
    Router.push("/");
  };
  const onConfirmRemove = () => {
    
    deleteAddresses()
  };
  const onCancel = () => {};
  const handleDelete = id => {
    setValues({
      ...values,
      id,
      showRemoveAlert: true,
    });
  }
  const handleEdit = data => {
    setShowAddressModal(true);
    setValues({
      ...values,
      name: data.title,
      id:data.id,
      address: data.address,
      lat: data.lat,
      lng: data.lng,
    });
  };
  const closeAddressModal = () => {
    if (values.name.trim() === "" || values.address.trim() === "") {
      setValues({ ...values, error: "لطفا تمام مقادیر را وارد نمایید" });
    } else {
      setValues({ ...values, error: "" });
      editAddress();
    }
    setShowAddressModal(false);
  };
  const editAddress = () => {
    const { name, address, lat, lng ,id } = values;
    setShow_loading(true)
    silverAge
      .editAddress(name, address, lat, lng , id)
      .then((res) => {
        console.log("response", res);
        
        getAddresses()
      })
      .catch((err) => {
        console.log("err", err);
        setValues({
          ...values,
          name: "",
          address: "",
          toas_msg: "با خطا مواجه شد ُ‌لطفا مجدد تلاش نمایید",
          hasError: true,
          showAlert: true,
        });
        setShowAddressModal(false);
        setShow_loading(false)
      });
  };
  const getAddresses = () => {
    silverAge
      .getAddresses()
      .then((res) => {
        setAddressesList(res.results.addresses)
        setShowAddressModal(false);
        setShow_loading(false)
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const deleteAddresses = () => {
    silverAge
      .deleteAddress(values.id)
      .then((res) => {
        setValues({
          ...values,
          showRemoveAlert: false,
        });
        getAddresses();
      })
      .catch((err) => {
        console.log("err", err);
        setValues({
          ...values,
          showRemoveAlert: false,
        });
      });
  };

  const onCancelRemove = ()=>{
    setValues({...values,showRemoveAlert:false,id:null})
  }
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
    >
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
      <div className="alert-pan">
        {values.showRemoveAlert ? (
          <SweetAlert
            warning
            showCancel
            confirmBtnText="بله"
            confirmBtnBsStyle="danger"
            cancelBtnText="خیر"
            cancelBtnBsStyle="default"
            title={"آیا از حدف این آدرس مطمین هستید؟"}
            onConfirm={onConfirmRemove}
            onCancel={onCancelRemove}
            focusCancelBtn
          >
          </SweetAlert>
        ) : null}
      </div>
      <div className="pt-16 h-full">
        <BreadCrumb paths="مدیریت آدرسها" />

        <motion.div variants={stagger} className="xs:px-4 md:px-2">
          <div
            className="top-warning border rounded-md p-4 flex items-center leading-5 text-sm text-gray-800 mb-2"
            style={{ borderColor: "#69d2e7" }}
          >
            <i
              className="fal fa-info-square text-white text-lg ml-4"
              style={{ color: "#69d2e7" }}
            ></i>
            شما می توانید آدرس های خود را ویرایش یا حذف کنید و یا آدرس جدید
            اضافه کنید
          </div>
          {map(addressesList, (address) => {
            return (
              <AddressItem
                key={address.id}
                address={address}
                Edit={handleEdit}
                Delete={handleDelete}
              />
            );
          })}
        </motion.div>
        <Link href="/add_address">
          <MyRipples
            className=" my-2 xs:w-18 xs:h-18 md:w-12 md:h-12 shadow-lg  overflow-hidden rounded-full fixed add-address-btn"
            style={{ top: 10, left: 10, position: "fixed!important" }}
          >
            <button
              className="btn xs:w-18 xs:h-18 md:w-12 md:h-12  text-center text-white items-center rounded-md overflow-hidden"
              // type="submit"
            >
              <span
                className="xs:w-16 xs:h-16 md:w-full md:h-full flex justify-center items-center"
                style={{ background: "#69d2e7" }}
              >
                <i className="far fa-plus text-white xs:text-lg md:text-md"></i>
              </span>
            </button>
          </MyRipples>
        </Link>
        <div className="add-address-modal ">
          <div className="address-body"></div>
        </div>
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
                ویرایش این آدرس
                <CircleProgressBar is_show={show_loading}/>
              </button>
            </MyRipples>
          </div>
        </div>
      )}
    </motion.div>
  );
}
Addresses.getInitialProps = async (ctx) => {
  let addresses,
    error = {};
  const data = await silverAge
    .getDataInServer(`users/addresses`)
    .then((res) => {
      console.log("object", res);
      res.success === 0
        ? (error = { has_error: true, error_msg: res.user_message })
        : (addresses = res.results.addresses);
    });
  return { addresses, error };
};
export default Addresses;
