import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import carouselStyle from "./carousel.module.css";

export default function Carousel() {
  const [width, setWidth] = useState(0);
  const carousel = useRef();
  const imgs = useSelector((state) => state.hotelsData.images);

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  return (
    <motion.div ref={carousel} className={carouselStyle.carousel}>
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        className={carouselStyle.carousel__inner}
      >
        {imgs.map((img) => {
          return (
            <motion.div className={carouselStyle.item} key={img}>
              <img src={img} alt={img} />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
