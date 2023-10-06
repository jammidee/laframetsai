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

import { Table, Model, Column, DataType, DefaultScope, ForeignKey, BelongsTo } from "sequelize-typescript";


@Table({
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  tableName: "tbllookups"
})

export class Lookup extends Model {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER
  })
  ID!: number;

  @Column({
    type: DataType.STRING
  })
  keyid!: String;

  @Column({
    type: DataType.STRING
  })
  colid!: String;

  @Column({
    type: DataType.STRING
  })
  description!: string;

  @Column({
    allowNull: false,
    type: DataType.DATE
  })
  createdAt!: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE
  })
  updatedAt!: Date;

}