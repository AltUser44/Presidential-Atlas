"use client"

import { presidents, type President } from "@/components/presidential-showcase"

export default function ElectionsPage() {
  // Group elections by year
  const elections = presidents.reduce((acc: Record<string, President[]>, president: President) => {
    const year = president.years.split("-")[0]
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(president)
    return acc
  }, {})

  return (
    <main className="min-h-screen bg-[#0f0f1a] pb-8">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold text-white">Presidential Elections</h1>
        <p className="mb-8 text-lg text-gray-300">
          A chronological history of U.S. presidential elections, including winners, opponents, and key campaign details.
        </p>

        <div className="space-y-8">
          {Object.entries(elections)
            .sort((a, b) => Number(b[0]) - Number(a[0]))
            .map(([year, presidents]) => (
              <div key={year} className="group rounded-lg border border-[#2d2d44] bg-[#1a1a2e] p-6 transition-all hover:border-[#e94560]/50">
                <h2 className="mb-4 text-2xl font-bold text-[#e94560]">Inauguration of {year}</h2>
                {presidents.map((president) => (
                  <div key={president.id} className="mb-4 border-b border-[#2d2d44] pb-4 last:border-0 last:pb-0">
                    <h3 className="text-xl font-semibold text-white">{president.name}</h3>
                    <p className="mt-2 text-gray-300">{president.election}</p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-md bg-[#2d2d44]/30 p-3">
                        <span className="text-sm font-medium text-[#e94560]">Opponent:</span>
                        <span className="ml-2 text-sm text-gray-300">{president.opponent}</span>
                      </div>
                      <div className="rounded-md bg-[#2d2d44]/30 p-3">
                        <span className="text-sm font-medium text-[#e94560]">Party:</span>
                        <span className="ml-2 text-sm text-gray-300">{president.party}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </main>
  )
} 