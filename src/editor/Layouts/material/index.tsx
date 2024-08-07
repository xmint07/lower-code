import React from "react";
import ComponentItem from "../../common/component-item";
import { ItemType } from "../../item-type";
import { useComponentsStore } from "../../stores/component";

const Material: React.FC = () => {
  const { addComponent } = useComponentsStore();
  const onDragEnd = (dropResult: any) => {
    addComponent(
      {
        id: new Date().getTime(),
        name: dropResult.name,
        props: dropResult.props,
      },
      dropResult.id
    );
  };
  return (
    <div className="flex p-[10px] gap-4 flex-wrap">
      <ComponentItem
        name={ItemType.Button}
        description="按钮"
        onDragEnd={onDragEnd}
      />
      <ComponentItem
        name={ItemType.Space}
        description="间距"
        onDragEnd={onDragEnd}
      />
      <ComponentItem
        name={ItemType.RemoteComponent}
        description="远程组件"
        onDragEnd={onDragEnd}
      />
    </div>
  );
};
export default Material;
