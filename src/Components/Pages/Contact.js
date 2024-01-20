import styles from "./Contact.module.css"
import { useNavigate } from "react-router-dom"
import TalkToUs from "../form/TalkToUs"


function Contact(){

  const navigate = useNavigate()

  function createMessage(msg){

    fetch('http://localhost:5000/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(msg),
    })
    .then((resp) => resp.json())
    .then((data) => {
      navigate('/', { state: { message: 'Mensagem enviada com sucesso!' } })
      console.log(data)
    })
    .catch((err) => console.log(err))
    
  }

  console.log(typeof createMessage)
  return(
    
      <div className={styles.main}>
        <h1>Contatos</h1>
          <div className={styles.contact}>
            <p><span className={styles.format}>Email:</span>  teste@teste.com.br</p>
            <p><span className={styles.format}>Telefone:</span>  (84) 98812-3456</p>
          </div>
      
        <div className={styles.talkToUs}>
          <h1>Fale Conosco</h1>
          <p>Você também pode nos contatar deixando uma mensagem na caixa a baixo:</p>
          <TalkToUs handleSubmit={createMessage} btnText="Enviar"/>
        </div>
        
      </div>
  
  )
    
}

export default Contact