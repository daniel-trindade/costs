import SubmitButton from "./SubmitButton"
import Input from "./Input"
import { useState } from "react"

function TalkToUs({handleSubmit, btnText, messageData}){


  const [message, setMessage] = useState(messageData || {})

  const submit = (e) => {
    e.preventDefault()
    handleSubmit(message)
  }

  function handleChange(e){
    setMessage({ ...message, [e.target.name]: e.target.value})
  }

  return(
    <form onSubmit={submit}>
      <Input
        type="text"
        text="Email"
        placeholder="Insira seu email de contato aqui"
        name="email"
        handleOnChange={handleChange}
        value={message.email ? message.email : ''}
      />
      <Input
      type="text"
      text="Mensagem"
      placeholder="Deixe sua mensagem aqui!"
      name="messageContent"
      handleOnChange={handleChange}
      value={message.messageContent ? message.messageContent : ''}
      size="100"
      />
      <SubmitButton text={btnText}/>
      
    </form>
  )
}

export default TalkToUs