import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ContactsForm.module.css';

class ContactsForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    const { name, number } = this.state;
    event.preventDefault();
    this.props.onAddSubmit(name, number);
    this.props.onRepeat(name, number);

    this.reset();
  };
  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={s.form} onSubmit={this.handleSubmit}>
        <label className={s.label}>
          Name
          <input
            className={s.input}
            type="text"
            placeholder="Name contact"
            name="name"
            value={name}
            onChange={this.handleInputChange}
          />
        </label>
        <label className={s.label}>
          Number
          <input
            className={s.input}
            type="number"
            name="number"
            placeholder="Number contact"
            value={number}
            onChange={this.handleInputChange}
          />
        </label>

        <button className={s.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
ContactsForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
};

export default ContactsForm;
