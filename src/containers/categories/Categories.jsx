import { useEffect } from "react";
import { useRouter } from "next/router";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import CaegoryCard from "../../components/card/CaegoryCard";
import { animationVariant } from "./../../utility/utils";
import { motion } from "framer-motion";
import silverAge from "./../../services/Api";
import map from "lodash/map";
function Categories({ categories }) {
  const router = useRouter();
  useEffect(() => {
    const id = router.query.id;
    return () => {};
  }, []);
  return (
    <div className="pt-16">
      <BreadCrumb paths="دسته بندی ایکس" />
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="grid grid-cols-2 xs:gap-2 md:gap-4 xs:px-2 md:px-6 my-4">
          {map(categories, (category, index) => {
            return <CaegoryCard key={index} category={category} />;
          })}
        </div>
      </motion.div>
    </div>
  );
}
Categories.getInitialProps = async (ctx) => {
  var categories = [];
  const Post_params = {
    per_page: 1,
    page: 0,
    load_group: 1,
    group_depth: 1,
    lat: 0.0,
    lng: 0.0,
    calc_distance: 0,
    parent_id: ctx.query.id ? ctx.query.id : 0,
  };
  const data = await silverAge
    .PostDataInServer("shop/product-groups/search", Post_params)
    .then((res) => {
      console.log("objecthameds",res)
      if(res.success ===1) categories = res.results.parent_group.children;
    });
  return { categories: categories };
};
export default Categories;
