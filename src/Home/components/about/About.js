import React from 'react'
import './about.css'
import wolf from '../../../assets/wolf.jpg'
import {FaAward} from 'react-icons/fa'
import {FiUsers}  from 'react-icons/fi'
import {VscFolderLibrary} from 'react-icons/vsc'

export default function About() {
  return (
    <section id='about'>
      <h5>Do You Know</h5>
      <h2>About Me</h2>

      <div className='container about__container'>
        <div className='about__me'>
          <div className='about__me-image'>
            <img src={wolf} alt='About'/>
          </div>
        </div>

        <div className='about__content'>
          <div className='about__cards'>
            <article className='about__card'>
              <FaAward className='about__icon'/>
              <h5>Experience</h5>
              <small>1+ Years Working</small>
            </article>
            
            <article className='about__card'>
              <FiUsers className='about__icon'/>
              <h5>Clients</h5>
              <small>99+ Worldwide</small>
            </article>
            <article className='about__card'>
              <VscFolderLibrary className='about__icon'/>
              <h5>Projects</h5>
              <small>60+ Completed</small>
            </article>
          </div>
          <div className='about__p'>
          <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque eos voluptatem eius dolorem maiores nihil ducimus at rem ullam reprehenderit quidem quia seserunt molestiae, eligendi amet repellat molestias quos totam
          </p>
          </div>
          <a href='#contact' className='btn btn-primary' rel='noreferrer'>Let's Talk</a>
        </div>
      </div>
    </section>
  )
}
