const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); 
const Task = require('../models/task');

beforeAll(async () => {
 
  const url = 'mongodb://127.0.0.1/taskRoutesTest';
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});


afterEach(async () => {
  await Task.deleteMany();
});


afterAll(async () => {
  await mongoose.connection.close();
});

describe('Task API', () => {
  test('POST /api/tasks', async () => {  
    const taskData = { name: 'Test Task', priority: 'High', username: 'testUser' };
    const response = await request(app)
      .post('/api/tasks')
      .send(taskData)
      .expect(201);

   
    const task = await Task.findById(response.body._id);
    expect(task.name).toEqual(taskData.name);
    expect(task.priority).toEqual(taskData.priority);
  });

  test('GET /api/tasks', async () => {
   
    const task = new Task({ name: 'Task for GET', priority: 'Medium', username: 'testUser' });
    await task.save();

  
    const response = await request(app)
      .get('/api/tasks')
      .expect(200);

    
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body.some(t => t.name === task.name)).toBeTruthy();
  });

  test('PATCH /api/tasks/:id', async () => {
   
    const task = new Task({ name: 'Task before update', priority: 'Low', username: 'testUser' });
    await task.save();

    const updatedData = { priority: 'Medium' };
    await request(app)
      .patch(`/api/tasks/${task._id}`)
      .send(updatedData)
      .expect(200);

    const updatedTask = await Task.findById(task._id);
    expect(updatedTask.priority).toEqual(updatedData.priority);
  });

  test('DELETE /api/tasks/:id', async () => {
   
    const task = new Task({ name: 'Task to delete', priority: 'Low', username: 'testUser' });
    await task.save();

    await request(app)
      .delete(`/api/tasks/${task._id}`)
      .expect(200);

    const deletedTask = await Task.findById(task._id);
    expect(deletedTask).toBeNull();
  });
});
