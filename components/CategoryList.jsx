import Image from "next/image";
import { useState } from "react";
import styles from "./../styles/CategoryList.module.scss";
import CategoryCard from "./CategoryCard";

const CategoryList = ({categories,title}) => {
 
  return (
    <div className={` innerWidth  yPaddings  ${styles.container}`}>
      <h1 className={`primaryText paddings ${styles.title}`}>{title}</h1>
      <div className={styles.wrapper} >
      {categories?.map((category, i) => (
    
          <CategoryCard img={category.img} title={category.title} key={i} />
     
      ))}
      </div>
    </div>
  );
};

export default CategoryList;
