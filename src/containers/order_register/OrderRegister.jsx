import React from "react";
import BreadCrumb from "./../../components/breadcrumb/BreadCrumb";
import {motion} from 'framer-motion'
import { fadeInUp } from "./../../utility/utils";
const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
function OrderRegister() {
  return (
    <motion.div initial="initial" animate="animate" exit="exit">
      <div className="pt-16">
        <BreadCrumb paths={"نمایش اطلاعات"} />
        <div className="xs:px-2 md:px-6">
          <div
            className="p-2 rounded-md flex justify-start items-center mb-4"
            style={{ background: "#69d2e7" }}
          >
            <i className="fal fa-info-square text-white text-md"></i>
            <span className="text-xs text-white mr-2">
              درخواست شما با موفقیت ثبت شد
            </span>
            <span className="mr-auto text-xs text-white">2546845755</span>
          </div>
        </div>
      </div>
      <motion.div initial="initial" animate="animate" exit="exit">
        <motion.div variants={stagger} className="p-2">
          
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
                  کفش
                </motion.h1>
                <motion.div
                  variants={fadeInUp}
                  className="flex justify-between md:mt-4 xs:md2"
                >
                  <span className="text-sm text-orange-500">
                    عنوان
                  </span>
                </motion.div>
              </div>
            </div>
            <div className="grid grid-cols-2 xs:gap-2 md:gap-4 my-4">
              <motion.div variants={fadeInUp} className="flex flex-col mb-4">
                <span className="text-sm text-gray-600 mb-2">تاریخ تحویل:</span>
                <span className="text-sm text-gray-900">
                  تاریخ تست
                </span>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex flex-col">
                <span className="text-sm text-gray-600 mb-2">ساعت تحویل:</span>
                <span className="text-sm text-gray-900">
                  تاریخ تست
                </span>
              </motion.div>
              
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default OrderRegister;
