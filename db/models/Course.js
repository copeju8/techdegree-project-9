//Model in sync with db structure with customValidator https://sequelize.org/master/manual/models-definition.html#validations

'use strict';
module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },  
        title: {
          type: DataTypes.STRING,
          allowNull: false, // disallow null
          validate: {
            // isAlpha: true,
              notEmpty: {
                  msg: 'Please enter a title.'
              }
          }
      },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Please reload this course to view the course description.'
                }
            }
        },
        estimatedTime: {
            type: DataTypes.STRING,
            allowNull: true,
            // validate: {
                // isNumeric: {
                //     msg: 'What is this?'
                // }
            // }
        },
        materialsNeeded: {
          type: DataTypes.STRING,
          allowNull: true,
          // validate: {
          //     isNumeric: {
          //         msg: 'What is this?'
          //     }
          // }
      }
    }, {});
    Course.associate = (models) => {
      Course.belongsTo(models.User, {
        as: "user",
        foreignKey: {
          fieldName: 'userId',
          allowNull: false,
        },
      });
  };
  return Course;
};
    