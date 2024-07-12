import { Modal, Tree } from "antd";
import { useComponents } from "../../../stores/component";
interface ComponentTreeProps {
  open: boolean;
  onCancel: () => void;
}
const ComponentTree = ({ open, onCancel }: ComponentTreeProps) => {
  const { components, setCurComponentId } = useComponents();
  const componentSelect = ([selectKey]: any[]) => {
    setCurComponentId(selectKey);
    onCancel && onCancel();
  };
  return (
    <Modal
      open={open}
      title="组件树"
      onCancel={onCancel}
      destroyOnClose
      footer={null}
    >
      <Tree
        treeData={components as any}
        fieldNames={{ title: "name", key: "id" }}
        showLine
        defaultExpandAll
        onSelect={componentSelect}
      />
    </Modal>
  );
};
export default ComponentTree;
