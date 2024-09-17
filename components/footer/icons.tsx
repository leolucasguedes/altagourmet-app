import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const HomeIcon = (props: SvgProps) => (
    <Svg
        width={21}
        height={20}
        fill="none"
        {...props}
    >
        <Path
            stroke="#E8EDF2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.786 9.914a1.424 1.424 0 0 0-.457-1.057L10.5.714 1.671 8.857a1.429 1.429 0 0 0-.457 1.057v7.943a1.428 1.428 0 0 0 1.429 1.429h15.714a1.429 1.429 0 0 0 1.429-1.429V9.914ZM10.5 19.286V13.57"
        />
    </Svg>
)
export const SearchIcon = (props: SvgProps) => (
    <Svg
        width={21}
        height={20}
        fill="none"
        {...props}
    >
        <G
            stroke="#E8EDF2"
            strokeLinecap="round"
            strokeLinejoin="round"
            clipPath="url(#a)"
        >
            <Path d="M9.071 16.428a7.857 7.857 0 1 0 0-15.714 7.857 7.857 0 0 0 0 15.714ZM19.786 19.286l-5-5" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M.5 0h20v20H.5z" />
            </ClipPath>
        </Defs>
    </Svg>
)
export const OrdersIcon = (props: SvgProps) => (
    <Svg
        width={21}
        height={20}
        fill="none"
        {...props}
    >
        <Path
            stroke="#E8EDF2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.357 3.571H4.786c-.79 0-1.429.64-1.429 1.429v12.857c0 .79.64 1.429 1.429 1.429h8.571c.79 0 1.429-.64 1.429-1.429V5c0-.789-.64-1.429-1.429-1.429ZM6.214 7.143h5.715M6.214 10.714h5.715M6.214 14.286h2.857"
        />
        <Path
            stroke="#E8EDF2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.929.714h9.285a1.428 1.428 0 0 1 1.429 1.429v13.571"
        />
    </Svg>
)

export const ProfileIcon = (props: SvgProps) => (
    <Svg
        width={21}
        height={20}
        fill="none"
        {...props}
    >
        <G
            stroke="#E8EDF2"
            strokeLinecap="round"
            strokeLinejoin="round"
            clipPath="url(#a)"
        >
            <Path d="M10.5 11.428a3.571 3.571 0 1 0 0-7.142 3.571 3.571 0 0 0 0 7.143ZM4.4 17a7.142 7.142 0 0 1 12.2 0" />
            <Path d="M10.5 19.286A9.286 9.286 0 1 0 1.214 10a9.286 9.286 0 0 0 9.286 9.286Z" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M.5 0h20v20H.5z" />
            </ClipPath>
        </Defs>
    </Svg>
)