import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./FullPizzaBlock.module.scss";

export const Skeleton = () => (
  <div className={styles.container}>
    <ContentLoader
      speed={2}
      width={1180}
      height={584}
      viewBox="0 0 1180 584"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="280" cy="260" r="260" />
      <rect x="640" y="140" rx="18" ry="18" width="380" height="32" />
      <rect x="640" y="185" rx="22" ry="22" width="520" height="45" />
      <rect x="640" y="240" rx="15" ry="15" width="520" height="88" />
      <rect x="650" y="355" rx="18" ry="18" width="110" height="35" />
      <rect x="640" y="410" rx="25" ry="25" width="125" height="45" />
    </ContentLoader>
  </div>
);
