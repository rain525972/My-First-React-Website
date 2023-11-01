import React from 'react'
import './skill.css'
import {BsPatchCheckFill} from 'react-icons/bs'

export default function Skill() {
  return (
    <section id='skill'>
      <h5>My Skill Set</h5>
      <h2>My Experience</h2>

      <div className='container skill__container'>
        <div className='skill__frontend'>
          <h3>Frontend Development</h3>
          <div className='skill__content'>
            <article className='skill__details'>
              <BsPatchCheckFill className='skill__details-icon'/>
              <div>
                <h4>HTML</h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>
            <article className='skill__details'>
              <BsPatchCheckFill className='skill__details-icon'/>
              <div>
                <h4>CSS</h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>
            <article className='skill__details'>
              <BsPatchCheckFill className='skill__details-icon'/>
              <div>
                <h4>JavaScript</h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>
            <article className='skill__details'>
              <BsPatchCheckFill className='skill__details-icon'/>
              <div>
                <h4>Bootstrap</h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>
            <article className='skill__details'>
              <BsPatchCheckFill className='skill__details-icon'/>
              <div>
                <h4>ReactJS</h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>
            <article className='skill__details'>
              <BsPatchCheckFill className='skill__details-icon'/>
              <div>
                <h4>AntD</h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>
          </div>
        </div>

        <div className='skill__backend'>
          <h3>Backend Development</h3>
          <div className='skill__content'>
            <article className='skill__details'>
              <BsPatchCheckFill className='skill__details-icon'/>
              <div>
                <h4>Gorm</h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>
            <article className='skill__details'>
              <BsPatchCheckFill className='skill__details-icon'/>
              <div>
                <h4>PostgreSQL</h4>
                <small className='text-light'>Intermediate</small>
              </div>
            </article>
            <article className='skill__details'>
              <BsPatchCheckFill className='skill__details-icon'/>
              <div>
                <h4>Golang</h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>
            <article className='skill__details'>
              <BsPatchCheckFill className='skill__details-icon'/>
              <div>
                <h4>Gin</h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
