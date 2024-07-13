type Project = {
  id: string;
  name: string;
  description?: string;
  userId?: string;
};

type CreateProjectResponse = {
  results: Project[];
  numberOfResults: number;
};
