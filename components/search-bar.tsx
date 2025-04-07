"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { presidents } from "@/components/presidential-showcase"
import { useRouter } from "next/navigation"

// Import state data from us-map component
const stateData = {
  AL: { name: "Alabama", party: "republican", facts: "Joined the Union in 1819 as the 22nd state." },
  AK: { name: "Alaska", party: "republican", facts: "Purchased from Russia in 1867, became the 49th state in 1959." },
  AZ: { name: "Arizona", party: "republican", facts: "Became the 48th state in 1912." },
  AR: { name: "Arkansas", party: "republican", facts: "Became the 25th state in 1836." },
  CA: { name: "California", party: "democrat", facts: "Became the 31st state in 1850 during the Gold Rush." },
  CO: { name: "Colorado", party: "democrat", facts: "Nicknamed the 'Centennial State' as it joined the Union in 1876." },
  CT: { name: "Connecticut", party: "democrat", facts: "One of the original 13 colonies, ratified the Constitution in 1788." },
  DE: { name: "Delaware", party: "democrat", facts: "The first state to ratify the Constitution in 1787." },
  FL: { name: "Florida", party: "republican", facts: "Became the 27th state in 1845." },
  GA: { name: "Georgia", party: "republican", facts: "One of the original 13 colonies, founded in 1732." },
  HI: { name: "Hawaii", party: "democrat", facts: "The most recent state to join the Union in 1959." },
  ID: { name: "Idaho", party: "republican", facts: "Became the 43rd state in 1890." },
  IL: { name: "Illinois", party: "democrat", facts: "Became the 21st state in 1818." },
  IN: { name: "Indiana", party: "republican", facts: "Became the 19th state in 1816." },
  IA: { name: "Iowa", party: "republican", facts: "Became the 29th state in 1846." },
  KS: { name: "Kansas", party: "republican", facts: "Became the 34th state in 1861." },
  KY: { name: "Kentucky", party: "republican", facts: "Became the 15th state in 1792." },
  LA: { name: "Louisiana", party: "republican", facts: "Became the 18th state in 1812." },
  ME: { name: "Maine", party: "democrat", facts: "Became the 23rd state in 1820." },
  MD: { name: "Maryland", party: "democrat", facts: "One of the original 13 colonies, founded in 1634." },
  MA: { name: "Massachusetts", party: "democrat", facts: "One of the original 13 colonies, site of the Boston Tea Party." },
  MI: { name: "Michigan", party: "democrat", facts: "Became the 26th state in 1837." },
  MN: { name: "Minnesota", party: "democrat", facts: "Became the 32nd state in 1858." },
  MS: { name: "Mississippi", party: "republican", facts: "Became the 20th state in 1817." },
  MO: { name: "Missouri", party: "republican", facts: "Became the 24th state in 1821." },
  MT: { name: "Montana", party: "republican", facts: "Became the 41st state in 1889." },
  NE: { name: "Nebraska", party: "republican", facts: "Became the 37th state in 1867." },
  NV: { name: "Nevada", party: "democrat", facts: "Became the 36th state in 1864, during the Civil War." },
  NH: { name: "New Hampshire", party: "democrat", facts: "One of the original 13 colonies, first to declare independence from Great Britain." },
  NJ: { name: "New Jersey", party: "democrat", facts: "One of the original 13 colonies, ratified the Constitution in 1787." },
  NM: { name: "New Mexico", party: "democrat", facts: "Became the 47th state in 1912." },
  NY: { name: "New York", party: "democrat", facts: "One of the original 13 colonies, home to the first U.S. capital." },
  NC: { name: "North Carolina", party: "republican", facts: "One of the original 13 colonies, site of the first powered flight." },
  ND: { name: "North Dakota", party: "republican", facts: "Became the 39th state in 1889." },
  OH: { name: "Ohio", party: "republican", facts: "Became the 17th state in 1803." },
  OK: { name: "Oklahoma", party: "republican", facts: "Became the 46th state in 1907." },
  OR: { name: "Oregon", party: "democrat", facts: "Became the 33rd state in 1859." },
  PA: { name: "Pennsylvania", party: "democrat", facts: "One of the original 13 colonies, site of the Constitutional Convention." },
  RI: { name: "Rhode Island", party: "democrat", facts: "One of the original 13 colonies, the smallest U.S. state." },
  SC: { name: "South Carolina", party: "republican", facts: "One of the original 13 colonies, first state to secede from the Union." },
  SD: { name: "South Dakota", party: "republican", facts: "Became the 40th state in 1889." },
  TN: { name: "Tennessee", party: "republican", facts: "Became the 16th state in 1796." },
  TX: { name: "Texas", party: "republican", facts: "Became the 28th state in 1845 after being an independent republic." },
  UT: { name: "Utah", party: "republican", facts: "Became the 45th state in 1896." },
  VT: { name: "Vermont", party: "democrat", facts: "Became the 14th state in 1791, first to join after the original 13." },
  VA: { name: "Virginia", party: "democrat", facts: "One of the original 13 colonies, birthplace of 8 U.S. presidents." },
  WA: { name: "Washington", party: "democrat", facts: "Became the 42nd state in 1889." },
  WV: { name: "West Virginia", party: "republican", facts: "Became the 35th state in 1863, splitting from Virginia during the Civil War." },
  WI: { name: "Wisconsin", party: "democrat", facts: "Became the 30th state in 1848." },
  WY: { name: "Wyoming", party: "republican", facts: "Became the 44th state in 1890, first to grant women the right to vote." },
}

type SearchResult = {
  type: "state" | "president"
  name: string
  details: string
  link?: string
}

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) {
      setResults([])
      return
    }

    const searchTermLower = searchTerm.toLowerCase()

    // Search states
    const stateResults = Object.entries(stateData)
      .filter(([code, state]) => 
        state.name.toLowerCase().includes(searchTermLower) ||
        code.toLowerCase().includes(searchTermLower)
      )
      .map(([code, state]): SearchResult => ({
        type: "state",
        name: state.name,
        details: `${state.party.charAt(0).toUpperCase() + state.party.slice(1)} state`,
      }))

    // Search presidents
    const presidentResults = presidents
      .filter(president => 
        president.name.toLowerCase().includes(searchTermLower) ||
        president.party.toLowerCase().includes(searchTermLower)
      )
      .map((president): SearchResult => ({
        type: "president",
        name: president.name,
        details: `${president.party} • ${president.years}`,
        link: "/presidents"
      }))

    setResults([...stateResults, ...presidentResults].slice(0, 8))
    setShowResults(true)
  }

  const handleResultClick = (result: SearchResult) => {
    if (result.link) {
      router.push(result.link)
    }
    setShowResults(false)
    setSearchTerm("")
  }

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search states or presidents..."
            className="border-[#2d2d44] bg-[#16213e] pl-8 text-white placeholder:text-gray-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              handleSearch(e as any)
            }}
            onFocus={() => setShowResults(true)}
          />
        </div>
        <Button type="submit" variant="default" className="bg-[#e94560] hover:bg-[#c13050]">
          Search
        </Button>
      </form>

      {showResults && results.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-[#2d2d44] bg-[#1a1a2e] py-1 shadow-lg">
          {results.map((result, index) => (
            <div
              key={index}
              className="cursor-pointer px-4 py-2 hover:bg-[#2d2d44]"
              onClick={() => handleResultClick(result)}
            >
              <div className="flex items-center justify-between">
                <span className="text-white">{result.name}</span>
                <span className="text-xs text-gray-400">{result.type}</span>
              </div>
              <p className="text-sm text-gray-400">{result.details}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

