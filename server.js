// Import packages, initialize an express app, and define the port you will use

//https://documenter.getpostman.com/view/52602760/2sBXcEkgHs

// Data for the server
const menuItems = [
  {
    id: 1,
    name: "Classic Burger",
    description: "Beef patty with lettuce, tomato, and cheese on a sesame seed bun",
    price: 12.99,
    category: "entree",
    ingredients: ["beef", "lettuce", "tomato", "cheese", "bun"],
    available: true
  },
  {
    id: 2,
    name: "Chicken Caesar Salad",
    description: "Grilled chicken breast over romaine lettuce with parmesan and croutons",
    price: 11.50,
    category: "entree",
    ingredients: ["chicken", "romaine lettuce", "parmesan cheese", "croutons", "caesar dressing"],
    available: true
  },
  {
    id: 3,
    name: "Mozzarella Sticks",
    description: "Crispy breaded mozzarella served with marinara sauce",
    price: 8.99,
    category: "appetizer",
    ingredients: ["mozzarella cheese", "breadcrumbs", "marinara sauce"],
    available: true
  },
  {
    id: 4,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center, served with vanilla ice cream",
    price: 7.99,
    category: "dessert",
    ingredients: ["chocolate", "flour", "eggs", "butter", "vanilla ice cream"],
    available: true
  },
  {
    id: 5,
    name: "Fresh Lemonade",
    description: "House-made lemonade with fresh lemons and mint",
    price: 3.99,
    category: "beverage",
    ingredients: ["lemons", "sugar", "water", "mint"],
    available: true
  },
  {
    id: 6,
    name: "Fish and Chips",
    description: "Beer-battered cod with seasoned fries and coleslaw",
    price: 14.99,
    category: "entree",
    ingredients: ["cod", "beer batter", "potatoes", "coleslaw", "tartar sauce"],
    available: false
  }
];

const express = require('express');
const app = express();
app.use(express.json());

// import middleware
const logger = require('./middleware/logger');
const { menuValidationRules, validate } = require('./middleware/validateMenu');

// use logging middleware
app.use(logger);

// your menu array
let menu = [];

// ROUTES
app.get('/api/menu', (req, res) => {
  res.status(200).json(menu);
});

app.get('/api/menu/:id', (req, res) => {
  const item = menu.find(m => m.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.status(200).json(item);
});

app.post('/api/menu', menuValidationRules, validate, (req, res) => {
  const newItem = { id: Date.now(), ...req.body };
  menu.push(newItem);
  res.status(201).json(newItem);
});

app.put('/api/menu/:id', menuValidationRules, validate, (req, res) => {
  const item = menu.find(m => m.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });

  Object.assign(item, req.body);
  res.status(200).json(item);
});

app.delete('/api/menu/:id', (req, res) => {
  const index = menu.findIndex(m => m.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Item not found' });

  menu.splice(index, 1);
  res.status(200).json({ message: 'Deleted successfully' });
});

// start server
app.listen(3000, () => console.log('Server running on port 3000'));
