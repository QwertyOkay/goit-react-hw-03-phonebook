import {Component} from "react";
import React from 'react';
import { nanoid } from 'nanoid'
import { ContactList } from "./ContactList";
import { Filter } from "./Filter";
import { ContactForm } from "./ContactForm";
import PropTypes from 'prop-types';
import { Container, MyHeader } from './styled';


export class App extends Component {
  state = {
      contacts: [
          {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
          {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
          {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
          {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
        ],
      filter: '',
      name: '',
      number: ''
    };

    componentDidMount() {
      const contactsLocalStorage = JSON.parse(localStorage.getItem('contacts'));
      
      if (contactsLocalStorage) {
        this.setState({contacts: contactsLocalStorage})
      }
    }

    handleSubmit = (e, {resetForm}) => {

      this.setState(prevState => {
          
        if(prevState.contacts.find(el => 
          el.name.toLowerCase().includes(e.name.toLowerCase()))) {

            alert(`${e.name} is already in contacts.`)
          }
          else {
            const newStateContacts = [...prevState.contacts];
          
            newStateContacts.push({id: nanoid(), name: e.name, number: e.number});

            localStorage.setItem('contacts', JSON.stringify(newStateContacts));
            
            resetForm();
            
            return {contacts: newStateContacts}
          }
      })
    }

    handleFilter = (e) => {
      this.setState({
          filter: e
      })
    }
  
    getVisibleContacts = () => {
      const {contacts, filter } = this.state;
      const filterToLowerCase = filter.toLowerCase();

      return contacts.filter(el => 
          el.name.toLowerCase().includes(filterToLowerCase))
    }

    deleteContact = (e) => {
      const newContacts = this.state.contacts.filter(el => el.id !== e);
      this.setState({contacts: [...newContacts]});
      localStorage.setItem('contacts', JSON.stringify(newContacts));
    }

    render() {

      const visibleContacts = this.getVisibleContacts();

      return (
        <>
          <Container>
          <MyHeader>Phonebook</MyHeader>

          <ContactForm 
              initialValues={this.state} 
              onSubmit={this.handleSubmit}/>
        
          <MyHeader>Contacts</MyHeader>

          <Filter             
              contacts={this.state.contacts} 
              filterState={this.state.filter} 
              handleFilter={this.handleFilter}/>

          <ContactList 
              filteredArr={visibleContacts} 
              deleteContact={this.deleteContact}
              
            />
            </Container>
        </>
      )
    }
   
}


ContactForm.propTypes = {
initialValues: PropTypes.object,
onSubmit: PropTypes.func
}

Filter.propTypes = {
contacts: PropTypes.array,
filterState: PropTypes.string,
handleFilter: PropTypes.func
}

ContactList.propTypes = {
filteredArr: PropTypes.array,
deleteContact: PropTypes.func

}