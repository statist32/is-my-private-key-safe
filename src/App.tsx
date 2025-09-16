import { HeroSection } from "./HeroSection"
import { Reasons } from "./Reasons"
import Checker from "./Checker"
import { useState } from "react"

function App() {
  const [refetch, setRefetch] = useState(false);
  return <main>
    <HeroSection refetch={refetch} setRefetch={setRefetch} />
    <Checker setRefetch={setRefetch} />
    <Reasons />

  </main >

}

export default App