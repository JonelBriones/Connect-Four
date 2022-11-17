import './App.css'
import Lobby from './components/SinglePlayer/Lobby'
import Menu from './routes/Menu'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Menu />} path="/" />
          <Route element={<Lobby />} path="/play" />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
