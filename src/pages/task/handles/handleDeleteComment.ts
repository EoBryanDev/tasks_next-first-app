import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/services/FirebaseConection";
import { ICommentProps } from "@/Interface/ICommentProps";

export const handleDeleteComment = async (
  id: string,
  comments: ICommentProps[],
  setComments: (comments: ICommentProps[]) => void
) => {
  try {
    const taskRef = doc(db, "comments", id);
    await deleteDoc(taskRef);

    const deleteTask = comments.filter((item) => item.id !== id);

    setComments(deleteTask);
  } catch (error) {
    console.log(error);
  }
};
