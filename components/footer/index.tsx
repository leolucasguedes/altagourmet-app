import { LinearGradient } from "expo-linear-gradient";
import { StyledPressable, StyledText, StyledView } from "../styleds/components";
import { HomeIcon, OrdersIcon, ProfileIcon, SearchIcon } from "./icons";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { Href, usePathname, useRouter } from "expo-router";
import useCartStore from "../../store/cartStore";
import { useEffect } from "react";
import useAuthStore from "../../store/authStore";

export default function Footer() {
  const { totalPlates, totalComplements, totalValue } = useCartStore();
  const totalItems = totalPlates + totalComplements;
  const { token } = useAuthStore();
  const router = useRouter();
  const pathName = usePathname();

  const items = [
    {
      name: "Home",
      link: "/",
      Icon: <HomeIcon />,
    },
    {
      name: "Orders",
      link: "/orders",
      Icon: <OrdersIcon />,
    },
    {
      name: "Profile",
      link: "/profile",
      Icon: <ProfileIcon />,
    },
  ];

  const gotoLink = (link: string) => {
    if (pathName === link) return;
    router.push(link as Href);
  };
  const showCartResumeScreens = ["/", "/product"];
  return (
    <StyledView
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      {totalItems > 0 &&
        showCartResumeScreens.some((item) => pathName.includes(item)) && (
          <StyledView className="bottom-0 left-0 right-0 bg-white flex flex-row items-center justify-between px-4 py-3 border-[1px] border-[#dddddd] rounded-t-xl">
            <StyledView className="w-1/2">
              <StyledText className="text-center text-lg font-bold text-dark-green">
                <StyledText className="text-center text-xs text-gray">
                  Total sem a entrega
                </StyledText>
                {"\n"}
                {`${totalValue.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
                <StyledText className="text-xs text-gray">
                  /{totalItems} itens
                </StyledText>
              </StyledText>
            </StyledView>
            <StyledView className="w-1/2">
              <TouchableOpacity onPress={() => gotoLink("/cart")}>
                <StyledText className="text-center bg-light-green rounded-lg px-4 py-3 text-white">
                  Ver Carrinho
                </StyledText>
              </TouchableOpacity>
            </StyledView>
          </StyledView>
        )}
      {pathName === "/cart" && (
        <StyledView className="w-full bg-white">
          <StyledView className="bottom-0 left-0 right-0 bg-white flex flex-row items-center justify-between px-4 py-3 border-[1px] border-[#dddddd] rounded-t-xl">
            <StyledView className="w-1/2">
              <StyledText className="text-center text-lg font-bold text-dark-green">
                <StyledText className="text-center text-xs text-gray">
                  Total sem a entrega
                </StyledText>
                {"\n"}
                {`${totalValue.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}`}
                <StyledText className="text-xs text-gray">
                  /{totalItems} itens
                </StyledText>
              </StyledText>
            </StyledView>
          </StyledView>
          <StyledView>
            <TouchableOpacity
              onPress={() => {
                router.push("/cart/checkout/review");
              }}
            >
              <StyledText className="text-center bg-light-green rounded-lg py-3 px-10 text-white">
                Continuar
              </StyledText>
            </TouchableOpacity>
          </StyledView>
        </StyledView>
      )}
      <StyledView
        style={{
          height: 72,
          zIndex: 100,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LinearGradient
          colors={["#238878", "#5ecd81", "#238878"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
          start={[0, 1]}
          end={[1, 0]}
        />
        {items.map((item, index) => (
          <StyledPressable
            onPress={() => gotoLink(item.link)}
            key={index}
            style={{
              width: "20%",
              height: 72,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <StyledView>
              {item.name === "Orders" && totalItems > 0 && (
                <StyledView className="w-3 h-3 z-20 -top-2 -right-1 absolute opacity-70 bg-dark-green rounded-full"></StyledView>
              )}
              {item.Icon}
            </StyledView>
          </StyledPressable>
        ))}
      </StyledView>
    </StyledView>
  );
}
