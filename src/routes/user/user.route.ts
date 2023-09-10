import express, { Request, Response } from 'express';
import path from 'path';

const router = express.Router();

// Define your user-related routes here
router.get('/', (req: Request, res: Response) => {
	
	res.render('user/user', { username: 'John' });
	//const filePath = path.join(__dirname, '../..', 'views', 'user', 'user.html');
	//res.sendFile(filePath);

});
export default router;