import Image from "next/image";

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black">
      <Image
        src="/images/loader.gif"
        alt="Loading Maya Burger"
        width={150}
        height={150}
        unoptimized
        priority
        className="h-auto w-30 sm:w-30"
      />
    </div>
  );
}