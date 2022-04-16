const { v4 } = require('uuid');
let contacts = require('../mocks/contacts');

class ContactsRepository {
  findAll(order) {
    return new Promise((resolve) => {
      const contactsSorted = contacts.sort((a, b) => {
        if (order === 'desc') {
          return a.id < b.id ? 1 : -1;
        }
        return a.id > b.id ? 1 : -1;
      });
      resolve(contactsSorted);
    });
  }

  findById(id) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.id === id),
    ));
  }

  findByEmail(email) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.email === email),
    ));
  }

  store({
    name, email, phone, birth,
  }) {
    return new Promise((resolve) => {
      const newContact = {
        id: v4(),
        name,
        email,
        phone,
        birth,
      };
      contacts.push(newContact);
      resolve(newContact);
    });
  }

  update(id, {
    name, email, phone, birth,
  }) {
    return new Promise((resolve) => {
      contacts = contacts.map((contact) => {
        if (contact.id === id) {
          return {
            id,
            name,
            email,
            phone,
            birth,
          };
        }
        resolve(contacts);
        return contact;
      });
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve(contacts);
    });
  }
}

module.exports = new ContactsRepository();
