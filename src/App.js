import {React,Fragment} from 'react'
import {MyNavLink} from './navlink/MyNavLink'
import {useRoutes} from 'react-router-dom'
import routes from './routes/Routes'
import {SlLogin} from 'react-icons/sl'
import Footer from './footer/Footer'
import './app.css'
//Switch被Routes取代
export default function App() {
  const elements =useRoutes(routes)
    return (
      <Fragment>
      <div className="navigation">
      <button className="btnLogin-popup"><SlLogin/> Login</button>
      <MyNavLink to="/itinerary">Itinerary</MyNavLink> 
      <MyNavLink to="/services">Services</MyNavLink>
      <MyNavLink to="/prefer">Prefer</MyNavLink>{/*行程表*/}
      <MyNavLink to="/home">Home</MyNavLink>  
      </div>
      <div className='rowNav'>
      {elements}{/* 註冊路由 */}
      </div>
      <Footer/>
    </Fragment>
    )
  
}
