import { useState } from "react"
import { StyledPressable, StyledText } from "./styleds/components"

export default function BigText({ limit, text }: { limit: number, text: string }) {
    const [seeMore, setSeeMore] = useState(false)
    if (text.length > limit) {
        return (
            <StyledPressable onPress={() => setSeeMore(!seeMore)}>
                <StyledText className='text-xs'>
                    {seeMore ? text : text.substring(0, limit) + '...'}
                    <StyledText className="text-light-green text-xs">
                        {seeMore ? ' - Ver menos' : 'Ver mais'}
                    </StyledText>
                </StyledText>
            </StyledPressable>
        )
    }
    return <StyledText>{text}</StyledText>
}