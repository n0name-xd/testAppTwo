import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

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
    <div ref={ref} data-handler-id={handlerId}>
      {text}
    </div>
  );
};
