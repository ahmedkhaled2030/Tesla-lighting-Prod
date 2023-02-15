import styles from "../../styles/Product.module.scss";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import {
  Search,
  PersonOutlineOutlined,
  FavoriteBorderOutlined,
  Check,
} from "@mui/icons-material";
import CustomerReview from "@/components/CustomerReview";
import Head from "next/head";
import { Rating } from "@mui/material";
import ProductsList from "@/components/ProductsList";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
// Import Swiper styles
import "swiper/css";

const Product = ({ productDetails }) => {
  // console.log(productDetails ,"productDetails")
  // console.log(isFavourite,'isFavourite')
  //dummyData
  const headers = {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RlNjBhZDdiOWZiNDZkZjI4MzZkNzkiLCJpYXQiOjE2NzU1MTg2MDQsImV4cCI6MjI4MDMxODYwNH0.n-_K3QKqNB612L6wD9cCTFNp76DycxFlrJVQMlZE9C0",
  };

  const images = [
    "/img/product1.png",
    "/img/product2.png",
    "/img/product3.png",
  ];
  const prices = [{ value: 35 }, { value: 50 }];
  const colors = [{ value: "red" }, { value: "black" }];

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
  // const desc = `SKU: 1233W70-36
  // Finish: Matte White
  // Width: 70
  // Height: 36
  // Extension: 2
  // Collection: Abigail
  // Bulb 1 max wattage: 28
  // Bulb 1 Type: LED
  // Bulb 1 base: LED
  // Lumens: 1456
  // CRI: 80
  // Shipping Method: LTL
  // Color Temperature: 3000k to 6000k
  // Voltage: 120
  // Manufacturer Warranty: Three years warranty against manufacturers defect.`;
  //dummyData
  // const [price, setPrice] = useState(productDetails.prices[0]);
  const [price, setPrice] = useState(prices[0].value);
  const [size, setSize] = useState(0);
  const [selectedImg, setSelectedImg] = useState(images[1]);
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number);
  };

  // const handleSize = (sizeIndex) => {
  //   const difference = productDetails?.price[sizeIndex] - productDetails?.price[size];
  //   setSize(sizeIndex);
  //   changePrice(difference);
  // };
  const handleSize = (sizeIndex) => {
    const difference = prices[sizeIndex].value - prices[size].value;
    setSize(sizeIndex);
    changePrice(difference);
  };
  const handleCart = () => {
    console.log("cart");
    // dispatch(addProduct({ ...productDetails,  price, quantity }));
    dispatch(addProduct({ ...productDetails, price }));
  };

  const handleFavourite = async () => {
    console.log("object");

    try {
      const res = await axios.post(
        `https://tesla-lightning.herokuapp.com/product/search`,
        {},
        {
          headers: {
            'Authorization':
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RlNjBhZDdiOWZiNDZkZjI4MzZkNzkiLCJpYXQiOjE2NzU1MTg2MDQsImV4cCI6MjI4MDMxODYwNH0.n-_K3QKqNB612L6wD9cCTFNp76DycxFlrJVQMlZE9C0",
          },
        }
      );

      const data = await res;
      console.log(data, "data");
    } catch (err) {
      console.log(err);
    }
  };

  const toggleShow = () => {
    setShow(!show);
  };

  var buttonText = show ? "Cancel review" : "Write a review";

  return (
    <div className={`paddings innerWidth ${styles.container}`}>
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

      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.subImagesContainer}>
            {images.map((image, i) => (
              <div
                key={i}
                className={` ${
                  selectedImg === image ? `${styles.selected}` : ""
                }  ${styles.image}`}
                onClick={() => setSelectedImg(image)}
              >
                <Image
                  src={image}
                  alt=""
                  width="100"
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
          </div>
        </div>
        <div className={styles.right}>
          <h1 className={`primaryText ${styles.title}`}>
            {productDetails?.title}
          </h1>
          <span className={styles.number}>{productDetails?.number}</span>
          <div className={styles.prices}>
            $ {price}
            {/* $ {productDetails?.price} */}
            {/* <span className={styles.price}>$3,265.00</span>
            <span className={styles.price}>$2,972.00</span>
            <span className={styles.price}>Save $293.00</span> */}
          </div>
          <span className={styles.shipping}>
            Shipping calculated at checkout.
          </span>
          <button className={styles.buttonWish} onClick={handleFavourite}>
            <FavoriteBorderOutlined />
            Add to Wishlist
          </button>
          <div className={styles.colors}>
            {productDetails?.color}

            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={styles.sizes}>
            {productDetails?.size.map((size, i) => (
              <span onClick={() => handleSize(i)}>{size.value} inch</span>
            ))}
          </div>
          <button className={styles.buttonCart} onClick={handleCart}>
            ADD TO CART
          </button>
          <h3 className={`primaryText ${styles.descHeading}`}>DESCRIPTION</h3>
          <span className={styles.desc}>{productDetails?.description}</span>
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

      <div className={styles.hr}></div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  console.log(params, "params");
  const productRes = await axios.get(
    // `https://tesla-lightning.herokuapp.com/product/${params.id}`
    `https://tesla-lightning.herokuapp.com/product/63eb621c09eedf45e735accb`
  );


  return {
    props: {
      productDetails: productRes.data.data.product,
      // reqFavourite : reqFavourite
    },
  };
};

export default Product;
