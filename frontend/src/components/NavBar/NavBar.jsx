import React ,{useState} from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {
    AiOutlineHeart,
    AiOutlineClose,
    AiOutlineShoppingCart,
  } from "react-icons/ai";
  import {
    FaBars
  } from "react-icons/fa";
  import { CgProfile } from "react-icons/cg";
  import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import styles from "../../styles/styles";
import './NavBar.css';
import DropDown from '../DropDown/DropDown';
import { categoriesData ,navItems} from "../../static/data";
import NavItem from './NavItem';

const NavBar = () => {
    const [click, setClick] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [openWishlist, setOpenWishlist] = useState(false);
    const [openCart, setOpenCart] = useState(false);

    const { wishlist } = useSelector((state) => state.wishlist);
    const { cart } = useSelector((state) => state.cart);
    const { isAuthenticated, user } = useSelector((state) => state.user);
  
    const handleClick = () => setClick(!click);
    const Close = () => setClick(false);
    
    return (
      <div>
       <div className={click ? "main-container" : ""}  onClick={()=>Close()} />
        <nav className="navbar" onClick={e => e.stopPropagation()}>
          <div className="nav-container">
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[370px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2 text-[#1f5156]" />
              <button
                className={`h-[100%] w-full  flex justify-between text-center items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer text-[#1f5156]"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              {navItems && navItems.map((i,index) => (
              <NavItem
                key={index}
                to={i.url}
                onClick={click ? handleClick : null}
                Children={i.title}
              />
               
              ))}
             
            </ul>
            <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#f5b921] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#f5b921]  w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>
            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`http://localhost:5000/${user?.avatar}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>
            </div>
            
            <div className="nav-icon" onClick={handleClick}>
              {click ? <AiOutlineClose/> : <FaBars/>}
            </div>
          </div>
        </nav>
      </ div>
    );
}

export default NavBar
