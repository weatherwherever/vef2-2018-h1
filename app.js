const express = require('express');
const { check, validationResult } = require('express-validator/check');

const app = express();

const books = require('./books');
const users = require('./users');
const login = require('./login');

app.use(express.json());

app.use('/books', books);
app.use('/users', users);
app.use('/login', login);

/*
GET skilar síðu af flokkum
*/
app.get('/categories', (req, res) => {
  // færa kannski categories í books?
  // do stuff
});

/*
POST býr til nýjan flokk og skilar
*/
app.post(
  '/categories',
  check('name')
    .isEmpty()
    .withMessage('Nafn á flokki má ekki vera tómt'),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // do stuff
    }
    // do other stuff
  },
);

/*
POST býr til notanda og skilar án lykilorðs hash
*/
app.post(
  '/register',
  check('username')
    .isLength({ min: 3 })
    .withMessage('Notendanafn verður að vera amk 3 stafir'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Lykilorð verður að vera amk 6 stafir'),
  check('name')
    .isEmpty()
    .withMessage('Nafn má ekki vera tómt'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // do stuff
    }
    // do other stuff
  },
);

/*
POST með notendanafni og lykilorði skilar token
*/
app.post('/login', (req, res) => {
  // do stuff
});

// eslint-disable-next-line
function notFoundHandler(req, res, next) {
  res.status(404).json({ error: 'Not found' });
}
// eslint-disable-next-line
function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid json' });
  }

  return res.status(500).json({ error: 'Internal server error' });
}

app.use(notFoundHandler);
app.use(errorHandler);

const { PORT: port = 3000, HOST: host = '127.0.0.1' } = process.env;

app.listen(port, () => {
  console.info(`Server running at http://${host}:${port}/`);
});
