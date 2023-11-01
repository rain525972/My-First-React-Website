import React, { Fragment } from 'react'
import './header.css'
import CTA from './CTA'
// import ME from '../../assets/wolf.png'
//import HeaderSocials from './HeaderSocials'

export default function Header() {
  return (
    <Fragment>
      
    <header>
      <div className='container header__container'>
        {/* <h5>Hello I'm</h5>
        <h2>Rain Yu</h2> */}
        <span>Frontend Developer</span>
        <CTA/>
        {/*<HeaderSocials/>

         <div className='me'>
          <img src={ME} alt='me'/>
        </div> */}
      </div>
    </header>
    </Fragment>
  )
}
