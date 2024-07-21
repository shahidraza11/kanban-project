import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: {
    todo: [],
    inProgress: [],
    peerReview: [],
    done: []
  }
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.todo.push(action.payload);
    },
    moveTask: (state, action) => {
      const { source, destination, task } = action.payload;
      state.tasks[source] = state.tasks[source].filter(t => t.id !== task.id);
      state.tasks[destination].splice(action.index, 0, task);
    }
  }
});

export const { addTask, moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;
