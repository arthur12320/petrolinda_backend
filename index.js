const express = require('express');

const app = express();


//db
const db = require('./db/db');
db.connect((err) => {
  if (err) {
    console.log('unable to connect to db...');
    console.log(err);
  } else {
    console.log('connected to db...')
  }
})

//middlewares
app.use(express.json());


//routes
app.use('/authentication', require('./routes/authRoutes'));
app.use('/users', require('./routes/userRoutes'));


//connect
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`server started, litening on ${port}`) });