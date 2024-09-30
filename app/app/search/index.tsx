import React from "react";
import useSearchStore from "@/store/searchStore";
import useAuthStore from "@/store/authStore";
import { useEffect, useState } from "react";
import {
  StyledText,
  StyledPressable,
  StyledView,
} from "@/components/styleds/components";
import SearchInput from "@/components/searchInput";
import Loading from "@/components/loading";
import { useRouter } from "expo-router";

export default function SearchPage() {
  const { token } = useAuthStore();
  const {
    searchTerm,
    setSearchTerm,
    searchForResults,
    history,
    addHistory,
    removeHistory,
    clearHistory,
    clearResults,
    clearFilters,
  } = useSearchStore();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      clearFilters();
      clearResults();
      setMessage("");
      setSearchTerm("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Pesquisando");

    if (token && searchTerm) {
      try {
        addHistory(searchTerm);
        const searched = await searchForResults(token, searchTerm);

        if (searched) {
          router.push(`/app/search/${searchTerm}`);
        } else {
          setMessage("Nenhum resultado encontrado");
          setSearchTerm("");
        }
      } catch {
        console.log("Erro ao buscar produtos");
      }
    }
    setLoading(false);
    setMessage("");
  };

  return (
    <StyledView className="flex flex-col items-center justify-between w-full flex-1 overflow-x-hidden mb-16">
      {loading && <Loading />}
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

      {message && <StyledText className="text-center">{message}</StyledText>}

      <StyledView className="flex flex-col items-center px-4 gap-2 mt-auto">
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
    </StyledView>
  );
}
