import React from "react";
import useSearchStore from "@/store/searchStore";
import useAuthStore from "@/store/authStore";
import { useEffect, useState } from "react";
import {
  StyledText,
  StyledPressable,
  StyledView,
} from "@/components/styleds/components";
import FiltersModal from "@/components/filtersModal";
import ModalPage from "@/components/modalPage";
import SearchInput from "@/components/searchInput";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function SearchScreen() {
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

  useEffect(() => {
    if (token) {
      clearResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    if (token) {
      await searchForResults(token, searchTerm);
      addHistory(searchTerm);
      //router.push(`/app/search/${searchTerm}`);
    }
  };

  const handleViewOffersClick = () => {
    if (results.length > 0) {
      //router.push(`/app/offers/filtered`);
    } else {
      //router.push("/app/offers/new");
    }
  };

  return (
    <StyledView className="min-h-screen flex flex-col justify-between items-center pb-14 w-full overflow-x-hidden">
      {openFilters ? (
        <ModalPage isOpen={openFilters}>
          <FiltersModal close={() => setOpenFilters(false)} />
        </ModalPage>
      ) : (
        <>
          <StyledView className="flex flex-col items-center justify-start w-full py-10 px-6">
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

          <StyledView className="flex flex-col items-center px-4 gap-2 mt-auto">
            <StyledPressable
              className="bg-[#5ECD81] w-full px-32 py-3 rounded-md shadow font-light"
              onPress={handleViewOffersClick}
            >
              <StyledText className="text-white">Pesquisar</StyledText>
            </StyledPressable>

            <StyledPressable
              className="border border-[#238878] text-ascents w-full py-2.5 px-24 mb-14 rounded-md shadow flex flex-row items-center justify-center"
              onPress={() => setOpenFilters(true)}
            >
              <Icon name="tune" size={18} color="#A3A3A3" />
              <StyledText className="ml-2 mr-8">Filtrar</StyledText>
            </StyledPressable>
          </StyledView>
        </>
      )}
    </StyledView>
  );
}
