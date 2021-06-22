import * as React from "react";

import IconTextWithInputFileButton from "../molecules/IconTextWithInputFileButton";
import Text from "../atoms/Text";

type ExcelImportProps = {
  parentRef?: React.RefObject<HTMLInputElement>;
};

const ExcelImport: React.VFC<ExcelImportProps> = ({ parentRef }) => {
  return (
    <IconTextWithInputFileButton
      type="ListAlt"
      text="Excel"
      parentRef={parentRef}
    />
  );
};

export default React.memo(ExcelImport);
