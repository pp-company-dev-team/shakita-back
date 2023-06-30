import React, { useEffect, useRef } from "react";

export type ScrollTableProps = {
  data: any[];
  updateData: (l: number) => void;
  height?: number;
};

const ScrollTable: React.FC<ScrollTableProps> = (props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("useEffect");
    if (
      Number(tableRef.current?.clientHeight) <
      Number(wrapperRef.current?.clientHeight)
    ) {
      props.updateData(props.data.length);
    }
  }, []);

  const handleScroll = () => {
    if (wrapperRef.current) {
      const { scrollTop, clientHeight, scrollHeight, offsetHeight } =
        wrapperRef.current;

      if (scrollTop + clientHeight === scrollHeight) {
        props.updateData(props.data.length);
      }
    }
  };

  return (
    <div
      onScroll={handleScroll}
      style={{
        height: `${props.height ? props.height : 400}px`,
        overflow: "scroll",
      }}
      ref={wrapperRef}
    >
      <div ref={tableRef}>
        {props.data.map((item, index) => (
          <div key={index}>{JSON.stringify(item)}</div>
        ))}
      </div>
    </div>
  );
};

export default ScrollTable;
