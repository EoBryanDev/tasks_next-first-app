import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import styles from "./styles.module.css";
import TextArea from "@/components/TextArea";

const Dashboard: React.FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Dashboard</title>
      </Head>
      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>What is your task?</h1>
            <form action=''>
              <TextArea placeholder='Type your task...' />
              <div className={styles.checkboxArea}>
                <input
                  type='checkbox'
                  className={styles.checkbox}
                  id='check-box'
                />
                <label htmlFor={styles.checkbox}>
                  Let task be seen by everyone?
                </label>
              </div>

              <button className={styles.button} type='submit'>
                Submit
              </button>
            </form>
          </div>
        </section>
        <section className={styles.taskContainer}>
          <h1>My tasks</h1>
          <article className={styles.task}>
            <div className={styles.tagContainer}>
              <label className={styles.tag}>Public</label>
              <button className={styles.shareButton}>
                <FiShare2 size={22} color='#3183ff' />
              </button>
            </div>
            <div className={styles.taskContent}>
              <p>My first exemple task is awesome...</p>
              <button className={styles.trashButton}>
                {" "}
                <FaTrash size={24} color='#ea3140' />
              </button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};
export default Dashboard;
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
