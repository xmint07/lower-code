import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { createPortal } from "react-dom";
interface Props {
  componentId: number;
  containerClassName: string;
  offsetContainerClassName: string;
  ref: any;
}
const SelectedMask: React.FC<Props> = forwardRef(
  ({ componentId, containerClassName, offsetContainerClassName }, ref) => {
    const [position, setPosition] = useState({
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    });
    useImperativeHandle(ref, () => {
      updatePosition;
    });

    useEffect(() => {
      updatePosition();
    }, [componentId]);
    const updatePosition = () => {
      if (!componentId) return;
      const container = document.querySelector(`.${offsetContainerClassName}`);
      if (!container) return;
      const node = document.querySelector(
        `[data-component-id="${componentId}"]`
      );
      if (!node) return;
      const { left, top, width, height } = node.getBoundingClientRect();
      const { top: containerTop, left: containerLeft } =
        container.getBoundingClientRect();
      setPosition({
        top: top - containerTop + container.scrollTop,
        left: left - containerLeft,
        width,
        height,
      });
    };
    return createPortal(
      <div
        style={{
          position: "absolute",
          left: position.left,
          top: position.top,
          width: position.width,
          height: position.height,
          border: "1px solid rgb(66,133,244)",
          backgroundColor: "rgba(66,133,244,0.2)",
          zIndex: 1000,
          pointerEvents: "none",
          boxSizing: "border-box",
          borderRadius: 4,
        }}
      />,
      document.querySelector(`.${containerClassName}`)!
    );
  }
);
export default SelectedMask;
