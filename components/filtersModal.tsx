import React, { useEffect, useState } from "react";
import {
  StyledScrollView,
  StyledText,
  StyledPressable,
  StyledView
} from "@/components/styleds/components";
import ModalPage from "./modalPage";
import RangeValueSelector from "./rangeValueSelector";
import useSearchStore, { Filters } from "@/store/searchStore";
import useAuthStore from "@/store/authStore";
import { formatCurrency } from "@/utils/textFormat";
import { useRouter, usePathname } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";

export default function FiltersModal({ close }: { close: () => void }) {
  const { filters, setFilter, clearFilters, searchForResults } =
    useSearchStore();
  const { token } = useAuthStore();
  const [faixaFrom, setFaixaFrom] = useState("");
  const [faixaTo, setFaixaTo] = useState("");
  const [modal, setModal] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();

  const filterRefs: { [key: string]: keyof Filters } = {
    "Faixa de preço": "price",
    Marca: "brand",
    Categoria: "category",
    "Sub-Categoria": "subcategory",
    Size: "size",
  };

  const filterNames = [
    "Marca",
    "Faixa de preço",
    "Categoria",
    "Sub-Categoria",
    "Tamanho",
  ];

  const closeModal = (value: any) => {
    setModal("");
  };

  const handleSearch = async () => {
    await searchForResults(token || "");
    router.push("/");
    close();
  };

  useEffect(() => {
    if (!pathname.startsWith("/app/offers/filtered")) {
      clearFilters();
    }
  }, [pathname]);

  return (
    <StyledScrollView className="flex-1">
      {modal !== "" ? (
        <ModalPage isOpen={modal !== ""}>
          <StyledView className="w-full p-4">
            {modal === "Faixa de preço" && (
              <RangeValueSelector
                setFrom={(value: string) => setFaixaFrom(value)}
                from={faixaFrom}
                setTo={(value: string) => setFaixaTo(value)}
                to={faixaTo}
                labels={{
                  from: "Mínimo",
                  to: "Máximo",
                  placeholder: "R$ 10.000",
                  name: "Faixa de precos",
                }}
                saveFilters={() => closeModal("")}
              />
            )}
            {/* Outras opções de modais, como Marca, Ano, etc */}
          </StyledView>
        </ModalPage>
      ) : (
        <StyledView className="flex-1 p-5">
          <StyledText className="text-base font-semibold mb-4">
            Filtrar por
          </StyledText>
          {filterNames.map((filter, index) => (
            <StyledPressable
              key={index}
              onPress={() => setModal(filter)}
              className="flex flex-row justify-between py-3"
            >
              <StyledText>{filter}</StyledText>
              <Icon name="add" size={18} color="#A3A3A3" />
            </StyledPressable>
          ))}

          <StyledView className="w-full flex flex-row justify-between mt-10">
            <StyledPressable
              onPress={() => clearFilters()}
              className="bg-gray-300 py-3 px-5 rounded"
            >
              <StyledText className="text-gray-800">Limpar</StyledText>
            </StyledPressable>
            <StyledPressable
              onPress={handleSearch}
              className="bg-[#BF3320] py-3 px-5 rounded"
            >
              <StyledText className="text-white">Pesquisar</StyledText>
            </StyledPressable>
          </StyledView>
        </StyledView>
      )}
    </StyledScrollView>
  );
}
