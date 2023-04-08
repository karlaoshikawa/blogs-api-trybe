const { User } = require('../models');

const noPassword = { attributes: { exclude: ['password'] } };

const addUser = async (data) => User.create(data);

const verifyEmail = async (email) => User.findOne({ where: { email } });

const findAllUsers = async () => User.findAll(noPassword);

const findUserById = async (id) => User.findByPk(id, noPassword);

const deleteUser = async (id) => User.destroy({ where: { id } });

module.exports = {
  addUser,
  verifyEmail,
  findAllUsers,
  findUserById,
  deleteUser,
};