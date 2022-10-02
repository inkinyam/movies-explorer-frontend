import SectionTtile from '../SectionTitle/SectionTitle';

const AboutProject = () => {

  return (
    <section className="aboutProject">
      <SectionTtile  title ="О проекте"/>
      <ul className="aboutProject__info">
        <li className='aboutProject__step'>
          <h4 className='aboutProject__step-title'>Дипломный проект включал 5 этапов</h4>
          <p className='aboutProject__step-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className='aboutProject__step'>
          <h4 className='aboutProject__step-title'>На выполнение диплома ушло 5 недель</h4>
          <p className='aboutProject__step-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>

      <ul className='aboutProject__timeline'>
        <li className='aboutProject__timeline-item'>
          <p className='aboutProject__timeline-text'>1 неделя</p>
        </li>
        <li className='aboutProject__timeline-item'>
          <p className='aboutProject__timeline-text'>4 недели</p>
        </li>
      </ul>
     
    </section>
  )
}

export default AboutProject;