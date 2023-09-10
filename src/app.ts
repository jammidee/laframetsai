import express from 'express';
import path from 'path';

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

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});