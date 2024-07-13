import { getProjectById } from "./actions/get-project-by-id";

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project: Project = await getProjectById(params.projectId);
  return (
    <div className="w-[90%] md:w-[60%] mx-auto py-5">
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-semibold">{project.name}</h3>
        <p>{project.description}</p>
      </div>
    </div>
  );
}
