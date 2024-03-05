import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import styles from './ContactForm.module.css';

const ContactForm = ({ checkExistingContact, addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (checkExistingContact(name)) {
      alert(`${name} is already in contacts`);
    } else if (name.trim() !== '' && number.trim() !== '') {
      const newContact = {
        id: nanoid(),
        name: name,
        number: number,
      };

      addContact(newContact);

      setName('');
      setNumber('');
    } else {
      alert('Please provide both name and number.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.form}>
        <div>
          <label htmlFor="name">Enter name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            className={styles.input}
          />
        </div>
        <div>
          <label htmlFor="number">Enter phone number</label>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            placeholder="Number"
            value={number}
            onChange={e => setNumber(e.target.value)}
            className={styles.input}
          />
        </div>
      </div>
      <button className={styles.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
