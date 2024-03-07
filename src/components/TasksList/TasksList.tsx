import { Task } from "@/Task/Task";
import styles from "./TasksList.module.scss";
import update from "immutability-helper";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const initialState = [
  {
    id: 1,
    text: "Write a cool JS library",
  },
  {
    id: 2,
    text: "Make it generic enough",
  },
  {
    id: 3,
    text: "Write README",
  },
];

export interface ITaskData {
  id: number;
  text: string;
}

export const TasksList: React.FC = (): JSX.Element => {
  const [cards, setCards] = useState(initialState);

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

  const renderTask = (task: ITaskData, index: number) => {
    return (
      <Task
        key={task.id}
        index={index}
        id={task.id}
        text={task.text}
        moveCard={moveTask}
      />
    );
  };

  return (
    <div className={styles.tasksList}>
      <DndProvider backend={HTML5Backend}>
        <div>{cards.map((task, i) => renderTask(task, i))}</div>
      </DndProvider>
    </div>
  );
};
