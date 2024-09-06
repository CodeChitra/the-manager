import { FC } from "react";
import { Task } from "../../pages/Employee";
import { useModalStore } from "../../store";
import TaskCard from "./TaskCard";
import useRemoveTask from "../../hooks/useRemoveTask";
import { useParams } from "react-router-dom";

interface CompletedTaskCardProps {
  task: Task;
}

const CompletedTaskCard: FC<CompletedTaskCardProps> = ({ task }) => {
  const isModalOpen = useModalStore((store) => store.isRemoveTaskModalOpen);
  const setIsModalOpen = useModalStore(
    (store) => store.setIsRemoveTaskModalOpen
  );

  const { createdAt, updatedAt } = task;
  if (updatedAt && createdAt) {
    const createdDate: Date = new Date(createdAt);
    const updatedDate: Date = new Date(updatedAt);
    task.completedTime = Math.floor(
      (updatedDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  }
  const removeTaskMutation = useRemoveTask();
  const { id = "" } = useParams();
  const onConfirm = () => {
    removeTaskMutation.mutate({ employeeId: id, taskId: task._id });
  };
  return (
    <TaskCard
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      task={task}
      completed={true}
      onConfirm={onConfirm}
    />
  );
};

export default CompletedTaskCard;
