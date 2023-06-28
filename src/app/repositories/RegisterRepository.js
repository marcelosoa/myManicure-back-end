const { uuid } = require('uuidv4');

const register = [
  {
    id: uuid(),
    name: 'Marcelo',
    email: 'marcelosoaresinc@gmail.com',
    password: '123456',
    confirmPassword: '123456',
  },
];

class RegisterRepository {
  findAll() {
    return register;
  }
}

module.exports = new RegisterRepository();
