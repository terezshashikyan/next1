import { EvaluatorProps } from "./types";

import styles from "./Evoluator.module.scss";

const Evaluator: React.FC<EvaluatorProps> = ({ rating }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((point) => (
          <span
            key={point}
            className={point <= rating ? styles.selected : styles.notSelected}
          >
            &#9733;
          </span>
        ))}
      </div>
    </div>
  );
};

export default Evaluator;
