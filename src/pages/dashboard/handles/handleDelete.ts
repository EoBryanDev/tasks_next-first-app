import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/services/FirebaseConection";

export const handleDeleteTask = async (id: string) => {
    const taskRef = doc(db, "tasks", id);
    await deleteDoc(taskRef);
  };