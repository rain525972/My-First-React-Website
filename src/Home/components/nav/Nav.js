import React, { useState } from 'react'
import './nav.css'
import {AiOutlineHome,AiOutlineUser} from 'react-icons/ai'
import {BiMessageSquareDetail} from 'react-icons/bi'
import {GoBriefcase} from 'react-icons/go'
import {GiWhiteBook} from 'react-icons/gi'

export default function Nav() {
  const [activeNav,setActiveNav] = useState('#')
  return (
    <nav>
      <a href='#top' onClick={()=>{setActiveNav('#top')}} className={activeNav === '#top' ? 'active' : ''} rel='noreferrer'><AiOutlineHome/></a>
      <a href='#about' onClick={()=>{setActiveNav('#about')}} className={activeNav === '#about' ? 'active' : ''} rel='noreferrer'><AiOutlineUser/></a>
      <a href='#skill' onClick={()=>{setActiveNav('#skill')}} className={activeNav === '#skill' ? 'active' : ''} rel='noreferrer'><GiWhiteBook/></a>
      <a href='#projects' onClick={()=>{setActiveNav('#projects')}} className={activeNav === '#projects' ? 'active' : ''}rel='noreferrer'><GoBriefcase/></a>
      <a href='#contact' onClick={()=>{setActiveNav('#contact')}} className={activeNav === '#contact' ? 'active' : ''}rel='noreferrer'><BiMessageSquareDetail/></a>
    </nav>
  )
}
