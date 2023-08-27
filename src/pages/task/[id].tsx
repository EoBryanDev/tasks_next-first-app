import { GetServerSideProps } from "next";
import Head from "next/head";
import styles from "./styles.module.css";
import { db } from "@/services/FirebaseConection";
import { doc, getDoc } from "firebase/firestore";

const Task: React.FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Task Details</title>
      </Head>
      <main className={styles.main}>
        <h1>Task</h1>
      </main>
    </div>
  );
};

export default Task;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const docRef = doc(db, "tasks", id);

  const snapshot = await getDoc(docRef);

  if (snapshot === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!snapshot.data()?.public) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const miliseconds = snapshot.data()?.created?.seconds * 1000;
  const task = {
    taskId: id,
    task: snapshot.data()?.task,
    created: new Date(miliseconds).toLocaleDateString(),
    user: snapshot.data()?.user,
    email: snapshot.data()?.email,
    public: snapshot.data()?.public,
  };
  return {
    props: { task },
  };
};
