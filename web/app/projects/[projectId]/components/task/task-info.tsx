import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cookies } from "next/headers";

function getStatus(status: TaskStatus) {
  switch (status) {
    case "TODO":
      return (
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-gray-500"></div>
          <span>Por hacer</span>
        </div>
      );

    case "IN_PROGRESS":
      return (
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
          <span>En progreso</span>
        </div>
      );

    case "DONE":
      return (
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span>Hecho</span>
        </div>
      );
  }
}

export function TaskInfo({ task }: { task: Task }) {
  async function handleTaskStatusUpdate(value: string) {
    "use server";

    try {
      const token = cookies().get(
        process.env.NEXT_PUBLIC_TOKEN_NAME as string
      )?.value;
      await fetch(
        `http://localhost:8080/tasks/status?taskId=${task.id}&status=${value}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <p className="text-xs text-gray-700 font-medium">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>

      <Select onValueChange={handleTaskStatusUpdate}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder={getStatus(task.status)} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Estado</SelectLabel>
            <SelectItem value="TODO">{getStatus("TODO")}</SelectItem>
            <SelectItem value="IN_PROGRESS">
              {getStatus("IN_PROGRESS")}
            </SelectItem>
            <SelectItem value="DONE">{getStatus("DONE")}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
