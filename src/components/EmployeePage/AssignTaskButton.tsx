import { Button } from "@mui/material";
import ModalWrapper from "../ModalWrapper";
import TaskForm from "./TaskForm";
import { useModalStore } from "../../store";

const AssignTaskButton: React.FC = () => {
  const isCreateTaskModalOpen = useModalStore(
    (store) => store.isCreateTaskModalOpen
  );
  const setIsCreateTaskModalOpen = useModalStore(
    (store) => store.setIsCreateTaskModalOpen
  );
  return (
    <>
      <Button
        variant="contained"
        onClick={() => setIsCreateTaskModalOpen(true)}
      >
        Assign Task
      </Button>
      <ModalWrapper
        title="New Task"
        open={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
      >
        <TaskForm />
      </ModalWrapper>
    </>
  );
};

export default AssignTaskButton;
