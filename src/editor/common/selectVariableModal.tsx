import { Modal, Table } from "antd";
import React from "react";
import { useVariablesStore } from "../stores/variable";

interface Props {
  open: boolean;
  onCancel: () => void;
  onSelect: (record: any) => void;
}
const SelectVariableModal: React.FC<Props> = ({ open, onCancel, onSelect }) => {
  const { variables } = useVariablesStore();
  const columns = [
    {
      title: "变量名",
      dataIndex: "name",
    },
    {
      title: "变量值",
      dataIndex: "defaultValue",
    },
    {
      title: "备注",
      dataIndex: "remark",
    },
  ];
  const rowSelect = (record: any) => {
    onSelect(record);
  };
  return (
    <Modal open={open} onCancel={onCancel} title="选择变量" width={800}>
      <Table
        columns={columns}
        dataSource={variables}
        rowKey={(record) => record.name}
        onRow={(record) => ({
          onClick: () => {
            rowSelect(record);
          },
        })}
      />
    </Modal>
  );
};
export default SelectVariableModal;
