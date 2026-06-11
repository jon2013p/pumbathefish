import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-900 to-cyan-700">
      <div className="text-center">
        <Image
          src="/goldfish.svg"
          alt="Pumba the Goldfish"
          width={300}
          height={300}
          className="mx-auto drop-shadow-2xl"
          priority
        />
        <h1 className="mt-8 text-5xl font-bold text-white drop-shadow-lg">
          In Honor of Pumba the Fish
        </h1>
        <p className="mt-4 text-xl text-cyan-200">
          A legendary fish. Gone but never forgotten.
        </p>
      </div>
    </div>
  );
}
