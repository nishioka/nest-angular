import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';

function loadYamlFile(filename) {
  const yamlText = fs.readFileSync(filename, 'utf8');
  return yaml.safeLoad(yamlText);
}

let docker;
try {
  docker = loadYamlFile(path.resolve('./docker/docker-compose.yml')).services
    .api.environment;
} catch (err) {
  console.error(err.message);
}

export const environment = {
  production: false,
  database: {
    dialect: 'postgres',
    host: docker.POSTGRES_HOST,
    port: docker.POSTGRES_PORT,
    username: docker.POSTGRES_USER,
    password: docker.POSTGRES_PASSWORD,
    database: docker.POSTGRES_DB,
    timezone: '+09:00',
    logging: true,
  },
};
