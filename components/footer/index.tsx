import { LinearGradient } from "expo-linear-gradient";
import { StyledPressable, StyledText, StyledView } from "../styleds/components";
import { HomeIcon, OrdersIcon, ProfileIcon, SearchIcon } from "./icons";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { Href, usePathname, useRouter } from "expo-router";
import useCartStore from "@/store/cartStore";
import { useEffect } from "react";
import useAuthStore from "@/store/authStore";
import useShippingStore from "@/store/shippingStore";
export default function Footer() {
  const { totalItems, fetchUserCart, totalValue } = useCartStore()
  const { token } = useAuthStore()
  const router = useRouter();
  const pathName = usePathname();
  useEffect(() => {
    if (token) {
      fetchUserCart(token)
    }
  }, [token])
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
  const { calculateShipping, quote_id, shipping_fee, duration, pickup_duration, error_message } = useShippingStore()

  const gotoLink = (link: string) => {
    if (pathName === link) return
    router.push(link as Href);
  };
  const showCartResumeScreens = ['/app/home', '/app/product']
  return (
    <StyledView style={styles.absoluteContainer}>
      {totalItems > 0 && showCartResumeScreens.some((item) => pathName.includes(item)) &&
        <StyledView className='bottom-0 left-0 right-0 bg-white flex flex-row items-center justify-between px-4 py-3 border-[1px] border-[#dddddd] rounded-t-xl'>
          <StyledView className="w-1/2">
            <StyledText className='text-center text-lg font-bold text-dark-green'>
              <StyledText className='text-center text-xs text-gray'>Total sem a entrega</StyledText>{'\n'}
              {`${(totalValue).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}<StyledText className="text-xs text-gray">/{totalItems} itens</StyledText>
            </StyledText>
          </StyledView>
          <StyledView className="w-1/2">
            <TouchableOpacity onPress={() => gotoLink('/app/orders')}>
              <StyledText className='text-center bg-light-green rounded-lg px-4 py-3 text-white'>Ver Carrinho</StyledText>
            </TouchableOpacity>
          </StyledView>
        </StyledView>
      }
      {pathName === '/app/orders' && <StyledView className="w-full bg-white">
        <StyledView className='bottom-0 left-0 right-0 bg-white flex flex-row items-center justify-between px-4 py-3 border-[1px] border-[#dddddd] rounded-t-xl'>
          <StyledView className="w-1/2">
            {shipping_fee > 0 ?
              <StyledText className='text-center text-lg font-bold text-dark-green'>
                <StyledText className='text-center text-xs text-gray'>Total com a entrega</StyledText>{'\n'}
                {`${(totalValue + shipping_fee).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}<StyledText className="text-xs text-gray">/{totalItems} itens</StyledText>
              </StyledText> :
              <>
                {error_message !== '' ? <StyledText className='text-center text-lg font-bold text-[#f00]'>{error_message}</StyledText> :
                  <ActivityIndicator color={'#238878'} size="small" />
                }
              </>
            }
          </StyledView>
          <StyledView className="w-1/2">
            {error_message === '' && <TouchableOpacity onPress={() => { }}>
              <StyledText className='text-center bg-light-green rounded-lg px-4 py-3 text-white'>Continuar</StyledText>
            </TouchableOpacity>}
          </StyledView>
        </StyledView>
      </StyledView>}
      <StyledView style={styles.footerContainer}>
        <LinearGradient
          colors={["#238878", "#5ecd81", "#238878"]}
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
            <StyledView>
              {item.name === 'Orders' && totalItems > 0 && <StyledView className="w-3 h-3 z-20 -top-2 -right-1 absolute opacity-70 bg-dark-green rounded-full"></StyledView>}
              {item.Icon}
            </StyledView>
          </StyledPressable>
        ))}
      </StyledView>
    </StyledView >
  );
}

const styles = StyleSheet.create({
  absoluteContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerContainer: {
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
