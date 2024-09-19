import { Href, Link } from "expo-router";
import ArrowDown from "./icons/arrow-down";
import LocationIcon from "./icons/location-icon";
import { StyledPressable, StyledText, StyledView } from "./styleds/components";
import NotificationIcon from "./icons/notification";

export default function LocationHeader() {
    return (
        <StyledView className='flex-row justify-between items-center'>
            <StyledView className='flex-row items-center'>
                <LocationIcon />
                <StyledText>
                    mock etc
                </StyledText>
                <StyledPressable>
                    <ArrowDown />
                </StyledPressable>
            </StyledView>
            <Link href={'/notifications' as Href}>
                <NotificationIcon />
            </Link>
        </StyledView>
    )
}