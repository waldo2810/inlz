export async function getProjects() {
  const res = await fetch("http://localhost:8080/projects");
  const data = await res.json();
  return data as Project[];
}
