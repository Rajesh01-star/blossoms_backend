const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

app.use(express.static("src"))
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose.connect('mongodb+srv://Atharv-admin:superitachi@cluster0.7sm6f.mongodb.net/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define a schema and model for your data
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  checkin:Date,
  checkout:Date,
  roomType:String,
});

const User = mongoose.model('User', userSchema);

app.get('/',(req,res)=>{
  res.send("hello there !!")
})



// Example route to create a new user
app.post('/users', (req, res) => {

  console.log(req.body);
  const { name, email,checkin,checkout,roomType } = req.body;
  const newUser = new User({ name, email,checkin,checkout,roomType });

  newUser.save()
    .then(() => {
      res.send("User created successfully")
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error creating user');
    });

});


// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
