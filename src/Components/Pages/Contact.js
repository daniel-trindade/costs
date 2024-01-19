import styles from "./Contact.module.css"
import LinkButton from "../layout/LinkButton"
import SubmitButton from "../form/SubmitButton"

function Contact(){
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
          <textarea name="talkToUs" id="talkToUs" cols="100" rows="10" placeholder="Deixe sua mensagem aqui!!"></textarea>
          
          <SubmitButton text={"Enviar"}/>
          

        </div>

      </div>
  
  )
    
}

export default Contact