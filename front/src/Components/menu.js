import {Navbar,Container,Nav,Dropdown,DropdownButton,Form,FormControl,Button,Image} from "react-bootstrap"
import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";

const Menu = ({apiKey,translations, changeLanguage}) => {
   const [input,setInput] = useState("")
   const navigate = useNavigate()

   const handleSubmit = async(event) => {
      event.preventDefault();
      const promise = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en&query=${input}&page=1`)
      navigate("/movie/"+promise.data.results[0].id)
      
   }
   if(!translations){
      return null
   } else {

      return(
         <Navbar bg="dark" expand="lg" variant="dark">
         <Container>
            <Navbar.Brand><Link to="/">Moviestar</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto">
                  <Nav.Link as="div"><Link to="/top">{translations.top}</Link></Nav.Link>
                  <Nav.Link as="div"><Link to="/new">{translations.new}</Link></Nav.Link>
                  <DropdownButton variant="secondary" title={<i className="fa fa-language"></i>}>
                     <Dropdown.Item onClick={()=>changeLanguage("en")}>English</Dropdown.Item>
                     <Dropdown.Item onClick={()=>changeLanguage("es")}>Español</Dropdown.Item>
                  </DropdownButton>
               </Nav>
               <Form className="d-flex" onSubmit={(event)=>handleSubmit(event)}>
                  <FormControl
                     type="search"
                     placeholder={translations.search}
                     className="me-2"
                     aria-label={translations.search}
                     onChange={(e)=>setInput(e.target.value)}     
                  />
                  <Button onClick={(e)=>handleSubmit(e)} variant="success">{translations.search}</Button>
               </Form>
               
            </Navbar.Collapse>
         </Container>
         </Navbar>
      )
   }

}


export default Menu