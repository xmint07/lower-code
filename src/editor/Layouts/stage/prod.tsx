import React, { useRef } from "react";
import { Component, useComponents } from "../../stores/component";
import { message } from "antd";
import Space from "../../components/space";
import { ItemType } from "../../item-type";
import Button from "../../components/Button";
const ProdStage: React.FC = () => {
  const ComponentMap: { [key: string]: any } = {
    Button: Button,
    Space: Space,
  };
  const { components } = useComponents();
  const componentEventMap = {
    [ItemType.Button]: [
      {
        name: "onClick",
        label: "点击事件",
      },
    ],
  };
  const componentRefs = useRef<any>({});
  const handleEvent = (component: Component) => {
    const props: any = {};
    if (componentEventMap[component.name]?.length) {
      componentEventMap[component.name].forEach((event) => {
        const eventConfig = component.props[event.name];
        if (eventConfig) {
          const { type, config } = eventConfig;
          props[event.name] = () => {
            if (type === "showMessage") {
              if (config.type === "success") {
                message.success(config.text);
                // 显示成功提示
              } else if (config.type === "error") {
                // 显示失败提示
                message.error(config.text);
              }
            } else if (type === "componentFunction") {
              const component = componentRefs.current[config.componentId];
              if (component) {
                component[config.method]?.();
              }
            }
          };
        }
      });
    }
    return props;
  };
  const renderComponent = (components: Component[]): React.ReactNode => {
    return components.map((component) => {
      if (!ComponentMap[component.name]) {
        return null;
      }
      if (ComponentMap[component.name]) {
        const props = handleEvent(component);
        return React.createElement(
          ComponentMap[component.name],
          {
            key: component.id,
            id: component.id,
            ref: (ref) => {
              componentRefs.current[component.id] = ref;
            },
            ...props,
          },
          component.props.children || renderComponent(component.children || [])
        );
      }
      return null;
    });
  };
  return <div>{renderComponent(components)}</div>;
};
export default ProdStage;
