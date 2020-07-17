import Link from "next/link";
import { motion } from "framer-motion";
import {fadeInUp } from './../../utility/utils'

function CategoryCard({ category }) {
  return (
    <motion.div variants={fadeInUp}>
    <Link
      href={
        category.direct_children_count > 0
          ? `/categories/[id]`
          : `/products/[id]`
      }
      as={
        category.direct_children_count > 0
          ? `/categories/${category.id}`
          : `/products/${category.id}`
      }
    >
      <a className="shadow-md">
        <img
          className="w-full xs:h-40 md:h-48 object-cover object-center rounded-md rounded-b-none "
          src={category.icon}
          alt="#"
        />
        <div className="xs:p-2 md:p-4 bg-white rounded-md rounded-t-none">
          <span className="text-gray-800 max-h-40">{category.name}</span>
        </div>
      </a>
    </Link>
    </motion.div>
  );
}

export default CategoryCard;
