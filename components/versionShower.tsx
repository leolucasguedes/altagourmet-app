import { StyledText } from "./styleds/components";
import packageJson from '../package.json';
export default function VersionShower() {
    const version = packageJson.version
    return (
        <StyledText className="text-[#ffffff] text-xs my-2">v {version}</StyledText>
    )
}