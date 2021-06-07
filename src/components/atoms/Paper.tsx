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
    padding: "50px 30px",
    width: "93%",
    margin: "0 auto",
    ...styleProps,
  };

  return (
    <div>
      <MuiPaper elevation={elevation ?? 0} style={paperStyle} square>
        {children}
      </MuiPaper>
    </div>
  );
};

export default Paper;