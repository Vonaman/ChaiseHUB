import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres', // ou 'mysql' pour MySQL
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'api_chaises',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  // synchronize: process.env.NODE_ENV !== 'production', // Attention en production !
  synchronize : true,
  logging: process.env.DB_LOGGING === 'true',
};
