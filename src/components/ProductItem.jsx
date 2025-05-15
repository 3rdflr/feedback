import { CiHeart } from "react-icons/ci";
import noImg from "../assets/img/noimg.jpg";

import styles from "./ProductItem.module.css";

function ProductItem({ item, isBestProduct }) {
  const { images, name, price, favoriteCount } = item;
  console.log(images);
  return (
    <a href="#" className={styles.card}>
      <img
        className={isBestProduct ? styles.bestImg : styles.img}
        src={noImg}
        alt={name}
      />
      <p>{name}</p>
      <h3>{price}</h3>
      <span>
        <button>
          <CiHeart />
        </button>
        {favoriteCount}
      </span>
    </a>
  );
}

export default ProductItem;
