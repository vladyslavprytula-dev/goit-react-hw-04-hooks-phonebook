import React, { useState } from 'react';
import styles from './ContactsEditor.module.css';
export default function ContactsEditor(props) {
  console.log(props);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        return;
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    props.onAddContacts(name, phone);
    setName('');
    setPhone('');
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form__label}>
      <p className={styles.form__text}>Name</p>
      <input
        name="name"
        value={name}
        onChange={handleChange}
        className={styles.form__input}
      />
      <p className={styles.form__text}>Phone</p>
      <input
        name="phone"
        value={phone}
        pattern="0[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{3}"
        onChange={handleChange}
        className={styles.form__input}
        placeholder="0YY-XX-XX-XXX"
      />
      <button type="submit" className={styles.form__btn}>
        Add contact
      </button>
    </form>
  );
}
