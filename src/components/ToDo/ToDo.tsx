import { TasksList } from "@/TasksList/TasksList";
import { CustomButton } from "@/common/CustomButton/CustomButton";
import { CustomInput } from "@/common/CustomInput/CustomInput";
import { useState } from "react";
import { useAppDispatch } from "@store-hooks/hooks";
import { addTask } from "@store/toDo/toDoSlice";
import styles from "./ToDo.module.scss";

export const ToDo: React.FC = (): JSX.Element => {
  const [taskText, setTaskText] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleAddTask = (): void => {
    if (!taskText.length) return;

    dispatch(addTask(taskText));
    setTaskText("");
  };

  return (
    <>
      <h1>To do app.</h1>
      <div className={styles.todoContainer}>
        <CustomInput
          labelText="Task text"
          value={taskText}
          onChange={setTaskText}
          style={{ maxWidth: "500px" }}
        />
        <CustomButton text="Add task" onClick={handleAddTask} />
      </div>
      <TasksList />
    </>
  );
};
