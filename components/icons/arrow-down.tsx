import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
interface Props extends SvgProps {
    color?: string,
    rotate?: boolean
}
const ArrowDown = (props: Props) => (
    <Svg
        width={12}
        height={8}
        fill="none"
        rotation={props.rotate ? 180 : 0}
        {...props}
    >
        <Path fill={props.color || "#5ECD81"} d="m6 7.4-6-6L1.4 0 6 4.6 10.6 0 12 1.4l-6 6Z" />
    </Svg>
)
export default ArrowDown