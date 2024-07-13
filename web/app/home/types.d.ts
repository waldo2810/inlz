type Project = {
  name: string;
  description?: string;
  userId?: string;
};

type CreateProjectResponse = {
  results: Project[];
  numberOfResults: number;
};
