import React, { useRef } from "react";
import { Component, useComponentsStore } from "../../stores/component";
import { message } from "antd";
import Space from "../../components/space";
import { ItemType } from "../../item-type";
import Button from "../../components/Button";
import { useVariablesStore } from "../../stores/variable";
import { usePageDataStore } from "../../stores/page-data";
import { loadRemoteComponent } from "../../utils/utils";
const ProdStage: React.FC = () => {
  const ComponentMap: { [key: string]: any } = {
    Button: Button,
    Space: Space,
    [ItemType.RemoteComponent]: React.lazy(() =>
      loadRemoteComponent(
        "https://cdn.jsdelivr.net/npm/xmint07-remote-component@1.0.1/dist/bundle.umd.js"
      )
    ),
  };
  const { components } = useComponentsStore();
  const { variables } = useVariablesStore();
  const componentEventMap = {
    [ItemType.Button]: [
      {
        name: "onClick",
        label: "点击事件",
      },
    ],
  };
  const { data, setData } = usePageDataStore();

  const componentRefs = useRef<any>({});
  /**
   * 执行脚本函数。
   *
   * 该函数通过创建一个新函数并传入一个上下文对象来执行一段脚本代码。这个上下文对象包含了`setData`和`getComponentRef`两个方法，
   * 供脚本代码使用。这种方式常用于在特定的上下文中执行动态脚本，例如在前端框架中更新数据或获取组件引用。
   *
   * @param script 要执行的脚本代码字符串。
   */
  const execScript = (script: string) => {
    // 创建一个新函数，参数为"ctx"，代码体为传入的script字符串。
    const func = new Function("ctx", script);
    // 构建执行脚本所需的上下文对象，包含setData和getComponentRef方法。
    const ctx = { setData, getComponentRef };
    // 在构建的上下文中执行脚本函数。
    func(ctx);
  };

  const getComponentRef = (componentId: number) => {
    return componentRefs.current[componentId];
  };
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
            } else if (type === "setVariable") {
              const { variable, value } = config;
              if (variable && value) {
                setData(variable, value);
              }
            } else if (type === "execScript") {
              execScript(config.script);
            }
          };
        }
      });
    }
    return props;
  };
  const formatProps = (component: Component) => {
    console.log("component.props :>> ", component.props);
    const props = Object.keys(component.props || {}).reduce<any>(
      (prev, cur) => {
        if (typeof component.props[cur] === "object") {
          if (component.props[cur]?.type === "static") {
            prev[cur] = component.props[cur].value;
          } else if (component.props[cur]?.type === "variable") {
            const variableName = component.props[cur]?.value;
            const variable = variables.find(
              (item) => item.name === variableName
            );
            prev[cur] = data[variableName] || variable?.defaultValue;
          }
        } else {
          prev[cur] = component.props[cur];
        }
        return prev;
      },
      {}
    );
    return props;
  };
  const renderComponent = (components: Component[]): React.ReactNode => {
    return components.map((component) => {
      if (!ComponentMap[component.name]) {
        return null;
      }
      if (ComponentMap[component.name]) {
        let props = handleEvent(component);
        props = { ...props, ...formatProps(component) };
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
  return (
    <div>
      <React.Suspense fallback="...loading">
        {renderComponent(components)}
      </React.Suspense>
    </div>
  );
};
export default ProdStage;
