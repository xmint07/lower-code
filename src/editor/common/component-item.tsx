import React from "react";
import { useDrag } from "react-dnd";
import { ItemType } from "../item-type";

interface ComponentItemProps {
  name: string;
  description: string;
  onDragEnd: any;
}
const ComponentItem: React.FC<ComponentItemProps> = ({
  name,
  description,
  onDragEnd,
}) => {
  const [{ isDragging }, darg] = useDrag(() => ({
    type: name,
    end: (_, monitor) => {
      const dropResult = monitor.getDropResult();
      if (!dropResult) return;
      onDragEnd &&
        onDragEnd({
          name,
          props: name === ItemType.Button ? { children: "按钮" } : {},
          ...dropResult,
        });
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;
  return (
    <div
      ref={darg}
      className="border-dashed border-[1px] border-[gray] bg-white cursor-move py-[8px] px-[20px] rounded-lg"
      style={{ opacity }}
    >
      {description}
    </div>
  );
};
export default ComponentItem;