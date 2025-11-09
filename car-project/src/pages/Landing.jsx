import React from "react";
import styles from "./Landing.module.css";

export default function Landing({ onStart }) {
  return (
    <div className={styles.landing}>
      {/* Top-left badge */}
      <div className={styles["brand-badge"]}>
        <span className={styles["brand-icon"]}>▲</span>
        Rev-Enue
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles["hero-copy"]}>
          <div className={styles.deco}>
            <span className={`${styles.bar} ${styles["bar-lg"]}`} />
            <span className={`${styles.bar} ${styles["bar-sm"]}`} />
          </div>
          <h1 className={styles["hero-title"]}>Buckle Up</h1>
        </div>

        <div className={styles["hero-art"]}>
          <img src="/images/hero-car.png" alt="Sports car" />
        </div>
      </section>

      {/* Dark purpose band */}
      <section className={styles.purpose}>
        <div className={styles["purpose-inner"]}>
          <h2>Our Purpose</h2>
          <p>
            Rev-enue is a site fueled with funds and driven by dollars!
            Our purpose is to provide potential customers with a resource
            that allows them to find the most cost effective and satisfactory
            vehicle to their everyday functionality and aesthetic needs!
          </p>
        </div>
      </section>

      {/* Floating page button (acts as next / start) */}
      <button className={styles.pager} onClick={onStart} aria-label="Next">
        Start
      </button>
    </div>
  );
}
