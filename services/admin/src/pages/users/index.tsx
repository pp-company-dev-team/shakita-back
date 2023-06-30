import { useEffect, useRef, useState } from "react";
import { usersPageModel } from "./model";
import ScrollTable from "@/widgets/ui-kit/table/scrollTable";

const testArr = [
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 1,
    value: 1,
  },
  {
    key: 2,
    value: 2,
  },
  {
    key: 3,
    value: 3,
  },
  {
    key: 4,
    value: 4,
  },
  {
    key: 5,
    value: 5,
  },
  {
    key: 6,
    value: 6,
  },
  {
    key: 7,
    value: 7,
  },
  {
    key: 8,
    value: 8,
  },
  {
    key: 9,
    value: 9,
  },
  {
    key: 10,
    value: 10,
  },
  {
    key: 11,
    value: 11,
  },
  {
    key: 12,
    value: 12,
  },
  {
    key: 13,
    value: 13,
  },
  {
    key: 14,
    value: 14,
  },
  {
    key: 15,
    value: 15,
  },
  {
    key: 15,
    value: 15,
  },
  {
    key: 16,
    value: 16,
  },
  {
    key: 17,
    value: 17,
  },
];

const UsersPage = () => {
  const itemsNumber: number = 10;
  const [data, setData] = useState(testArr.slice(0, itemsNumber));
  useEffect(() => {
    //   usersPageModel.init({ id: "2bd7f97b-5429-428e-90a7-483ee167b8a1" });
  }, []);

  const updateData = (oldLenth: number) => {
    setData(testArr.slice(0, oldLenth + itemsNumber));
  };

  return (
    <div>
      <ScrollTable data={data} updateData={updateData} />
    </div>
  );
};

export default UsersPage;
