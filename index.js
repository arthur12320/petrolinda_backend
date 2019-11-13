const express = require('express');
const cors = require('cors');

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
app.use(cors());
app.use(express.json());


//routes
app.use('/authentication', require('./routes/authRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/stations', require('./routes/stationRouter'));
app.use('/bandeiras', require('./routes/bandeiraRoutes'));

//connect
const port = process.env.PORT || 3333;
app.listen(port, () => { console.log(`server started, litening on ${port}`) });
