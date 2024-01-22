import { FC } from "react";
import { IHeadingProps } from "./types";

import styles from "./Heading.module.scss";

const Heading: FC<IHeadingProps> = ({ children }) => (
  <h3 className={styles.h3}>{children}</h3>
);

export default Heading;
