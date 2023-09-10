"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Define your user-related routes here
router.get('/', (req, res) => {
    res.render('user/user', { username: 'John' });
    //const filePath = path.join(__dirname, '../..', 'views', 'user', 'user.html');
    //res.sendFile(filePath);
});
exports.default = router;
