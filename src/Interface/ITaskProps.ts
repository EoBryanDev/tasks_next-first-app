export interface ITaskProps {
  item: {
    taskId: string;
    task: string;
    created: string;
    user: string;
    email: string;
    public: boolean;
  };
}
