import { Animal } from "@prisma/client";
import styles from "../styles/Gallery.module.css";

const Animal = ({ animal }: { animal: Animal }) => {
  return (
    <a href={"/animal/" + animal.id}>
      <div className={styles["animal-card"]}>
        <div className={styles["animal-card__image"]}></div>
        <div className={styles["animal-card__information"]}>
          <h3>{animal.name}</h3>
          <div>{animal.description}</div>
        </div>
      </div>
    </a>
  );
};

export default Animal;
