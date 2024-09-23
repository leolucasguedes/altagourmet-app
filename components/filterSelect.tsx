import ArrowDown from "./icons/arrow-down";
import TuneIcon from "./icons/tune";
import { StyledScrollView, StyledText, StyledView } from "./styleds/components";

export default function FilterSelect() {
    return (
        <StyledScrollView horizontal className="my-2 px-4">
            <StyledText className="px-6 py-2 rounded-full border-[1px] border-gray mx-2">Ordenar Por <ArrowDown color="#8B8B93" rotate={false} /></StyledText>
            <StyledText className="px-6 py-2 rounded-full border-[1px] border-gray mx-2">Filtrar Por <TuneIcon /></StyledText>
            <StyledText className="px-6 py-2 rounded-full border-[1px] border-gray mx-2">Preço <ArrowDown color="#8B8B93" /></StyledText>
        </StyledScrollView>
    )
}