import { SettingOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { useState } from "react";
import SelectVariableModal from "../selectVariableModal";

interface Value {
  type: "static" | "variable";
  value: any;
}
interface Props {
  value?: Value;
  onChange?: (value: Value) => void;
}
const SettingFormItemInput: React.FC<Props> = ({ value, onChange }) => {
  const [visible, setVisible] = useState(false);
  const valueChange = (e: any) => {
    onChange && onChange({ type: "static", value: e.target.value });
  };
  const select = (record: any) => {
    onChange && onChange({ type: "variable", value: record.name });
    setVisible(false);
  };

  return (
    <div className="flex gap-[80px]">
      <Input
        disabled={value?.type === "variable"}
        value={value?.type === "static" || !value ? value?.value : ""}
        onChange={valueChange}
      />
      <SettingOutlined
        onClick={() => setVisible(true)}
        className="cursor-pointer"
        style={{ color: value?.type === "variable" ? "blue" : "" }}
      />
      <SelectVariableModal
        onSelect={select}
        open={visible}
        onCancel={() => setVisible(false)}
      />
    </div>
  );
};
export default SettingFormItemInput;
