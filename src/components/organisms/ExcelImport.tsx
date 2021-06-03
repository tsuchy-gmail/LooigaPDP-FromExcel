import React from "react";

import IconTextWithInputFileButton from "../molecules/IconTextWithInputFileButton";
import Text from "../atoms/Text";

const ExcelImport = () => {
  return (
    <IconTextWithInputFileButton type="ListAlt" text="Excel">
      <Text weight={500}>ファイルを選択</Text>
    </IconTextWithInputFileButton>
  );
};

export default ExcelImport;
