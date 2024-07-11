import React from "react";
import { useDrop } from "react-dnd";
import { ItemType } from "../../item-type";
import { Space as AntdSpace, SpaceProps } from "antd";

interface Props {
  children: any;
  id: number;
}
const Space: React.FC<Props> = (props) => {
  const { children, id } = props;
  const [{ canDrop }, drop] = useDrop(() => ({
    accept: [ItemType.Space, ItemType.Button],
    drop: (_, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      return { id };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  if (!children?.length) {
    return (
      <AntdSpace
        ref={drop}
        className="p-[16px]"
        style={{ border: canDrop ? "1px solid #ccc" : "none" }}
        {...(props as Omit<SpaceProps, "id">)}
      >
        暂无内容
      </AntdSpace>
    );
  }
  return (
    <AntdSpace
      ref={drop}
      className="p-[16px]"
      style={{ border: canDrop ? "1px solid #ccc" : "none" }}
      {...(props as Omit<SpaceProps, "id">)}
    >
      {children}
    </AntdSpace>
  );
};
export default Space;
