"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../../../connection/sequelize"); // Import your Sequelize instance
class Lookup extends sequelize_1.Model {
}
Lookup.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    lid: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.sequelize,
    modelName: 'Lookup',
    tableName: 'tbllookup', // Name of the database table (optional)
});
exports.default = Lookup;
//# sourceMappingURL=lookup.model.js.map