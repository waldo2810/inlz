import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CreateProjectForm from "./create-project-form";

export default function CreateProjectButton() {
  return (
    <Sheet>
      <SheetTrigger className="bg-accent text-foreground py-3 px-4 rounded-md">
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
