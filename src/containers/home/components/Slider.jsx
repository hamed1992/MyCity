import { useEffect, useRef } from "react";
import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import Head from "next/head";
import map from "lodash/map";
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};
function SliderComponent({ images }) {
  const titleBar = useRef(null);
  const heroElement = useRef(null);
  useEffect(() => {
    const config = {
      root: null, // sets the framing element to the viewport
      rootMargin: "0px 0px 0px 0px",
      threshold: 0.04,
    };
    const heroHedaer_Observe = new IntersectionObserver(
      (entries, heroHedaer_Observe) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            heroElement.current &&
              document.querySelector(".home-title")?.classList.remove("active");
          } else {
            document.querySelector(".home-title")?.classList.add("active");
          }
        });
      },
      config
    );
    heroHedaer_Observe.observe(heroElement.current);
  });
  return (
    <div ref={heroElement}>
      <Head>
        <link rel="stylesheet" href="/assets/css/slick.min.css" />
        <link rel="stylesheet" href="/assets/css/slick-theme.min.css" />
      </Head>
      <Slider className="main-slider" {...settings}>
        {map(images, (image, index) => {
          return (
            <div key={index}>
              <figure className="relative">
                <Link href={image.link}>
                  <a title="image" className="block">
                    <img
                      className="w-full object-cover object-center xs:h-64 md:h-64 rounded-lg"
                      src={image.image}
                      alt="slider"
                    />
                  </a>
                </Link>
                {image.name && image.name.trim() !== "" && (
                  <figcaption className="absolute">
                    {image.name}
                  </figcaption>
                )}
              </figure>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default SliderComponent;
