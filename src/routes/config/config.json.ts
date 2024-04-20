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
 * File Create Date: 04/19/2024 07:18pm
 * Created by: Jammi Dee
 * Modified by: Jammi Dee
 *
*/

import { promises as fs } from 'fs';
import path from "path";

const configPath = "../config/server-config.json";

async function readServerConfig(): Promise<any> {
    try {
        const jsonData = await fs.readFile(path.join(__dirname, configPath ), { encoding: 'utf-8' });
        return JSON.parse(jsonData);
    } catch (error) {
        throw new Error(`Error reading Server Configuration file: ${error}`);
    }
};

async function writeServerConfig( config: any ): Promise<any> {
    try {
        console.log(`Writing config: \n\n ${JSON.stringify(config)}`);
        await fs.writeFile(path.join(__dirname, configPath ), JSON.stringify( config ));
        return config;
    } catch (error) {
        throw new Error(`Error reading Server Configuration file: ${error}`);
    }
}

export {readServerConfig, writeServerConfig };