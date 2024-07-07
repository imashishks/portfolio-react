import { useState } from 'react'
import './App.css';
import { HelloWorld } from './sections/hello-world';
import { WhoIs } from './sections/who-is';
import Lenis from 'lenis';
function App() {
  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf);
  return (
    <>
      <div>
        <HelloWorld />
        <WhoIs />
      </div>
    </>
  )
}

export default App


