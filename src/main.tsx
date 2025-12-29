import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import About from './pages/About.tsx'
import Services from './pages/Services.tsx'
import Login from './pages/LoginPage.tsx'
import Signup from './pages/SignupPage.tsx'
import RootLayout from './pages/RootLayout.tsx'
import UserLayout from './users/UserLayout.tsx'
import UserHome from './users/UserHome.tsx'
import UserProfile from './users/UserProfile.tsx'
import OAuthSuccess from './pages/OAuthSuccess.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>

    <Routes>

      <Route path='/' element={<RootLayout />}>
        <Route index element={<App />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<UserLayout />}>
          <Route index element={<UserHome />} />
          <Route path='profile' element={<UserProfile />} />
        </Route>
        <Route path='/oauth/success' element={<OAuthSuccess />} />
        <Route path='/oauth/failure' element={<OAuthSuccess />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
