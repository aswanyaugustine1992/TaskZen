import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  InputLabel,
  Select,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function TaskTable({  searchTerm, filter }) {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({});
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [tasks]);

  const fetchTasks = () => {
    fetch('http://localhost:3001/api/tasks')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        return response.json();
      })
      .then(data => {
        setTasks(data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  };


  const filteredTasks = tasks.filter(task => {
    const matchesSearchTerm = !searchTerm || 
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || task.progress.toLowerCase() === filter.toLowerCase();
    return matchesSearchTerm && matchesFilter;
  });
  const openMenu = (event, row) => {
    setMenuAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };

  const closeMenu = () => {
    setMenuAnchorEl(null);
  };

  const openEditModal = () => {
    setCurrentTask(currentRow);
    setEditModalOpen(true);
    closeMenu();
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
    closeMenu();
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleDelete = () => {
    fetch(`http://localhost:3001/api/tasks/${currentRow._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Task deleted successfully');
        closeDeleteDialog();
      })
      .catch((error) => {
        console.error('There was a problem with the delete operation:', error);
      });
  };
  
  const handleEditSave = () => {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentTask) 
    };
 
    fetch(`http://localhost:3001/api/tasks/${currentTask._id}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then(data => {
        console.log('Task updated successfully:', data);
        setEditModalOpen(false);
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
  };
  
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Progress</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTasks.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.priority}</TableCell>
              <TableCell>{row.progress}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={(event) => openMenu(event, row)}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={menuAnchorEl}
                  keepMounted
                  open={Boolean(menuAnchorEl)}
                  onClose={closeMenu}
                >
                  <MenuItem onClick={() => openEditModal()}>Edit</MenuItem>
                  <MenuItem onClick={openDeleteDialog}>Delete</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={editModalOpen} onClose={closeEditModal}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={currentTask.name}
            onChange={(e) => setCurrentTask({...currentTask, name: e.target.value})}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            margin="dense"
            autoFocus
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={currentTask.description}
            onChange={(e) => setCurrentTask({...currentTask, description: e.target.value})}
          />
         <FormControl fullWidth margin="normal">
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              name="priority"
              value={currentTask.priority}
              label="Priority"
              onChange={(e) => setCurrentTask({...currentTask, priority: e.target.value})}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="progress-label">Progress</InputLabel>
            <Select
              labelId="progress-label"
              name="progress"
              value={currentTask.progress}
              label="Progress"
              onChange={(e) => setCurrentTask({...currentTask, progress: e.target.value})}
            >
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Not Started">Not Started</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditModal}>Cancel</Button>
          <Button onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
