import { HTMLProps } from "react";
import styles from "./styles.module.css";

const TextArea = ({ ...rest }: HTMLProps<HTMLTextAreaElement>) => {
  return (
    <textarea className={styles.textArea} {...rest}></textarea>
  );
};
export default TextArea;