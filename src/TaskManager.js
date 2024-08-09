// src/TaskManager.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, removeTask, completeTask, reassignTask } from './store';

const TaskManager = () => {
  const [taskText, setTaskText] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [reassignTo, setReassignTo] = useState('');
  const [comment, setComment] = useState('');
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (taskText.trim() && assignedTo.trim()) {
      dispatch(addTask({ text: taskText, assignedTo }));
      setTaskText('');
      setAssignedTo('');
    }
  };

  const handleCompleteTask = (taskId) => {
    if (comment.trim()) {
      dispatch(completeTask({ id: taskId, comment }));
      setComment('');
    }
  };

  const handleReassignTask = (taskId) => {
    if (reassignTo.trim() && comment.trim()) {
      dispatch(reassignTask({ id: taskId, assignedTo: reassignTo, comment }));
      setReassignTo('');
      setComment('');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Task Manager</h1>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <input
            type="text"
            className="form-control"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Enter a task"
          />
          <input
            type="text"
            className="form-control mt-2"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            placeholder="Assign to (User)"
          />
          <button className="btn btn-primary w-100 mt-3" onClick={handleAddTask}>
            Add Task
          </button>
          <ul className="list-group mt-4">
            {tasks.map((task) => (
              <li key={task.id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span>{task.text} (Assigned to: {task.assignedTo})</span>
                    <ul className="mt-2">
                      {task.comments.map((comment, index) => (
                        <li key={index}>
                          <small>Comment: {comment}</small>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    {!task.completed && (
                      <>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleCompleteTask(task.id)}
                        >
                          Complete Task
                        </button>
                        <button
                          className="btn btn-warning btn-sm ml-2"
                          onClick={() => handleReassignTask(task.id)}
                        >
                          Reassign Task
                        </button>
                      </>
                    )}
                    <button
                      className="btn btn-danger btn-sm ml-2"
                      onClick={() => dispatch(removeTask(task.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                {!task.completed && (
                  <textarea
                    className="form-control mt-2"
                    rows="2"
                    placeholder="Add comments"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                )}
                {!task.completed && (
                  <input
                    type="text"
                    className="form-control mt-2"
                    value={reassignTo}
                    onChange={(e) => setReassignTo(e.target.value)}
                    placeholder="Reassign to (User)"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
