import { Component } from 'react';
import { nanoid } from 'nanoid';
import InputForm from './InputForm/InputForm';
import PhoneList from './PhoneList/PhoneList';
import Filter from './Filter/Filter';
import { Container, MyHeader } from './styled';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const items = JSON.parse(localStorage.getItem('contacts'));

    if (items === null || items.length === 0) {
      return;
    }

    this.setState({ contacts: items });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState === this.state.contacts && this.state.contacts.length !== 0) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
    }
  }

  handleSubmitForm = (e, data) => {
    e.preventDefault();
    const item = { id: nanoid(), ...data };

    if (this.checkUsers(data)) {
      alert(`${data.name} is already in contacts`);
      return false;
    }

    this.setState(prevState => prevState.contacts.push(item));

    return true;
  };

  handleFilter = e => {
    const lowerCaseWord = e.currentTarget.value.toLowerCase();
    this.setState({
      filter: lowerCaseWord,
    });
  };

  checkUsers(data) {
    return this.state.contacts.find(
      ({ name }) => name.toLowerCase() === data.name.toLowerCase()
    );
  }

  deleteUser = deletedId => {
    this.setState({
      contacts: this.state.contacts.filter(({ id }) => id !== deletedId),
    });
  };

  filterUsers() {
    return this.state.contacts.filter(item =>
      item.name.toLowerCase().includes(this.state.filter)
    );
  }

  render() {
    const renderData = this.filterUsers();

    return (
      <Container>
        <MyHeader>Phonebook</MyHeader>
        <InputForm handleSubmit={this.handleSubmitForm} />

        <MyHeader>Contacts</MyHeader>
        <Filter filter={this.handleFilter} value={this.state.filter} />
        <PhoneList contacts={renderData} deleteUser={this.deleteUser} />
      </Container>
    );
  }
}

export default App;