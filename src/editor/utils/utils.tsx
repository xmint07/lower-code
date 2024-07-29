import React from "react";
import { Component } from "../stores/component";

/**
 * 根据ID获取组件。
 *
 * 递归搜索给定组件数组，查找具有匹配ID的组件。如果找到，则返回该组件；
 * 如果未找到，返回null。搜索包括组件的子组件，支持多层嵌套。
 *
 * @param id 要查找的组件的ID。
 * @param components 组件数组，其中可能包含目标组件及其子组件。
 * @returns 匹配ID的组件，如果未找到则返回null。
 */
const getComponentById = (
  id: number | null,
  components: Component[]
): Component | null => {
  // 遍历组件数组
  for (const component of components) {
    // 如果当前组件的ID与目标ID匹配，直接返回该组件
    if (component.id === id) return component;
    // 如果当前组件有子组件
    if (component.children && component.children.length > 0) {
      // 递归调用当前组件的子组件，搜索目标ID
      const result = getComponentById(id, component.children);
      // 如果在子组件中找到了匹配的组件，返回该组件
      if (result !== null) return result;
    }
  }
  // 如果遍历完所有组件仍未找到匹配的组件，返回null
  return null;
};
/**
 * 加载远程组件
 *
 * @param url - 组件的URL地址
 * @returns 返回一个Promise，解析后的结果是加载的模块，默认导出的对象
 */
const loadRemoteComponent = async (url: string) => {
  // 通过fetch获取脚本内容
  const script = await fetch(url).then((res) => res.text());
  // 初始化模块对象
  const module = { exports: {} };
  // 初始化导出对象
  const exports = {};
  // 模拟require方法
  const require = (id: string) => {
    if (id === "react") {
      return React;
    }
  };
  const process = { env: { NODE_ENV: "production" } };
  // 创建Function实例并执行
  const func = new Function("module", "exports", "require", "process", script);
  func(module, exports, require);
  // 返回模块默认导出的对象
  return { default: module.exports, process } as any;
};
export { getComponentById, loadRemoteComponent };
