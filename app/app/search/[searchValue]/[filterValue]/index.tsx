import React, { useEffect, useState } from "react";
import {
  StyledView,
  StyledText,
  StyledScrollView,
} from "@/components/styleds/components";
import useSearchStore, { Filters } from "@/store/searchStore";
import useAuthStore from "@/store/authStore";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchInput from "@/components/searchInput";
import ProductList from "@/components/productList";
import SortSelect from "@/components/sortSelect";
import FilterButton from "@/components/filterButton";
import FiltersModal from "@/components/filtersModal";
import ModalPage from "@/components/modalPage";
import Loading from "@/components/loading";
import { RefreshControl } from "react-native";

export default function SearchFilterPage() {
  const { isAuthenticated, token } = useAuthStore();
  const {
    results,
    searchForResults,
    filters,
    setFilter,
    searchTerm,
    setSearchTerm,
    history,
    addHistory,
    removeHistory,
    clearHistory,
  } = useSearchStore();
  const params = useLocalSearchParams();
  console.log(params);
  const { searchValue, ...appliedFilters } = params;
  const [openFilters, setOpenFilters] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultsWithFilters, setResultsWithFilters] = useState<any[]>([]);
  console.log(resultsWithFilters);
  console.log(results);
  const searchTermFromRoute = params.searchValue
    ? String(params.searchValue)
    : "";

  useEffect(() => {
    if (!searchTerm && isAuthenticated) {
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

  useEffect(() => {
    if (appliedFilters) {
      (Object.keys(appliedFilters) as (keyof Filters)[]).forEach((filterKey) => {
        const appliedValue = appliedFilters[filterKey];
        if (filters[filterKey] !== appliedValue) {
          if (typeof appliedValue === 'string' && appliedValue.includes(',')) {
            setFilter(filterKey, appliedValue.split(','));
          } else {
            setFilter(filterKey, appliedValue);
          }
        }
      });
    }
  }, [appliedFilters, filters, setFilter]);

  useEffect(() => {
    if (results.length > 0) {
      const filteredResults = results.filter((product) => {
        let matches = true;

        // Verifica cada filtro aplicado
        if (filters.category && filters.category.length > 0) {
          matches = matches && filters.category.includes(product.category);
        }

        if (filters.brand && filters.brand.length > 0) {
          matches = matches && filters.brand.includes(product.brand);
        }

        if (filters.subcategory && filters.subcategory.length > 0) {
          matches =
            matches && filters.subcategory.includes(product.subcategory);
        }

        if (filters.price) {
          const price = parseFloat(product.price);
          const startPrice = parseFloat(filters.price.start);
          const endPrice = parseFloat(filters.price.end);
          matches = matches && price >= startPrice && price <= endPrice;
        }

        return matches;
      });

      setResultsWithFilters(filteredResults);
    }
  }, [filters, results]);

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
          <FiltersModal close={() => setOpenFilters(false)} />
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

          {resultsWithFilters.length > 0 ? (
            <ProductList products={resultsWithFilters} />
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
