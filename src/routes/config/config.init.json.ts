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
 * along with Lalulla System.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * Framework Designed by: Jammi Dee (jammi_dee@yahoo.com)
 *
 * File Create Date: 04/19/2024 04:17pm
 * Created by: Jammi Dee
 * Modified by: Jammi Dee
 *
*/


import fs from 'fs/promises';
import path from "path"

const configInitJSON = async () => {
  try {
    // console.log(__dirname);
    await fs.access(path.join(__dirname, '../config/server-config.json'), fs.constants.F_OK);
    console.log('server-config.json already initialized');

  } catch (error) {

    const data = {
        auth: {
            basic_username: "jammi",
            basic_password: "jammi",
            jwt_secret: "jammi",
            token_expire: "1h",
        },
        ai: {
            master: {
                model: "llama2",
                host: "127.0.0.1",
                port: 11434
            },
            image: {
                model: "llava",
                host: "127.0.0.1",
                port: 11434
            },
            embed: {
                model: "mistral",
                host: "127.0.0.1",
                port: 11434
            },
            tooling: {
                model: "mistral",
                host: "127.0.0.1",
                port: 11434
            },
            extra: {
                model: "any",
                host: "127.0.0.1",
                port: 11434
            },
        },
        vector: {
            host: "127.0.0.1",
            port: 8000,
            chunk: 1000,
            chunk_overlap: 200,
            collection_name: "sophia-collection"
        },
        database: {
            host: "127.0.0.1",
            port: 3306,
            dbname: "db_dev",
            username: "root",
            password: "password",
        },
    };

    await fs.writeFile(path.join(__dirname, "../config/server-config.json"), JSON.stringify(data));

  }
};

export default configInitJSON;