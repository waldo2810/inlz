"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type ProjectListProps = {
  projects: Project[];
};

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="my-8 grid grid-cols-3 gap-3">
      {projects.map((project: Project) => (
        <Card className="max-w-96 hover:bg-secondary/50">
          <Link href={`${"/projects/1"}`}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>Project description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Project tasks</p>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}
