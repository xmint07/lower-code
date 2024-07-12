import React, { useState } from "react";
import { useComponents } from "../../stores/component";
import { Button, Space } from "antd";
import ComponentTree from "./components/component-tree";

const Header: React.FC = () => {
  const { mode, setMode, setCurComponentId } = useComponents();
  const [open, setOpen] = useState(false);
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
    </div>
  );
};
export default Header;
