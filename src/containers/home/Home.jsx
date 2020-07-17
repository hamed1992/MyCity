import { useEffect,useState } from "react";
import SliderComponent from "./components/Slider";
import Link from "next/link";
import CategoryCard from "./../../components/card/CaegoryCard";
import silverAge from "./../../services/Api";
import { motion } from "framer-motion";
import { stagger } from "./../../utility/utils";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import map from "lodash/map";
import SweetAlert from "react-bootstrap-sweetalert";
import Router from "next/router";

function Home({ sliders, categories ,error}) {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(error.has_error ? true : false);
  useEffect(() => {
    setShowAlert(error.has_error ? true : false);
  }, [error]);
  const onConfirm = () => {
    setShowAlert(false);
    Router.push("/");
  };
  const onCancel = () => {};
  useEffect(() => {
    let url = window.location.href;
    if (url.includes("?token")) {
      var token = router.query.token;
      Cookies.set("token", token, { expires: 7 });
    }
  }, []);
  return (
    <motion.div initial="initial" animate="animate" exit="exit">
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
      <div className="">
        <SliderComponent images={sliders} />
        <div className="home-title flex justify-between xs:px-2 md:px-6 items-center my-4">
          <h1 className="font-bold text-md text-gray-800">دسته بندی محصولات</h1>
          <Link href="/history">
            <a
              title="مشاهده محصولات"
              className="px-4 py-2 bg-white rounded-md text-blue-900 text-sm "
            >
              تاریخچه سفارشات
            </a>
          </Link>
        </div>

        <motion.div
          variants={stagger}
          className="grid grid-cols-2 xs:gap-2 md:gap-4 xs:px-2 md:px-6 my-4"
        >
          {map(categories, (category, index) => {
            return <CategoryCard key={index} category={category} />;
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}
Home.getInitialProps = async ({ match }) => {
  try {
    let sliders = [];
    let error = {};
    let categories = null;
    const Post_params = {
      group_depth: 1,
      load_all_children: 1,
      parent_id: 0,
    };
    const data = await silverAge
      .PostDataInServer("shop/product-groups/search", Post_params)
      .then((res) => {
        console.log("hamed",res)
        if (res.success === 1) categories = res.results.parent_group.children;
      });
    await silverAge
      .getDataInServer(
        `https://silverpanel.shahremanapp.com/api/application/slideshow`
      )
      .then((res) => {
        res.success === 0
          ? (error = { has_error: true, error_msg: res.user_message })
          : (sliders = res.results);
      });

    return { sliders, categories, error };
  } catch (error) {
    console.error(error);
  }
};
export default Home;
