// models/task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  priority: { type: String, default: 'Medium' }, 
  progress: { type: String, default: 'Not Started' }, 
  username: { type: String, required: true } 
});

module.exports = mongoose.model('Task', taskSchema);
