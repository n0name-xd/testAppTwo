import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import styles from "./Task.module.scss";
import deleteIcon from "@assets/icons/delete.svg";
import editIcon from "@assets/icons/edit.svg";
import { useAppDispatch } from "@store-hooks/hooks";
import { updateStatusTask } from "@store/toDo/toDoSlice";

export interface ITaskProps {
  id: number;
  text: string;
  index: number;
  done: boolean;
  moveCard: (a: number, b: number) => void;
  setDeleteIdTask: (id: number) => void;
  setEditIdTask: (id: number, text: string) => void;
}

interface DragItemType {
  index: number;
  id: string;
}

export const Task: React.FC<ITaskProps> = ({
  id,
  text,
  index,
  done,
  moveCard,
  setDeleteIdTask,
  setEditIdTask,
}): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const [{ handlerId }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) return;
      const currentItem = item as DragItemType;
      const dragIndex = currentItem.index;

      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      if (clientOffset) {
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      }

      moveCard(dragIndex, hoverIndex);
      currentItem.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: "card",
    item: () => {
      return { id, index };
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div className={styles.task} ref={ref} data-handler-id={handlerId}>
      <div className={styles.text}>
        <input
          type="checkbox"
          style={{ marginRight: "10px" }}
          onChange={() => dispatch(updateStatusTask({ id, idDone: done }))}
          checked={done}
        />
        {text}
      </div>
      <div>
        <img
          width={25}
          height={30}
          src={editIcon}
          alt="edit"
          onClick={() => setEditIdTask(id, text)}
        />
        <img
          onClick={() => setDeleteIdTask(id)}
          width={25}
          height={30}
          src={deleteIcon}
          alt="delete"
        />
      </div>
    </div>
  );
};
