import React from 'react'
import './testimonials.css'
import AVTR1 from '../../../assets/avatar1.jpg'
import AVTR2 from '../../../assets/avatar2.jpg'
import AVTR3 from '../../../assets/avatar3.jpg'
import AVTR4 from '../../../assets/avatar4.jpg'
// import Swiper core and required modules
import { Pagination, Navigation,EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

/*來這邊看slider */

const data =[
  {
    avatar:AVTR1,
    name:'Tina Snow',
    review:'I am pleased to recommend [Name] for the position of [Position Title]. Throughout their time at [Company/Organization], they consistently demonstrated a strong work ethic, remarkable problem-solving abilities, and exceptional leadership skills. Their dedication to quality and attention to detail set them apart as an invaluable asset to any team.'
  },
  {
    avatar:AVTR2,
    name:'Shatta Wale',
    review:'It is my honor to recommend [Name] for the [Position Title] role. Their exceptional communication skills, innovative thinking, and strong commitment to achieving results make them an ideal candidate for the position. Their passion for their work and their ability to collaborate effectively with colleagues make them a valuable addition to any team.'
  },
  {
    avatar:AVTR3,
    name:'Kwame Despite',
    review:'I am delighted to recommend [Name] for the [Position Title] position. Their remarkable creativity, strong dedication, and exceptional problem-solving abilities make them an outstanding candidate. Their positive attitude and ability to adapt to new challenges make them a valuable team player, capable of thriving in any dynamic work environment.'
  },
  {
    avatar:AVTR4,
    name:'Nana Ama McBrown',
    review:'It gives me great pleasure to recommend [Name] for the [Position Title] position. With their exceptional skills and dedication to excellence, they would be a valuable addition to your team. Their passion for [relevant field] and their ability to [specific quality or skill] set them apart from their peers.'
  },
]

export default function Testimonials() {

  return (
    <section id='testimonials'>
      <h5>Comments From Professors</h5>
      <h2>Testimonials</h2>

      <Swiper className='container testimonials__container'
      // install Swiper modules
      centeredSlides={true}
      navigation={true}
      modules={[EffectFade,Pagination, Navigation]} 
      effect="fade"
      spaceBetween={30}
      slidesPerView={1}
      pagination={{ clickable: true }}>
        {
          data.map(({avatar,name,review},index)=>{
            return (
              <SwiperSlide key={index} className='testimonial'>
              <div className='client__avatar'>
                <img src={avatar} alt='Avatar One'/>
              </div>
              <h5>{name}</h5>
              <small className='client__review'>{review}</small>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </section>
  )
}
