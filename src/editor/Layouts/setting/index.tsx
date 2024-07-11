import React, { useEffect } from "react";
import { ItemType } from "../../item-type";
import { useComponents } from "../../stores/component";
import { Form, Input, Select } from "antd";

const componentSettingMap = {
  [ItemType.Button]: [
    {
      name: "type",
      label: "按钮类型",
      type: "select",
      options: [
        { label: "主按钮", value: "primary" },
        { label: "次按钮", value: "default" },
      ],
    },
    {
      name: "children",
      type: "input",
      label: "文本",
    },
  ],
  [ItemType.Space]: [
    {
      name: "size",
      label: "间距大小",
      type: "select",
      options: [
        {
          label: "大",
          value: "large",
        },
        {
          label: "中",
          value: "middle",
        },
        {
          label: "小",
          value: "small",
        },
      ],
    },
  ],
};
const Setting: React.FC = () => {
  const { curComponentId, updateComponentProps, curComponent } =
    useComponents();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(curComponent?.props);
  }, [curComponent]);

  const renderFormElement = (setting: any) => {
    const { type, options } = setting;
    if (type === "select") {
      return <Select options={options} />;
    } else if (type === "input") {
      return <Input />;
    }
  };
  const valueChange = (changeValues: any) => {
    if (curComponentId) {
      updateComponentProps(curComponentId, changeValues);
    }
  };
  if (!curComponentId || !curComponent) return null;
  return (
    <div className="pt-[20px]">
      <Form
        form={form}
        onValuesChange={valueChange}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
      >
        {(componentSettingMap[curComponent.name] || []).map((setting) => {
          return (
            <Form.Item name={setting.name} label={setting.label}>
              {renderFormElement(setting)}
            </Form.Item>
          );
        })}
      </Form>
    </div>
  );
};
export default Setting;
