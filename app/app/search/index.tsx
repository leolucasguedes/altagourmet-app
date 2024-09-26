import React from "react";
import useSearchStore from "@/store/searchStore";
import useAuthStore from "@/store/authStore";
import { useEffect, useState } from "react";
import {
  StyledText,
  StyledPressable,
  StyledView,
  StyledScrollView,
} from "@/components/styleds/components";
import FiltersModal from "@/components/filtersModal";
import ModalPage from "@/components/modalPage";
import SearchInput from "@/components/searchInput";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RefreshControl } from "react-native";

export default function SearchPage() {
  const { token } = useAuthStore();
  const {
    searchTerm,
    setSearchTerm,
    results,
    searchForResults,
    history,
    addHistory,
    removeHistory,
    clearHistory,
    clearResults,
  } = useSearchStore();
  const [openFilters, setOpenFilters] = useState(false);
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (token) {
      clearResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    if (token && searchTerm) {
      await searchForResults(token, searchTerm);
      addHistory(searchTerm);
      router.push(`/app/search/${searchTerm}`);
    }
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
      }}
    >
      <StyledView className="min-h-screen flex flex-col items-center pb-14 w-full overflow-x-hidden mb-20">
        {openFilters ? (
          <ModalPage isOpen={openFilters}>
            <FiltersModal close={() => setOpenFilters(false)} />
          </ModalPage>
        ) : (
          <>
            <StyledView className="flex flex-col items-center justify-start w-full px-6">
              <SearchInput
                search={handleSearch}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                history={history}
                removeHistory={removeHistory}
                clearHistory={clearHistory}
                addHistory={addHistory}
              />
            </StyledView>

            <StyledView className="flex flex-col items-center px-4 gap-2 mt-auto mb-10">
              <StyledPressable
                className="bg-[#5ECD81] w-full px-32 py-3 rounded-md shadow font-light"
                onPress={handleSearch}
              >
                <StyledText className="text-white">Pesquisar</StyledText>
              </StyledPressable>

              {/*<StyledPressable
                className="border border-[#238878] text-ascents w-full py-2.5 px-24 mb-14 rounded-md shadow flex flex-row items-center justify-center"
                onPress={() => setOpenFilters(true)}
              >
                <Icon name="tune" size={18} color="#A3A3A3" />
                <StyledText className="ml-2 mr-8">Filtrar</StyledText>
              </StyledPressable>*/}
            </StyledView>
          </>
        )}
      </StyledView>
    </StyledScrollView>
  );
}
