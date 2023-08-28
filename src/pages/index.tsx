import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/home.module.css";
import heroImg from "../../public/assets/hero.png";

import { db } from "@/services/FirebaseConection";
import { collection, getDocs } from "firebase/firestore";
import { IHomeProps } from "@/Interface/IHomeProps";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ comments,posts }: IHomeProps) {
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
            <span>+{posts} posts</span>
          </section>
          <section className={styles.box}>
            <span>+{comments} comments</span>
          </section>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const commentRef = collection(db, "comments");
  const postRef = collection(db, "tasks");

  const commentSnapshot = await getDocs(commentRef);
  const tasksSnapshot = await getDocs(postRef);
  

  return {
    props: {
      posts: tasksSnapshot.size || 0,
      comments: commentSnapshot.size || 0,
    },
    revalidate: 60 * 60 // an hour
  };
};
