import Link from "next/link";
import { useConvertDigitToFa, useNumberSeprator } from "../../../hooks";
import { fadeInUp, stagger } from "./../../../utility/utils";
import { motion } from "framer-motion";

function Card({ product }) {
  return (
    <motion.div variants={fadeInUp}>
        <Link href="/product/[id]" as={`/product/${product.id}`}>
          <a>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 ,easing:[0.6,-.05,0.01,  0.99]}}
              className="w-full xs:h-40 md:h-48 object-cover object-center rounded-md rounded-b-none "
              src={product.cover.path}
              alt={product.name}
            />
            <div className="p-4 bg-white rounded-md rounded-t-none">
              <span className="text-gray-800">{product.name}</span>
              <p className="text-sm text-teal-500">
                {useNumberSeprator(product.sale_price)} تومان
              </p>
            </div>
          </a>
        </Link>
    </motion.div>
  );
}

export default Card;
