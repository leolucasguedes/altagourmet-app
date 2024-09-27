import { usePathname } from "expo-router";
import { StyledText, StyledTextInput, StyledView } from "../styleds/components";
import useCurrentPageStore from "@/store/currentPageStore";
import LocationPicker from "./location";
import SearchIcon from "../icons/search";

export default function Header() {
  const pathname = usePathname();
  const { currentPage } = useCurrentPageStore();
  const isHomePage = pathname.startsWith("/app/home");

  return (
    <>
      {isHomePage && (
        <StyledView className="w-full bg-white pt-3">
          {currentPage !== null && <StyledText>{currentPage}</StyledText>}
          <LocationPicker />

          <StyledView className="w-full px-4 mt-4">
            <StyledView className="w-full flex flex-row items-center justify-start gap-2 py-1 rounded-lg px-3 border-[1px] border-[#E8EDF2] ">
              <SearchIcon />
              <StyledTextInput
                className="w-full"
                placeholder="Buscar Produtos..."
              />
            </StyledView>
          </StyledView>
        </StyledView>
      )}
    </>
  );
}
