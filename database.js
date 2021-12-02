import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('almasriadb', 'root', 'password', {
    dialect: 'mysql',
    host: 'localhost', 
});

export default sequelize;