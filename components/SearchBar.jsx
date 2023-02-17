import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import styles from "./../styles/SearchBar.module.scss";
import axios from "axios";
import { useRouter } from "next/router";
import { Search } from "@mui/icons-material";
import useDebounce from "../hooks/useDebounce";
import Image from "next/image";
import Link from "next/link";
const SearchBar = ({ searchOpen, setSearchOpen, searchValue }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedProduct, setSearchedProduct] = useState([]);
  const [nullProducts, setNullProducts] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(searchText);
  useEffect(async () => {
    console.log(searchText, "searchText")
    if (searchText == "") {
      console.log("empty")
      setSearchedProduct(null)
    }     
    
    console.log(debouncedValue, 'debouncedValue') 
    console.log(searchedProduct ,'searchedProduct')           
    const id = setTimeout(() => {
      setDebouncedValue(searchText); 
    }, 500);
    if (searchText == "") {
      console.log("empty2") 
      setSearchedProduct(null)
      setNullProducts("No matched products"); 
    }   
    if (searchText !== "") {
      try {
        const res = await axios.post(
          `https://tesla-lightning.herokuapp.com/product/search`,
          {
            text: debouncedValue,
          },
          {
            headers: {
              Authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RlNjBhZDdiOWZiNDZkZjI4MzZkNzkiLCJpYXQiOjE2NzU1MTg2MDQsImV4cCI6MjI4MDMxODYwNH0.n-_K3QKqNB612L6wD9cCTFNp76DycxFlrJVQMlZE9C0",
            },
          }
        );

        const data = await res.data.data.products;
        console.log(data, "data");
        if (data.length < 1) {
          
          setSearchedProduct(null);     
        } if(data.length >= 1) {
             setSearchedProduct(data);   
        }

 
      } catch (err) {
        console.log(err);
      }
    }

    return () => {
      clearTimeout(id);
      setSearchOpen(false); 
    };
  }, [searchText, debouncedValue]);

  const closeHandler = () => {
    setSearchOpen(false);
    setSearchText("");
    setSearchedProduct([]);      
  };

  return (
    <div className={`${styles.container}  ${searchOpen ? styles.open : " "} `}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Search className={styles.icon} />
          <input
            placeholder="Search our store"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            autoFocus
          />
        </div>
        <div className={styles.right}>
          <Close onClick={closeHandler} />
        </div>
      </div>

      <div className={styles.modal}>   
        {(searchedProduct !== null && searchedProduct.length > 0  && searchText !== "") ? (
          searchedProduct?.slice(0, 5).map((item) => (
            <div className={styles.productWrapper}>
        
              <Link href={`/product/${item._id}`} >
                <Image
                  src={item?.cover}     
                  alt={item?.title}
                  width="275" 
                  height="275" 
                  objectFit="contain"
                />
              </Link>
              <span>{item?.title.substring(0,30)}...</span>
            </div>
          ))
        ) : (
          <span className="styles.nullText">{nullProducts}</span>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
