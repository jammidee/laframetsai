"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Set Pug as the view engine
app.set('view engine', 'pug');
// Specify the directory where your Pug templates are located
//app.set('views', './views');
app.set('views', path_1.default.join(__dirname, 'views'));
//===================
// Routes Entry Point
//===================
const user_route_1 = __importDefault(require("./routes/user/user.route"));
//===================
// Route Usage Point
//===================
app.use('/user', user_route_1.default);
app.get('/', (req, res) => {
    res.send('Hello, Express with TypeScript!');
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
