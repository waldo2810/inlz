import { getProjectTasks } from "../actions/get-project-tasks";
import { TaskDescription } from "./task/task-description";
import { TaskInfo } from "./task/task-info";

type ProjectTasksProps = {
  project: Project;
};

export async function ProjectTasks({ project }: ProjectTasksProps) {
  const tasks: Task[] = await getProjectTasks(project.id);

  if (tasks.length < 0) {
    return <div>There are no tasks yet. Add some!</div>;
  }

  return (
    <div className="my-10 w-full divide divide-y">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center justify-between">
          <TaskDescription task={task} />
          <TaskInfo task={task} />
        </div>
      ))}
    </div>
  );
}
