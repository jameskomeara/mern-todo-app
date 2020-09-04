import React, { Component } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap'
import RegisterModal from './auth/RegisterModal.js'
import Logout from '../components/auth/Logout'

export default class AppNavbar extends Component {
  state = {
    isOpen: false,
  }

  // Toggles navbar hamburger open/close on smaller screens
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    return (
      <div>
        {/* This is all reactstrap from Bootstrap which is just handy styling features */}
        <Navbar color='dark' dark expand='sm' className='mb-5'>
          <Container>
            <NavbarBrand href='/'>ToDo List</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                <NavItem>
                  <RegisterModal />
                </NavItem>
                <NavItem>
                  <Logout />
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}
