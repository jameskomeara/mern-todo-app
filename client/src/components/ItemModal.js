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
} from 'reactstrap'
import { connect } from 'react-redux'
import { addItem } from '../actions/itemActions'
import PropTypes from 'prop-types'

class ItemModal extends Component {
  state = {
    modal: false,
    name: '',
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    })
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const newItem = {
      name: this.state.name,
    }

    this.props.addItem(newItem)

    this.toggle()
  }

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color='dark'
            style={{ marginBottom: '2rem' }}
            onClick={this.toggle}>
            Add Item
          </Button>
        ) : (
          <h4 className='mv-3 ml-4'>You need to login to edit items</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='item'>Add Item In Field</Label>
                <Input
                  type='text'
                  name='name'
                  id='item'
                  placeholder='Add Shopping Item'
                  onChange={this.onChange}
                />
                <Button color='dark' style={{ marginTop: '.5rem' }} block>
                  Add Item
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
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { addItem })(ItemModal)
