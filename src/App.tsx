import { BrowserRouter as Router, Route, Routes } from 'react-router'
import './index.css'

import SearchBar from './components/Search-Bar'
import Home from './pages/Home'
import Team from './pages/Teams'
import Player from './pages/Player'
import Game from './pages/Games'
import Select from './components/Select'



function App() {
  return (
    <Router>
      <div className="App bg-slate-200 h-full">
        <Routes>
            <Route element={<SearchBar />}>
              <Route index element={<Home />} />
                <Route path="/teams/:location/:name/:id" element={<Team />} />
                <Route path='/players/:firstName/:lastName/:id' element={<Player />} />
                <Route path='/players/:firstName/:lastName' element={<Player />} />
                <Route path='/games/:location/:name/:id' element={<Game />} />
                <Route element={<Select />}>
                  <Route path='/games/week/:week' element={<Game />} />
                </Route>
            </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
