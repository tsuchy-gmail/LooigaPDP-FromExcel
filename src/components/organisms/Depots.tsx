import React from "react";

import IconTextWithSelect from "../molecules/IconTextWithSelect";

const Depots = () => {
  return (
    <IconTextWithSelect
      type="EmojiTransportation"
      text="Depots"
      leftButtonText="デポを登録"
      rightButtonText="デポを削除"
    />
  );
};

export default Depots;
