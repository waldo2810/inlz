type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  projectId: string;
  createdAt: string;
  updateAt: string;
};
