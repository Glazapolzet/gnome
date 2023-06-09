import React, {CSSProperties, FC, ReactNode} from "react";

interface MyComponentProps {
  value1: number;
  value2: string;
  hide: boolean;
  style?: CSSProperties;
  children?: ReactNode;
}


const MyComponent: FC<MyComponentProps> = ({value1, value2, style, hide, children}) => {
  return (
    <div style={{
      visibility: hide? "hidden": "visible"

    }}>
      <div>
       {value1}
       {value2}
      </div>
      {children}
    </div>
  )
}

