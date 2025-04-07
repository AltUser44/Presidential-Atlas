import { PresidentialShowcase } from "@/components/presidential-showcase"

export default function PresidentsPage() {
  return (
    <main className="min-h-screen bg-[#0f0f1a] pb-8">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold text-white">Presidential History</h1>
        <p className="mb-8 text-lg text-gray-300">
          Explore the history of American presidents from George Washington to Joe Biden. Click on any president to learn more
          about their presidency, achievements, and historical impact.
        </p>
        <PresidentialShowcase />
      </div>
    </main>
  )
} 