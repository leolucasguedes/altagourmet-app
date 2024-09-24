import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SearchIcon = (props: SvgProps) => (
    <Svg
        width={16}
        height={16}
        fill="none"
        {...props}
    >
        <Path
            fill="#5ECD81"
            d="M12.627 11.513 16 14.886 14.886 16l-3.373-3.373a7.057 7.057 0 0 1-4.424 1.55A7.091 7.091 0 0 1 0 7.09 7.091 7.091 0 0 1 7.089 0a7.091 7.091 0 0 1 7.088 7.089 7.057 7.057 0 0 1-1.55 4.424Zm-1.58-.585a5.495 5.495 0 0 0 1.555-3.84A5.512 5.512 0 0 0 7.09 1.576 5.511 5.511 0 0 0 1.575 7.09a5.512 5.512 0 0 0 5.514 5.513 5.495 5.495 0 0 0 3.84-1.555l.118-.119Z"
        />
    </Svg>
)
export default SearchIcon
