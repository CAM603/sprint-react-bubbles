import React, { useState, useEffect } from "react";


import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [loading, setLoading] = useState(false)
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    getColors()
  }, [])
  
  const getColors = () => {
    setLoading(true)
    axiosWithAuth()
    .get('/colors')
    .then(res => {
      setLoading(false)
      setColorList(res.data)
      
    })
    .catch(err => {
      setLoading(false)
      console.log(err)
    })
  }

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
