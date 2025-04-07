export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0f0f1a] pb-8">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold text-white">About Presidential Atlas</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-gray-300">
            Presidential Atlas is a comprehensive digital archive dedicated to preserving and presenting the rich history of
            American presidency. Our platform offers detailed information about all 46 U.S. presidents, from George Washington
            to Joe Biden, including their achievements, election details, and historical impact.
          </p>

          <div className="mt-8 rounded-lg border border-[#2d2d44] bg-[#1a1a2e] p-6">
            <h2 className="text-2xl font-bold text-[#e94560]">Features</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-300">
              <li>Complete biographical information for all U.S. presidents</li>
              <li>Detailed election history and campaign information</li>
              <li>High-quality presidential portraits</li>
              <li>Interactive timeline of presidential succession</li>
              <li>Comprehensive database of presidential achievements and key events</li>
            </ul>
          </div>

          <div className="mt-8 rounded-lg border border-[#2d2d44] bg-[#1a1a2e] p-6">
            <h2 className="text-2xl font-bold text-[#e94560]">Our Mission</h2>
            <p className="mt-4 text-gray-300">
              Our mission is to make American presidential history accessible and engaging for everyone. We strive to provide
              accurate, comprehensive, and unbiased information about the U.S. presidency, helping visitors understand the
              evolution of this crucial institution and its impact on American democracy.
            </p>
          </div>

          <div className="mt-8 rounded-lg border border-[#2d2d44] bg-[#1a1a2e] p-6">
            <h2 className="text-2xl font-bold text-[#e94560]">Sources</h2>
            <p className="mt-4 text-gray-300">
              The information presented in Presidential Atlas is carefully curated from reputable sources, including:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-300">
              <li>The White House Historical Association</li>
              <li>The Library of Congress</li>
              <li>National Archives and Records Administration</li>
              <li>Presidential Libraries and Museums</li>
              <li>Scholarly publications and historical records</li>
            </ul>
          </div>

          <div className="mt-8 rounded-lg border border-[#2d2d44] bg-[#1a1a2e] p-6">
            <h2 className="text-2xl font-bold text-[#e94560]">Contact</h2>
            <p className="mt-4 text-gray-300">
              For questions, suggestions, or corrections, please contact us at{" "}
              <a href="mailto:info@presidential-atlas.com" className="text-[#e94560] hover:underline">
                info@presidential-atlas.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  )
} 