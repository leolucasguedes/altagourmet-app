import { useState } from "react";
import { useRouter } from "expo-router";
import {
  StyledView,
  StyledText,
  StyledPressable,
  StyledTextInput,
} from "@/components/styleds/components";
import useAuthStore from "@/store/authStore";
import Icon from "react-native-vector-icons/MaterialIcons";
import { OrderCard } from "../../components/orderCard";
import api from "@/utils/api";

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated, userOrders, fetchOrders } = useAuthStore();
  const [whatsapp, setWhatsapp] = useState("");
  const [searchedOrders, setSearchedOrders] = useState<any[]>([]);

  const handleSearchOrders = async () => {
    try {
      const response = await api.get(`/orders/${whatsapp}`);
      setSearchedOrders(response.data);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  };

  return (
    <StyledView className="flex flex-col items-center justify-start w-full p-2">
      <StyledView className="w-full flex flex-row items-center justify-start gap-x-3 px-2 py-4">
        <StyledPressable onPress={() => router.back()} className="min-w-16">
          <Icon name="arrow-back" size={25} color="#8B8B93" />
        </StyledPressable>
        <StyledText className="font-semibold text-lg pl-6">
          Meus Pedidos
        </StyledText>
      </StyledView>

      {isAuthenticated ? (
        // Exibe os pedidos do usuário logado
        <StyledView className="w-full px-4 py-2">
          {userOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </StyledView>
      ) : (
        // Interface de busca por pedidos usando WhatsApp
        <StyledView className="w-full px-4 py-2">
          <StyledText className="text-lg font-bold mb-2">
            Busque pedidos por WhatsApp
          </StyledText>
          <StyledTextInput
            className="border border-gray px-2 py-4 rounded mb-4"
            placeholder="Digite o número do WhatsApp"
            placeholderTextColor="#A3A3A3"
            keyboardType="numeric"
            value={whatsapp}
            onChangeText={(text) => setWhatsapp(text.replace(/[^0-9]/g, ""))}
          />
          <StyledPressable
            className="bg-[#34D399] p-3 rounded"
            onPress={handleSearchOrders}
          >
            <StyledText className="text-white text-center">Procurar</StyledText>
          </StyledPressable>

          {/* Exibe os pedidos encontrados */}
          <StyledView className="w-full mt-4">
            {searchedOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </StyledView>
        </StyledView>
      )}
    </StyledView>
  );
}
