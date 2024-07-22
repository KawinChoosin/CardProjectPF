const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const Todo = require('./models/todo');
const helmet = require('helmet');

const app = express();
const port = 2222;

app.use(helmet());
app.use(
  cors({
    origin: false, // Disable CORS
    // origin: "*", // Allow all origins
  })
);
app.use(bodyParser.json());

// Sync database
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(error => console.error('Error syncing database:', error));

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create a new todo
app.post('/todos', async (req, res) => {
  try {
    const { topic, name, url, detail, done } = req.body;
    const newTodo = await Todo.create({ topic, name, url, detail, done });
    res.json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { topic, name, url, detail, done } = req.body;
    await Todo.update({ topic, name, url, detail, done }, { where: { id } });
    const updatedTodo = await Todo.findByPk(id);
    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.destroy({ where: { id } });
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
