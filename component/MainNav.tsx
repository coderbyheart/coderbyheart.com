import { Link } from "./Link.tsx";

import heart from "./heart.svg";

import styles from "./MainNav.module.css";

export const MainNav = ({ className }: { className?: string }) => (
  <nav class={`${styles.nav} ${className ?? ""}`}>
    <div class={styles.wrapper}>
      <a class={styles.logo} href={"/"}>
        coder.by(
        <img src={heart} alt="❤️" class={styles.heart} />)
      </a>
      <div class={styles.content}>
        <Link to={"/"}>Home</Link>
        <Link to={"/archive"}>Blog</Link>
        <Link to={"/talks"}>Talks</Link>
        <Link to={"/communities"}>Communities</Link>
      </div>
    </div>
  </nav>
);
