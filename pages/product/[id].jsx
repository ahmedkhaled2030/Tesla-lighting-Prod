import styles from "../../styles/Product.module.scss";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import {
  Search,
  PersonOutlineOutlined,
  FavoriteBorderOutlined,
  Check,
  Favorite,
} from "@mui/icons-material";
import CustomerReview from "@/components/CustomerReview";
import Head from "next/head";
import { Rating } from "@mui/material";
import ProductsList from "@/components/ProductsList";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
// Import Swiper styles

import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules

// import required modules
import { FreeMode, Pagination, Navigation } from "swiper";
// import Magnifier from "react-magnifier";
import SideBar from "@/components/FilterBar";

const FilterColor = styled.div`
  background-color: ${(props) => props.color};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 0 2px #ebebeb;
  display: block;
`;

const Product = ({ productDetails, setCartOpen }) => {
  //console.log(productDetails);

  // //console.log(productDetails ,"productDetails")
  // //console.log(isFavourite,'isFavourite')
  //dummyData

  const images = [
    "/img/product11.jpg",
    "/img/product12.png",
    "/img/product13.png",
  ];
  const prices = [{ value: 35 }, { value: 50 }];
  const colors = [{ value: "yellow" }, { value: "black" }];

  const SimilarProducts = [
    {
      img: "/img/arrival1.png",
      title: "Aged Brass Frame with Etched Glass Shade Linear Pendant",
      price: "3,767.00",
    },
    {
      img: "/img/arrival2.jpg",
      title:
        "LED Steel Frame Wrapped with Clear Crystal Double Layer Chandelier",
      price: "3,767.00",
    },
    {
      img: "/img/arrival3.png",
      title: "Aged Brass and Black Rod with Adjustable Arch Arm Chandelier",
      price: "3,767.00",
    },
    {
      img: "/img/arrival4.png",
      title: "Gold Leaf Leafy Bohemian Shade Wall Sconce",
      price: "3,767.00",
    },
    {
      img: "/img/arrival5.png",
      title:
        "Handcrafted Wallflower Frame with Opal Matte Glass Globe Pendant / Chandelier",
      price: "3,767.00",
    },
  ];
  const RecentViewedProducts = [
    {
      img: "/img/1.jpg",
      title: "Aged Brass Frame with Etched Glass Shade Linear Pendant",
      price: "3,767.00",
    },
    {
      img: "/img/2.jpg",
      title:
        "LED Steel Frame Wrapped with Clear Crystal Double Layer Chandelier",
      price: "3,767.00",
    },
    {
      img: "/img/3.jpg",
      title: "Aged Brass and Black Rod with Adjustable Arch Arm Chandelier",
      price: "3,767.00",
    },
    {
      img: "/img/4.jpg",
      title: "Gold Leaf Leafy Bohemian Shade Wall Sconce",
      price: "3,767.00",
    },
    {
      img: "/img/5.jpg",
      title:
        "Handcrafted Wallflower Frame with Opal Matte Glass Globe Pendant / Chandelier",
      price: "3,767.00",
    },
  ];
  const Reviews = [
    {
      name: "Laura Carter",
      Verified: true,
      rating: 5,
      reviewTitle: "Vey Nice",
      reviewComment:
        "Hi, I purchased it for my new build… not completed yet… however cannot wait to hang it!…",
    },
    {
      name: "Ivy Ng",
      Verified: false,
      rating: 3,
      reviewTitle: "Love it",
      reviewComment: "It match my place, quality is good, worth it",
    },
    {
      name: "Eladio Carter",
      Verified: true,
      rating: 4,
      reviewTitle: "EXcellent",
      reviewComment:
        "quality is good not completed yet… however cannot wait to hang it!…",
    },
  ];
  const desc = `SKU: 1233W70-36
  Finish: Matte White
  Width: 70
  Height: 36
  Extension: 2
  Collection: Abigail
  Bulb 1 max wattage: 28
  Bulb 1 Type: LED
  Bulb 1 base: LED
  Lumens: 1456
  CRI: 80
  Shipping Method: LTL
  Color Temperature: 3000k to 6000k
  Voltage: 120
  Manufacturer Warranty: Three years warranty against manufacturers defect.`;
  //dummyData
console.log(productDetails.images ,'productDetails.images')
  const [price, setPrice] = useState(prices[0].value); 
  const [itemSize, setSize] = useState(0);
  const [color, setColor] = useState("");
  const [selectedImg, setSelectedImg] = useState(productDetails.images[0].path);
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFavourited, setIsFavourited] = useState(false);
  //console.log(productDetails);
  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = prices[sizeIndex].value - prices[itemSize].value;
    setSize(sizeIndex);

    changePrice(difference);
  };
  const handleCart = () => {
    //console.log("cart");
    setCartOpen(true);

    dispatch(
      addProduct({ ...productDetails, price, itemSize, color, quantity })
    );
  };

  const handleFavourite = async () => {
    //console.log("object");

    try {
      const res = await axios.post(
        `https://tesla-lightning.herokuapp.com/product/favorite/${productDetails._id}`,
        {},
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RlNjBhZDdiOWZiNDZkZjI4MzZkNzkiLCJpYXQiOjE2NzU1MTg2MDQsImV4cCI6MjI4MDMxODYwNH0.n-_K3QKqNB612L6wD9cCTFNp76DycxFlrJVQMlZE9C0",
          },
        }
      );

      const data = await res.data.message;
      //console.log(data);
      if (data == "Product added to favorites successfully") {
        setIsFavourited(true);
      }
      if (data == "Favorite removed successfully") {
        setIsFavourited(false);
      }
    } catch (err) {
      //console.log(err);
    }
  };

  const toggleShow = () => {
    setShow(!show);
  };

  var buttonText = show ? "Cancel review" : "Write a review";

  return (
    <div className={`yPaddings innerWidth ${styles.container}`}>
      <Head>
        <title> {productDetails?.title}</title>
        <meta name="description" content="Tesla Lighting" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Tenor+Sans&display=swap"
          rel="stylesheet"
        />
      </Head>

      <>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          breakpoints={{
            300: {
              slidesPerView: 1.5,
              spaceBetween: 10,
              centeredSlides: true,
            },
            640: {
              slidesPerView: 1.5,
              spaceBetween: 10,
              centeredSlides: true,
            },
            768: {
              slidesPerView: 1.5,
              spaceBetween: 10,
              centeredSlides: true,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          className={styles.swiper}
        >
          {productDetails.images?.map((img, i) => (
            <SwiperSlide className={styles.swiperSlide} key={i}>
              <Image
                src={img.path}
                alt={img._id}
                width="400px"
                height="400px"
                objectFit="contain"
                className={styles.subImg}
              />
              {/* <Magnifier src={img} width={400}  />  */}
            </SwiperSlide>
          ))}
        </Swiper>
      </>
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.subImagesContainer}>
            {productDetails.images.map((image, i) => (
              <div
                key={i}
                className={` ${
                  selectedImg === image ? `${styles.selected}` : ""
                }  ${styles.image}`}
                onClick={() => setSelectedImg(image.path)}
              >
                <Image
                  src={image.path}
                  alt={image._id}
                  width="100px"
                  height="100px"
                  objectFit="contain"
                  className={styles.subImg}
                />
              </div>
            ))}
          </div>

          <div className={styles.mainImgContainer}>
            <Image
              src={selectedImg}
              alt=""
              width="450px"
              height="450px"
              objectFit="contain"
              className={styles.mainImg}
            />
            {/* <ImageMagnifier width={"450px"} src={selectedImg} /> */}
            {/* <Magnifier src={selectedImg} width={450} mgWidth={200} mgHeight={200} />  */}
          </div>
        </div>
        <div className={styles.right}>
          <h1 className={`primaryText ${styles.title}`}>
            {productDetails?.title}
          </h1>
          <span className={styles.number}>
            <strong>{productDetails?.number.toString()}</strong>
          </span>
          <div className={styles.prices}>
            $ {productDetails.price}
            {/* $ {productDetails?.price} */}
            {/* <span className={styles.price}>$3,265.00</span>
            <span className={styles.price}>$2,972.00</span>
            <span className={styles.price}>Save $293.00</span> */}
          </div>
          <p className={styles.shipping}>
            <span>Shipping</span> calculated at checkout.
          </p>
          {productDetails.isFavourited ? (
            <button className={styles.buttonWish} onClick={handleFavourite}>
              <Favorite />
              Added to Wishlist
            </button>
          ) : (
            <button className={styles.buttonWish} onClick={handleFavourite}>
              <FavoriteBorderOutlined />
              Add to Wishlist
            </button>
          )}

          <div className={styles.colors}>
            <span>COLOR</span>
            <div className={styles.colorWrapper}>
              {productDetails?.colors.map((c, i) => (
                <div
                  className={` ${
                    color == c
                      ? ` ${styles.color} ${styles.colorSelected}`
                      : `${styles.color}`
                  }  `}
                  key={i}
                >
                  <FilterColor color={c} key={c} onClick={() => setColor(c)} />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.sizes}>
            <span>SIZE</span>
            <div className={styles.sizeWrapper}>
              {productDetails?.size.map((size, i) => (
                <span
                  onClick={() => handleSize(i)}
                  className={` ${
                    itemSize == i ? `${styles.sizeSelected}` : ""
                  }  `}
                >
                  {size.value}"
                </span>
              ))}
            </div>
          </div>
          <button className={styles.buttonCart} onClick={handleCart}>
            ADD TO CART
          </button>
          <h3 className={`primaryText ${styles.descHeading}`}>DESCRIPTION</h3>
          {/* <span className={styles.desc}>{productDetails.description}</span> */}
          <span
            className={styles.desc}
            dangerouslySetInnerHTML={{ __html: productDetails.description }}
          ></span>
        </div>
      </div>

      <div className={styles.bottom}>
        <h1 className={`primaryText ${styles.title}`}>Customer Reviews</h1>
        <div className={styles.reviewTop}>
          {Reviews.length >= 1 ? (
            ""
          ) : (
            <div className={styles.reviewTopLeft}>
              <Rating
                name="disabled"
                value="0"
                disabled
                className={styles.rating}
              />
              <span className={styles.reviewText}>
                Be the first to write a review
              </span>
            </div>
          )}

          <div className={styles.reviewTopRight}>
            <button onClick={toggleShow} className={styles.switchButton}>
              {buttonText}
            </button>
          </div>
        </div>

        {show && (
          <div className={styles.review}>
            <div className={styles.reviewComponent}>
              <CustomerReview />
            </div>

            <div className={styles.reviewButtons}>
              <button className={styles.switchButton}>Submit Review</button>
              <button
                onClick={() => setShow(false)}
                className={styles.switchButton}
              >
                Cancel review
              </button>
            </div>
          </div>
        )}

        <div className={styles.reviews}>
          {Reviews.map((review, i) => (
            <div className={styles.review}>
              <Rating
                name="readOnly"
                value={review.rating}
                readOnly
                className={styles.rating}
                key={i}
              />
              <div className={styles.personData}>
                <div className={styles.personImg}>
                  <PersonOutlineOutlined />
                  {review.Verified ? (
                    <div className={styles.check}>
                      <Check className={styles.icon} />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className={styles.personName}>{review.name}</div>
                {review.Verified ? (
                  <div className={styles.verified}>Verified</div>
                ) : (
                  ""
                )}
              </div>
              <span className={styles.reviewTitle}>{review.reviewTitle}</span>
              <span className={styles.reviewComment}>
                {review.reviewComment}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.hr}></div>

      <ProductsList title="You may also like" products={SimilarProducts} />

      <div className={styles.hr}></div>

      <ProductsList title="Recently Viewed" products={RecentViewedProducts} />
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  //console.log(params, "params");
  const productRes = await axios.get(
    // `https://tesla-lightning.herokuapp.com/product/${params.id}`
    `https://tesla-lightning.herokuapp.com/product/640516cd094fb4c6b0652e1b`
  );

  return {
    props: {
      productDetails: productRes.data.data.product,
      // reqFavourite : reqFavourite
    },
  };
};

export default Product;
