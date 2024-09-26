import React, { useEffect, useState } from "react";
import {
  StyledView,
  StyledText,
  StyledScrollView,
} from "@/components/styleds/components";
import ProductList from "@/components/productList";
import useSearchStore from "@/store/searchStore";
import { useLocalSearchParams } from "expo-router";
import FilterSelect from "@/components/filterSelect";
import FiltersModal from "@/components/filtersModal";
import ModalPage from "@/components/modalPage";

export default function SearchFilterPage() {
  const { results, searchForResults, setSortingOrder } = useSearchStore();
  const params = useLocalSearchParams();
  const { searchValue, filter } = params;
  const [filtersModalVisible, setFiltersModalVisible] = useState(false);

  useEffect(() => {
    if (searchValue && filter) {
      searchForResults("", searchValue as string);
    }
  }, [searchValue, filter]);

  const openFilterModal = () => {
    setFiltersModalVisible(true);
  };

  const handleSort = (order: string) => {
    setSortingOrder(order);
  };

  return (
    <StyledView className="min-h-screen flex flex-col justify-between p-10 w-full">
      <StyledText className="text-lg font-bold mb-4">
        Resultados para "{searchValue}" com filtros aplicados
      </StyledText>

      {/* Adiciona o componente de filtros e ordenação */}
      <FilterSelect openFilterModal={openFilterModal} />

      {results.length > 0 ? (
        <ProductList products={results} />
      ) : (
        <StyledText className="text-center">
          Nenhum resultado encontrado
        </StyledText>
      )}

      {/* Modal de filtros */}
      {filtersModalVisible && (
        <ModalPage isOpen={filtersModalVisible} zIndex={20}>
          <FiltersModal close={() => setFiltersModalVisible(false)} />
        </ModalPage>
      )}
    </StyledView>
  );
}
