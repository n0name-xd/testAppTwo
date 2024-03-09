import { Task } from "@/Task/Task";
import styles from "./TasksList.module.scss";
import update from "immutability-helper";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppDispatch, useAppSelector } from "@store-hooks/hooks";
import { saveDragPosition, selectToDoList } from "@store/toDo/toDoSlice";
import type { ToDoItem } from "@store/toDo/toDoSlice";

export interface ITaskData {
  id: number;
  text: string;
}

interface ITasksListProps {
  setDeleteIdTask: (id: number) => void;
  setEditIdTask: (id: number, text: string) => void;
  tasksCategory: string;
}

export const TasksList: React.FC<ITasksListProps> = ({
  setDeleteIdTask,
  setEditIdTask,
  tasksCategory,
}: ITasksListProps): JSX.Element => {
  const toDoList = useAppSelector(selectToDoList);
  const dispatch = useAppDispatch();
  const [cards, setCards] = useState(toDoList);

  useEffect(() => {
    setCards(toDoList);
  }, [toDoList, cards, tasksCategory]);

  useEffect(() => {
    dispatch(saveDragPosition(cards));
  }, [cards]);

  const taskFilter = (el: ToDoItem) => {
    if (tasksCategory === "all") return el;
    if (tasksCategory === "completed" && el.isDone === true) return el;
    if (tasksCategory === "not completed" && el.isDone === false) return el;
  };

  const moveTask = (dragIndex: number, hoverIndex: number) => {
    setCards(prevCards => {
      return update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      });
    });
  };

  const tasksList = cards.filter(taskFilter).map((task, index) => {
    return (
      <Task
        key={task.id}
        index={index}
        id={task.id}
        text={task.text}
        moveCard={moveTask}
        setDeleteIdTask={setDeleteIdTask}
        setEditIdTask={setEditIdTask}
        done={task.isDone}
      />
    );
  });

  return (
    <div className={styles.tasksList}>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.tasksListField}>{tasksList}</div>
      </DndProvider>
    </div>
  );
};
