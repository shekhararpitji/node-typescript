import { Table, Column, Model, HasMany } from "sequelize-typescript";
import { Address } from "./address"; // Assuming you have an Address model
import { DataTypes } from "sequelize";

@Table({
  tableName: "User",
  timestamps: false,
})
export class User extends Model {
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  firstname: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  lastname: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  email: string;

  @HasMany(() => Address)
  addresses: Address[];
}
