import ArrowDown from "../icons/arrow-down";
import LocationPin from "../icons/locationPin";
import NotificationIcon from "../icons/notification";
import { StyledPressable, StyledText, StyledView } from "../styleds/components";

export default function LocationPicker() {
    return (
        <StyledView className="w-full flex flex-row items-center justify-between px-4">
            <StyledView className="flex flex-row items-center justify-start gap-4">
                <LocationPin />
                <StyledText>O2 Corporate & Offices</StyledText>
                <ArrowDown color="#5ECD81" />
            </StyledView>
            <StyledPressable>
                <NotificationIcon />
            </StyledPressable>
        </StyledView>
    )
}