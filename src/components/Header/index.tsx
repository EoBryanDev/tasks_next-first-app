import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./styles.module.css";

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <nav className={styles.nav}>
          <Link href='/'>
            <h1 className={styles.logo}>
              Tasks <span>+</span>
            </h1>
          </Link>
          {(session?.user && (
            <Link href='/dashboard' className={styles.link}>
              My Dashboard
            </Link>
          )) ||
            ""}
        </nav>

        {status === "loading" ? (
          <></>
        ) : session ? (
          <button
            type='button'
            className={styles.loginButton}
            onClick={() => signOut()}
          >
            <span>Hello {session?.user?.name}</span>
          </button>
        ) : (
          <button
            type='button'
            className={styles.loginButton}
            onClick={() => signIn("google")}
          >
            <span>Login</span>
          </button>
        )}
      </section>
    </header>
  );
};
export default Header;
