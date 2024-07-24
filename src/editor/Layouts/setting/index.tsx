import { Segmented } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import React, { useState } from "react";
import { useComponentsStore } from "../../stores/component";
import ComponentAttr from "./components/componentAtt";
import ComponentEvent from "./components/componentEvent";

const Setting: React.FC = () => {
  const { curComponentId, curComponent } = useComponentsStore();
  const [key, setKey] = useState<SegmentedValue>("属性");
  if (!curComponentId || !curComponent) return null;
  return (
    <div>
      <Segmented value={key} options={["属性", "事件"]} onChange={setKey} />
      <div className="pt-[20px]">
        {key === "属性" && <ComponentAttr />}
        {key === "事件" && <ComponentEvent />}
      </div>
    </div>
  );
};
export default Setting;
