import Image from "next/image";
import { useState } from "react";
import styles from "./../styles/FiveProductsList.module.scss";
import FiveProductsCard from "./FiveProductsCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FiveProductsList = ({ title, products }) => {
  console.log(title);
  const sliderSettings = {
    // dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 1,
    touchMove: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          // dots: true,
        },
      },
    ],
  };
  return (
    <div className={styles.container}>
      <h1 className={` primaryText ${styles.title}`}>{title}</h1>
      <h1 className="borderText">VIEW ALL</h1>

      <div className={styles.wrapper}>
        <Slider {...sliderSettings} className={styles.slider}>
          {products?.map((product, id) => (
            <FiveProductsCard
              img={product.img}
              title={product.title}
              price={product.price}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FiveProductsList;
