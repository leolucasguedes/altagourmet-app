import { useState } from "react";
import { usePathname } from "expo-router";
import {
  StyledTextInput,
  StyledView,
  StyledText,
  StyledTouchableOpacity,
  StyledImage,
} from "../styleds/components";
import { Modal, ScrollView } from "react-native";
import LocationPicker from "./location";
import SearchIcon from "../icons/search";
import useHomeContentStore from "@/store/homeContentStore";

export default function Header() {
  const pathname = usePathname();
  const doNotShowLocationPicker = ["/product/", "/profile"];
  const { homeData } = useHomeContentStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const results = homeData.products
        .flatMap((category) => category.foods) // Acessa os produtos dentro de cada categoria
        .filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5);

      setFilteredProducts(results);
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  return (
    <StyledView className="w-full bg-white pt-3">
      {!doNotShowLocationPicker.some((item) => pathname.includes(item)) && (
        <LocationPicker />
      )}
      <StyledView className="w-full px-4 mt-6 pb-2">
        <StyledView className="w-full flex flex-row items-center justify-start gap-2 pb-2 text-black rounded-lg px-3 border-[1px] border-[#E8EDF2] ">
          <SearchIcon />
          <StyledTextInput
            className="w-full py-1"
            placeholder="Buscar Produtos..."
            placeholderTextColor="#8B8B93"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </StyledView>
      </StyledView>
      <Modal visible={showModal} transparent animationType="fade">
        <StyledView
          className="w-full h-full bg-white bg-opacity-50 flex justify-center items-center"
          onTouchEnd={() => setShowModal(false)}
        >
          <StyledView className="bg-white w-[90%] max-h-[300px] p-4 rounded-lg">
            <ScrollView>
              <StyledText className="font-bold text-lg border-b border-gray pb-2">
                Resultados para "{searchQuery}"
              </StyledText>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <StyledTouchableOpacity
                    key={index}
                    className="w-full flex flex-row items-center p-2 border-b border-gray"
                  >
                    <StyledView className="w-14 h-14 bg-light-green rounded-lg overflow-hidden">
                      {product.imageUrl ? (
                        <StyledImage
                          className="w-14 h-14"
                          src={product.imageUrl}
                          alt={product.name}
                        />
                      ) : (
                        <StyledView className="w-full h-full bg-gray" />
                      )}
                    </StyledView>
                    <StyledView className="ml-3 flex-1">
                      <StyledText className="font-bold">
                        {product.name}
                      </StyledText>
                      <StyledText className="text-xs text-gray">
                        {product.description || "-"}
                      </StyledText>
                    </StyledView>
                  </StyledTouchableOpacity>
                ))
              ) : (
                <StyledView className="flex items-center justify-center">
                  <StyledText className="text-gray">
                    Nenhum Prato encontrado
                  </StyledText>
                </StyledView>
              )}
            </ScrollView>
          </StyledView>
        </StyledView>
      </Modal>
    </StyledView>
  );
}
