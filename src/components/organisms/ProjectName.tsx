import React from "react";
import styled from "styled-components";

import { current } from "../../utils/date";
import IconTextWithTextField from "../molecules/IconTextWithTextField";

const ProjectName = () => {
  const [state, setState] = React.useState(3);

  return (
    <IconTextWithTextField
      type="LabelImportant"
      text="Project Name"
      placeholder={`${current.monthDate}のプロジェクト`}
    />
  );
};

export default ProjectName;
