export default function(sequelize, Sequelize) {

    return sequelize.define('user', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        username: {
            type: Sequelize.TEXT
        },

        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },

        hash_password: {
            type: Sequelize.STRING,
            allowNull: false
        },

        last_login: {
            type: Sequelize.DATE
        },

        created_at: {
            type: Sequelize.DATE
        },

        updated_at: {
            type: Sequelize.DATE
        }

    });
}