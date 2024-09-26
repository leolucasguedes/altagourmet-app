import React, { useEffect, useState } from "react";
import {
  StyledView,
  StyledText,
  StyledScrollView,
} from "@/components/styleds/components";
import SearchInput from "@/components/searchInput";
import { useRouter, useLocalSearchParams } from "expo-router";
import Loading from "@/components/loading";
import useSearchStore from "@/store/searchStore";
import useAuthStore from "@/store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductList from "@/components/productList";
import FilterSelect from "@/components/filterSelect";
import FiltersModal from "@/components/filtersModal";
import ModalPage from "@/components/modalPage";

export default function SearchTermPage() {
  const { isAuthenticated, token } = useAuthStore();
  const {
    searchTerm,
    setSearchTerm,
    searchForResults,
    results,
    history,
    addHistory,
    removeHistory,
    clearHistory,
    setSortingOrder,
  } = useSearchStore();
  const [loading, setLoading] = useState(false);
  const [filtersModalVisible, setFiltersModalVisible] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();
  const searchTermFromRoute = Array.isArray(params.pesquisa)
    ? params.pesquisa.join(" ")
    : params.pesquisa || "";

  const search = async () => {
    setLoading(true);
    let reqToken = token;
    if (!token) {
      const authJSON = await AsyncStorage.getItem("auth");
      const auth = JSON.parse(authJSON || "");
      reqToken = auth.state.token;
    }
    await searchForResults(reqToken || "", searchTermFromRoute);
    setLoading(false);
  };

  useEffect(() => {
    setSearchTerm(searchTermFromRoute);
    if (isAuthenticated) {
      search();
    }
  }, [isAuthenticated, searchTermFromRoute]);

  const openFilterModal = () => {
    setFiltersModalVisible(true);
  };

  const handleSort = (order: string) => {
    setSortingOrder(order);
  };

  return (
    <StyledView className="min-h-screen flex flex-col justify-between p-10 w-full">
      {loading && <Loading />}
      <StyledView className="flex flex-col items-center justify-start w-full">
        <SearchInput
          search={search}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTermFromRoute}
          history={history}
          removeHistory={removeHistory}
          clearHistory={clearHistory}
          addHistory={addHistory}
        />
      </StyledView>

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
