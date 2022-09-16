import Image from "next/image";
import Link from "next/link";
import logo from "../public/adoption-logo.svg";
import styles from "../styles/Layout.module.css";

const Layout = ({ children, hasLogo = true }) => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          {hasLogo ? (
            <Link href={"/"}>
              <a>
                <Image src={logo} alt="logo" />
              </a>
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.menu}>
          <Link href={"/gallery"}>
            <a className={styles["menu-item"]}>Gallery</a>
          </Link>
          <Link href={"/search"}>
            <a className={styles["menu-item"]}>Search</a>
          </Link>
          <Link href={"/join"}>
            <a className={styles["menu-item"]}>Join us</a>
          </Link>
        </div>
      </header>

      {children}

      <footer></footer>
    </>
  );
};

export default Layout;
