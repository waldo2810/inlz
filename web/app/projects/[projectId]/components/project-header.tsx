import { CreateTaskButton } from "./create-task-button";

type ProjectHeaderProps = {
  project: Project;
};

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-semibold">{project.name}</h3>
        <p>{project.description}</p>
      </div>
      <CreateTaskButton project={project} />
    </div>
  );
}
