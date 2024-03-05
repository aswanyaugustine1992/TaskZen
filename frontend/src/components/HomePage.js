import React, { useState } from 'react';
import TaskTable from './TaskTable';
import Header from './Header';
import { FormControl, InputLabel, Select, MenuItem, Container, Paper, Grid, Box, Button, Modal, TextField, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const HomePage = () => {
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([
   
  ]);
  const [newTask, setNewTask] = useState({ name: '', description: '', priority: 'Low', progress: 'Not Started', username: 'CurrentUser' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
   
    setNewTask({ name: '', description: '', priority: 'Low', progress: 'Not Started', username: 'CurrentUser' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask) 
    };
  
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then(data => {
        // Handle successful response here if needed
        console.log('Task created successfully:', data);
        // Update the tasks state with the new task
        setTasks([...tasks, data]);
        // Close the modal
        handleClose();
        // Reset form
        setNewTask({ name: '', description: '', priority: 'Low', progress: 'Not Started', username: 'CurrentUser' });
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        
      });
  };
  

  return (
   
      <Box sx={{ flexGrow: 1 }}>
        <Header onSearch={handleSearch} />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item>
              <FormControl fullWidth sx={{ m: 1, minWidth: 120, backgroundColor: 'white', borderRadius: 1 }}>
                <Select
                  labelId="view-select-label"
                  id="view-select"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        borderRadius: '20px', 
                      },
                    },
                  }}
                  sx={{
                    width: 'fit-content', 
                    border: '1px solid rgba(0, 0, 0, 0.23)', 
                    borderRadius: '20px', 
                    '& .MuiSelect-select': {
                      borderRadius: '20px', 
                      backgroundColor: 'white',
                      "&:focus": {
                        borderRadius: '20px', 
                        backgroundColor: '#F5F5F5',
                      },
                      "&:hover": {
                        backgroundColor: '#F5F5F5',
                      }
                    },
                    '& .MuiSvgIcon-root': {
                      color: 'rgba(0, 0, 0, 0.54)'
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    },
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none'
                      },
                      '& .MuiSvgIcon-root': {
                        color: 'rgba(0, 0, 0, 0.87)'
                      },
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    },
                    '& .MuiOutlinedInput-root': {
                      '&:hover:not(.Mui-disabled):before': {
                        borderColor: 'rgba(0, 0, 0, 0.23)', 
                      },
                    },
                  }}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Not Started">Not Started</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <IconButton onClick={handleOpen} color="primary" aria-label="add task" sx={{ backgroundColor: '#444444', '&:hover': { backgroundColor: '#555555' }, borderRadius: '50%' }}>
                <AddIcon sx={{ color: 'white' }} />
              </IconButton>
            </Grid>
          </Grid>
          <Paper elevation={3} sx={{ mt: 3 }}>
            <TaskTable  searchTerm={searchTerm}  tasks={tasks} filter={filter} />
          </Paper>
        </Container>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add a New Task
            </Typography>
            <Box component="form" sx={{ mt: 2 }} noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField fullWidth margin="normal" name="name" label="Task Name" variant="outlined" value={newTask.name} onChange={handleChange} />
              <TextField fullWidth margin="normal" name="description" label="Description" multiline rows={4} variant="outlined" value={newTask.description} onChange={handleChange} />
              <FormControl fullWidth margin="normal">
                <InputLabel>Priority</InputLabel>
                <Select name="priority" value={newTask.priority} label="Priority" onChange={handleChange}>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Progress</InputLabel>
                <Select name="progress" value={newTask.progress} label="Progress" onChange={handleChange}>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Not Started">Not Started</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button onClick={handleClose} variant="outlined">Cancel</Button>
                <Button type="submit" variant="contained">Add Task</Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
    
  );
};

export default HomePage;

