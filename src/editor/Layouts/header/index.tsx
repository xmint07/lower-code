import React from "react";
import { useComponents } from "../../stores/component";
import { Button, Space } from "antd";

const Header: React.FC = () => {
  const { mode, setMode, setCurComponentId } = useComponents();
  return (
    <div className="flex justify-end w-[100%] px-[24px]">
      <Space>
        {mode === "edit" && (
          <Button
            type="primary"
            onClick={() => {
              setMode("preview");
              setCurComponentId(null);
            }}
          >
            预览
          </Button>
        )}
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
    </div>
  );
};
export default Header;
