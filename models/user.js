import crypto from 'crypto';
import jwt from 'jsonwebtoken';

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

        hash: {
            type: Sequelize.STRING,
            allowNull: false
        },

        salt: {
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

    },
    {
        instanceMethods: {
            setPassword: function(password) {
                this.salt = crypto.randomBytes(16).toString('hex');
                this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
            },
            validatePassword: function(password) {
                const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
                return this.hash === hash;
            },
            generateJWT: function() {
                const today = new Date();
                const expirationDate = new Date(today);
                expirationDate.setDate(today.getDate() + 60);

                return jwt.sign({
                    email: this.email,
                    id: this._id,
                    exp: parseInt(expirationDate.getTime() / 1000, 10),
                }, 'secret');
            },
            toAuthJSON: function() {
                return {
                    _id: this._id,
                    email: this.email,
                    token: this.generateJWT(),
                };
            }
        }
    });
}