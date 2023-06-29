const RegisterRepository = require('../repositories/RegisterRepository');

class RegisterController {
  // recovery all users registereds
  async index(request, response) {
    const registers = await RegisterRepository.findAll();
    response.send(registers);
  }

  async show(request, response) {
    const { id } = request.params;
    const register = await RegisterRepository.findById(id);

    if (!register) {
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(register);
  }

  // create a new register
  async store(request, response) {
    // criar um registro
    const {
      name, email, password, confirmPassword, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const userExist = await RegisterRepository.findByEmail(email);

    if (userExist) {
      return response.status(400).json({ error: 'This email already been taken' });
    }

    const users = await RegisterRepository.create({
      name, email, password, confirmPassword, category_id,
    });

    response.json(users);
  }

  // update an old register
  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, password, confirmPassword,
    } = request.body;

    const registerExists = await RegisterRepository.findById(id);
    if (!registerExists) {
      return response.status(400).json({ error: 'User not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const registerByEmail = await RegisterRepository.findByEmail(email);

    if (registerByEmail && registerByEmail.id !== id) {
      return response.status(400).json({ error: 'this email already in use' });
    }

    const register = await RegisterRepository.update(id, {
      name, email, password, confirmPassword,
    });

    response.json(register);
  }

  // delete register
  async delete(request, response) {
    const { id } = request.params;

    const register = await RegisterRepository.findbyId(id);

    if (!register) {
      return response.status(400).json({ error: 'User not found' });
    }

    await RegisterRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new RegisterController();
