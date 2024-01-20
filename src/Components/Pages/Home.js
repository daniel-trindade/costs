import styles from './Home.module.css'
import LinkButton from '../layout/LinkButton'
import { useLocation } from 'react-router-dom'
import Msg from '../layout/Msg'

import savings from '../../img/savings.svg'

function Home(){

  const location = useLocation()

  let message = ''
  if(location.state){
    message = location.state.message
  }

  
  return(
    <section className={styles.home_container}>
      {message && <Msg type='success' msg={message} />}
      <h1>Bem-vindo ao <span>Costs</span></h1>
      <p>Comece a gerenciar seus projetos agora mesmo!</p>
      <LinkButton to="/newproject" text="Criar Projeto" />
      <img src={savings} alt="costs" />
    </section>
  )
}

export default Home