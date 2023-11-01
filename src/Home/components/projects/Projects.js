import React from 'react';
import './projects.css';
import IMG1 from '../../../assets/portfolio1.jpg';
import IMG2 from '../../../assets/portfolio2.jpg';
import IMG3 from '../../../assets/portfolio3.jpg';

const data = [
  {
    id: 1,
    image: IMG1,
    title: 'Yahoo RWD as Part of the ReDesign and Interactive Project (Pure HTML, CSS, and JavaScript)',
    github: 'https://github.com',
    demo: '',
  },
  {
    id: 2,
    image: IMG2,
    title: 'Aesthetic and Functional webpage developed using the React framework.',
    github: 'https://github.com',
    demo: '',
  },
  {
    id: 3,
    image: IMG3,
    title: "Empowering collaboration through Figma's design platform",
    github: 'https://github.com',
    demo: 'https://www.figma.com/',
  },
];

export default function Projects() {
  return (
    <section id='projects'>
      <h5>Code Crafted by Me</h5>
      <h2>Portfolio</h2>

      <div className='container projects__container'>
        {data.map(({ id, image, title, github, demo }) => (
          <article key={id} className='projects__item'>
            <div className='projects__item-image'>
              <img src={image} alt={title} />
            </div>
            <div className='projects__item-content'>
              <h3 title={title}>{title}</h3>
              <div className='projects__item-btn'>
                <a href={github} className='btn btn_fix' target='_blank' rel='noreferrer'>
                  Github
                </a>
                <a href={demo} className='btn btn-primary' target='_blank' rel='noreferrer'>
                  Live Demo
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
