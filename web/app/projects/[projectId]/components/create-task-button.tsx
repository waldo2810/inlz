import CreateProjectForm from "@/app/home/components/create-project-form";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { CreateTaskForm } from "./form/create-task-form";

type CreateTaskButtonProps = {
  project: Project;
};

export function CreateTaskButton({ project }: CreateTaskButtonProps) {
  return (
    <Sheet>
      <SheetTrigger className="bg-foreground text-background hover:bg-foreground/90 h-9 rounded-md px-3 rounded-md flex items-center justify-between gap-2 text-sm">
        <Plus size={16} />
        Create task
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a new task</SheetTitle>
          <SheetDescription>Add a new task to you project.</SheetDescription>
        </SheetHeader>
        <CreateTaskForm project={project} />
      </SheetContent>
    </Sheet>
  );
}
