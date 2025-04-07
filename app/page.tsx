import type { Metadata } from "next"
import Link from "next/link"
import { USMap } from "@/components/us-map"
import { PresidentialShowcase } from "@/components/presidential-showcase"
import { SearchBar } from "@/components/search-bar"
import { BarChart, LineChart } from "lucide-react"

export const metadata: Metadata = {
  title: "Presidential Atlas",
  description: "Interactive atlas of U.S. presidents and electoral history",
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a2e] text-white">
      <header className="sticky top-0 z-10 border-b border-[#2d2d44] bg-[#1a1a2e] px-4 py-3 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-[#e94560]"
            >
              <path d="M2 20h.01"></path>
              <path d="M7 20v-4"></path>
              <path d="M12 20v-8"></path>
              <path d="M17 20V8"></path>
              <path d="M22 4v16"></path>
            </svg>
            <h1 className="text-xl font-bold">Presidential Atlas</h1>
          </div>
          <nav className="hidden md:block">
            <ul className="flex gap-6">
              <li>
                <Link href="/" className="font-medium text-[#e94560]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/presidents" className="font-medium text-gray-300 hover:text-[#e94560]">
                  Presidents
                </Link>
              </li>
              <li>
                <Link href="/elections" className="font-medium text-gray-300 hover:text-[#e94560]">
                  Elections
                </Link>
              </li>
              <li>
                <Link href="/about" className="font-medium text-gray-300 hover:text-[#e94560]">
                  About
                </Link>
              </li>
            </ul>
          </nav>
          <button className="rounded-full p-2 text-gray-300 hover:bg-[#2d2d44] md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>
      <main className="flex-1 bg-[#16213e] px-4 py-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <section className="rounded-lg bg-[#1a1a2e] p-6 shadow-md">
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-bold">Interactive U.S. Map</h2>
                <p className="text-sm text-gray-400">Explore states and their political affiliations</p>
              </div>
              <SearchBar />
            </div>
            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-[#2d2d44] bg-[#16213e] p-4 md:aspect-[16/9]">
              <USMap />
            </div>
          </section>

          <section className="rounded-lg bg-[#1a1a2e] p-6 shadow-md">
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-bold">Presidential Showcase</h2>
                <p className="text-sm text-gray-400">All 46 U.S. presidents and their history</p>
              </div>
              <div className="flex gap-2">
                <button className="inline-flex items-center gap-1 rounded-md border border-[#2d2d44] bg-[#16213e] px-3 py-1.5 text-sm font-medium text-gray-300 shadow-sm hover:bg-[#2d2d44]">
                  <BarChart className="h-4 w-4" />
                  <span>Election Data</span>
                </button>
                <button className="inline-flex items-center gap-1 rounded-md border border-[#2d2d44] bg-[#16213e] px-3 py-1.5 text-sm font-medium text-gray-300 shadow-sm hover:bg-[#2d2d44]">
                  <LineChart className="h-4 w-4" />
                  <span>Timeline</span>
                </button>
              </div>
            </div>
            <PresidentialShowcase />
          </section>
        </div>
      </main>
      <footer className="border-t border-[#2d2d44] bg-[#1a1a2e] px-4 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Presidential Atlas. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-[#e94560]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#e94560]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#e94560]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

