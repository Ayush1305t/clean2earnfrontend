const AUTH_PROVIDERS = {
  LOCAL: "LOCAL",
  GOOGLE: "GOOGLE",
};

const ROLES = {
  USER: "USER",
  ADMIN: "ADMIN",
};

const normalizeEmail = (email = "") => String(email).toLowerCase().trim();

const demoUsers = [
  {
    id: 1,
    name: "Demo User",
    email: "demo@example.com",
    password: "password123",
    provider: AUTH_PROVIDERS.LOCAL,
    providerId: null,
    isVerified: true,
    otp: null,
    otpExpiry: null,
    role: ROLES.USER,
    totalCoins: 0,
    createdAt: new Date().toISOString(),
  },
];

const createUser = ({
  name,
  email,
  password = null,
  provider = AUTH_PROVIDERS.LOCAL,
  providerId = null,
  isVerified = false,
  otp = null,
  otpExpiry = null,
  role = ROLES.USER,
  totalCoins = 0,
} = {}) => {
  const user = {
    id: demoUsers.length + 1,
    name,
    email: normalizeEmail(email),
    password,
    provider,
    providerId,
    isVerified,
    otp,
    otpExpiry,
    role,
    totalCoins,
    createdAt: new Date().toISOString(),
  };

  demoUsers.push(user);
  return user;
};

const findUserByEmail = (email = "") =>
  demoUsers.find((user) => user.email === normalizeEmail(email));

module.exports = {
  AUTH_PROVIDERS,
  ROLES,
  demoUsers,
  createUser,
  findUserByEmail,
};
