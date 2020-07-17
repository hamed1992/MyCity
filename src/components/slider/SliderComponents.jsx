import Slider from "react-slick";
import Link from "next/link";
import Head from "next/head";
import map from "lodash/map";
function SliderComponents({ images }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <React.Fragment>
      <Head>
        <link rel="stylesheet" href="/assets/css/slick.min.css" />
        <link rel="stylesheet" href="/assets/css/slick-theme.min.css" />
      </Head>

      <Slider className="main-slider" {...settings}>
        {map(images, (image, index) => {
          return (
            <div>
              <figure className="relative">
                  <div title="image" className="block">
                    <img
                      className="w-full object-cover object-center xs:h-64 md:h-64 rounded-lg"
                      src={image.path}
                      alt="slider"
                    />
                  </div>
                {/* <figcaption className="absolute">
                  عنوان متن تست در این قسمت قرار میگیرد
                </figcaption> */}
              </figure>
            </div>
          );
        })}
      </Slider>
    </React.Fragment>
  );
}

export default SliderComponents;
