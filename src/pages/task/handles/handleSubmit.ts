import { addDoc, collection } from "firebase/firestore";
import { db } from "@/services/FirebaseConection";
import { ICommentProps } from "@/Interface/ICommentProps";

export const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  comment: string,
  setComment: (comment: string) => void,
  session: any,
  taskId: string,
  comments: ICommentProps[],
  setComments: (comments: ICommentProps[]) => void
) => {
  e.preventDefault();

  if (comment === "") {
    alert("Type any comment to submit!");
    return;
  }

  if (!session?.user?.email || !session?.user.name) {
    alert("To comment you must be logged in!");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "comments"), {
      comment,
      created: new Date(),
      user: session?.user?.name,
      email: session?.user?.email,
      taskId,
    });

    const data = {
      id: docRef.id,
      comment,
      name: session?.user?.name,
      user: session?.user?.email,
      taskId,
    };

    let newArray = [...comments, data]

    setComments(newArray);
    setComment("");
  } catch (error) {
    console.log(error);
  }
};
