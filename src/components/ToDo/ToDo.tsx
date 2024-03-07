import { TasksList } from "@/TasksList/TasksList";
import { CustomButton } from "@/common/CustomButton/CustomButton";

export const ToDo: React.FC = (): JSX.Element => {
  return (
    <>
      <CustomButton text="Add task" />
      <TasksList />
    </>
  );
};
