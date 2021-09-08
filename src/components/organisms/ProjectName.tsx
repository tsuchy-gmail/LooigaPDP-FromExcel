import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { current } from "../../utils/date";
import { UseState, ChangeInput } from "../../utils/types";
import IconTextWithTextField from "../molecules/IconTextWithTextField";

const currentDate = `${current.monthDate}のプロジェクト`;

export const initialProjectName = localStorage.projectName
  ? JSON.parse(localStorage.projectName)
  : currentDate;

type ProjectNameProps = {
  projectNameState: UseState<string>;
};

const ProjectName: React.VFC<ProjectNameProps> = ({ projectNameState }) => {
  const [projectName, setProjectName] = projectNameState;
  const handleChangeProjectName = (event: ChangeInput) => {
    setProjectName(event.target.value);
  };

  useEffect(() => {
    localStorage.projectName = JSON.stringify(projectName);
  }, [projectName]);

  return (
    <IconTextWithTextField
      type="LabelImportant"
      text="Project Name"
      placeholder={currentDate}
      value={projectName}
      onChange={handleChangeProjectName}
    />
  );
};

export default React.memo(ProjectName);
