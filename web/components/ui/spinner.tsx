import Image from "next/image";

export function Spinner() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image
        src="/loading.svg"
        alt="Loading"
        className="dark:invert"
        width={20}
        height={20}
        priority
      />
    </div>
  );
}
