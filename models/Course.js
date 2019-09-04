//Model in sync with db structure with customValidator https://sequelize.org/master/manual/models-definition.html#validations

'use strict';
module.exports = (sequelize, DataTypes) => {
    const Courses = sequelize.define('Course', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },  
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false, // disallow null
            validate: {
              isNumeric: true, 
                notEmpty: {
                    msg: "Please enter a valid first name - numbers only."
                }
            }
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false, // disallow null
          validate: {
            isAlpha: true,
              notEmpty: {
                  msg: 'Please enter a title.'
              }
          }
      },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
              isEmail: true,  
                notEmpty: {
                    msg: "Please enter a valid email address - (e.g. mysite@ourearth.com)"
                }
            }
        },
        estimatedTime: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isNumeric: {
                    msg: 'What is this?'
                }
            }
        },
        materialsNeeded: {
          type: DataTypes.STRING,
          allowNull: true,
          validate: {
              isNumeric: {
                  msg: 'What is this?'
              }
          }
      }
    });
    Course.associate = function (models) {
       Course.belongsTo(models.User, {foreignKey: 'userId' });
    }
    return Course;
};