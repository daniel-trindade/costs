import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import Home from './Components/Pages/Home';
import Project from './Components/Pages/Project';
import Contact from './Components/Pages/Contact';
import Company from './Components/Pages/Company';
import Projects from './Components/Pages/Projects';
import NewProject from './Components/Pages/NewProject';


import Navbar from './Components/layout/Navbar';
import Footer from './Components/layout/Footer';
import Container from './Components/layout/Container';

function App() {
  return (
    <Router>
      
      <Navbar/>

      <Container customClass='min-height'>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/projects' element={<Projects/>}/>
          <Route path='/company' element={<Company/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/newproject' element={<NewProject/>}/>
          <Route path='/project'>
            <Route path=':id' element={<Project/>}/>
          </Route>
        </Routes>
      </Container>

      <Footer/>

    </Router>
    
  );
}

export default App;
