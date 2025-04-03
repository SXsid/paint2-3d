
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import ErrorComp from './components/ErrorComp'

function App() {
  const routes = createBrowserRouter([
    {
      path:'/',
      element:<Home height={600} />,
      errorElement:<ErrorComp/>
    }
    
  ])
  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}

export default App
