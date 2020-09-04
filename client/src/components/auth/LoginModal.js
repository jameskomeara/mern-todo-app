import React, { Component } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

class LoginModal extends Component {
  state = {
    modal: false,
    email: '',
    password: '',
    msg: null,
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props
    if (error !== prevProps.error) {
      // Check for prev register
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg })
      } else {
        this.setState({ msg: null })
      }
    }
    // If authenticated and registration was succesful, close modal
    if (this.state.modal && this.props.isAuthenticated) {
      this.toggle()
    }
  }

  // Close modal and clear errors
  toggle = () => {
    // Clear errors
    this.props.clearErrors()
    this.setState({
      modal: !this.state.modal,
    })
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  // Atempt to login
  onSubmit = (e) => {
    e.preventDefault()

    const { email, password } = this.state

    const user = {
      email,
      password,
    }

    this.props.login(user)
  }

  render() {
    const spacing = { marginBottom: '1rem' }
    return (
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Login
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          {this.state.msg ? (
            <Alert color='danger'>{this.state.msg}</Alert>
          ) : null}
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='item'>Email</Label>
                <Input
                  style={spacing}
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email'
                  onChange={this.onChange}
                />
                <Label for='item'>Password</Label>
                <Input
                  style={spacing}
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  onChange={this.onChange}
                />
                <Button color='dark' style={{ marginTop: '.5rem' }} block>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
})

export default connect(mapStateToProps, { login, clearErrors })(LoginModal)
