"use strict";
/**
 * Copyright (C) 2023 Lalulla, Inc. All rights reserved.
 * Copyright (c) 2023 - Joel M. Damaso - mailto:jammi_dee@yahoo.com Manila/Philippines
 * This file is part of Lalulla System.
 *
 * LaKuboTs Framework is distributed under the terms of the GNU General Public License
 * as published by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * LaKuboTs System is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Cloud Gate System.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Framework Designed by: Jammi Dee (jammi_dee@yahoo.com)
 *
 * File Create Date: 10/05/2023 06:38pm
 * Created by: Jammi Dee
 * Modified by: Jammi Dee
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lookup = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Lookup = class Lookup extends sequelize_typescript_1.Model {
};
exports.Lookup = Lookup;
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_typescript_1.DataType.INTEGER
    })
], Lookup.prototype, "ID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], Lookup.prototype, "keyid", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], Lookup.prototype, "colid", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    })
], Lookup.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: sequelize_typescript_1.DataType.DATE
    })
], Lookup.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        type: sequelize_typescript_1.DataType.DATE
    })
], Lookup.prototype, "updatedAt", void 0);
exports.Lookup = Lookup = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        tableName: "tbllookups"
    })
], Lookup);
//# sourceMappingURL=lookup.model.js.map