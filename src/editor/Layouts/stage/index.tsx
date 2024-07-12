import React, { useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import SelectedMask from "../../common/selected-mask";
import Space from "../../components/space";
import { ItemType } from "../../item-type";
import { useComponents } from "../../stores/component";
import { Button } from "antd";

interface Component {
  id: number;
  name: string;
  props: any;
  children?: Component[];
}

const ComponentMap: { [key: string]: any } = {
  Button: Button,
  Space: Space,
};

const Stage: React.FC = () => {
  const { components, curComponentId, setCurComponentId } = useComponents();
  const selectedMaskRef: any = useRef(null);
  const componentRefs = useRef<any>({});
  useEffect(() => {
    const createMask = (e: Event) => {
      const path = e.composedPath() as Element[];
      for (let i = 0; i < path.length; i++) {
        const ele: Element = path[i];
        if (ele.getAttribute) {
          if (ele.getAttribute("data-component-id")) {
            const componentId = Number(ele.getAttribute("data-component-id"));
            setCurComponentId(componentId);
            return;
          }
        }
      }
    };

    let container = document.querySelector(".stage");
    if (container) {
      document.addEventListener("click", createMask, true);
    }
    return () => {
      container = document.querySelector(".stage");
      if (container) {
        document.removeEventListener("click", createMask, true);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedMaskRef?.current) {
      selectedMaskRef.current.upadatePosition();
    }
  }, [components]);

  const renderComponent = (components: Component[]): React.ReactNode => {
    return components.map((component) => {
      console.log("component :>> ", component);
      if (!ComponentMap[component.name]) {
        return null;
      }
      if (ComponentMap[component.name]) {
        return React.createElement(
          ComponentMap[component.name],
          {
            key: component.id,
            id: component.id,
            "data-component-id": component.id,
            ...component.props,
          },
          component.props.children || renderComponent(component.children || [])
        );
      }
      return null;
    });
  };
  const [{ canDrop }, drop] = useDrop(() => ({
    accept: [ItemType.Button, ItemType.Space],
    drop(_, monitor) {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      return { id: 0 };
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));
  return (
    <div
      ref={drop}
      style={{ border: canDrop ? "1px solid #ccc" : "none" }}
      className="p-[24px] h-[100%] stage"
    >
      {renderComponent(components)}
      {curComponentId && (
        <SelectedMask
          componentId={curComponentId}
          containerClassName="select-mask-container"
          offsetContainerClassName="stage"
          ref={selectedMaskRef}
        />
      )}
      <div className="select-mask-container" />
    </div>
  );
};
export default Stage;
