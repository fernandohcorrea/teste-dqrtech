import { ConfigFactory, ConfigModuleOptions } from '@nestjs/config';
import path = require('path');
import databases from './databases';

const configFactory: ConfigFactory = () => ({
  env: process.env.NODE_ENV || 'develop',
  port: parseInt(process.env.APP_PORT, 10) || 3333,
  root_dir: path.join(__dirname, `../`),

  databases,
});

const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  load: [configFactory],
};

export default configModuleOptions;
