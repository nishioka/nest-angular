export const database = {
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  timezone: '+09:00',
  logging: false,
};

export const ldap = {
  ldapAaddress: '192.168.0.194',
  ldapPort: '389',
  ldapDNBase: 'dc=internal,dc=example,dc=com',
  bindCredentials: 'examp1e_admin',
};
