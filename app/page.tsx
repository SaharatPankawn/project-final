import Navbar from "../components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#090C10] text-white">
      <Navbar />
      <main className="flex flex-col items-center justify-center h-[80vh]">
        <h2 className="text-3xl font-bold mb-4">Welcome to Project Log</h2>
        <p className="text-gray-400">Your deployment dashboard starts here.</p>
      </main>
    </div>
  );
}
