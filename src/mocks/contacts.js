const { v4 } = require('uuid');

module.exports = [
  {
    id: v4(),
    name: 'Thyago Nunes',
    email: 'thyago@mail.com',
    phone: '(81)99477-9774',
    birth: '27-04-1993',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Marcela Soares',
    email: 'marcela@mail.com',
    phone: '(81)99596-4131',
    birth: '30-01-1998',
    category_id: v4(),
  },
];
