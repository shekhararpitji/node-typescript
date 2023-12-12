// import { Address } from './address';
import db from './index'
import { sequelize } from './index';
// import { Table, Column, Model, HasMany } from "sequelize-typescript";
// import { Address } from "./address"; 
// import { DataTypes } from "sequelize";

// @Table
// export class User extends Model {
//   @Column({
//     type: DataTypes.STRING,
//     allowNull: false,
//   })
//   firstname?: string;

//   @Column({
//     type: DataTypes.STRING,
//     allowNull: false,
//   })
//   username?: string;

//   @Column({
//     type: DataTypes.STRING,
//     allowNull: false,
//   })
//   password?: string;

//   @Column({
//     type: DataTypes.STRING,
//     allowNull: false,
//   })
//   lastname?: string;

//   @Column({
//     type: DataTypes.STRING,
//     allowNull: false,
//   })
//   email?: string;

//   @HasMany(() => Address)
//   addresses?: Address[];
// }





// "use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       User.hasMany(models.Address, { as: "addresses", foreignKey: "userId" });
//     }
//   }
//   User.init(
//     {
//       firstName: DataTypes.STRING,
//       userName: DataTypes.STRING,
//       password: DataTypes.STRING,
//       lastName: DataTypes.STRING,
//       email: DataTypes.STRING,
//     },
//     {
//       sequelize,
//       modelName: "User",
//     }
//   );
//   return User;
// };




import { Model, DataTypes } from 'sequelize';

interface UserAttributes {
  
  firstName: string;
  userName: string;
  password: string;
  lastName: string;
  email: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public firstName!: string;
  public userName!: string;
  public password!: string;
  public lastName!: string;
  public email!: string;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    User.hasMany(models.Address, { as: "addresses", foreignKey: "userId" });
  }
}

User.init(
  {
    firstName: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
  }
);