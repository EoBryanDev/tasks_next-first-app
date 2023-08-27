import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import styles from "./styles.module.css";
import TextArea from "@/components/TextArea";

import { db } from "@/services/FirebaseConection";
import {
  addDoc,
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
} from "firebase/firestore";
import { IDashboardProps } from "@/Interface/IDashboardProps";
import { ITaskList } from "@/Interface/ITaskList";

const Dashboard: React.FC<IDashboardProps> = ({ user }: IDashboardProps) => {
  const [taskArea, setTaskArea] = useState("");
  const [publicTask, setPublicTask] = useState(false);

  const [taskList, setTaskList] = useState<ITaskList[]>([]);

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublicTask(e.target.checked);
  };

  useEffect(() => {
    const loadTasks = async () => {
      const taskRef = collection(db, "tasks");
      const queryTask = query(
        taskRef,
        orderBy("created", "desc"),
        where("email", "==", user.email)
      );

      onSnapshot(queryTask, (snapshot) => {
        let taskSnap = [] as ITaskList[];


        snapshot.forEach((doc) => {
          taskSnap.push({
            id: doc.id,
            task: doc.data().task,
            created: doc.data().created,
            user: doc.data().user,
            email: doc.data().email,
            public: doc.data().public,
          });
        });
        setTaskList(taskSnap);
      });
    };
    console.log('here');
    

    loadTasks();
  }, [user.email]);

  const handleRegisterTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskArea === "") {
      alert("you must type something to submit your new task!");
      return;
    }
    try {
      await addDoc(collection(db, "tasks"), {
        task: taskArea,
        created: new Date(),
        user: user.name,
        email: user.email,
        public: publicTask,
      });
      setTaskArea("");
      setPublicTask(false);
    } catch (error) {
      console.log(error);
    }
    alert("submitted");
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>My Dashboard</title>
      </Head>
      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>What is your task?</h1>
            <form onSubmit={handleRegisterTask}>
              <TextArea
                placeholder='Type your task...'
                value={taskArea}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setTaskArea(e.target.value);
                }}
              />
              <div className={styles.checkboxArea}>
                <input
                  type='checkbox'
                  className={styles.checkbox}
                  id='check-box'
                  checked={publicTask}
                  onChange={handleCheckbox}
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
          <div className={styles.taskOver}>
            {taskList.map((data: ITaskList) => (
              <article className={styles.task} key={data.id}>
                {data.public && (
                  <div className={styles.tagContainer}>
                    <label className={styles.tag}>Public</label>
                    <button className={styles.shareButton}>
                      <FiShare2 size={22} color='#3183ff' />
                    </button>
                  </div>
                )}

                <div className={styles.taskContent}>
                  <p>{data.task}</p>
                  <button className={styles.trashButton}>
                    <FaTrash size={24} color='#ea3140' />
                  </button>
                </div>
              </article>
            ))}
          </div>
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
    props: {
      user: {
        name: session.user.name,
        email: session.user.email,
      },
    },
  };
};
