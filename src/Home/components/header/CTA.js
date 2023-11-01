import React, { Fragment } from 'react'
import CV from '../../../assets/cv.pdf'
import {FaArrowLeft} from 'react-icons/fa'

export default function CTA() {
  return (
    <Fragment>
    <div className='cta'>
        <a href={CV} download className='btn btn-primary'>Resume.pdf</a>
        <h5><FaArrowLeft/> Click & Download </h5>
    </div>
    </Fragment>
  )
}
