"use client"

import { useEffect, useRef, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import * as d3 from "d3"
import * as topojson from "topojson-client"

interface StateData {
  name: string
  properties: {
    name: string
  }
}

interface TopoJSONData {
  type: string
  objects: {
    states: {
      type: string
      geometries: Array<{
        type: string
        properties: { name: string }
        arcs: number[][]
      }>
    }
  }
  arcs: number[][][]
  transform: {
    scale: [number, number]
    translate: [number, number]
  }
}

// FIPS to state abbreviation mapping
const fipsToState: { [key: string]: string } = {
  "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA",
  "08": "CO", "09": "CT", "10": "DE", "12": "FL", "13": "GA",
  "15": "HI", "16": "ID", "17": "IL", "18": "IN", "19": "IA",
  "20": "KS", "21": "KY", "22": "LA", "23": "ME", "24": "MD",
  "25": "MA", "26": "MI", "27": "MN", "28": "MS", "29": "MO",
  "30": "MT", "31": "NE", "32": "NV", "33": "NH", "34": "NJ",
  "35": "NM", "36": "NY", "37": "NC", "38": "ND", "39": "OH",
  "40": "OK", "41": "OR", "42": "PA", "44": "RI", "45": "SC",
  "46": "SD", "47": "TN", "48": "TX", "49": "UT", "50": "VT",
  "51": "VA", "53": "WA", "54": "WV", "55": "WI", "56": "WY"
}

// Sample state data with party affiliations
// In a real app, this would come from an API or database
const stateData = {
  AL: { name: "Alabama", party: "republican", facts: "Joined the Union in 1819 as the 22nd state." },
  AK: { name: "Alaska", party: "republican", facts: "Purchased from Russia in 1867, became the 49th state in 1959." },
  AZ: { name: "Arizona", party: "republican", facts: "Became the 48th state in 1912." },
  AR: { name: "Arkansas", party: "republican", facts: "Became the 25th state in 1836." },
  CA: { name: "California", party: "democrat", facts: "Became the 31st state in 1850 during the Gold Rush." },
  CO: {
    name: "Colorado",
    party: "democrat",
    facts: "Nicknamed the 'Centennial State' as it joined the Union in 1876.",
  },
  CT: {
    name: "Connecticut",
    party: "democrat",
    facts: "One of the original 13 colonies, ratified the Constitution in 1788.",
  },
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
  MA: {
    name: "Massachusetts",
    party: "democrat",
    facts: "One of the original 13 colonies, site of the Boston Tea Party.",
  },
  MI: { name: "Michigan", party: "democrat", facts: "Became the 26th state in 1837." },
  MN: { name: "Minnesota", party: "democrat", facts: "Became the 32nd state in 1858." },
  MS: { name: "Mississippi", party: "republican", facts: "Became the 20th state in 1817." },
  MO: { name: "Missouri", party: "republican", facts: "Became the 24th state in 1821." },
  MT: { name: "Montana", party: "republican", facts: "Became the 41st state in 1889." },
  NE: { name: "Nebraska", party: "republican", facts: "Became the 37th state in 1867." },
  NV: { name: "Nevada", party: "democrat", facts: "Became the 36th state in 1864, during the Civil War." },
  NH: {
    name: "New Hampshire",
    party: "democrat",
    facts: "One of the original 13 colonies, first to declare independence from Great Britain.",
  },
  NJ: {
    name: "New Jersey",
    party: "democrat",
    facts: "One of the original 13 colonies, ratified the Constitution in 1787.",
  },
  NM: { name: "New Mexico", party: "democrat", facts: "Became the 47th state in 1912." },
  NY: {
    name: "New York",
    party: "democrat",
    facts: "One of the original 13 colonies, home to the first U.S. capital.",
  },
  NC: {
    name: "North Carolina",
    party: "republican",
    facts: "One of the original 13 colonies, site of the first powered flight.",
  },
  ND: { name: "North Dakota", party: "republican", facts: "Became the 39th state in 1889." },
  OH: { name: "Ohio", party: "republican", facts: "Became the 17th state in 1803." },
  OK: { name: "Oklahoma", party: "republican", facts: "Became the 46th state in 1907." },
  OR: { name: "Oregon", party: "democrat", facts: "Became the 33rd state in 1859." },
  PA: {
    name: "Pennsylvania",
    party: "democrat",
    facts: "One of the original 13 colonies, site of the Constitutional Convention.",
  },
  RI: { name: "Rhode Island", party: "democrat", facts: "One of the original 13 colonies, the smallest U.S. state." },
  SC: {
    name: "South Carolina",
    party: "republican",
    facts: "One of the original 13 colonies, first state to secede from the Union.",
  },
  SD: { name: "South Dakota", party: "republican", facts: "Became the 40th state in 1889." },
  TN: { name: "Tennessee", party: "republican", facts: "Became the 16th state in 1796." },
  TX: {
    name: "Texas",
    party: "republican",
    facts: "Became the 28th state in 1845 after being an independent republic.",
  },
  UT: { name: "Utah", party: "republican", facts: "Became the 45th state in 1896." },
  VT: {
    name: "Vermont",
    party: "democrat",
    facts: "Became the 14th state in 1791, first to join after the original 13.",
  },
  VA: {
    name: "Virginia",
    party: "democrat",
    facts: "One of the original 13 colonies, birthplace of 8 U.S. presidents.",
  },
  WA: { name: "Washington", party: "democrat", facts: "Became the 42nd state in 1889." },
  WV: {
    name: "West Virginia",
    party: "republican",
    facts: "Became the 35th state in 1863, splitting from Virginia during the Civil War.",
  },
  WI: { name: "Wisconsin", party: "democrat", facts: "Became the 30th state in 1848." },
  WY: {
    name: "Wyoming",
    party: "republican",
    facts: "Became the 44th state in 1890, first to grant women the right to vote.",
  },
}

export function USMap() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const { toast } = useToast()

  const handleStateClick = (stateCode: string) => {
    setSelectedState(stateCode)
    const state = stateData[stateCode as keyof typeof stateData]
    if (state) {
      toast({
        title: state.name,
        description: state.facts,
        duration: 5000,
      })
    }
  }

  const getStateColor = (stateCode: string) => {
    const state = stateData[stateCode as keyof typeof stateData]
    if (!state) return "#2d2d44" // Dark background

    if (state.party === "democrat") return "#4361ee" // Blue for Democrat
    if (state.party === "republican") return "#e94560" // Red for Republican
    return "#2d2d44" // Dark background
  }

  const getStateCode = (stateName: string): string => {
    // Convert full state names to two-letter codes
    const stateNameToCode: { [key: string]: string } = {
      "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR", "California": "CA",
      "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE", "Florida": "FL", "Georgia": "GA",
      "Hawaii": "HI", "Idaho": "ID", "Illinois": "IL", "Indiana": "IN", "Iowa": "IA",
      "Kansas": "KS", "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD",
      "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS", "Missouri": "MO",
      "Montana": "MT", "Nebraska": "NE", "Nevada": "NV", "New Hampshire": "NH", "New Jersey": "NJ",
      "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH",
      "Oklahoma": "OK", "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC",
      "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT", "Vermont": "VT",
      "Virginia": "VA", "Washington": "WA", "West Virginia": "WV", "Wisconsin": "WI", "Wyoming": "WY"
    }
    return stateNameToCode[stateName] || stateName
  }

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    const width = 960
    const height = 600

    // Clear any existing content
    svg.selectAll("*").remove()

    // Create the projection
    const projection = d3.geoAlbersUsa()
      .scale(1000)
      .translate([width / 2, height / 2])

    // Create the path generator
    const path = d3.geoPath().projection(projection)

    // Load and render the map
    d3.json<TopoJSONData>("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json")
      .then((us) => {
        if (!us) return

        const states = topojson.feature(us as any, us.objects.states) as any
        const statesMesh = topojson.mesh(us as any, us.objects.states) as any

        // Filter out DC from features
        states.features = states.features.filter((d: any) => d.properties.name !== "District of Columbia")

        // Create the paths for each state
        svg.append("g")
          .selectAll("path")
          .data(states.features)
          .join("path")
          .attr("d", path as any)
          .attr("fill", (d: any) => {
            const stateCode = getStateCode(d.properties.name)
            return getStateColor(stateCode)
          })
          .attr("stroke", "#2d2d44")
          .attr("stroke-width", 1)
          .attr("class", "cursor-pointer transition-all")
          .on("mouseenter", function(event: any, d: any) {
            const stateCode = getStateCode(d.properties.name)
            d3.select(this)
              .attr("stroke", "white")
              .attr("stroke-width", 2)
            setHoveredState(stateCode)
          })
          .on("mouseleave", function() {
            d3.select(this)
              .attr("stroke", "#2d2d44")
              .attr("stroke-width", 1)
            setHoveredState(null)
          })
          .on("click", (event: any, d: any) => {
            const stateCode = getStateCode(d.properties.name)
            handleStateClick(stateCode)
          })

        // Add state borders
        svg.append("path")
          .datum(statesMesh)
          .attr("fill", "none")
          .attr("stroke", "#2d2d44")
          .attr("stroke-width", 1)
          .attr("d", path as any)

        // Add state labels
        svg.append("g")
          .selectAll("text")
          .data(states.features)
          .join("text")
          .attr("transform", (d: any) => `translate(${path.centroid(d)})`)
          .attr("text-anchor", "middle")
          .attr("fill", "white")
          .attr("font-size", "12")
          .attr("font-weight", "bold")
          .attr("pointer-events", "none")
          .text((d: any) => getStateCode(d.properties.name))
      })
      .catch(error => {
        console.error("Error loading the map data:", error)
      })
  }, [])

  return (
    <div className="relative flex h-full w-full flex-col">
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold">The United States of America</h3>
        <p className="text-sm text-gray-400">Political Affiliation Map</p>
      </div>

      <div className="relative flex-1">
        <div className="relative h-full w-full overflow-hidden rounded-lg border border-[#2d2d44]">
          <div className="relative h-full w-full bg-[#0f172a]">
            <div className="absolute inset-0 p-4">
              <svg
                ref={svgRef}
                viewBox="0 0 960 600"
                className="h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
              />
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 rounded-md bg-[#1a1a2e] p-3 shadow-md">
          <div className="text-sm font-semibold mb-2">Legend</div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-sm bg-[#4361ee]"></div>
            <span className="text-xs">Democrat</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-sm bg-[#e94560]"></div>
            <span className="text-xs">Republican</span>
          </div>
        </div>

        {/* State info tooltip */}
        {hoveredState && (
          <div className="absolute bottom-4 left-4 rounded-md bg-[#1a1a2e] p-3 shadow-md">
            <p className="text-sm font-medium">
              {stateData[hoveredState as keyof typeof stateData]?.name || hoveredState}
            </p>
            <p className="text-xs text-gray-400">Click for more information</p>
          </div>
        )}
      </div>
    </div>
  )
}

