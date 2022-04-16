const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    const { order } = request.query;
    const cContacts = await ContactsRepository.findAll(order);
    response.send(200, cContacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response.send(404, { error: 'Contact not found' });
    }
    response.send(200, contactExists);
  }

  async store(request, response) {
    let {
      id, name, email, phone, birth,
    } = request.body;

    if (!name) {
      return response.send(404, { error: 'name is required' });
    }
    if (!email) {
      return response.send(404, { error: 'email is required' });
    }
    if (!phone) {
      return response.send(404, { error: 'phone is required' });
    }
    if (!birth) {
      return response.send(404, { error: 'birth is required' });
    }

    name = name.toUpperCase();
    email = email.toUpperCase();
    phone = phone.toUpperCase();
    birth = birth.toUpperCase();

    const emailExist = await ContactsRepository.findByEmail(email);

    if (emailExist) {
      return response.send(400, { error: 'this e-mail is already in use' });
    }

    const contact = await ContactsRepository.store({
      id, name, email, phone, birth,
    });
    response.send(200, contact);
  }

  async update(request, response) {
    const { id } = request.params;
    let {
      name, email, phone, birth,
    } = request.body;

    if (!name) {
      return response.send(404, { error: 'name is required' });
    }
    if (!email) {
      return response.send(404, { error: 'email is required' });
    }
    if (!phone) {
      return response.send(404, { error: 'phone is required' });
    }
    if (!birth) {
      return response.send(404, { error: 'birth is required' });
    }

    name = name.toUpperCase();
    email = email.toUpperCase();
    phone = phone.toUpperCase();
    birth = birth.toUpperCase();

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response.send(404, { error: 'Contact not found' });
    }
    const emailExists = await ContactsRepository.findByEmail(email);
    if (emailExists) {
      return response.send(400, { error: 'This e-mail is already in use' });
    }

    await ContactsRepository.update(id, {
      name, email, phone, birth,
    });

    response.send(200, {
      name, email, phone, birth,
    });
  }

  async delete(request, response) {
    const { id } = request.params;
    const contactExist = await ContactsRepository.findById(id);

    if (!contactExist) {
      return response.send(404, { error: 'Contact not found' });
    }

    await ContactsRepository.delete(id);
    response.send(204, { deleted: true });
  }
}

module.exports = new ContactController();
