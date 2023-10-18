import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="flex flex-col">
        <p>Minesweeper</p>
        <p>Settings:</p>
        <p>to be continued...</p>
        <Link href="/game"><span className="text-blue-600">click</span> to go to minesweeper</Link>
      </div>
    </main>
  )
}
