import React from "react";

import MuiPaper from "@material-ui/core/Paper";

type PaperProps = {
  elevation: number;
};

const Paper: React.FC<Partial<PaperProps & React.CSSProperties>> = ({
  children,
  elevation,
  ...styleProps
}) => {
  const paperStyle = {
    padding: "30px",
    ...styleProps,
  };

  return (
    <div>
      <MuiPaper elevation={elevation ?? 3} style={paperStyle}>
        {children}
      </MuiPaper>
    </div>
  );
};

export default Paper;
