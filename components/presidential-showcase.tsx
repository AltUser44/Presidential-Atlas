"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

// Define the President type
export type President = {
  id: number
  name: string
  years: string
  party: string
  image: string
  facts: string
  election: string
  opponent: string
  achievements: string
}

// Export the presidents array
export const presidents: President[] = [
  {
    id: 1,
    name: "George Washington",
    years: "1789-1797",
    party: "Federalist",
    image: "/presidents/George Washington.jpg",
    facts: "First President of the United States, Commander-in-Chief during the American Revolutionary War.",
    election: "Unanimously elected by the Electoral College in both 1788 and 1792.",
    opponent: "No major opposition in either election.",
    achievements:
      "Established many precedents for the national government and presidency, including the cabinet system and the two-term tradition.",
  },
  {
    id: 2,
    name: "John Adams",
    years: "1797-1801",
    party: "Federalist",
    image: "/presidents/John Adams.jpg",
    facts: "One of the Founding Fathers and the first Vice President of the United States.",
    election: "Elected in 1796 with 71 electoral votes.",
    opponent: "Thomas Jefferson (Democratic-Republican), who became his Vice President.",
    achievements: "Maintained peace with France despite pressure for war, strengthened the U.S. Navy.",
  },
  {
    id: 3,
    name: "Thomas Jefferson",
    years: "1801-1809",
    party: "Democratic-Republican",
    image: "/presidents/Thomas Jefferson.jpg",
    facts: "Principal author of the Declaration of Independence and founder of the University of Virginia.",
    election: "Elected in 1800 after a tie in the Electoral College was resolved by the House of Representatives.",
    opponent: "John Adams (Federalist) in 1800, Charles C. Pinckney in 1804.",
    achievements: "Doubled the size of the United States with the Louisiana Purchase in 1803.",
  },
  {
    id: 4,
    name: "James Madison",
    years: "1809-1817",
    party: "Democratic-Republican",
    image: "/presidents/James Madison.jpg",
    facts: "Known as the 'Father of the Constitution' for his pivotal role in drafting the document.",
    election: "Elected in 1808 and 1812.",
    opponent: "Charles C. Pinckney in 1808, DeWitt Clinton in 1812.",
    achievements: "Led the nation during the War of 1812.",
  },
  {
    id: 5,
    name: "James Monroe",
    years: "1817-1825",
    party: "Democratic-Republican",
    image: "/presidents/James Monroe.jpg",
    facts: "The last president who was a Founding Father of the United States.",
    election: "Elected in 1816 and 1820, running virtually unopposed in his second election.",
    opponent: "Rufus King in 1816, no major opposition in 1820.",
    achievements:
      "Established the Monroe Doctrine, which warned European nations against further colonization in the Americas.",
  },
  {
    id: 6,
    name: "John Quincy Adams",
    years: "1825-1829",
    party: "Democratic-Republican",
    image: "/presidents/John Quincy Adams.jpg",
    facts: "Son of former President John Adams, served as Secretary of State under James Monroe.",
    election: "Elected by the House of Representatives after no candidate won a majority in the Electoral College.",
    opponent: "Andrew Jackson, who won the popular vote but lost in the House.",
    achievements: "Strong proponent of infrastructure improvements and education.",
  },
  {
    id: 7,
    name: "Andrew Jackson",
    years: "1829-1837",
    party: "Democratic",
    image: "/presidents/Andrew Jackson.jpg",
    facts: "Known as 'Old Hickory', he was a hero of the War of 1812.",
    election: "Elected in 1828 and 1832 after losing the controversial 1824 election.",
    opponent: "John Quincy Adams in 1828, Henry Clay in 1832.",
    achievements: "Paid off the national debt, fought against the Second Bank of the United States.",
  },
  {
    id: 8,
    name: "Martin Van Buren",
    years: "1837-1841",
    party: "Democratic",
    image: "/presidents/Martin Van Buren.jpg",
    facts: "First president born as a U.S. citizen and not a British subject.",
    election: "Elected in 1836 as Jackson's handpicked successor.",
    opponent: "William Henry Harrison, Hugh Lawson White, Daniel Webster, and Willie Person Mangum.",
    achievements: "Established the independent U.S. Treasury system.",
  },
  {
    id: 9,
    name: "William Henry Harrison",
    years: "1841",
    party: "Whig",
    image: "/presidents/William Henry Harrison.jpg",
    facts: "Served the shortest presidency, dying just 31 days after taking office.",
    election: "Elected in 1840 in a campaign known for the slogan 'Tippecanoe and Tyler Too'.",
    opponent: "Martin Van Buren (Democratic)",
    achievements: "His brief presidency did not allow time for significant achievements.",
  },
  {
    id: 10,
    name: "John Tyler",
    years: "1841-1845",
    party: "Whig",
    image: "/presidents/John Tyler.jpg",
    facts: "First Vice President to succeed to the presidency upon the death of a president.",
    election: "Succeeded to presidency after William Henry Harrison's death.",
    opponent: "N/A - Became president through succession.",
    achievements: "Annexed Texas as a state, established the presidential succession precedent.",
  },
  {
    id: 11,
    name: "James K. Polk",
    years: "1845-1849",
    party: "Democratic",
    image: "/presidents/James K. Polk.jpg",
    facts: "Known for his expansionist policies and fulfilling all his major campaign promises.",
    election: "Elected in 1844, defeating Henry Clay.",
    opponent: "Henry Clay (Whig)",
    achievements: "Acquired Oregon Territory, won Mexican-American War, added vast territories to U.S.",
  },
  {
    id: 12,
    name: "Zachary Taylor",
    years: "1849-1850",
    party: "Whig",
    image: "/presidents/Zachary Taylor.jpg",
    facts: "Military hero known as 'Old Rough and Ready', died in office.",
    election: "Elected in 1848 as a military hero.",
    opponent: "Lewis Cass (Democratic)",
    achievements: "Dealt with sectional tensions over slavery in new territories.",
  },
  {
    id: 13,
    name: "Millard Fillmore",
    years: "1850-1853",
    party: "Whig",
    image: "/presidents/Millard Fillmore.jpg",
    facts: "Became president upon Taylor's death, last Whig president.",
    election: "Succeeded to presidency after Zachary Taylor's death.",
    opponent: "N/A - Became president through succession.",
    achievements: "Supported and signed the Compromise of 1850.",
  },
  {
    id: 14,
    name: "Franklin Pierce",
    years: "1853-1857",
    party: "Democratic",
    image: "/presidents/Franklin Pierce.jpg",
    facts: "Youngest president elected at that time, struggled with sectional divisions.",
    election: "Elected in 1852 in a landslide victory.",
    opponent: "Winfield Scott (Whig)",
    achievements: "Signed Kansas-Nebraska Act, acquired territory through Gadsden Purchase.",
  },
  {
    id: 15,
    name: "James Buchanan",
    years: "1857-1861",
    party: "Democratic",
    image: "/presidents/James Buchanan.jpg",
    facts: "Only president who never married, preceded Civil War.",
    election: "Elected in 1856 in a three-way race.",
    opponent: "John C. Frémont (Republican), Millard Fillmore (Know-Nothing)",
    achievements: "Failed to prevent the Civil War, saw seven states secede during his presidency.",
  },
  {
    id: 16,
    name: "Abraham Lincoln",
    years: "1861-1865",
    party: "Republican",
    image: "/presidents/Abraham Lincoln.jpg",
    facts: "Led Union to victory in Civil War, assassinated shortly after second inauguration.",
    election: "Elected in 1860 and reelected in 1864.",
    opponent: "George B. McClellan (Democratic) in 1864",
    achievements: "Preserved the Union, issued Emancipation Proclamation, abolished slavery.",
  },
  {
    id: 17,
    name: "Andrew Johnson",
    years: "1865-1869",
    party: "Democratic/National Union",
    image: "/presidents/Andrew Johnson.jpg",
    facts: "First president to be impeached, survived Senate trial by one vote.",
    election: "Succeeded to presidency after Lincoln's assassination.",
    opponent: "N/A - Became president through succession.",
    achievements: "Oversaw initial Reconstruction, purchased Alaska from Russia.",
  },
  {
    id: 18,
    name: "Ulysses S. Grant",
    years: "1869-1877",
    party: "Republican",
    image: "/presidents/Ulysses S. Grant.jpg",
    facts: "Civil War hero who served two terms as president.",
    election: "Elected in 1868 and reelected in 1872.",
    opponent: "Horace Greeley (Liberal Republican/Democratic) in 1872",
    achievements: "Supported Reconstruction, passed 15th Amendment, fought KKK.",
  },
  {
    id: 19,
    name: "Rutherford B. Hayes",
    years: "1877-1881",
    party: "Republican",
    image: "/presidents/Rutherford B. Hayes.jpg",
    facts: "Won in controversial election decided by electoral commission.",
    election: "Elected in 1876 through Compromise of 1877.",
    opponent: "Samuel J. Tilden (Democratic)",
    achievements: "Ended Reconstruction, promoted civil service reform.",
  },
  {
    id: 20,
    name: "James A. Garfield",
    years: "1881",
    party: "Republican",
    image: "/presidents/James A. Garfield.jpg",
    facts: "Served only 200 days before assassination.",
    election: "Elected in 1880.",
    opponent: "Winfield Scott Hancock (Democratic)",
    achievements: "Appointed first African American to a federal post-Civil War position.",
  },
  {
    id: 21,
    name: "Chester A. Arthur",
    years: "1881-1885",
    party: "Republican",
    image: "/presidents/Chester A. Arthur.jpg",
    facts: "Reformed civil service after succeeding assassinated Garfield.",
    election: "Succeeded to presidency after Garfield's assassination.",
    opponent: "N/A - Became president through succession.",
    achievements: "Signed Pendleton Civil Service Reform Act, modernized Navy.",
  },
  {
    id: 22,
    name: "Grover Cleveland",
    years: "1885-1889",
    party: "Democratic",
    image: "/presidents/Grover Cleveland.jpg",
    facts: "First Democrat elected after Civil War, only president to serve two non-consecutive terms.",
    election: "Elected in 1884.",
    opponent: "James G. Blaine (Republican)",
    achievements: "Reformed civil service, advocated for gold standard.",
  },
  {
    id: 23,
    name: "Benjamin Harrison",
    years: "1889-1893",
    party: "Republican",
    image: "/presidents/Benjamin Harrison.jpg",
    facts: "Grandson of President William Henry Harrison.",
    election: "Elected in 1888.",
    opponent: "Grover Cleveland (Democratic)",
    achievements: "Sherman Anti-Trust Act, McKinley Tariff, added six states to Union.",
  },
  {
    id: 24,
    name: "Grover Cleveland",
    years: "1893-1897",
    party: "Democratic",
    image: "/presidents/Grover Cleveland.jpg",
    facts: "Only president to serve two non-consecutive terms.",
    election: "Elected in 1892.",
    opponent: "Benjamin Harrison (Republican)",
    achievements: "Dealt with economic depression, maintained gold standard.",
  },
  {
    id: 25,
    name: "William McKinley",
    years: "1897-1901",
    party: "Republican",
    image: "/presidents/William McKinley.jpg",
    facts: "Led nation to victory in Spanish-American War, assassinated in 1901.",
    election: "Elected in 1896 and reelected in 1900.",
    opponent: "William Jennings Bryan (Democratic) in both elections",
    achievements: "Led during Spanish-American War, annexed Hawaii, established gold standard.",
  },
  {
    id: 26,
    name: "Theodore Roosevelt",
    years: "1901-1909",
    party: "Republican",
    image: "/presidents/Theodore Roosevelt.jpg",
    facts: "Youngest president at 42, known for 'Square Deal' domestic policies.",
    election: "Succeeded McKinley in 1901, elected in own right in 1904.",
    opponent: "Alton B. Parker (Democratic) in 1904",
    achievements: "Trust-busting, conservation of public lands, Pure Food and Drug Act.",
  },
  {
    id: 27,
    name: "William Howard Taft",
    years: "1909-1913",
    party: "Republican",
    image: "/presidents/William Howard Taft.jpg",
    facts: "Only person to serve as both President and Chief Justice of Supreme Court.",
    election: "Elected in 1908 with Roosevelt's support.",
    opponent: "William Jennings Bryan (Democratic)",
    achievements: "Broke up more trusts than Roosevelt, established Department of Labor.",
  },
  {
    id: 28,
    name: "Woodrow Wilson",
    years: "1913-1921",
    party: "Democratic",
    image: "/presidents/Woodrow Wilson.jpg",
    facts: "Led U.S. through World War I, proposed League of Nations.",
    election: "Elected in 1912 and reelected in 1916.",
    opponent: "Charles Evans Hughes (Republican) in 1916",
    achievements: "Federal Reserve Act, Clayton Antitrust Act, led during WWI.",
  },
  {
    id: 29,
    name: "Warren G. Harding",
    years: "1921-1923",
    party: "Republican",
    image: "/presidents/Warren G. Harding.jpg",
    facts: "Presidency marked by scandals including Teapot Dome.",
    election: "Elected in 1920 in landslide victory.",
    opponent: "James M. Cox (Democratic)",
    achievements: "Washington Naval Conference, Budget and Accounting Act.",
  },
  {
    id: 30,
    name: "Calvin Coolidge",
    years: "1923-1929",
    party: "Republican",
    image: "/presidents/Calvin Coolidge.jpg",
    facts: "Known as 'Silent Cal' for his quiet demeanor.",
    election: "Succeeded Harding in 1923, elected in own right in 1924.",
    opponent: "John W. Davis (Democratic) in 1924",
    achievements: "Presided over 'Roaring Twenties' prosperity, reduced national debt.",
  },
  {
    id: 31,
    name: "Herbert Hoover",
    years: "1929-1933",
    party: "Republican",
    image: "/presidents/Herbert Hoover.jpg",
    facts: "Presidency marked by onset of Great Depression.",
    election: "Elected in 1928 in landslide victory.",
    opponent: "Al Smith (Democratic)",
    achievements: "London Naval Treaty, Reconstruction Finance Corporation.",
  },
  {
    id: 32,
    name: "Franklin D. Roosevelt",
    years: "1933-1945",
    party: "Democratic",
    image: "/presidents/Franklin D. Roosevelt.jpg",
    facts: "Only president to serve more than two terms, led during Great Depression and WWII.",
    election: "Won four presidential elections (1932, 1936, 1940, 1944).",
    opponent: "Thomas E. Dewey (Republican) in 1944",
    achievements: "New Deal programs, led U.S. in World War II, established Social Security.",
  },
  {
    id: 33,
    name: "Harry S. Truman",
    years: "1945-1953",
    party: "Democratic",
    image: "/presidents/Harry S. Truman.jpg",
    facts: "Ordered use of atomic bombs, implemented Marshall Plan.",
    election: "Succeeded FDR in 1945, elected in own right in 1948.",
    opponent: "Thomas E. Dewey (Republican) in 1948",
    achievements: "Marshall Plan, Truman Doctrine, desegregated military.",
  },
  {
    id: 34,
    name: "Dwight D. Eisenhower",
    years: "1953-1961",
    party: "Republican",
    image: "/presidents/Dwight D. Eisenhower.jpg",
    facts: "Supreme Allied Commander in WWII before presidency.",
    election: "Elected in 1952 and 1956.",
    opponent: "Adlai Stevenson (Democratic) in both elections",
    achievements: "Interstate Highway System, ended Korean War, Civil Rights Act of 1957.",
  },
  {
    id: 35,
    name: "John F. Kennedy",
    years: "1961-1963",
    party: "Democratic",
    image: "/presidents/John F. Kennedy.jpg",
    facts: "Youngest elected president, assassinated in Dallas.",
    election: "Elected in 1960 in close race.",
    opponent: "Richard Nixon (Republican)",
    achievements: "Created Peace Corps, handled Cuban Missile Crisis, promoted space program.",
  },
  {
    id: 36,
    name: "Lyndon B. Johnson",
    years: "1963-1969",
    party: "Democratic",
    image: "/presidents/Lyndon B. Johnson.jpg",
    facts: "Implemented Great Society programs and major civil rights legislation.",
    election: "Succeeded Kennedy in 1963, elected in own right in 1964.",
    opponent: "Barry Goldwater (Republican) in 1964",
    achievements: "Civil Rights Act, Voting Rights Act, Medicare, Medicaid.",
  },
  {
    id: 37,
    name: "Richard Nixon",
    years: "1969-1974",
    party: "Republican",
    image: "/presidents/Richard M. Nixon.jpg",
    facts: "Only president to resign from office, due to Watergate scandal.",
    election: "Elected in 1968 and 1972.",
    opponent: "George McGovern (Democratic) in 1972",
    achievements: "Ended Vietnam War, opened relations with China, EPA creation.",
  },
  {
    id: 38,
    name: "Gerald Ford",
    years: "1974-1977",
    party: "Republican",
    image: "/presidents/Gerald R. Ford.jpg",
    facts: "Only president never elected as president or vice president.",
    election: "Succeeded Nixon after resignation.",
    opponent: "N/A - Became president through succession.",
    achievements: "Helped heal nation after Watergate, signed Helsinki Accords.",
  },
  {
    id: 39,
    name: "Jimmy Carter",
    years: "1977-1981",
    party: "Democratic",
    image: "/presidents/Jimmy Carter.jpg",
    facts: "Nobel Peace Prize winner, known for humanitarian work post-presidency.",
    election: "Elected in 1976.",
    opponent: "Gerald Ford (Republican)",
    achievements: "Camp David Accords, established Dept. of Energy and Education.",
  },
  {
    id: 40,
    name: "Ronald Reagan",
    years: "1981-1989",
    party: "Republican",
    image: "/presidents/Ronald Reagan.jpg",
    facts: "Former actor and California governor, survived assassination attempt.",
    election: "Elected in 1980 and 1984.",
    opponent: "Walter Mondale (Democratic) in 1984",
    achievements: "Economic recovery, ended Cold War, tax reform.",
  },
  {
    id: 41,
    name: "George H. W. Bush",
    years: "1989-1993",
    party: "Republican",
    image: "/presidents/George H. W. Bush.jpg",
    facts: "Former CIA Director, led U.S. in Gulf War.",
    election: "Elected in 1988.",
    opponent: "Michael Dukakis (Democratic)",
    achievements: "Led coalition in Gulf War, Americans with Disabilities Act.",
  },
  {
    id: 42,
    name: "Bill Clinton",
    years: "1993-2001",
    party: "Democratic",
    image: "/presidents/William J. Clinton.jpg",
    facts: "First baby boomer president, impeached but acquitted.",
    election: "Elected in 1992 and 1996.",
    opponent: "Bob Dole (Republican) in 1996",
    achievements: "Balanced budget, welfare reform, NAFTA implementation.",
  },
  {
    id: 43,
    name: "George W. Bush",
    years: "2001-2009",
    party: "Republican",
    image: "/presidents/George W. Bush.jpg",
    facts: "Led nation after 9/11 attacks, son of former president.",
    election: "Elected in 2000 and 2004.",
    opponent: "John Kerry (Democratic) in 2004",
    achievements: "No Child Left Behind Act, Medicare Part D, led response to 9/11.",
  },
  {
    id: 44,
    name: "Barack Obama",
    years: "2009-2017",
    party: "Democratic",
    image: "/presidents/Barack Obama.jpg",
    facts: "First African American president, won Nobel Peace Prize.",
    election: "Elected in 2008 and 2012.",
    opponent: "Mitt Romney (Republican) in 2012",
    achievements: "Affordable Care Act, economic recovery, Paris Climate Agreement.",
  },
  {
    id: 45,
    name: "Donald Trump",
    years: "2017-2021, 2025-present",
    party: "Republican",
    image: "/presidents/Donald Trump.jpg",
    facts: "First president with no prior political or military experience.",
    election: "Elected in 2016.",
    opponent: "Hillary Clinton (Democratic)",
    achievements: "Tax cuts, criminal justice reform, Operation Warp Speed.",
  },
  {
    id: 46,
    name: "Joe Biden",
    years: "2021-2025",
    party: "Democratic",
    image: "/presidents/Joseph R. Biden Jr..jpg",
    facts: "Oldest person to assume the presidency and previously served as Vice President under Barack Obama.",
    election: "Elected in 2020 with the most votes ever cast for a presidential candidate.",
    opponent: "Donald Trump (Republican)",
    achievements: "Passed major infrastructure legislation, led COVID-19 vaccination efforts.",
  }
]

export function PresidentialShowcase() {
  const [selectedPresident, setSelectedPresident] = useState<(typeof presidents)[0] | null>(null)
  const [open, setOpen] = useState(false)

  const handlePresidentClick = (president: (typeof presidents)[0]) => {
    setSelectedPresident(president)
    setOpen(true)
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {presidents.map((president) => (
          <div
            key={president.id}
            className="group relative cursor-pointer overflow-hidden rounded-lg border border-[#2d2d44] bg-[#1a1a2e] shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            onClick={() => handlePresidentClick(president)}
          >
            <div className="aspect-square overflow-hidden">
              <Image
                src={president.image}
                alt={`Portrait of President ${president.name}`}
                width={300}
                height={300}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                priority={president.id <= 12}
                quality={90}
              />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
              <h3 className="text-sm font-bold text-white">{president.name}</h3>
              <p className="text-xs text-white/80">{president.years}</p>
              <p className="text-xs text-white/80">{president.party}</p>
            </div>
            <div className="p-3">
              <h3 className="font-medium text-white">{president.name}</h3>
              <p className="text-xs text-gray-400">{president.years}</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        {selectedPresident && (
          <DialogContent className="max-h-[90vh] overflow-y-auto border-[#2d2d44] bg-[#1a1a2e] text-white sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedPresident.name}</DialogTitle>
              <DialogDescription className="text-gray-400">
                {selectedPresident.years} • {selectedPresident.party}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 md:grid-cols-2">
              <div className="flex justify-center">
                <Image
                  src={selectedPresident.image}
                  alt={`Portrait of President ${selectedPresident.name}`}
                  width={400}
                  height={400}
                  className="rounded-lg object-cover shadow-lg"
                  quality={95}
                />
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-[#e94560]">Biography</h4>
                  <p className="text-sm text-gray-300">{selectedPresident.facts}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#e94560]">Election</h4>
                  <p className="text-sm text-gray-300">{selectedPresident.election}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#e94560]">Opponent</h4>
                  <p className="text-sm text-gray-300">{selectedPresident.opponent}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#e94560]">Key Achievements</h4>
                  <p className="text-sm text-gray-300">{selectedPresident.achievements}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}

