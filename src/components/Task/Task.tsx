import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import styles from "./Task.module.scss";
import deleteIcon from "@assets/icons/delete.svg";
import editIcon from "@assets/icons/edit.svg";
import { useAppDispatch } from "@store-hooks/hooks";
import { removeTask } from "@store/toDo/toDoSlice";

export interface ITaskProps {
  id: number;
  text: string;
  index: number;
  moveCard: (a: number, b: number) => void;
}

interface DragItemType {
  index: number;
  id: string;
}

export const Task: React.FC<ITaskProps> = ({
  id,
  text,
  index,
  moveCard,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

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
      <div className={styles.text}>{text}</div>
      <div>
        <img width={25} height={30} src={editIcon} alt="edit" />
        <img
          onClick={() => dispatch(removeTask(id))}
          width={25}
          height={30}
          src={deleteIcon}
          alt="delete"
        />
      </div>
    </div>
  );
};
