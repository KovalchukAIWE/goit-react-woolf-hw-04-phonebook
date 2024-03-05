import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import styles from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const localData = localStorage.getItem('contacts');
    return localData ? JSON.parse(localData) : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const checkExistingContact = name => {
    return contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const handleFilterChange = filter => {
    setFilter(filter);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      <h1>Phonebook</h1>
      <ContactForm
        contacts={contacts}
        addContact={addContact}
        checkExistingContact={checkExistingContact}
      />
      <h2>Contacts</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <ContactList
        filteredContacts={filteredContacts}
        filter={filter}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
