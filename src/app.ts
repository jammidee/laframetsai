


import express from 'express';
import path from 'path';

// Setup the environment variables - JMD 09/11/2023
import * as dotenv from 'dotenv';
dotenv.config();

//==================
// Global Variables
//==================
const globalPort = process.env.PORT || 3000;

const app = express();

// Set Pug as the view engine
app.set('view engine', 'pug');
// Specify the directory where your Pug templates are located
//app.set('views', './views');
app.set('views', path.join(__dirname, 'views'));

//===================
// Routes Entry Point
//===================
import userRoutes from './routes/user/user.route';


//===================
// Route Usage Point
//===================
app.use('/user', userRoutes);


app.get('/', (req, res) => {
	res.send('Hello, Express with TypeScript!');
});

app.listen(globalPort, () => {
	console.log('Server is running on port 3000');
});