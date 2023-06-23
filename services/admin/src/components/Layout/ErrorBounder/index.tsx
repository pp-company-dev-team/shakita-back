// import "./styles.css";

import { ReactNode, useEffect } from "react";
import Error from "./Error";
import { errorBounderModel } from "./model";
import { observer } from "mobx-react-lite";

export type ErrorBounderProps = {};

const ErrorBounder: React.FC<ErrorBounderProps> = (props) => {
  return errorBounderModel.isErrors ? <Error /> : <></>;
};

export default observer(ErrorBounder);
