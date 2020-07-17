import { useState, useEffect } from "react";
import Breadcrumb from "./../../components/breadcrumb/BreadCrumb";
import { animationVariant } from "./../../utility/utils";
import { motion } from "framer-motion";
import SliderComponents from "../../components/slider/SliderComponents";
import { useForm, useNumberSeprator } from "./../../hooks";
import Link from "next/link";
import { Calendar } from "react-modern-calendar-datepicker";
import { createRipples } from "react-ripples";
import { useRouter } from "next/router";
import silverAge from "./../../services/Api";
import { ToastContainer, toast } from "react-toastify";
import Head from "next/head";
import moment from "jalali-moment";
import { fadeInUp } from "./../../utility/utils";
import map from "lodash/map";
import CircleProgressBar from "./../../components/layout/CircleProgressBar";
const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const MyRipples = createRipples({
  color: "#31bcd8",
  during: 1800,
});
function ProductDetail({ product, user, addresses }) {
  const [values, handleChange] = useForm({
    name: user?.first_name,
    lastName: user?.last_name,
    mobile: user?.mobile,
    addresse: [],
  });
  // const

  const [daysArea, setDaysArea] = useState({
    minimumDate: {
      year: 1399,
      month: 4,
      day: 25,
    },
    maximumDate: {
      year: 1399,
      month: 4,
      day: 25,
    },
  });
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  });
  const [orderCounts, setOrderCount] = useState({
    maxCount: product?.order_no?.to,
    minCount: product?.order_no?.from,
  });
  const [addressItem, setAddressItem] = useState(
    addresses.length > 0 ? addresses[0].id : "0"
  );
  const [registerItem, setRegisterItem] = useState({
    code: "",
    delivery_date: "",
    delivery_hour: "",
    cover: product.cover,
    name: product.name,
    countpack: "",
  });
  const [hourItem, setHourItem] = useState(
    `${product.delivery_hours.morning.from}- ${product.delivery_hours.morning.to}`
  );
  useEffect(() => {
    let m = moment().locale("fa");
    console.log("hamed", m.format("YYYY/MM/DD"));
    moment.locale("fa");
    setDaysArea({
      ...daysArea,
      minimumDate: {
        year: +m.format("YYYY"),
        month: +m.format("MM"),
        day: +m.format("DD"),
      },
      maximumDate: {
        year: +m.format("YYYY"),
        month: +m.format("MM"),
        day: +m.format("DD") + product.delivery_dates.to,
      },
    });
    // setSelectedDayRange({
    //   ...selectedDayRange,
    //   from: product.delivery_dates ? product.delivery_dates.from : null,
    //   to: product.delivery_dates ? product.delivery_dates.to : null,
    // });
  }, []);
  const [loadings, setLoadings] = useState({
    show_loading: false,
    fetch_loading: false,
    show_register: false,
  });
  const [count, setCount] = useState(
    product?.order_no?.from ? product.order_no.from : 0
  );

  const [data, setData] = useState({
    address: "",
    openCalendar: false,
    time: "",
  });
  const [showAddress, setShowAddress] = useState(false);
  let easing = [0.175, 0.85, 0.42, 0.96];

  const handleCalendar = () => {
    setData({ ...data, openCalendar: true });
  };
  const closeCalendarModal = () => {
    setData({ ...data, openCalendar: false });
  };

  const handleChangeCount = (operation) => {
    switch (operation) {
      case "add":
        setCount((prev) => (prev < orderCounts.maxCount ? prev + 1 : prev));
        break;
      case "minus":
        setCount((prev) =>
          prev > orderCounts.minCount ? prev - 1 : orderCounts.minCount
        );
        break;

      default:
        break;
    }
  };
  const handleChangeAddress = (e) => {
    setAddressItem(e.target.value);
  };
  const handleHourChange = (e) => {
    setHourItem(e.target.value);
  };
  const registerOrder = () => {
    if (selectedDayRange.from === null || selectedDayRange.from === "") {
      toast.error("لطفا تمامی مقادیر را وارد نمایید", {
        position: toast.POSITION.TOP_LEFT,
      });
    } else {
      setLoadings({
        ...loadings,
        fetch_loading: true,
        show_loading: true,
      });
      regirerOrderApi();
    }
  };
  const regirerOrderApi = () => {
    // const date =selectedDayRange.to ?  `از ${selectedDayRange.from.day}/${selectedDayRange.from.month}/${selectedDayRange.from.year} تا ${selectedDayRange?.to?.day}/${selectedDayRange?.to?.month}/${selectedDayRange.to?.year}`
    // :  `${selectedDayRange.from.day}/${selectedDayRange.from.month}/${selectedDayRange.from.year}`
    const date = `${selectedDayRange.from.day}/${selectedDayRange.from.month}/${selectedDayRange.from.year}`;

    silverAge
      .registerOrder(product.id, count, addressItem, date, hourItem)
      .then((res) => {
        // console.log("response", res);
        console.log("response", res.results.order);
        console.log("response", res.results.order.delivery_date);
        console.log("response", res.results.order.delivery_hour);

        if (res.success === 0) {
          toast.error(res.user_message, {
            position: toast.POSITION.TOP_LEFT,
          });
          setLoadings({
            ...loadings,
            show_loading: false,
            show_register: false,
          });
          
        } else {
          setLoadings({
            ...loadings,
            show_loading: false,
            fetch_loading: true,
            show_register: true,
          });
          setRegisterItem({
            ...registerItem,
            countpack:count,
            delivery_hour:hourItem,
            delivery_date: `${selectedDayRange.from.day}/${selectedDayRange.from.month}/${selectedDayRange.from.year}`,
            code: res.results.order.tracking_code,
          });
        }
      })
      .catch((err) => {
        console.log("object",err)
      });
  };

  return (
    <div className="pt-16">
      <Head>
        <link href="./../../assets/css/ReactToastify.css" rel="stylesheet" />
      </Head>
      <Breadcrumb paths="جزییات محصول" />
      <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={animationVariant}
      >
        <SliderComponents images={product ? product.images : []} />
        <div className="xs:p-2 md:p-6 bg-white">
          <h1 className="text-gray-800 text-md">{product.name}</h1>
          <div className="flex justify-start items-center mt-2">
            <h3 className="ml-2 text-gray-700 text-sm font-800">
              {useNumberSeprator(product?.full_price?.sale_price)} ریال
            </h3>
            <span className="text-gray-600 text-xs">
              <i className="far fa-box-alt"></i> {product.existing_number}{" "}
              {product?.count_unit?.title}
            </span>
          </div>
          <div className="rounded-md p-2 relative  mb-4 w-full mt-2">
            <input
              className="w-full p-2 pb-1 pt-4 pr-10 has-fl bg-transparent focus:outline-none text-sm text-gray-800 with-border"
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              autoComplete="off"
              disabled={true}
            />
            <i
              className="fa fa-user absolute text-gray-600 text-sm"
              style={{ top: "17px", right: "10px", fontSize: "21px" }}
            ></i>
            <span
              className={`border-animation ${
                values.name?.trim() !== "" ? "active" : ""
              }`}
            ></span>
            <span
              className={`float-label text-sm text-gray-700 ${
                values.name?.trim() !== "" ? "active" : ""
              }`}
            >
              نام
            </span>
          </div>

          <div className="rounded-md p-2 relative  mb-4 w-full mt-4">
            <input
              className="w-full  p-2 pb-1 pt-4 pr-10 has-fl bg-transparent focus:outline-none text-sm text-gray-800 with-border"
              type="text"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              autoComplete="off"
              disabled={true}
            />
            <i
              className="fa fa-users absolute text-gray-600 text-sm"
              style={{ top: "17px", right: "10px", fontSize: "21px" }}
            ></i>
            <span
              className={`border-animation ${
                values.lastName?.trim() !== "" ? "active" : ""
              }`}
            ></span>
            <span
              className={`float-label text-sm text-gray-700 ${
                values.lastName?.trim() !== "" ? "active" : ""
              }`}
            >
              نام خانوادگی
            </span>
          </div>
          <div className="rounded-md p-2 relative  mb-4 w-full mt-4">
            <input
              className="w-full  p-2 pb-1 pt-4 pr-10 has-fl bg-transparent focus:outline-none text-sm text-gray-800 with-border"
              type="text"
              name="mobile"
              value={values.mobile}
              onChange={handleChange}
              autoComplete="off"
              disabled={true}
            />
            <i
              className="fas fa-key absolute text-gray-600 text-sm"
              style={{ top: "17px", right: "10px", fontSize: "21px" }}
            ></i>
            <span
              className={`border-animation ${
                values.mobile?.trim() !== "" ? "active" : ""
              }`}
            ></span>
            <span
              className={`float-label text-sm text-gray-700 ${
                values.mobile?.trim() !== "" ? "active" : ""
              }`}
            >
              شماره همراه
            </span>
          </div>

          <div
            className="p-2 rounded-md flex justify-start items-center mb-4"
            style={{ background: "#69d2e7" }}
          >
            <i className="fal fa-info-square text-white text-md"></i>
            <span className="text-xs text-white mr-2">
              جهت ویرایش اطلاعات فوق از صفحه پروفایل اقدام نمایید
            </span>
          </div>
          <div className="relative">
            <span className="relative p-2 pr-8 border-b border-gray-400 block text-gray-800">
              <i
                className="fas fa-map-marker-alt absolute text-sm text-gray-600"
                style={{ top: "17px", right: "10px", fontSize: "21px" }}
              ></i>
              <select
                className="w-full py-2 px-1"
                value={addressItem}
                onChange={handleChangeAddress}
              >
                {map(addresses, (address, index) => {
                  return (
                    <option key={index} value={address.id} className="p-4">
                      {address.title}
                    </option>
                  );
                })}
              </select>
            </span>
            <i
              className="far fa-chevron-down p-2 hidden cursor-pointer text-sm text-gray-600 flex justify-cente items-center absolute"
              style={{ left: 0, top: 17 }}
            ></i>
            <div className="flex mb-4">
              <Link href="/addresses">
                <span className="mr-auto text-gray-700 text-xs mt-4 cursor-pointer">
                  مدیریت آدرس ها
                </span>
              </Link>
            </div>
          </div>

          <div className="rounded-md p-2 relative  w-full">
            <input
              className="w-full  p-2 pb-1 pt-4 pr-10 has-fl bg-transparent focus:outline-none text-sm text-gray-800 with-border"
              type="number"
              name="password"
              value={count}
              disabled={true}
              autoComplete="off"
            />
            <div
              className="btn-operations absolute left-0 text-lg text-gray-900"
              style={{ top: 13 }}
            >
              <i
                className="fal fa-plus-square p-2 cursor-pointer hover:text-red-400"
                onClick={() => handleChangeCount("add")}
              ></i>
              <i
                className="fal fa-minus-square p-2 cursor-pointer hover:text-red-400"
                onClick={() => handleChangeCount("minus")}
              ></i>
            </div>
            <i
              className="far fa-sort-amount-up absolute text-gray-600 text-sm"
              style={{ top: "17px", right: "10px", fontSize: "21px" }}
            ></i>
            <span
              className={`border-animation ${count >= 0 ? "active" : ""}`}
            ></span>
            <span
              className={`float-label text-sm text-gray-700 ${
                count >= 0 ? "active" : ""
              }`}
            >
              تعداد
            </span>
          </div>
          <span className="text-xs mt-2 text-red-500 block mb-4">
            حداکثر تعداد مجاز سفارش: {orderCounts.maxCount} عدد
          </span>
          <div>
            <div className="relative">
              <span
                onClick={handleCalendar}
                className="relative flex p-4 pr-10 border-b border-gray-400 block text-gray-800"
              >
                <i
                  className="far fa-calendar-alt absolute text-sm text-gray-600"
                  style={{ top: "17px", right: "10px", fontSize: "21px" }}
                ></i>
                تاریخ
                <span className="mr-auto">
                  {selectedDayRange.from && (
                    <span>
                      از
                      {` ${selectedDayRange.from.year}/${selectedDayRange.from.month}/${selectedDayRange.from.day} `}
                    </span>
                  )}
                  {selectedDayRange.to && (
                    <span>
                      تا
                      {` ${selectedDayRange.to.year}/${selectedDayRange.to.month}/${selectedDayRange.to.day}`}
                    </span>
                  )}
                </span>
              </span>
            </div>
          </div>
          <div className="relative">
            <span className="relative p-4 pr-8 border-b border-gray-400 block text-gray-800">
              <i
                className="fas fa-map-marker-alt absolute text-sm text-gray-600"
                style={{ top: "17px", right: "10px", fontSize: "21px" }}
              ></i>
              <select className="w-full py-2 px-1" onChange={handleHourChange}>
                <option
                  className="p-4"
                  value={`${product.delivery_hours.morning.from}- ${product.delivery_hours.morning.to}`}
                >
                  صبح از {product?.delivery_hours?.morning?.from}-{" "}
                  {product?.delivery_hours?.morning?.to}
                </option>
                <option
                  className="p-4"
                  value={`${product.delivery_hours.afternoon.from}- ${product.delivery_hours.afternoon.to}`}
                >
                  عصر از {product?.delivery_hours?.afternoon?.from}-{" "}
                  {product?.delivery_hours?.afternoon?.to}
                </option>
              </select>
            </span>
          </div>

          <div className="grid grid-cols-3 xs:gap-2 md:gap-4 my-4 text-center">
            <div className="flex flex-col mb-4">
              <span className="text-sm text-gray-600 mb-2">قیمت:</span>
              <span className="text-md text-green-700">
                {useNumberSeprator(product.full_price?.sale_price)} تومان
              </span>
            </div>
            <div className="flex flex-col mb-4">
              <span className="text-sm text-gray-600 mb-2">هزینه پیک:</span>
              <span className="text-md text-green-700">
                {useNumberSeprator(product.delivery_fixed_cost)} تومان
              </span>
            </div>
            <div className="flex flex-col mb-4">
              <span className="text-sm text-gray-600 mb-2">قابل پرداخت:</span>
              <span className="text-md text-green-700">
                {useNumberSeprator(
                  +product?.full_price?.sale_price +
                    +product?.delivery_fixed_cost
                )}{" "}
                تومان
              </span>
            </div>
          </div>

          <MyRipples className="w-full">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={registerOrder}
              className="btn w-full teal-btn text-center text-white items-center p-4 rounded-md"
            >
              ثبت سفارش
            </motion.button>
          </MyRipples>
        </div>
      </motion.div>
      <div
        className={`clandar-modal absolute top-0 right-0 w-full h-full flex-col justify-center items-center ${
          data.openCalendar ? "show" : ""
        }`}
      >
        <Calendar
          value={selectedDayRange}
          onChange={setSelectedDayRange}
          shouldHighlightWeekends
          minimumDate={daysArea.minimumDate}
          maximumDate={daysArea.maximumDate}
          locale="fa"
        />
        <MyRipples className=" my-2 ">
          <button
            className="btn w-64 teal-btn text-center text-white items-center p-2 rounded-md"
            // type="submit"
            onClick={closeCalendarModal}
          >
            بستن
          </button>
        </MyRipples>
      </div>
      {loadings.fetch_loading && (
        <div
          className="loading-bar absolute top-0 right-0 z-10 w-full p-4 h-full flex justify-center items-center"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(2px)" }}
        >
          <CircleProgressBar is_show={loadings.show_loading} />
          {loadings.show_register && (
            <div
              className="order-detail p-4 bg-white rounded-md w-full"
              style={{ minHeight: "50vh" }}
            >
              <motion.div initial="initial" animate="animate" exit="exit">
                <div className="pt-4">
                  <div>
                    <div
                      className="p-2 rounded-md rounded-b-none flex justify-start items-center"
                      style={{ background: "#69d2e7" }}
                    >
                      <i className="fal fa-info-square text-white text-md"></i>
                      <span className="text-xs text-white mr-2">
                        درخواست شما با موفقیت ثبت شد
                      </span>
                      <span className="mr-auto text-xs text-white">
                        {registerItem.tracking_code}
                      </span>
                    </div>
                  </div>
                </div>
                <motion.div initial="initial" animate="animate" exit="exit">
                  <motion.div variants={stagger} className="pb-2 pt-0">
                    <motion.div
                      variants={stagger}
                      className="p-2 bg-gray-200 rounded-md rounded-t-none shadow-md pt-4"
                    >
                      <div className="flex pb-4 border-b border-gray-500 ">
                        <motion.img
                          initial={{ x: 60, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{
                            easing: [0.6, -0.05, 0.01, 0.99],
                            duration: 0.4,
                          }}
                          className="xs:w-16 xs:h-16 md:w-24 md:h-24 rounded-md rounded-bl-none ml-4"
                          src={registerItem.cover}
                          alt="#"
                        />

                        <div className="flex-grow">
                          <motion.h1
                            variants={fadeInUp}
                            className="text-gray-900 text-md font-bold"
                          >
                            {registerItem.name}
                          </motion.h1>
                          <motion.div
                            variants={fadeInUp}
                            className="flex justify-between md:mt-4 xs:md2"
                          >
                            <span className="text-sm text-orange-500">
                              {registerItem.countpack}
                            </span>
                          </motion.div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 xs:gap-2 md:gap-4 my-4">
                        <motion.div
                          variants={fadeInUp}
                          className="flex flex-col mb-4"
                        >
                          <span className="text-sm text-gray-600 mb-2">
                            تاریخ تحویل:
                          </span>
                          <span className="text-sm text-gray-900">
                            {registerItem.delivery_date}
                          </span>
                        </motion.div>
                        <motion.div
                          variants={fadeInUp}
                          className="flex flex-col"
                        >
                          <span className="text-sm text-gray-600 mb-2">
                            ساعت تحویل:
                          </span>
                          <span className="text-sm text-gray-900">
                            {registerItem.delivery_hour}
                          </span>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
                <Link href="/">
                  <a className="btn w-full block teal-btn flex-grow text-center text-white items-center p-2 rounded-md">
                    بازگشت به صفحه اصلی
                  </a>
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
ProductDetail.getInitialProps = async (ctx) => {
  let product,
    user,
    addresses = {};
  const Post_params = {
    id: ctx.query?.id,
  };
  await silverAge
    .PostDataInServer("shop/products/details", Post_params)
    .then((res) => {
      product = res.results.product;
    });
  await silverAge.getDataInServer("application/index").then((res) => {
    console.log("object", res);
    user = res.results.user;
  });
  await silverAge.getDataInServer("users/addresses").then((res) => {
    addresses = res.results.addresses;
  });
  return { product, user, addresses };
};

export default ProductDetail;
