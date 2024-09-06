import { FC } from "react";
import { Task } from "../../pages/Employee";
import TaskCard from "./TaskCard";
import { useModalStore } from "../../store";
import useUpdateTask from "../../hooks/useUpdateTask";
import { useParams } from "react-router-dom";

interface ActiveTaskCardProps {
  task: Task;
}

const ActiveTaskCard: FC<ActiveTaskCardProps> = ({ task }) => {
  const isModalOpen = useModalStore((store) => store.isUpdateTaskModalOpen);
  const setIsModalOpen = useModalStore(
    (store) => store.setIsUpdateTaskModalOpen
  );
  const updateTaskMutation = useUpdateTask();
  const { id = "" } = useParams();
  const onConfirm = () => {
    updateTaskMutation.mutate({ id, data: { ...task, completed: true } });
  };
  return (
    <TaskCard
      completed={false}
      task={task}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      onConfirm={onConfirm}
    />
  );
};

export default ActiveTaskCard;
