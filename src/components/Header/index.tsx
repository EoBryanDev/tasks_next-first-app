import Link from "next/link";
import styles from "./styles.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <nav className={styles.nav}>
          <Link href='/'>
            <h1 className={styles.logo}>Tasks <span>+</span></h1>
          </Link>
          <Link href='/dashboard' className={styles.link}>My Dashboard
          </Link>
        </nav>
       

        <button type="button" className={styles.loginButton}>
            <span>Login</span>
        </button>
     
      </section>
    </header>
  );
};
export default Header;
