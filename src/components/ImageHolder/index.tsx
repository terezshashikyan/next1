import { ImageHolderProps } from "./types";

import styles from "./ImageHolder.module.scss";

const ImageHolder: React.FC<ImageHolderProps> = ({ src, alt, className }) => {
  return (
    <div className={`${styles.imageHolder} ${className}`}>
      <img src={src} alt={alt} className={styles.image} />
    </div>
  );
};

export default ImageHolder;
