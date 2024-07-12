import { create } from "zustand";
import { getComponentById } from "../utils/utils";
export interface Component {
  id: number;
  name: string;
  props: any;
  children?: Component[];
}

interface State {
  components: Component[];
  curComponentId?: number | null;
  curComponent?: Component | null;
  mode: "edit" | "preview";
}

interface Action {
  addComponent: (component: Component, parentId: number) => void;
  setCurComponentId: (componentId: number | null) => void;
  updateComponentProps: (componentId: number, props: any) => void;
  setMode: (mode: State["mode"]) => void;
}

export const useComponents = create<State & Action>((set) => ({
  components: [],
  curComponentId: null,
  curComponent: null,
  mode: "edit",
  /**
   * 添加组件到状态管理中。
   *
   * 此函数用于将一个新的组件添加到状态树中。如果指定了父组件ID，则该组件将作为子组件添加到父组件中；
   * 否则，该组件将作为独立的组件添加到组件列表中。
   *
   * @param component 要添加的组件对象。
   * @param parentId 父组件的ID，如果为0或未指定，则表示该组件没有父组件。
   * @returns 返回一个新的状态对象，其中包含了添加后的组件列表。
   */
  addComponent: (component: any, parentId: number) =>
    set((state) => {
      // 检查是否有指定的父组件ID
      if (parentId) {
        // 根据父组件ID获取父组件对象
        const parentComponent = getComponentById(parentId, state.components);

        // 如果父组件存在
        if (parentComponent) {
          // 如果父组件已有子组件，则将新组件添加到子组件数组中
          if (parentComponent?.children) {
            parentComponent?.children?.push(component);
          } else {
            // 如果父组件没有子组件，则创建一个新的子组件数组，并将新组件添加进去
            parentComponent.children = [component];
          }
        }
        // 返回一个新的状态对象，其中组件列表未发生变化
        return { components: [...state.components] };
      }
      // 如果没有指定父组件ID，则直接将新组件添加到组件列表中
      return { components: [...state.components, component] };
    }),
  setCurComponentId: (componentId) => {
    set((state) => {
      return {
        curComponentId: componentId,
        curComponent: getComponentById(componentId, state.components),
      };
    });
  },
  /**
   * 更新组件属性
   *
   * 此函数用于修改特定组件的属性。它首先通过组件ID查找目标组件，然后将新属性合并到现有属性中。
   * 如果更新的组件恰好是当前选中的组件，那么它还会更新当前选中组件的状态。
   *
   * @param componentId 组件的唯一标识符，用于定位需要更新的组件
   * @param props 待更新的组件属性，这些属性将与现有属性合并
   */
  updateComponentProps: (componentId, props) => {
    set((state) => {
      // 通过组件ID从组件列表中获取目标组件
      const component = getComponentById(componentId, state.components);
      // 如果找到了目标组件
      if (component) {
        // 将新属性与旧属性合并
        component.props = { ...component.props, ...props };
        // 如果更新的组件是当前选中的组件，则更新当前选中组件的状态
        if (componentId === state.curComponentId) {
          return { curComponent: component, components: [...state.components] };
        }
        // 如果更新的组件不是当前选中的组件，仅更新组件列表
        return { components: [...state.components] };
      }
      // 如果未找到目标组件，保持组件列表不变
      return { components: [...state.components] };
    });
  },
  setMode(mode) {
    set(() => {
      return { mode };
    });
  },
}));
