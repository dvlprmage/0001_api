const express = require('express');
const cors = require('cors');
require('dotenv').config();

const StatementRouter = require('./routers/statement.router');
const StatementCategoriesRouter = require('./routers/statement-categories.router');
const GymRouter = require('./routers/gym.router');
const ChatRouter = require('./routers/chat.router');
const AuthRouter = require('./routers/auth.router');
const UnauthenticatedRouter = require('./routers/unauthenticated.router');
const app = express();
const port = 8282;

app.use(cors({
  origin:'*',
  credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use('/', UnauthenticatedRouter);
app.use('/auth', AuthRouter);
app.use('/statements', StatementRouter);
app.use('/statement-categories', StatementCategoriesRouter);
app.use('/gym', GymRouter);
app.use('/chat', ChatRouter);

app.listen(port,'0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
});