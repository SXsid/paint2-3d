
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import ErrorComp from './components/ErrorComp'
import ThreeJsViewer from './components/ThreeJsViewer'
import { data } from './staticData'



function App() {
  const routes = createBrowserRouter([
    {
      path:'/',
      element:<Home height={600} />,
      errorElement:<ErrorComp/>,
      children:[{
      path: '/',
      element:<ThreeJsViewer modelData={data}/>
      }]
    }
  ])
  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}

export default App
