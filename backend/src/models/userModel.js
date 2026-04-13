const demoUsers = [
  {
    id: 1,
    name: "Demo User",
    email: "demo@example.com",
    password: "password123",
    role: "USER",
    isVerified: true,
  },
];

const createUser = ({ name, email, password }) => {
  const user = {
    id: demoUsers.length + 1,
    name,
    email: String(email).toLowerCase().trim(),
    password,
    role: "USER",
    isVerified: true,
  };

  demoUsers.push(user);
  return user;
};

const findUserByEmail = (email = "") =>
  demoUsers.find((user) => user.email.toLowerCase() === String(email).toLowerCase().trim());

module.exports = { demoUsers, createUser, findUserByEmail };
