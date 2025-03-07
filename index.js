
const cors= require("cors");

const express = require('express'); 
const bodyParser = require('body-parser');
const app = express();

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(cors(
  {
  origin: "https://task-kohl-five.vercel.app/", // Allow only your frontend domain
  credentials: true,  // Allow cookies if using authentication
}
));

app.use(express.json());

app.listen(5001, () => console.log("Server running on port 5001"));

require('./db');
require('events').EventEmitter.defaultMaxListeners = 15; 
require('dotenv').config();

const PORT = 5000;  // Use uppercase PORT for consistency

app.use(bodyParser.json());

// Define routes
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Task Manager API is Working'
  });
});

// Start the server outside any route
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
