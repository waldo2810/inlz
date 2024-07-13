import { getProjects } from "./actions/get-projects";
import CreateProjectButton from "./components/create-project-button";
import ProjectList from "./components/project-list";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">My Projects</h2>

        <CreateProjectButton />
      </div>

      {!("error" in projects) && projects.length > 0 ? (
        <ProjectList projects={projects} />
      ) : (
        <div className="h-full my-auto flex items-center justify-center text-sm">
          <span>No projects yet, add some!</span>
        </div>
      )}
    </main>
  );
}
