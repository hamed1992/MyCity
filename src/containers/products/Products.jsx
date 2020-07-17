import { useEffect } from "react";
import { useRouter } from "next/router";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import Card from "./components/Card";
import { stagger } from "./../../utility/utils";
import { motion } from "framer-motion";
import silverAge from "./../../services/Api";
import map from "lodash/map";
const Products = ({ products }) => {
  const router = useRouter();
  console.log(router);
  useEffect(() => {
    const id = router.query.id;
    return () => {};
  }, []);
  return (
    <div className="pt-16">
      <BreadCrumb paths="محصولات دسته بندی" />
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={stagger}
      >
        <div className="grid grid-cols-2 xs:gap-2 md:gap-4 xs:px-2 md:px-6 my-4">
          {map(products, (product) => {
            return <Card key={product.id} product={product} />;
          })}
        </div>
      </motion.div>
    </div>
  );
};
Products.getInitialProps = async () => {
  let products = [];
  await silverAge.getDataInServer("shop/products/product-list").then((res) => {
    products = res.results.products;
  });
  return { products: products };
};
export default Products;
