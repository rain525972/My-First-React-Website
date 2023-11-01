import React, { Fragment } from 'react'
import Header from '../Home/components/header/Header'
import Nav from '../Home/components/nav/Nav'
import About from '../Home/components/about/About'
import Experience from '../Home/components/skill/Skill'
import Portfolio from './components/projects/Projects'
import Testimonials from '../Home/components/testimonials/Testimonials'
import Contact from '../Home/components/contact/Contact'

export default function Home() {
  return (
    <Fragment>
      <Header/>
      <Nav/>
      <About/>
      <Experience/>
      <Portfolio/>
      <Testimonials/>
      <Contact/>
    </Fragment>
  )
}
