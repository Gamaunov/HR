import { AboutPageAsync } from './components/pages/AboutPage/AboutPage.async'
import { MainPageAsync } from './components/pages/MainPage/MainPage.async'
import './index.scss'
import { Suspense } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div className="app">
      <Link to={'/'}>Главная</Link>
      <Link to={'/about'}>О сайте</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={'/about'} element={<AboutPageAsync />} />
          <Route path={'/'} element={<MainPageAsync />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
