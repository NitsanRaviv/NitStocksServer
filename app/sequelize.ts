import {Sequelize} from 'sequelize-typescript';

export const sequelize = new Sequelize(process.env.DB_URL as string);
sequelize.addModels([__dirname + '/models']);

