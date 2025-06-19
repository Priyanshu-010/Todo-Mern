import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import CreatePage from './pages/CreatePage/CreatePage.jsx'
import TodosDetail from './pages/TodosDetail/TodosDetail.jsx'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/todos/:id' element={<TodosDetail />} />
      </Routes>
    </div>
  )
}

export default App
