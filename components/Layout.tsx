import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.webp";
import styles from "../styles/Layout.module.css";

const Layout: React.FunctionComponent<{
  children: any;
  hasLogo?: boolean;
  showOrgMenu?: boolean;
}> = ({ children, hasLogo = true, showOrgMenu = false }) => {
  return (
    <>
      <header className={styles.header}>
        {hasLogo ? (
          <Link href="/">
            <a className={styles["logo-wrapper"]}>
              <div className={styles["logo"]}>
                <Image
                  src={logo}
                  alt="logo"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </a>
          </Link>
        ) : (
          <></>
        )}
        <div className={styles.menu}>
          <Link href={"/gallery"}>
            <a className={styles["menu-item"]}>Gallery</a>
          </Link>
          <Link href={"/search"}>
            <a className={styles["menu-item"]}>Search</a>
          </Link>
          <Link href={"/join"}>
            <a className={styles["menu-item"]}>Sign up</a>
          </Link>
          <Link href={"/enter"}>
            <a className={styles["menu-item"]}>Sign in</a>
          </Link>
        </div>
      </header>
      {showOrgMenu ? (
        <nav className={styles.header}>
          <div className={styles.menu}>
            <Link href={"/create"}>
              <a className={styles["menu-item"]}>Create</a>
            </Link>
          </div>
        </nav>
      ) : (
        <></>
      )}

      {children}

      <footer></footer>
    </>
  );
};

export default Layout;
