import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ContactsForm from './component/ContactForm';
import Filter from './component/Filter';
import ContactList from './component/ContactList';
import Container from './component/Container';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContact = JSON.parse(contacts);

    if (parseContact) {
      this.setState({ contacts: parseContact });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  repeatContact = (name, number) => {
    const { contacts } = this.state;

    const repeatNameAndNumber = !!contacts.find(
      contact => contact.name === name || contact.number === number,
    );

    return repeatNameAndNumber;
  };

  addContact = (name, number) => {
    const repeat = this.repeatContact(name, number);
    if (name.length < 2) {
      alert(`Текст должен быть не меньше 2 символов, сейчас ${name.length}`);
      return;
    }

    if (number.length < 5) {
      alert(`Номер должен быть не меньше 5 символов, сейчас ${number.length}`);
      return;
    }

    repeat
      ? alert(`${name} is already exist!`)
      : this.setState(({ contacts }) => ({
          contacts: [contact, ...contacts],
        }));

    const contact = {
      id: uuidv4(),
      name,
      number,
    };
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  getVisibleContact = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  };

  render() {
    const { filter } = this.state;

    const visibleContacts = this.getVisibleContact();

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactsForm
          onAddSubmit={this.addContact}
          onRepeat={this.repeatContact}
        />
        <h2>Contact</h2>
        <Filter value={filter} onChange={this.changeFilter} />

        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}

export default App;
