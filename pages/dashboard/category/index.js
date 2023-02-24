import styles from "../../../styles/ProductsDashboard.module.scss";
import React, { useState } from "react";
import NavbarDashboard from "@/components/navbarDashboard";
import Sidebar from "@/components/SideBarDashboard";
import DataTableDashboard from "@/components/DataTableDashboard";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";

const Category = () => {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  // console.log(category, "category")

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const addCategory = async () => {
    try {
      const res = await axios.post(
        `https://tesla-lightning.herokuapp.com/dashboard/category`,
        {
          name: category,
        },

        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RlNjBhZDdiOWZiNDZkZjI4MzZkNzkiLCJpYXQiOjE2NzU1MTg2MDQsImV4cCI6MjI4MDMxODYwNH0.n-_K3QKqNB612L6wD9cCTFNp76DycxFlrJVQMlZE9C0",
          },
        }
      );

      const data = await res;
      console.log(data.data.message, "data");
      setStatus(data.data.message);
      setCategory("");
      // router.push("/dashboard/products");
    } catch (err) {
      console.log(err.message);
      setStatus("Category with same name exist");
      setCategory("");
    }
  };


  return (
    <div className={styles.products}>
      <Sidebar />
      <div className={styles.productsContainer}>
        <NavbarDashboard />
        <Box sx={{ mx: "auto", my: 2, width: 500 }}>
          <TextField
            sx={{ my: 5, width: 500 }}
            id="outlined-basic"
            label="category"
            value={category}
            variant="outlined"
            onChange={handleCategory}
          />
          <Box sx={{ textAlign: 'center', }}>
          <Button
            onClick={addCategory}
            sx={{ my: 1, width: 150 }}
            variant="contained"
            color="success"
          >
            Add Category
          </Button>
               </Box>
       
        </Box>
        
        {status == "Category created successfully" && (
          <Box sx={{ mx: "auto", my: 5, width: 500 }}>
          <Box  sx={{  textAlign: 'center',   fontSize: '0.875rem',    fontFamily: 'sans',}}>
              <Image
                src="/img/done.png"
                alt=""
                height="150px"
                width="150px"
                objectFit="contain"
              />
               <h2 >{status}</h2>
            </Box>

           
          </Box>
        )}
        {status == "Category with same name exist" && (
          <Box sx={{ mx: "auto", my: 5, width: 500 }}>
            <Box  sx={{  textAlign: 'center',   fontSize: '0.875rem',}}>
              <Image
                src="/img/wrong.png"
                alt=""
                height="150px"
                width="150px"
                objectFit="contain"
              />
              <h2>{status}</h2>
            </Box>

            
          </Box>
        )}
      </div>
    </div>
  );
};


export default Category;