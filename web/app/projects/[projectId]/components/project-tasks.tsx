import { getProjectTasks } from "../actions/get-project-tasks";

type ProjectTasksProps = {
  project: Project;
};

export async function ProjectTasks({ project }: ProjectTasksProps) {
  const tasks: Task[] = await getProjectTasks(project.id);

  if (tasks.length < 0) {
    return <div>There are no tasks yet. Add some!</div>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
}
