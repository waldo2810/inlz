export async function createProject() {
  await fetch("http://localhost:8080/projects", { method: "POST" });
}
