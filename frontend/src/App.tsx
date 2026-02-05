import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Question from './pages/questions'
import QuestionById from './pages/question_by_id'
import Profile from './pages/profile'
import Login from './pages/login'
import Register from './pages/register'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import UserRouteProctection from './utils/protectPage'
import ProtectLogin from './utils/ProtectLogin'
import { Toaster } from 'sonner'
import Navbar from './components/Navbar'
import Landing from './pages/landing'
function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient} >
      <Toaster richColors />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<ProtectLogin><Landing /></ProtectLogin>} />
          <Route path='/questions' element={<UserRouteProctection><Question /></UserRouteProctection>} />
          <Route path='/questions/:id' element={<UserRouteProctection><QuestionById /></UserRouteProctection>} />
          <Route path='/profile' element={<UserRouteProctection><Profile /></UserRouteProctection>} />
          <Route path='/login' element={<ProtectLogin><Login /></ProtectLogin>} />
          <Route path='/register' element={<ProtectLogin><Register /></ProtectLogin>} />
        </Routes>
      </BrowserRouter >
    </QueryClientProvider >
  )
}

export default App
