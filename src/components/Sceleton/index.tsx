import React from "react";
import styles from "./Skeleton.module.scss";

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "1rem",
  borderRadius = "4px",
}) => {
  const skeletonStyle = {
    width,
    height,
    borderRadius,
  };

  return <div className={styles.skeleton} style={skeletonStyle}></div>;
};

export default Skeleton;
