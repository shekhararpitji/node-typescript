"use strict";
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./user";
import { DataTypes } from "sequelize";

@Table({
  tableName: "Address",
  timestamps: false,
})
export class Address extends Model {
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  state: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  pin_code: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  phone_no: string;

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  // You can define other methods or associations here
}
