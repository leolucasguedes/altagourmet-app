import { StyledText } from "./styleds/components";
import packageJson from '../package.json';
export default function VersionShower() {
    const version = packageJson.version
    return (
        <StyledText className="text-[#8B8B93] text-xs my-2">v {version}</StyledText>
    )
}