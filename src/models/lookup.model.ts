import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connection/sequelize'; // Import your Sequelize instance

class Lookup extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Lookup.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    lid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass your Sequelize instance
    modelName: 'Lookup', // Name of the model (optional)
    tableName: 'tbllookup', // Name of the database table (optional)
  }
);

export default Lookup;