const express    = require('express');
const morgan     = require('morgan');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const app        = express();

const { port, db, env } = require('./config/environment');
const routes            = require('./config/routes');
const customResponses   = require('./lib/customResponses');
const errorHandler      = require('./lib/errorHandler');

mongoose.Promise = require('bluebird');
mongoose.plugin(require('mongoose-unique-validator'));
mongoose.connect(db[env]);

app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());

app.use(customResponses);

app.use('/api', routes);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(errorHandler);

if(env !== 'test') app.listen(port, () => console.log(`Express is listening on port ${port}`));
