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
 * along with Lalulla System.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Framework Designed by: Jammi Dee (jammi_dee@yahoo.com)
 *
 * File Create Date: 09/28/2023 11:22am
 * Created by: Jammi Dee
 * Modified by: Jammi Dee
 *
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const initJSONVars = async () => {
    try {
        // console.log(__dirname);
        await promises_1.default.access(path_1.default.join(__dirname, '../../app/helpers/initvars.json'), promises_1.default.constants.F_OK);
        console.log('Initial run time variables created.');
    }
    catch (error) {
        const data = {
            templates: {
                ewallet: {
                    sms: {
                        senderName: 'ACME',
                        content: 'You have been rewarded with PHP {{face_value}} {{brand}}. Go to your {{brand}} account to check your balance.'
                    },
                    email: {
                        senderName: "ACME Philippines",
                        senderEmail: "acmenotif@acme.com.ph",
                        subject: "You've been rewarded with a {{brand}} ACME Gift!",
                        content: "<p>Dear {{name}},<br><br></p><p>You have been rewarded with PHP {{face_value}} {{brand}}. Go to your {{brand}} account to check your balance.</p>",
                    }
                },
                evoucher: {
                    sms: {
                        senderName: 'ACME',
                        content: 'Enjoy your {{brand}} e-voucher worth PHP {{face_value}}.\n\nCODE {{code}} valid until {{expiry_date}}\n\nTerms and conditions apply'
                    },
                    email: {
                        senderName: "ACME Philippines",
                        senderEmail: "acmenotif@acme.com.ph",
                        subject: "Time to shop with your {{brand}} e-voucher!",
                        content: "<p>Dear {{name}},<br><br></p><p><b>Butcher Code:&nbsp;</b>{{code}}<br><br><b>Butcher Amount:&nbsp;</b>PHP {{face_value}}<br><br><b>Valid until: {{expiry_date}}</b><br><br><b>Terms and Conditions:&nbsp;</b><a href=\"#\">Link here</a></p>",
                    }
                },
                mp: {
                    sms: {
                        senderName: 'ACME',
                        content: 'Enjoy PHP {{face_value}} {{brand}} NorthExit Pass by showing the code below to our merchant. \n\nCODE {{code}}\n\nTo know where you can use your GC code, visit mp.ACME.ph. Revalidate after {{expiry_date}}. Terms and conditions apply, visit mp.ACME.ph/tc for more details'
                    },
                    email: {
                        senderName: "ACME Philippines",
                        senderEmail: "acmenotif@acme.com.ph",
                        subject: "You've been rewarded with a {{brand}} NorthExit Pass!",
                        content: "<p>Dear {{name}},<br><br></p><p>Here’s how to enjoy your {{brand}} GC:<br>1. Open and save the attached file to get your {{brand}} GC.<br>2. Simply present the code to participating merchants reflected in the voucher<br>3. {{brand}} GC is subject for revalidation after {{expiry_date}}<br></p>"
                    }
                },
            },
            admin: {
                alerts: {
                    low_stock_inventory: {
                        email: {
                            senderName: "ACME Philippines",
                            senderEmail: "acmenotif@acme.com.ph",
                            subject: "Butcher Inventory: Low Stock Alert",
                            content: "<p>Client with id {{clientID}} is low on available vouchers at {{threshold}}</p>",
                            recepient: ['kimberly.abongan@acme.com', 'reinalyn.guillermo@acme.com'],
                            threshold: 25,
                        }
                    },
                    convert_api_error: {
                        email: {
                            senderName: "ACME Philippines",
                            senderEmail: "acmenotif@acme.com.ph",
                            subject: "Convert API Failure",
                            content: "<p>Dear Admin,<br/>Convert API failed on MP CODE {{code}} for client {{clientID}}</p>",
                            recepient: ['kimberly.abongan@acme.com', 'reinalyn.guillermo@acme.com'],
                        }
                    },
                },
                mc_auth: {
                    "Branch-id": 0,
                    "Pos-Id": 1,
                    "Pos-Transaction-DateTime": 1475350523600,
                    "Pos-Transaction-No": 133,
                },
                validate_api: {
                    "Merchant-id": "536",
                    "Authorization": "11777f1a-1acd-4bc7-8d0a-0893bb454231",
                },
                scheduler: {
                    gcash_disburse_timer: 3,
                },
            },
            gcash_failed_notification: {
                email: {
                    // fromName: "ACME Philippines",
                    // fromMail: "acmenotif@acme.com.ph",
                    fromMail: {
                        name: 'ACME Philippines',
                        email: 'acmenotif@acme.com.ph'
                    },
                    toMail: [
                        {
                            name: 'Harish',
                            email: 'harish.kumar@kollabeers.com'
                        },
                        {
                            name: 'Naveenn',
                            email: 'naveen.ulaganathan@kollabeers.com'
                        },
                        {
                            name: 'Joel',
                            email: 'joel.damaso@kollabeers.com'
                        }
                    ],
                    subject: "Daily Unsuccessful {{wallet_name}} distribution list {{date}}",
                    content: "<p>Hello,</p><br><p>Unsuccessful <b>{{wallet_name}}</b> distribution report dated {{date}} generated from Janus API is attached to this e-mail.</p><br><p>This is a system-generated e-mail. Please do not reply.</p>"
                }
            }
        };
        await promises_1.default.writeFile(path_1.default.join(__dirname, "../../app/helpers/initvars.json"), JSON.stringify(data));
    }
};
exports.default = initJSONVars;
//# sourceMappingURL=initjsonvars.js.map