import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const TuneIcon = (props: SvgProps) => (
    <Svg
        width={12}
        height={12}
        fill="none"
        {...props}
    >
        <Path
            fill="#8B8B93"
            d="M5.333 12V8h1.334v1.333H12v1.334H6.667V12H5.333ZM0 10.667V9.333h4v1.334H0ZM2.667 8V6.667H0V5.333h2.667V4H4v4H2.667Zm2.666-1.333V5.333H12v1.334H5.333ZM8 4V0h1.333v1.333H12v1.334H9.333V4H8ZM0 2.667V1.333h6.667v1.334H0Z"
        />
    </Svg>
)
export default TuneIcon
