export function TaskDescription({ task }: { task: Task }) {
  return (
    <div key={task.id} className="flex flex-col py-2">
      <h3 className="font-semibold">{task.title}</h3>
      <div>
        <p className="text-sm">{task.description}</p>
      </div>
    </div>
  );
}
