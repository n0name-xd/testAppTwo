import { Task } from "@/Task/Task";
import styles from "./TasksList.module.scss";
import update from "immutability-helper";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppSelector } from "@store-hooks/hooks";
import { selectToDoList } from "@store/toDo/toDoSlice";

export interface ITaskData {
  id: number;
  text: string;
}

export const TasksList: React.FC = (): JSX.Element => {
  const toDoList = useAppSelector(selectToDoList);

  const [cards, setCards] = useState(toDoList);

  useEffect(() => {
    setCards(toDoList);
  }, [toDoList]);

  const moveTask = (dragIndex: number, hoverIndex: number) => {
    setCards(prevCards =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      }),
    );
  };

  const tasksList = cards.map((task, index) => {
    return (
      <Task
        key={task.id}
        index={index}
        id={task.id}
        text={task.text}
        moveCard={moveTask}
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
