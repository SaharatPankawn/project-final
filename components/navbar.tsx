import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full bg-[#090C10] shadow-lg">
      <div className="flex items-center justify-between px-8 py-4">
        <h1 className="text-base font-semibold">Project Log</h1>
        <div className="space-x-4">
          <Link href="/login">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-[16px] font-medium px-4 py-2 rounded">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
