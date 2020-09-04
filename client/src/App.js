import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import AppNavbar from './components/AppNavbar'
import ShoppingList from './components/ShoppingList'
import { Provider } from 'react-redux'
import store from './store'
import ItemModal from './components/ItemModal'
import { Container } from 'reactstrap'
import { loadUser } from './actions/authActions'

class App extends Component {
  render() {
    return (
      // Provider allows state to be accessed appwide through global store in redux
      <Provider store={store}>
        <div className='App'>
          <AppNavbar />
          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    )
  }
}

export default App
