import { useState } from "react";
import { Button } from "@mui/material";
import ModalWrapper from "../ModalWrapper";
import TaskForm from "./TaskForm";

const AssignTaskButton: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setModalOpen(true)}>
        Assign Task
      </Button>
      <ModalWrapper
        title="New Task"
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
      >
        <TaskForm onSubmit={() => setModalOpen(false)} />
      </ModalWrapper>
    </>
  );
};

export default AssignTaskButton;
