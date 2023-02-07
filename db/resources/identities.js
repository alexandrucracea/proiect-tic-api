const chance = require('../../lib/chance');
const { hashSync } = require('bcryptjs');

module.exports = async () => {
  const roles = ['admin', 'client'];

  return [
    {
      email: 'alexandru.cracea29@email.com',
      name: 'Alexandru Cracea',
      password: hashSync('supersecretpassword'),
      role: 'admin',
    },
    {
      email: chance.email(),
      name: chance.name(),
      password: hashSync('supersecretpassword'),
      role: chance.pickone(roles),
    },
    {
      email: chance.email(),
      name: chance.name(),
      password: hashSync('supersecretpassword'),
      role: chance.pickone(roles),
    },
  ];
};
