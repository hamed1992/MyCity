import React from "react";
import Link from "next/link";
import { useNumberSeprator } from "./../../../hooks";
import {stagger ,fadeInUp} from './../../../utility/utils'
import {motion } from 'framer-motion'
function HistoryItem({ order }) {
  const { product } = order?.order_details[0];
  return (
    <motion.div variants={fadeInUp} className="shadow-md rounded-md bg-gray-300 p-4 mb-2">
      <Link href="/history/[id]" as={`/history/${order.id}`}>
        <a className="w-full block" title="عنوان محصول">
          <div className="flex pb-2 border-b border-gray-500">
            <img
              className="xs:w-16 xs:h-16 md:w-24 md:h-24 rounded-md rounded-bl-none ml-4"
              src={product.cover}
              alt={product.name}
            />

            <div className="flex-grow">
              <div className="flex justify-between md:mb-4">
                <span className="text-sm text-orange-500">
                  {order.order_status?.title}
                </span>
                <span className="">{order.tracking_code}</span>
              </div>
              <div className="flex justify-between md:mb-4">
                <span className="text-sm text-gray-700">تاریخ ثبت</span>
                <span className="">{order.created_at}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-700">
                  {product.name} ({order?.order_details[0].count} عدد)
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <span className="text-sm text-gray-700">مبلغ</span>
            <span className="text-md text-green-700 font-500">
              {useNumberSeprator(order.total_price)} تومان
            </span>
          </div>
        </a>
      </Link>
    </motion.div>
  );
}

export default HistoryItem;
