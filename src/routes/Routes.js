import {Navigate} from 'react-router-dom'
import Prefer from '../Prefer/Prefer'
import Home from '../Home/Home'
import Services from '../Services/Services';
import Itinerary from '../Itinerary/Itinerary';

//路由表useRoutes(取代Routes,Route)
const routes = [
    {
      path:'/home',
      element:<Home/>,
    },
    {
      path:'/prefer',
      element:<Prefer/>
    },
    {
      path:'/services',
      element:<Services/>
    },
    {
      path:'/itinerary',
      element:<Itinerary/>,
    },
    {
      path:'/',
      element:<Navigate to='/home'/>
    },
  ]

  export default routes;

