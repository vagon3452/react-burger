import styles from "./images.module.css"

interface IngredientIconProps {
    srcSet: string;
    src: string;
    alt: string;
    overflow: number;
    extraClass: string;
  }
  
  export const IngredientIcon: React.FC<IngredientIconProps> = ({
    srcSet,
    src,
    alt = "ingredient",
    overflow = 0,
    extraClass,
  }) => {
    const containerClasses = `${styles.container} ${extraClass}`;
    const imgContainerClasses = `${styles.container} ${styles.picture}`;
  
    const pictureElement = (
      <picture className={styles.picture}>
        <source srcSet={srcSet} />
        <img src={src} alt={alt} width="112" height="56" />
      </picture>
    );
    const overflowElement =
      overflow > 0 ? (
        <div className={`${imgContainerClasses} ${styles.overflow}`}>
          <div className={`${styles.picture} text text_type_main-small`}>
            +{overflow}
          </div>
        </div>
      ) : null;
  
    return (
      <div className={containerClasses}>
        <div>
          {pictureElement}
          {overflowElement}
        </div>
      </div>
    );
  };
  