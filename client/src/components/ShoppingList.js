import React, { Component } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'
import { getItems, removeItem, addItem } from '../actions/itemActions'
import PropTypes from 'prop-types'

class ShoppingList extends Component {
  // Calls getItems action when component mounts
  componentDidMount() {
    this.props.getItems()
  }

  // Used in Redux - decides what type of prop things are from global store
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  }

  // Calls removeItem action and passes item id to it
  removeItemOnClick = (id) => {
    this.props.removeItem(id)
  }

  render() {
    const { items } = this.props.item
    return (
      // Reactstrap list
      <Container>
        <ListGroup>
          {/* Allows fading of list items through CSSTransition */}
          <TransitionGroup className='shopping-list'>
            {/* All items are mapped to a list item */}
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <Button
                      className='remove-btn'
                      color='dark'
                      size='sm'
                      style={{ marginRight: '1em' }}
                      onClick={this.removeItemOnClick.bind(this, _id)}>
                      &times;
                    </Button>
                  ) : (
                    ''
                  )}
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    )
  }
}

// brings global state from store into props for component
const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
})

// redux requires a connect
export default connect(mapStateToProps, { getItems, removeItem, addItem })(
  ShoppingList
)
