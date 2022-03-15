const ContactController = require('./Controllers/ContactController');

module.exports = [
  {
    endpoint: '/contacts',
    method: 'GET',
    handler: ContactController.index,
  },
  {
    endpoint: '/contacts/:id',
    method: 'GET',
    handler: ContactController.show,
  },
  {
    endpoint: '/contacts',
    method: 'POST',
    handler: ContactController.store,
  },
  {
    endpoint: '/contacts/:id',
    method: 'PUT',
    handler: ContactController.update,
  },
  {
    endpoint: '/contacts/:id',
    method: 'DELETE',
    handler: ContactController.delete,
  },
];
