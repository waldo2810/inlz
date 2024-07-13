import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CreateProjectForm from "./create-project-form";
import { Plus } from "lucide-react";

export default function CreateProjectButton() {
  return (
    <Sheet>
      <SheetTrigger className="bg-foreground text-background hover:bg-foreground/90 h-9 rounded-md px-3 rounded-md flex items-center justify-between gap-2 text-sm">
        <Plus size={16} />
        Create project
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a new project</SheetTitle>
          <SheetDescription>
            Manage group of tasks inside a project.
          </SheetDescription>
        </SheetHeader>
        <CreateProjectForm />
      </SheetContent>
    </Sheet>
  );
}
