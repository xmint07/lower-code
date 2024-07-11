import React from "react";
import { Component, useComponents } from "../../stores/component";
import { Button } from "antd";
import Space from "../../components/space";
const ProdStage: React.FC = () => {
  const ComponentMap: { [key: string]: any } = {
    Button: Button,
    Space: Space,
  };
  const { components } = useComponents();
  const renderComponent = (components: Component[]): React.ReactNode => {
    return components.map((component) => {
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
  return <div>{renderComponent(components)}</div>;
};
export default ProdStage;
