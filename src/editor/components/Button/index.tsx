import { Button as AntdButton } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";

const Button = forwardRef((props: any, ref: any) => {
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    startLoading: () => {
      setLoading(true);
    },
    endLoading: () => {
      setLoading(false);
    },
  }));

  return (
    <AntdButton loading={loading} {...props}>
      {props.children}
    </AntdButton>
  );
});

export default Button;
