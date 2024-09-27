import { usePathname } from "expo-router";
import { StyledTextInput, StyledView } from "../styleds/components";
import LocationPicker from "./location";
import SearchIcon from "../icons/search";

export default function Header() {
    const pathname = usePathname()
    const showSearchPages = ['/app/home']
    const doNotShowLocationPicker = ['/app/product/', '/app/orders']
    return (
        <StyledView className="w-full bg-white pt-3">
            {!doNotShowLocationPicker.some((item) => pathname.includes(item)) && <LocationPicker />}
            {showSearchPages.includes(pathname) &&
                <StyledView className="w-full px-4 mt-4">
                    <StyledView className="w-full flex flex-row items-center justify-start gap-2 py-1 rounded-lg px-3 border-[1px] border-[#E8EDF2] ">
                        <SearchIcon />
                        <StyledTextInput className="w-full" placeholder="Buscar Produtos..." />
                    </StyledView>
                </StyledView>
            }
        </StyledView>
    )
}