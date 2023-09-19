import { parse, v4 as uuidv4 } from 'uuid'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'


import Msg from '../layout/Msg'
import Loading from '../layout/Loading'
import styles from './Project.module.css'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../services/ServiceForm'


function Project(){

  const { id } = useParams()
  const [project, setProject] = useState([])
  const [message, setMessage] = useState('')
  const [typeMessage, setTypeMessage] = useState('')
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)

  useEffect(() => {
    //O SETTIMEOUT ESTÁ SENDO UTILIZADO PARA SIMULAR O CARREGAMENTO DOS DADOS
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((resp) => resp.json())
    .then((data) => {
      setProject(data)
    })
    .catch ((err) => console.log(err))
    }, 300)
  }, [id])

  function editPost(project){
    //ZERAR MENSAGEM PARA CASO DUAS ALTERAÇÕES SEJAM FEITAS EM SEGUIDA
    setMessage('')

    //PRIMEIRO VALIDAR SE ESTÁ SENDO DADO UM BUDGET MENOR QUE O COST
    if(project.budget < project.cost){
      setTypeMessage('error')
      setMessage('O novo orçamento não pode ser menor do que o valor já alocado!')
      return false
    }

    fetch(`http://localhost:5000/projects/${project.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
    .then((resp) => resp.json())
    .then((data) => {
      setProject(data)
      setShowProjectForm(false)
      setTypeMessage('success')
      setMessage('Projeto atualizado com sucesso!')
    })
    .catch((err) => console.log(err))
  }

  function createService(project){

    //ZERAR MENSAGEM PARA CASO DUAS ALTERAÇÕES SEJAM FEITAS EM SEGUIDA
    setMessage('')
    
    const lastService = project.services[project.services.length -1]

    lastService.id = uuidv4()

    const lastServiceCost = lastService.cost
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

    //VALIDAÇÃO DO VALOR MAXIMO

    if(newCost > parseFloat(project.budget)){
      setMessage('Orçamento ultrapassado, verifique o valor do serviço.')
      setTypeMessage('error')
      project.services.pop()
      return(false)
    }

    //ADICIONAR VALOR DO SERVIÇO AO VALOR TOTAL
    project.cost = newCost

    //ATUALIZAR PROJETO COM NOVO SERVIÇO
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
    })
    .catch((err) => console.log(err))
  



    
  }

  function toggleProjectForm(){
    setShowProjectForm(!showProjectForm)
  }

  function toggleServiceForm(){
    setShowServiceForm(!showServiceForm)
  }

  return(
    <>
      {project.name ? (

        <div className={styles.project_details}>
          <Container customClass="column" >
              {message && <Msg type={typeMessage} msg={message}/>}
              <div className={styles.details_container}>
                <h1>{project.name}</h1>
                <button className={styles.btn} onClick={toggleProjectForm}>
                  {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                </button>
                {!showProjectForm ? (
                  <div className={styles.project_info}>
                    <p>
                      <span>Categoria:</span> {project.category.name}
                    </p>
                    <p>
                      <span>Total de Orçamento:</span> R${project.budget}
                    </p>
                    <p>
                      <span>Total Utilizado:</span> R${project.cost}
                    </p>
                  </div>
                ) : (
                  <div className={styles.project_info}>
                    <ProjectForm
                      handleSubmit={editPost}
                      btnText='Concluir Edição'
                      projectData={project}
                    />
                  </div>
                )}
              </div>
              <div className={styles.service_form_container}>
                <h2>Adicione um Serviço:</h2>
                <button className={styles.btn} onClick={toggleServiceForm}>
                  {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                </button>
                <div className={styles.project_info}>
                  {showServiceForm && (
                    <ServiceForm
                      handleSubmit={createService}
                      btnText="Adicionar Serviço"
                      projectData={project}
                    />
                  )}
                </div>
              </div>
              <h2>Serviços</h2>
              <Container customClass="start">
                <p>Itens de Serviço</p>
              </Container>
          </Container>
        </div>

      ): (
        <Loading/>
      )}
    </>
  )
}

export default Project