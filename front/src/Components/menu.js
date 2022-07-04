import {Navbar,Container,Nav,NavDropdown,Form,FormControl,Button} from "react-bootstrap"
import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";

const Menu = ({apiKey}) => {
   const [input,setInput] = useState("")
   const navigate = useNavigate()

   const handleSubmit = async(event) => {
      event.preventDefault();
      const promise = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en&query=${input}&page=1`)
      navigate("/movie/"+promise.data.results[0].id)
      
   }

   return(
      <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
         <Navbar.Brand><Link to="/">Moviestar</Link></Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link as="div"><Link to="/top">Top</Link></Nav.Link>
            <Nav.Link as="div"><Link to="/new">New</Link></Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={(event)=>handleSubmit(event)}>
               <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e)=>setInput(e.target.value)}     
               />
               <Button onClick={(e)=>handleSubmit(e)} variant="success">Search</Button>
            </Form>
         </Navbar.Collapse>
      </Container>
      </Navbar>
   )
}

export default Menu