import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: ["src/entity/**/*.ts"],
  synchronize: true, // Solo para desarrollo, en producción deberías usar migraciones
  logging: true,
});