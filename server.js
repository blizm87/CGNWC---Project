require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');

const app = express();

// CONFIG
require('./src/db/config.js');
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public')));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
const memberRoutes = require('./src/routes/member.js');
const adminRoutes = require('./src/routes/admin.js');

app.use('/members', memberRoutes);
app.use('/admin', adminRoutes)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  // 43847
  console.log(process.env.PORT)
  console.log('I am listening!!!');
})
