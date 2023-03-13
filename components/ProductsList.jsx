import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./../styles/ProductsList.module.scss";
import ProductsCard from "./ProductsCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

// import required modules
import { Scrollbar } from "swiper";
import Link from "next/link";
import { Box } from "@mui/material";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import Cookies from "js-cookie";
import axios from "axios";
const ProductsList = ({ title, products, type, link }) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(Cookies.get("token"));
  }, [token]);
  // console.log(token);

  const [listProducts, setListProducts] = useState(products);

  const [isFavourited, setIsFavourited] = useState(false);
  const [id, setId] = useState("");

  const handleUpdate = async () => {
    setIsFavourited(prevState => !prevState)

  };
  // console.log(listProducts ,'listProducts')

  useEffect(() => {
    // console.log(isFavourited, "isFavourited");
    // console.log("checked");
    if (id !== "") {
      const index = products.findIndex((preState) => preState._id == id);
      products[index].isFavorited = isFavourited;

    }    
  }, [id ,isFavourited , listProducts]);

  const handleFavourite = async (id) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_GAID}/product/favorite/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await res.data.message;
      // console.log(data);
      if (data == "Product added to favorites successfully") {
        setIsFavourited(true);
        setId(id);
      }
      if (data == "Favorite removed successfully") {
        setIsFavourited(false);
        setId(id);
      }
    } catch (err) {
      ////console.log(err);
    }
  };

  return (
    <div className={`innerWidth ${styles.container}`}>
      <h1 className={` primaryText ${styles.title}`}>{title}</h1>
      {type !== "collections" && (
        <Link href={`/collections/${link}`} passHref>
          <h1 className="borderText">VIEW ALL</h1>
        </Link>
      )}

      {type == "collections" ? (
        <div className={styles.wrapper}>
          {listProducts.map((product) => (
            <Box>
       
              <div className={styles.iconWrapper}>
                {product.isFavorited ? (
                  <Favorite onClick={() => { handleFavourite(product?._id); handleUpdate }} />
              
                ) : (
                  <FavoriteBorderOutlined
               onClick={() => { handleFavourite(product?._id) ;handleUpdate  }}
                  />
                )}
              </div>
              
              <Link href={`/product/${product?._id}`} passHref className="link">
                
                <ProductsCard
                  img={
                    product?.images.length >= 1
                      ? `${process.env.NEXT_PUBLIC_OLDPATH}/${product?.images[0].path}`
                      : `${process.env.NEXT_PUBLIC_OLDPATH}/${product?.cover}`
                  }
                  title={product?.title}
                  price={product?.price}
                  type={type}
                  key={product?._id}
                  id={product?._id}
                  isFavorited={product?.isFavorited}
                />
              </Link>
              
            </Box>
          ))}
        </div>
      ) : (
        <>
          <Swiper
            scrollbar={{
              hide: false,
            }}
            freeMode={true}
            breakpoints={{
              300: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            modules={[Scrollbar]}
            className={styles.swiper}
          >
            {products?.map((product, i) => (
              <SwiperSlide className={styles.swiperSlide}>
                <ProductsCard
                  img={
                    product?.images.length >= 1
                      ? `${process.env.NEXT_PUBLIC_OLDPATH}/${product?.images[0]?.path} `
                      : `${process.env.NEXT_PUBLIC_OLDPATH}/${product?.cover} `
                  }
                  title={product?.title}
                  price={product?.price}
                  key={i}
                  id={product?._id}
                  isFavorited={product?.isFavorited}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
};

export default ProductsList;
