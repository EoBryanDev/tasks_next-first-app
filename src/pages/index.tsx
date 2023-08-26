import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/home.module.css";
import heroImg from "../../public/assets/hero.png";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`${styles.container} ${inter.className}`}>
      <Head>
        <title>Tasks+ | Organize your tasks easily </title>
      </Head>
      <main className={styles.main}>
        <div className={styles.logoContent}>
          <Image
            className={styles.hero}
            alt='Tasks Logo'
            src={heroImg}
            priority
          />
        </div>

        <h1 className={styles.title}>
          App made up to you organize all your tasks
        </h1>

        <div className={styles.infoContent}>
          <section className={styles.box}>
            <span>+12k posts</span>
          </section>
          <section className={styles.box}>
            <span>+90 comments</span>
          </section>
        </div>
      </main>
    </div>
  );
}
