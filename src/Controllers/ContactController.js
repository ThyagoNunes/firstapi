const { v4 } = require('uuid');
let contacts = require('../mocks/contacts');

module.exports = {
  index(request, response) {
    const { order } = request.query;
    const sortedContacts = contacts.sort((a, b) => {
      if (order === 'desc') {
        return a.id < b.id ? 1 : -1;
      }
      return a.id > b.id ? 1 : -1;
    });
    response.send(200, sortedContacts);
  },
  show(request, response) {
    const { id } = request.params;
    const contactExist = contacts.find((contact) => contact.id === id);

    if (!contactExist) {
      return response.send(404, { error: 'User not find' });
    }
    return response.send(200, contactExist);
  },
  store(request, response) {
    const body = request.body;
    const newContact = {
      id: v4(),
      name: body.name,
      email: body.email,
      phone: body.phone,
      birth: body.birth,
      category_id: v4(),
    };
    contacts.push(newContact);
    return response.send(200, newContact);
  },
  update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, birth,
    } = request.body;

    const contactExist = contacts.find((contact) => contact.id === id);

    if (!contactExist) {
      return response.send(404, { error: 'User not find' });
    }

    contacts = contacts.map((contact) => {
      if (contact.id === id) {
        return {
          ...contact,
          name,
          email,
          phone,
          birth,
        };
      }
      return contact;
    });

    return response.send(200, {
      name, email, phone, birth,
    });
  },
  delete(request, response) {
    const { id } = request.params;
    const contactExist = contacts.find((contact) => contact.id === id);

    if (!contactExist) {
      return response.send(404, { error: 'User not find' });
    }

    contacts = contacts.filter((contact) => contact.id !== id);
    return response.send(204, { ok: true });
  },
};
