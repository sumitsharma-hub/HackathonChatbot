import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ChatPage } from './pages'
import Resize from './pages/Resize'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ChatPage/>
      {/* <Resize/>  */}

    </>
  )
}

export default App
