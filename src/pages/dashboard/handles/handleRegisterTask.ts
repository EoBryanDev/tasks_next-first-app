import { addDoc, collection } from "firebase/firestore";
import { db } from "@/services/FirebaseConection";

export const handleRegisterTask = async (
  taskArea: string,
  setTaskArea: (taskArea: string) => void,
  publicTask: boolean,
  setPublicTask: (publicTask: boolean) => void,
  user: { name: string; email: string },
  e: React.FormEvent<HTMLFormElement>
) => {
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
