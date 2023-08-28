import { useState } from "react";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styles from "./styles.module.css";
import { db } from "@/services/FirebaseConection";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { ITaskProps } from "@/Interface/ITaskProps";
import TextArea from "@/components/TextArea";
import { handleComment } from "./handles/handleComment";
import { handleSubmit } from "./handles/handleSubmit";
import { ICommentProps } from "@/Interface/ICommentProps";
import { FaTrash } from "react-icons/fa";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Task: React.FC<ITaskProps> = ({ item, allComments }: ITaskProps) => {
  const { data: session, status } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<ICommentProps[]>(allComments || []);
  return (
    <div className={`${styles.container} ${inter.className}`}>
      <Head>
        <title>Task - Task Details</title>
      </Head>
      <main className={styles.main}>
        <h1>Task</h1>
        <article className={styles.task}>
          <p>{item?.task}</p>
        </article>
      </main>

      <section className={styles.commentsContainer}>
        <h2>Comment</h2>

        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            handleSubmit(
              e,
              comment,
              setComment,
              session,
              item?.taskId,
              comments,
              setComments
            )
          }
        >
          <TextArea
            placeholder='Type your comments..'
            value={comment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleComment(e, setComment)
            }
          />
          <button disabled={!session?.user} className={styles.button}>
            Post it!
          </button>
        </form>
      </section>

      <section className={styles.commentsContainer}>
        <h2>All Comments</h2>
        <div className={styles.grid}>
          {(comments.length === 0 && (
            <span>There was not found any comments...</span>
          )) ||
            comments.map((it) => (
              <article key={it.id} className={styles.comment}>
                <div className={styles.headComment}>
                  <label className={styles.commentLabel}>{it.name}</label>
                  {session?.user?.email === it.user && (
                    <button className={styles.buttonTrash}>
                      <FaTrash size={18} color='#ea3140' />
                    </button>
                  )}
                </div>
                <p>{it.comment}</p>
              </article>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Task;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const docRef = doc(db, "tasks", id);

  const q = query(collection(db, "comments"), where("taskId", "==", id));

  const snapshotComments = await getDocs(q);

  let allComments: ICommentProps[] = [];
  snapshotComments.forEach((c) => {
    allComments.push({
      id: c.id,
      comment: c.data().comment,
      user: c.data().email,
      name: c.data().user,
      taskId: c.data().taskId,
    });
  });

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
    props: { item: task, allComments: allComments },
  };
};
