import React, { useState, useEffect } from 'react';
import ContactsEditor from './Components/ContactsEditor/ContactsEditor';
import ContactsList from './Components/ContactsList/ContactList';
import Filter from './Components/Filter/Filter';
import { v4 as uuidv4 } from 'uuid';
import Section from './Components/Section/Section';
import styles from './styles/main.module.css';

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? '',
  );
  const [filter, setFilter] = useState('');
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  const addContact = (name, phone) => {
    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
    } else {
      const Contact = {
        id: uuidv4(),
        name,
        phone,
      };
      setContacts(prevState => [...prevState, Contact]);
    }
  };
  const deleteContact = ContactId => {
    setContacts(prevState =>
      prevState.filter(Contact => Contact.id !== ContactId),
    );
  };
  const changeFilter = filter => {
    setFilter(filter);
    console.log(filter);
  };
  const getVisibleContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };
  const visibleContacts = getVisibleContact();
  return (
    <div className={styles.container}>
      <Section title="Enter contact">
        <ContactsEditor onAddContacts={addContact} />
        {contacts.length > 1 && (
          <Filter value={filter} onChangeFilter={changeFilter} />
        )}
      </Section>
      <Section title="Your contacts">
        <ContactsList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      </Section>
    </div>
  );
}
