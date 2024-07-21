import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { moveTask } from '../redux/slices/tasksSlice';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { Typography, Box, Container } from '@mui/material';
import App from '../App';

const columns = ['todo', 'inProgress', 'peerReview', 'done'];

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const task = tasks[source.droppableId].find((t) => t.id === draggableId);
    dispatch(moveTask({
      source: source.droppableId,
      destination: destination.droppableId,
      task: task,
      index: destination.index
    }));
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Kanban Board
      </Typography>
      <TaskForm />
      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {columns.map((column) => (
            <Droppable key={column} droppableId={column}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{ width: '200px', minHeight: '400px', backgroundColor: '#f4f4f4', p: 2 }}
                >
                  <Typography variant="h6">{column.replace(/([A-Z])/g, ' $1').trim()}</Typography>
                  {tasks[column].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{ mb: 2, p: 2, borderRadius: '4px', backgroundColor: '#fff', boxShadow: 1 }}
                        >
                          <TaskCard task={task} />
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          ))}
        </Box>
      </DragDropContext>
    </Container>
  );
};

export default KanbanBoard;
