import React,{useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import {
    AiOutlineClose,
    AiOutlineSearch,
    AiOutlineShoppingCart,
  } from "react-icons/ai";

import './SearchBar.css'
const SearchBar = ({products}) => {
    const [searchVal, setSearchVal] = useState('');
    const [searchData, setSearchData] = useState([]);

    useEffect(()=>{

        const filteredProducts = products && products.filter((product) => {
            return  product.name.toLowerCase().includes(searchVal.toLowerCase());
          });

          setSearchData(filteredProducts);
          if (searchVal === "") {
            setSearchData([]);
          }

    },[products,searchVal]);
   
  
  const handleInput = (e) => {
    setSearchVal(e.target.value);
    
  }
  
  const handleClearBtn = () => {
    setSearchVal('');
  }
  
  
  
  return (
    <div className="w-[50%] relative">
     {searchVal === "" &&  <AiOutlineSearch
      size={30}
      className="absolute left-2 top-1.5 cursor-pointer text-white"
    />}
    <input
      type="text"
      placeholder="         Search Product..."
      value={searchVal}
      onChange={handleInput}
      className="h-[40px] w-full px-2 bg-[#ff6347] border-none text-white rounded-md pr-[10px] placeholder-cyan-50 "
    />
    <AiOutlineClose
    onClick={handleClearBtn}
      size={30}
      className="absolute right-2 top-1.5 cursor-pointer text-white"
    />
    {searchData && searchData.length !== 0 ? (

      <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
        {searchData &&
          searchData.map((i, index) => {
            return (
              <Link to={`/product/${i._id}`} key={index} className='underline_a'>
                <div className="w-full flex items-start-py-3">
                  <img
                    src={`${i.images[0]?.url}`}
                    alt=""
                    className="w-[40px] h-[40px] mr-[10px]"
                  />
                  <h5 className='list-item'>{i.name}</h5>
                </div>
              </Link>
            );
          })}
      </div>
    ) : null}
  </div>
  );
}



export default SearchBar