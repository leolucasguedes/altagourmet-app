import { useRouter } from "expo-router";
import {
  StyledView,
  StyledText,
  StyledPressable,
} from "@/components/styleds/components";
import useAuthStore from "@/store/authStore";
import Icon from "react-native-vector-icons/MaterialIcons";
import { OrderCard } from "@/components/orderCard";

export default function OrdersPage() {
  const router = useRouter();
  return (
    <>
      <StyledView className="flex flex-col items-center justify-start w-full p-2">
        <StyledView className="w-full flex flex-row items-center justify-start gap-x-3 px-2 py-4">
          <StyledPressable onPress={() => router.back()} className="min-w-16">
            <Icon name="arrow-back" size={25} color="#8B8B93" />
          </StyledPressable>
          <StyledText className="font-semibold text-lg pl-6">
            Meus Pedidos
          </StyledText>
        </StyledView>
        <StyledView className="w-full px-4 py-2">
          <OrderCard />
        </StyledView>
      </StyledView>
    </>
  );
}
