import { useState } from 'react'
import './App.css';
import { HelloWorld } from './sections/hello-world';
import { WhoIs } from './sections/who-is';
import { Welcome } from './sections/welcome';
import { ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap';
function App() {
  const lenisRef = useRef()
  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
    gsap.ticker.add(update)
    return () => gsap.ticker.remove(update)
  }, [])
  return (
    <>

      <ReactLenis root options={{ lerp: 0.1 }} ref={lenisRef}>

        <HelloWorld />
        <WhoIs />
        <Welcome />

      </ReactLenis>

    </>
  )
}

export default App


