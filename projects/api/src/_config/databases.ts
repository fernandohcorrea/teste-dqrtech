import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

const config_dqrtech = {
  name: 'dqrtech',
  username: process.env.MONGO_INITDB_ROOT_USERNAME || null,
  password: process.env.MONGO_INITDB_ROOT_PASSWORD || null,
  database: process.env.MONGO_INITDB_DATABASE || null,
  port: process.env.MONGO_INITDB_PORT || 27017,
  host: process.env.MONGO_INITDB_HOST || 'localhost',
};

const dqrtech: MongooseModuleAsyncOptions = {
  connectionName: config_dqrtech.name,
  useFactory: async () => {
    const { username, password, database, port, host } = config_dqrtech;
    const pass = encodeURIComponent(password);
    const uri = `mongodb://${username}:${pass}@${host}:${port}/${database}`;
    const params = new URLSearchParams({
      authMechanism: 'DEFAULT',
      authSource: 'admin',
    });
    const str_params = params.toString();
    return { uri: `${uri}?${str_params}` };
  },
};

export default {
  db_default: 'dqrtech',
  config_dqrtech,
  dqrtech,
};
