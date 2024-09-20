import { LinearGradient } from "expo-linear-gradient";
import { StyledPressable, StyledView } from "../styleds/components";
import { HomeIcon, OrdersIcon, ProfileIcon, SearchIcon } from "./icons";
import { StyleSheet } from "react-native";
import { Href, useRouter } from "expo-router";

export default function Footer() {
  const items = [
    {
      name: "Home",
      link: "/app/home",
      Icon: <HomeIcon />,
    },
    {
      name: "Search",
      link: "/app/search",
      Icon: <SearchIcon />,
    },
    {
      name: "Orders",
      link: "/app/orders",
      Icon: <OrdersIcon />,
    },
    {
      name: "Profile",
      link: "/app/profile",
      Icon: <ProfileIcon />,
    },
  ];
  const router = useRouter();
  const gotoLink = (link: string) => {
    router.push(link as Href);
  };

  return (
    <StyledView style={styles.footerContainer}>
      <LinearGradient
        colors={["#238878", "#5ECD81", "#238878"]}
        style={styles.background}
        start={[0, 1]}
        end={[1, 0]}
      />
      {items.map((item, index) => (
        <StyledPressable
          onPress={() => gotoLink(item.link)}
          key={index}
          style={styles.pressableItem}
        >
          {item.Icon}
        </StyledPressable>
      ))}
    </StyledView>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 72,
    zIndex: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pressableItem: {
    width: "20%",
    height: 72,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
