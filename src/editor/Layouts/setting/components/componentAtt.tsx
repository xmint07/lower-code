import { Form, Input, Select } from "antd";
import React, { useEffect } from "react";
import SettingFormItemInput from "../../../common/setting-form-item/input";
import { ItemType } from "../../../item-type";
import { useComponentsStore } from "../../../stores/component";
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
      name: "text",
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
const ComponentAttr: React.FC = () => {
  const [form] = Form.useForm();

  const { curComponentId, updateComponentProps, curComponent } =
    useComponentsStore();

  useEffect(() => {
    form.setFieldsValue(curComponent?.props);
  }, [curComponent]);
  const valueChange = (changeValues: any) => {
    if (curComponentId) {
      updateComponentProps(curComponentId, changeValues);
    }
  };
  const renderFormElement = (setting: any) => {
    const { type, options } = setting;
    if (type === "select") {
      return <Select options={options} />;
    } else if (type === "input") {
      return <SettingFormItemInput />;
    }
  };

  return (
    <div className="pt-[20px]">
      <Form
        form={form}
        onValuesChange={valueChange}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item label="组件id">
          <Input value={curComponent?.id} disabled />
        </Form.Item>
        {(componentSettingMap[curComponent!.name] || []).map((setting) => {
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
export default ComponentAttr;
