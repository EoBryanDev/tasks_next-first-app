import { HTMLProps } from "react";
import styles from "./styles.module.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const TextArea = ({ ...rest }: HTMLProps<HTMLTextAreaElement>) => {
  return (
    <textarea className={`${styles.textArea} ${inter.className}`} {...rest}></textarea>
  );
};
export default TextArea;
