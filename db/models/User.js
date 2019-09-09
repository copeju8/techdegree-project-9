//Model in sync with db structure with customValidator https://sequelize.org/master/manual/models-definition.html#validations

'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },  
      firstName: {
            type: DataTypes.STRING,
            allowNull: false, // disallow null
            validate: {
               is: ["^[a-z]+$", 'i'],  //Allow letters only - TODO
                notEmpty: {
                    msg: "Please enter a valid first name - letters only."
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is:["^[a-z]+$", 'i'], //Allow letters only - TODO
                notEmpty: {
                    msg: "Please enter a valid last name - letters only."
                }
            }
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isEmail: {
                msg: "Please provide a valid email address - (e.g. mysite@ourearth.com)"
              },
              notEmpty: {
                msg: 'Email address is required.'
            }
          },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              is: /^[A-Za-z]\w{7,14}$/,
                notEmpty: {
                    msg: 'Please enter a password between 7 to 15 characters which contain at least one numeric digit and a special character.'
                }
            }
        }
    });
    User.associate = (models) => {
        User.hasMany(models.Course, {
          as: "user",
          foreignKey: {
            fieldName: 'userId',
            allowNull: false,
          },
        });
    }
    return User;
};