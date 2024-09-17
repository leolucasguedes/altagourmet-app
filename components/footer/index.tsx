import { LinearGradient } from "expo-linear-gradient";
import { StyledPressable, StyledView } from "../styleds/components";
import { HomeIcon, OrdersIcon, ProfileIcon, SearchIcon } from "./icons";
import { StyleSheet } from 'react-native';
import { usePathname, useRouter } from "expo-router";

export default function Footer() {
    const items = [
        {
            name: 'Home',
            link: '/',
            Icon: <HomeIcon />,
        },
        {
            name: 'Search',
            link: '/search',
            Icon: <SearchIcon />,
        },
        {
            name: 'Orders',
            link: '/orders',
            Icon: <OrdersIcon />,
        },
        {
            name: 'Profile',
            link: '/profile',
            Icon: <ProfileIcon />,
        }
    ]
    const router = useRouter()
    const gotoLink = (link: string) => {
        router.push(link)
    }
    const pathName = usePathname()
    const notShowPages = ['/login', '/signup']
    if (notShowPages.includes(pathName)) return null
    return (
        <StyledView className="flex flex-row items-center justify-center gap-1 h-[72px]">
            <LinearGradient
                // Background Linear Gradient
                colors={['#238878', '#5ECD81', '#238878']}
                style={styles.background}
                start={[0, 1]} end={[1, 0]}
            />
            {
                items.map((item, index) => {
                    return (
                        <StyledPressable onPress={() => gotoLink(item.link)} key={index} className="w-1/5 h-24 flex flex-col items-center justify-center">
                            {item.Icon}
                        </StyledPressable>
                    )
                })
            }
        </StyledView>
    )
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
});
