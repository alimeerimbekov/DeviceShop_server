import {Sequelize} from "sequelize";

const sequelize = new Sequelize(
    "online_store",
    "postgres",
    "502505ali",
    {
        dialect: "postgres",
        host: "localhost",
        port: 5432,
        key: 'random_secret_key123'
    }
);

export default sequelize



