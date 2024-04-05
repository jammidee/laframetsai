/**
 * Copyright (C) 2023 Lalulla, Inc. All rights reserved.
 * Copyright (c) 2023 - Joel M. Damaso - mailto:jammi_dee@yahoo.com Manila/Philippines
 * This file is part of Lalulla System.
 * 
 * LaKuboTron Framework is distributed under the terms of the GNU General Public License 
 * as published by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * LaKuboTron System is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A 
 * PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Lalulla System.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * Framework Designed by: Jammi Dee (jammi_dee@yahoo.com)
 *
 * File Create Date: 04/05/2024 11:44 PM
 * Created by: Jammi Dee
 * Modified by: Jammi Dee
 *
*/

import axios, { AxiosRequestConfig } from 'axios';

const API_ORIGIN = 'http://127.0.0.1';
const API_PORT = '11434';
const API_VERSION = 'api';

class SimplyOllama {

    private baseURL: string;
    private subURL: string;

    constructor(baseURL?: string) {

        this.baseURL = baseURL || `${API_ORIGIN}:${API_PORT}`;
        this.subURL = `${API_VERSION}`;

    }

    async ping(): Promise<string> {
        const url = this.baseURL;

        try {
            const response = await axios.get(url);
            return response.data as string;
        } catch (error) {
            console.error('Error fetching response:', error);
            return ''; // Return empty string on failure
        }
    }

    async tags(request: AxiosRequestConfig): Promise<any> {

        const url = `${this.baseURL}/${this.subURL}/tags`;

        try {
            const response = await axios.get(url, request);
            return response.data;
        } catch (error) {
            console.error('Error fetching response:', error);
            throw error;
        }

    }

    async generate(request: AxiosRequestConfig): Promise<any> {

        const url = `${this.baseURL}/generate`;

        try {
            const response = await axios.post(url, request);
            return response.data;
        } catch (error) {
            console.error('Error fetching response:', error);
            throw error;
        }

    }

    async chat(request: AxiosRequestConfig): Promise<string> {

        const url = `${this.baseURL}/${API_VERSION}/chat`;

        try {
            const response = await axios.post(url, request);
            const lines = response.data.split('\n').filter(Boolean);

            let contentValue = "";
            lines.forEach((line:any) => {
                const jline = JSON.parse(line);
                const jsonData = jline.message.content;
                contentValue += jsonData;
            });

            return contentValue;
        } catch (error) {
            console.error('Error fetching response:', error);
            throw error;
        }

    }

    async chatlms(request: AxiosRequestConfig): Promise<string> {

        const url = `${this.baseURL}/${this.subURL}/chat/completions`;

        try {
            const response = await axios.post(url, request);
            const lines = response.data.split('\n').filter(Boolean);

            let contentValue = "";
            lines.forEach((line:any) => {
                const parts = line.split(':');
                const value = parts.slice(1).join(':').trim();
                if (value !== "[DONE]") {
                    const jsonData = JSON.parse(value);
                    if (jsonData.choices[0].delta.content !== undefined) {
                        contentValue += jsonData.choices[0].delta.content;
                    }
                }
            });

            return contentValue;
        } catch (error) {
            console.error('Error fetching response:', error);
            throw error;
        }
    }

    setBaseURL(newBaseURL: string): void {
        this.baseURL = newBaseURL;
    }

    setSubURL(suburl: string): void {
        this.subURL = suburl;
    }
}

const simplyOllama = new SimplyOllama();

export default simplyOllama;
