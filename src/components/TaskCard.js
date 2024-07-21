import React from 'react';
import { Typography } from '@mui/material';

const TaskCard = ({ task }) => {
  return (
    <>
      <Typography variant="h6">{task.title}</Typography>
      <Typography variant="body2">{task.description}</Typography>
    </>
  );
};

export default TaskCard;
