import React from "react";
import TuneIcon from "./icons/tune";
import { StyledPressable, StyledText } from "./styleds/components";

export default function FilterButton({ openFilterModal }: { openFilterModal: () => void }) {
  return (
    <StyledPressable
      onPress={openFilterModal}
      className="px-4 py-2 rounded-full border-[1px] border-[#8B8B93] mx-2 flex flex-row items-center space-x-2"
    >
      <StyledText className="text-[#8B8B93]">Filtrar Por</StyledText>
      <TuneIcon />
    </StyledPressable>
  );
}
