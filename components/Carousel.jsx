import Carousel from 'react-bootstrap/Carousel'
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ListProduct from "../components/ListProduct";


function ControlledCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    const [products1, setProducts1] = useState([])
    const [products2, setProducts2] = useState([])
    const [products3, setProducts3] = useState([])

useEffect(() => {
  getProducts1()
  getProducts2()
  getProducts3()
},[]);

async function getProducts1() {
  const { rows } = await (
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/product?limit=3&offset=6`)
  ).json();
  setProducts1(rows);
}
async function getProducts2() {
    const { rows } = await (
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/product?limit=3&offset=4`)
      ).json();
      setProducts2(rows);
}

async function getProducts3() {
    const { rows } = await (
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/product?limit=3&offset=3`)
      ).json();
      setProducts3(rows);
}
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <ListProduct
            className="d-block w-100"
            // src="https://static-asset-delivery.hasbroapps.com/49353ef64445d631a90dfb959c9d085e06c08bc0/cb2c07019b1f6313fe89bb7693c9827c.png"
            alt="First slide"
            width='100' 
            height='200'
            products={products1}
          />
          <Carousel.Caption>
            {/* <h3>Nerf Plastic Disruptor Elite</h3> */}
            {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <ListProduct
            className="d-block w-100"
            // src="https://static-asset-delivery.hasbroapps.com/49353ef64445d631a90dfb959c9d085e06c08bc0/ee082400c5001c69c9bb254b1084d7f0.png"
            alt="Second slide"
            width='100' 
            height='500'
            products={products2}
          />
  
          <Carousel.Caption>
            {/* <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <ListProduct
            
            alt="Third slide"
            width='100' 
            height='100'
            products={products3}
          />
  
          <Carousel.Caption>
            <h3></h3>
            <p>
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
  

export default ControlledCarousel