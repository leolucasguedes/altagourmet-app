import React, { useState } from "react";
import {
  StyledScrollView,
  StyledText,
  StyledPressable,
  StyledView,
} from "@/components/styleds/components";
import ModalPage from "./modalPage";
import RangeValueSelector from "./rangeValueSelector";
import FiltersChooser from "./filtersChooser";
import useSearchStore, { Filters } from "@/store/searchStore";
import { useRouter, usePathname, Href } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";

export default function FiltersModal({ close }: { close: () => void }) {
  const { filters, setFilter, clearFilters, searchTerm } = useSearchStore();
  const [faixaFrom, setFaixaFrom] = useState("");
  const [faixaTo, setFaixaTo] = useState("");
  const [modal, setModal] = useState<string>("");
  const router = useRouter();

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
      setFilter(filterRefs[modal], value);
    }
  };

  const handleSearch = async () => {
    const appliedFilters: string[] = [];
    if (filters?.brand?.length) {
      appliedFilters.push(
        `brand=${encodeURIComponent(filters.brand.join(","))}`
      );
    }
    if (filters?.category?.length) {
      appliedFilters.push(
        `category=${encodeURIComponent(filters.category.join(","))}`
      );
    }
    if (filters?.subcategory?.length) {
      appliedFilters.push(
        `subcategory=${encodeURIComponent(filters.subcategory.join(","))}`
      );
    }
    if (filters?.price) {
      appliedFilters.push(`price=${filters.price.start}-${filters.price.end}`);
    }

    const filterString = appliedFilters.join("&");
    router.push(
      `app/search/${encodeURIComponent(searchTerm)}/${filterString}` as Href
    );
    close();
  };

  return (
    <StyledScrollView className="flex-1">
      {modal !== "" ? (
        <ModalPage isOpen={modal !== ""} close={close}>
          <StyledView className="w-full p-2">
            {(modal === "Marca" ||
              modal === "Categoria" ||
              modal === "Sub-Categoria") && (
              <FiltersChooser
                modalName={filterRefs[modal]}
                name={modal}
                close={() => setModal("")}
                isFilter={(value) => closeModal(value)}
              />
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
