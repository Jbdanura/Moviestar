import {Navbar,Container,Nav,NavDropdown,Form,FormControl,Button} from "react-bootstrap"
import React from 'react';
import {Link} from "react-router-dom"

const Menu = ({genres}) => {
   return(
      <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
         <Navbar.Brand><Link to="/">Moviestar</Link></Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <NavDropdown title="Genres" id="basic-nav-dropdown" className="menu-genres">
               {genres.map(genre=>{
                  const categoryLink = `/category/${genre.name}`
                  return <NavDropdown.Item as="div" key={genre.name}><Link to={categoryLink}>{genre.name}</Link></NavDropdown.Item>
               })}
            </NavDropdown>
            <Nav.Link as="div"><Link to="/top">Top</Link></Nav.Link>
            <Nav.Link as="div"><Link to="/new">New</Link></Nav.Link>
            </Nav>
            <Form className="d-flex">
               <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
               />
               <Button variant="success">Search</Button>
            </Form>
         </Navbar.Collapse>
      </Container>
      </Navbar>
   )
}

export default Menu