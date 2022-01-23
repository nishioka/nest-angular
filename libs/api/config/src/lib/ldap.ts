import { registerAs } from '@nestjs/config';

import { ldap as configDev } from './environment.dev';
import { ldap as configProd } from './environment.prod';

export interface LdapAuthOptions {
  url: string,
  bindDN?: string,
  bindCredentials?: string,
  searchBase?: string,
  searchFilter?: string,
  searchAttributes?: string | string[],
}

export const LdapOptions = registerAs('ldap', () => {
  let config;
  if (process.env['NODE' + '_ENV'] === 'production') {
    config = configProd;
  } else {
    config = configDev;
  }

  return {
    url: `ldap://${config.ldapAaddress}:${config.ldapPort}`,
    bindDN: `cn=administrator,cn=users,${config.ldapDNBase}`,
    bindCredentials: config.bindCredentials,
    searchBase: `${config.ldapDNBase}`,
    searchFilter: '(sAMAccountName={{username}})',
    searchAttributes: ['sAMAccountName', 'displayName', 'mail'],
  } as LdapAuthOptions;
});
