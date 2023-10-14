import React from 'react'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {IoIosArrowForward } from "react-icons/io";
import SearchBar from '../SearchBar/SearchBar';
import styles from "../../styles/styles";
import Logo from '../Logo/Logo';
import Button from '../Button/Button'


const TopBar = () => {
    const { products } = useSelector((state) => state.products);
    const { isSeller } = useSelector((state) => state.seller);
  return (
   
    <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
            {/**Logo */}
                <Logo url={"https://shopo.quomodothemes.website/assets/images/logo.svg"}/>

            {/**Search Bar */}
            <SearchBar products={products}/>
            {/**Button */}
            
                <Button 
                     link={`${isSeller ? "/dashboard" : "/shop-create"}`}
                     design="raised"
                    className="rounded"
                >
                        <h5 className="text-[#fff] flex items-center">
                            {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
                            <IoIosArrowForward className="ml-1" />
                        </h5>
                </Button>
        
            
          </div>
    </div>
           
         
  )
}

export default TopBar