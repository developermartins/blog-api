const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middleware/error');
const User = require('./controllers/User');
const Login = require('./controllers/Login');
const Category = require('./controllers/Categories');
const Post = require('./controllers/Post');
const validateJWT = require('./auth/validateJWT');

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.use(express.json());

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', User.registerUser);

app.post('/login', Login.userLogin);

app.get('/user', validateJWT, User.getAllUsers);

app.get('/user/:id', validateJWT, User.getUserById);

app.post('/categories', validateJWT, Category.createCategory);

app.get('/categories', validateJWT, Category.getCategories);

app.post('/post', validateJWT, Post.createPost);

app.get('/post', validateJWT, Post.getAllPosts);

app.get('/post/:id', validateJWT, Post.getPostById);

app.use(errorMiddleware);
