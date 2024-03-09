import { TasksList } from "@/TasksList/TasksList";
import { CustomButton } from "@/common/CustomButton/CustomButton";
import { CustomInput } from "@/common/CustomInput/CustomInput";
import { useState } from "react";
import { useAppDispatch } from "@store-hooks/hooks";
import { addTask, removeTask, updateTextTask } from "@store/toDo/toDoSlice";
import styles from "./ToDo.module.scss";
import { Modal } from "@/common/Modal/Modal";
import { ShureModal } from "@/common/ShureModal/ShureModal";
import { InputModal } from "@/common/InputModal/InputModal";

export const ToDo: React.FC = (): JSX.Element => {
  const [taskText, setTaskText] = useState<string>("");
  const [editText, setEditText] = useState<string>("");
  const [isShowMOdal, setIsShowMOdal] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<number | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [taskCategory, setTaskCategory] = useState<string>("all");
  const dispatch = useAppDispatch();

  const handleAddTask = (): void => {
    if (!taskText.length) return;

    dispatch(addTask(taskText));
    setTaskText("");
  };

  const handleGetIdTask = (id: number): void => {
    setIsEdit(false);
    setIsShowMOdal(true);
    setTaskId(id);
  };

  const handleDeleteTask = (): void => {
    if (taskId) {
      dispatch(removeTask(taskId));
      setIsShowMOdal(false);
    }
  };

  const handleEditTask = (id: number, text: string): void => {
    setIsEdit(true);
    setIsShowMOdal(true);
    setEditText(text);
    setTaskId(id);
  };

  const handelUpdateTask = () => {
    if (taskId) {
      dispatch(updateTextTask({ id: taskId, text: editText }));
      setIsShowMOdal(false);
    }
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
        <select
          value={taskCategory}
          onChange={e => setTaskCategory(e.target.value)}
        >
          <option value="all">all</option>
          <option value="completed">completed</option>
          <option value="not completed">not completed</option>
        </select>
      </div>
      <TasksList
        setDeleteIdTask={handleGetIdTask}
        setEditIdTask={handleEditTask}
        tasksCategory={taskCategory}
      />
      <Modal isShow={isShowMOdal}>
        {!isEdit ? (
          <ShureModal
            btnOneClassName="btn_red"
            btnOneOnClick={handleDeleteTask}
            btnOneText="Delete task"
            btnTwoClassName="btn_yellow"
            btnTwoOnClick={() => setIsShowMOdal(false)}
            btnTwoText="Cancel"
          />
        ) : (
          <InputModal
            buttonOneClick={handelUpdateTask}
            inputOnChange={setEditText}
            inputValue={editText}
            btnOneText="Save"
            btnTwoText="Cancel"
            buttonTwoClick={() => setIsShowMOdal(false)}
          />
        )}
      </Modal>
    </>
  );
};
