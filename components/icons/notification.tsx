import * as React from "react"
import Svg, {
    SvgProps,
    Circle,
    G,
    Path,
    Defs,
    ClipPath,
} from "react-native-svg"
const NotificationIcon = (props: SvgProps) => (
    <Svg
        width={36}
        height={36}
        fill="none"
        {...props}
    >
        <Circle cx={18} cy={18} r={18} fill="#E8EDF2" />
        <G
            stroke="#0A0A0A"
            strokeLinecap="round"
            strokeLinejoin="round"
            clipPath="url(#a)"
        >
            <Path d="M16.796 24.923h2.408M22.816 15.893a4.816 4.816 0 1 0-9.632 0v4.214a1.806 1.806 0 0 1-1.806 1.806h13.244a1.806 1.806 0 0 1-1.806-1.806v-4.214Z" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M10 10h16v16H10z" />
            </ClipPath>
        </Defs>
    </Svg>
)
export default NotificationIcon
