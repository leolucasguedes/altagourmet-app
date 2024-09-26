import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const LocationPin = (props: SvgProps) => (
    <Svg
        width={20}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            stroke="#238878"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.416 10.13c0 5.61-8.416 12.156-8.416 12.156S1.584 15.74 1.584 10.13c0-4.584 3.832-8.416 8.416-8.416 4.584 0 8.416 3.832 8.416 8.416Z"
        />
        <Path
            stroke="#238878"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 12.935a2.805 2.805 0 1 0 0-5.61 2.805 2.805 0 0 0 0 5.61Z"
        />
    </Svg>
)
export default LocationPin
