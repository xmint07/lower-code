import { Button, Form, Input, Modal, Select, Space } from "antd";
import React from "react";
import { useVariablesStore } from "../../../stores/variable";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

interface Props {
  open: boolean;
  onCancel: () => void;
}
interface Variable {
  name: string;
  type: string;
  defaultValue: string;
  remark: string;
}
const DefineVariable: React.FC<Props> = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  const { variables, setVariables } = useVariablesStore();
  const onFinish = (values: { variables: Variable[] }) => {
    setVariables(values.variables);
    onCancel && onCancel();
  };
  return (
    <Modal
      open={open}
      title="定义变量"
      destroyOnClose
      onCancel={onCancel}
      width={700}
      onOk={() => form.submit()}
    >
      <Form<{ variables: Variable[] }>
        initialValues={{ variables }}
        autoComplete="off"
        form={form}
        onFinish={onFinish}
        className="py-[20px]"
      >
        <Form.List name="variables">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...resetField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...resetField}
                    name={[name, "name"]}
                    rules={[{ required: true, message: "变量名不能为空" }]}
                  >
                    <Input placeholder="变量名" />
                  </Form.Item>
                  <Form.Item {...resetField} name={[name, "type"]}>
                    <Select
                      placeholder="类型"
                      style={{ width: 140 }}
                      options={[{ label: "字符串", value: "string" }]}
                    />
                  </Form.Item>
                  <Form.Item {...resetField} name={[name, "defaultValue"]}>
                    <Input placeholder="默认值" />
                  </Form.Item>
                  <Form.Item {...resetField} name={[name, "remark"]}>
                    <Input placeholder="备注" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add({ type: "string" })}
                  block
                  icon={<PlusOutlined />}
                >
                  添加变量
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};
export default DefineVariable;
