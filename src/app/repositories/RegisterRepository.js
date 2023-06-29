const db = require('../../database/index');

class RegisterRepository {
  // create
  async create({
    name, email, password, confirmPassword, category_id,
  }) {
    // this function basically will insert into my table contacts this infos
    const [row] = await db.query(`INSERT INTO users(name, email, password, confirmPassword,  category_id)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
      `, [name, email, password, confirmPassword, category_id]);

    return row;
  }

  // Find all users
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    // will search all users inside my table contacts
    const rows = await db.query(`
      SELECT users.*, categories.name AS category_name
      FROM users
      LEFT JOIN categories ON categories.id = users.category_id
      ORDER BY users.name ${direction}
    `);

    return rows;
  }

  // Find user by id
  async findById(id) {
    const [rows] = await db.query(`
    SELECT users.*, categories.name AS category_name
    FROM users
    LEFT JOIN categories ON categories.id = users.category_id
    WHERE users.id = $1`, [id]);
    return rows;
  }

  // Find user by email
  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return row;
  }

  // delete user
  async delete(id) {
    const deleteOp = await db.query('DELETE FROM users WHERE id = $1', [id]);
    return deleteOp;
  }

  // update user
  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
    UPDATE users
    SET name = $1,
    email = $2,
    phone = $3,
    category_id = $4
    WHERE id = $5
    `, [name, email, phone, category_id, id]);
    return row;
  }
}

module.exports = new RegisterRepository();
