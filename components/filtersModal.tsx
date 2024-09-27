import React, { useEffect, useState } from "react";
import {
  StyledScrollView,
  StyledText,
  StyledPressable,
  StyledView,
  StyledTextInput,
} from "@/components/styleds/components";
import ModalPage from "./modalPage";
import RangeValueSelector from "./rangeValueSelector";
import useSearchStore, { Filters } from "@/store/searchStore";
import useAuthStore from "@/store/authStore";
import { useRouter, usePathname } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";

export default function FiltersModal({ close }: { close: () => void }) {
  const { filters, setFilter, clearFilters, searchForResults } =
    useSearchStore();
  const { token } = useAuthStore();
  const [faixaFrom, setFaixaFrom] = useState("");
  const [faixaTo, setFaixaTo] = useState("");
  const [modal, setModal] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
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
    if (modal === "Faixa de preço") {
      setFilter("price", { start: faixaFrom, end: faixaTo });
    } else if (
      modal === "Marca" ||
      modal === "Categoria" ||
      modal === "Sub-Categoria"
    ) {
      setFilter(filterRefs[modal], [inputValue]);
    }
  };

  const handleSearch = async () => {
    await searchForResults(token || "");
    router.push(`/app/search/${filters?.search}/${JSON.stringify(filters)}`);
    close();
  };

  useEffect(() => {
    if (!pathname.startsWith(`/app/search/${filters?.search}`)) {
      clearFilters();
    }
  }, [pathname]);

  return (
    <StyledScrollView className="flex-1">
      {modal !== "" ? (
        <ModalPage isOpen={modal !== ""} close={close}>
          <StyledView className="w-full p-2">
            {(modal === "Marca" ||
              modal === "Categoria" ||
              modal === "Sub-Categoria") && (
              <>
                <StyledView className="mt-7">
                  <StyledView className="w-full flex flex-row items-center justify-start gap-4">
                    <StyledPressable
                      onPress={() => setModal("")}
                      className="min-w-10"
                    >
                      <Icon name="arrow-back" size={25} color="#8B8B93" />
                    </StyledPressable>

                    <StyledView className="flex items-start justify-start w-full">
                      <StyledText className="font-extrabold text-lg">
                        {modal}
                      </StyledText>
                    </StyledView>

                    <StyledPressable className="min-w-10">
                      <Icon name="search" size={18} color="#171717" />
                    </StyledPressable>
                  </StyledView>

                  <StyledView className="h-[1px] bg-gray-400 my-4" />
                </StyledView>

                <StyledTextInput
                  value={inputValue}
                  onChangeText={setInputValue}
                  className="w-full pl-5 text-sm bg-[#F8F8F8] border border-[#D4D4D4] rounded-md py-4"
                  placeholder={`Digite o nome da ${modal}`}
                  placeholderTextColor="#A3A3A3"
                />
              </>
            )}
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
                  name: "Faixa de preços",
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
              className="bg-[#D1D5DB] py-3 px-8 rounded"
            >
              <StyledText className="text-[#1F2937]">Limpar</StyledText>
            </StyledPressable>
            <StyledPressable
              onPress={handleSearch}
              className="bg-[#5ECD81] py-3 px-6 rounded"
            >
              <StyledText className="text-white">Pesquisar</StyledText>
            </StyledPressable>
          </StyledView>
        </StyledView>
      )}
    </StyledScrollView>
  );
}
