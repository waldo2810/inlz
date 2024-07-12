import { projects } from "@/db";
import CreateProjectButton from "./components/create-project-button";
import ProjectList from "./components/project-list";

export default function Home() {
  console.log(projects);
  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">My Projects</h2>

        <CreateProjectButton />
      </div>

      <ProjectList projects={projects} />
    </main>
  );
}
