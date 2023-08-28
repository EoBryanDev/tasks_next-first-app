import { ICommentProps } from "./ICommentProps";

export interface ITaskProps {
  item: {
    taskId: string;
    task: string;
    created: string;
    user: string;
    email: string;
    public: boolean;
  };
  allComments: ICommentProps[]
}
