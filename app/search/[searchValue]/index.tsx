import React, { useEffect, useState } from "react";
import {
  StyledView,
  StyledText,
  StyledScrollView,
} from "../../../../components/styleds/components";
import SearchInput from "../../../../components/searchInput";
import { useRouter, useLocalSearchParams } from "expo-router";
import Loading from "../../../../components/loading";
import useSearchStore from "../../../../store/searchStore";
import useAuthStore from "../../../../store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductList from "../../../../components/productList";
import SortSelect from "../../../../components/sortSelect";
import FilterButton from "../../../../components/filterButton";
import FiltersModal from "../../../../components/filtersModal";
import ModalPage from "../../../../components/modalPage";
import { RefreshControl } from "react-native";

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
    filters,
    clearFilters,
  } = useSearchStore();
  const [loading, setLoading] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();
  const searchTermFromRoute = params.searchValue
    ? String(params.searchValue)
    : "";

  useEffect(() => {
    if (isAuthenticated) {
      clearFilters();
      setSearchTerm(searchTermFromRoute);
    }
  }, [isAuthenticated, searchTermFromRoute]);

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

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    setRefreshing(false);
  }, []);

  const openFilterModal = () => {
    setOpenFilters(true);
  };

  const closeFilterModal = () => {
    setOpenFilters(false);
  };

  return (
    <StyledScrollView
      className="min-h-screen bg-white mb-20"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingBottom: 180,
      }}
    >
      {openFilters ? (
        <ModalPage isOpen={openFilters} close={closeFilterModal}>
          <FiltersModal close={closeFilterModal} />
        </ModalPage>
      ) : (
        <StyledView className="flex flex-col w-full px-4">
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

          {/* Componente de filtros e ordenação */}
          <StyledView className="flex flex-row justify-between w-full px-4 my-4">
            <SortSelect />
            <FilterButton openFilterModal={openFilterModal} />
          </StyledView>

          {results.length > 0 ? (
            <ProductList products={results} />
          ) : (
            <StyledText className="text-center mt-20">
              Nenhum resultado encontrado
            </StyledText>
          )}
        </StyledView>
      )}
    </StyledScrollView>
  );
}
