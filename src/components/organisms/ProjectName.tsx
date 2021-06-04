import React from "react";
import styled from "styled-components";

import { current } from "../../utils/date";
import IconTextWithTextField from "../molecules/IconTextWithTextField";

type ProjectNameProps = {
  parentRef: React.RefObject<HTMLInputElement>;
};

const ProjectName: React.VFC<Partial<ProjectNameProps>> = ({ parentRef }) => {
  const [state, setState] = React.useState(3);

  return (
    <IconTextWithTextField
      type="LabelImportant"
      text="Project Name"
      placeholder={`${current.monthDate}のプロジェクト`}
      parentRef={parentRef}
    />
  );
};

export default ProjectName;
