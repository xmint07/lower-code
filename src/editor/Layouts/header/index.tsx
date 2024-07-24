import React, { useState } from "react";
import { useComponentsStore } from "../../stores/component";
import { Button, Space } from "antd";
import ComponentTree from "./components/component-tree";
import DefineVariable from "./components/define-variable";

const Header: React.FC = () => {
  const { mode, setMode, setCurComponentId } = useComponentsStore();
  const [open, setOpen] = useState(false);
  const [variableVisible, setVariableVisible] = useState(false);
  return (
    <div className="flex justify-end w-[100%] px-[24px]">
      {mode === "edit" && (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              setMode("preview");
              setCurComponentId(null);
            }}
          >
            预览
          </Button>
          <Button onClick={() => setOpen(true)}>查看大纲</Button>
          <Button onClick={() => setVariableVisible(true)} type="primary">
            定义变量
          </Button>
        </Space>
      )}

      <Space>
        {mode === "preview" && (
          <Button
            onClick={() => {
              setMode("edit");
            }}
            type="primary"
          >
            退出预览
          </Button>
        )}
      </Space>
      <ComponentTree open={open} onCancel={() => setOpen(false)} />
      <DefineVariable
        open={variableVisible}
        onCancel={() => setVariableVisible(false)}
      />
    </div>
  );
};
export default Header;
