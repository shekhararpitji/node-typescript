// "use strict";
// import "reflect-metadata";
// import {
//   BelongsTo,
//   Column,
//   ForeignKey,
//   Model,
//   Table,
// } from "sequelize-typescript";
// import { User } from "./user";
// import { DataTypes } from "sequelize";

// @Table
// export class Address extends Model {
//   @Column({
//     type: DataTypes.STRING,
//     allowNull: false,
//   })
//   address?: string;

//   @Column({
//     type: DataTypes.STRING,
//     allowNull: false,
//   })
//   state?: string;

//   @Column({
//     type: DataTypes.STRING,
//     allowNull: false,
//   })
//   pin_code?: string;

//   @Column({
//     type: DataTypes.STRING,
//     allowNull: false,
//   })
//   phone_no?: string;

//   @ForeignKey(() => User)
//   @Column({
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   })
//   userId?: number;

//   @BelongsTo(() => User)
//   user?: User;
// }


import { sequelize } from './index';

import { Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey } from 'sequelize';
import { User } from './user';

export class Address extends Model<InferAttributes<Address>, InferCreationAttributes<Address>> {
 declare id: number;
 declare userId: ForeignKey<number>;
}


Address.belongsTo(User);

Address.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
}, { sequelize });