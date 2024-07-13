import { Suspense } from "react";
import { getProjectById } from "./actions/get-project-by-id";
import { ProjectHeader } from "./components/project-header";
import { ProjectTasks } from "./components/project-tasks";
import { Spinner } from "@/components/ui/spinner";

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project: Project = await getProjectById(params.projectId);
  return (
    <div>
      <ProjectHeader project={project} />
      <Suspense fallback={<Spinner />}>
        <ProjectTasks project={project} />
      </Suspense>
    </div>
  );
}
