import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Counter } from './features/counter/Counter'
import PostList from './features/posts/PostList'

function App() {

  return (
    <>
      <PostList/>
    </>
  )
}

export default App
