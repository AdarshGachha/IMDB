import React from "react";
import styles from './style.module.css'
import Search from '../Search'



const index = () => {
  return (
    <div className={styles.serachelem}>
      <img src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="" />
      <Search />
    </div>
  );
};

export default index;
