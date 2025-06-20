import React from 'react';
import { Task } from '../state/AppContext';

interface Props {
  task: Task;
  onClose: () => void;
}

const TaskModal: React.FC<Props> = ({ task, onClose }) => {
  return (
    <div className="modal d-block" tabIndex={-1} role="dialog" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{task.name}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>{task.type} task using {task.cores} cores.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
