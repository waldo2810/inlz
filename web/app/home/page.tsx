import CreateProjectButton from "./components/create-project-button";
import ProjectList from "./components/project-list";
import { getProjects } from "@/actions/projects/get";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">My Projects</h2>

        <CreateProjectButton />
      </div>

      <ProjectList projects={projects} />
    </main>
  );
}
