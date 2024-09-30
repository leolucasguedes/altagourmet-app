import { useState, useEffect } from "react";
import { useRouter, usePathname } from "expo-router";
import {
  StyledView,
  StyledText,
  StyledPressable,
  StyledTextInput,
} from "@/components/styleds/components";
import api from "@/utils/api";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconI from "react-native-vector-icons/Ionicons";
import Loading from "./loading";
import useAuthStore from "@/store/authStore";
import useSearchStore from "@/store/searchStore";

interface SearchInputProps {
  search: (e: any) => void;
  setSearchTerm: (term: string) => void;
  searchTerm: string;
  history: string[];
  removeHistory: (item: string) => void;
  clearHistory: () => void;
  addHistory: (item: string) => void;
}

export default function SearchInput({
  search,
  setSearchTerm,
  searchTerm,
  history,
  removeHistory,
  clearHistory,
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [trends, setTrends] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isSearchPage = pathname === "/app/search";
  const { token } = useAuthStore();
  const { searchForResults, addHistory, searchByCategory } = useSearchStore();

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await api.get("/products/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrends(response.data);
      } catch (error) {
        console.error("Erro ao buscar as principais marcas:", error);
      }
    };

    fetchTrends();
    setSearchTerm("");
  }, [setSearchTerm, token]);

  const searchByHistory = (value: string) => {
    setIsFocused(false);
    setSearchTerm(value);
    router.push(`/app/search/${value}`);
  };

  const handleClearSearch = async () => {
    if (loading) return;
    setLoading(true);
    setSearchTerm("");
    await router.push("/app/search");
    setLoading(false);
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    if (token && searchTerm) {
      try {
        addHistory(searchTerm);
        await searchForResults(token, searchTerm);
        router.push(`/app/search/${searchTerm}`);
      } catch {
        console.log("Erro ao buscar produtos");
      }
    }
    setLoading(false);
  };

  const handleCategorySearch = async (value: string) => {
    setLoading(true);
    if (token) {
      try {
        addHistory(value);
        const searched = await searchByCategory(token, value);
        if (searched) {
          router.push(`/app/search/${value}`);
        } else {
          router.push("/app/search");
        }
      } catch {
        console.log("Erro ao buscar produtos");
      }
    }
    setLoading(false);
  };

  return (
    <StyledView>
      <StyledView className="w-full flex-row items-center justify-between rounded-md">
        {/* Ícone de busca */}
        <StyledPressable onPress={search} className="absolute left-2.5 z-50">
          <Icon name="search" size={24} color="#238878" />
        </StyledPressable>

        {/* Campo de entrada de texto */}
        <StyledTextInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 500)}
          value={searchTerm}
          onChangeText={setSearchTerm}
          className="w-full pl-10 text-sm bg-[#F8F8F8] border border-[#D4D4D4] rounded-md py-4"
          placeholder="O que você está procurando?"
          placeholderTextColor="#A3A3A3"
        />
        {loading && <Loading />}

        {/* Limpar pesquisa */}
        {searchTerm?.length > 1 && (
          <StyledPressable
            onPress={handleClearSearch}
            className="absolute right-8 top-[17px] z-50"
          >
            <IconI name="close" size={21} color="#bf3320" />
          </StyledPressable>
        )}

        {/* Botão de envio */}
        {searchTerm?.length > 1 && (
          <StyledPressable
            onPress={handleSearch}
            className="absolute right-1 top-4.5 z-50"
          >
            <IconI name="chevron-forward" size={20} color="#a0a0a0" />
          </StyledPressable>
        )}
      </StyledView>

      {/* Histórico de pesquisas recentes */}
      {history.length > 0 && isFocused && isSearchPage ? (
        <StyledView className="w-full relative z-10 -mb-10">
          <StyledView className="w-full flex-row items-center justify-between pb-2 mb-3 border-b border-[#D4D4D4]">
            <StyledText className="text-sm font-semibold mt-2">
              Pesquisas Recentes
            </StyledText>
            <StyledPressable onPress={clearHistory}>
              <StyledText className="text-sm text-ascents mt-2">
                Limpar
              </StyledText>
            </StyledPressable>
          </StyledView>

          <StyledView className="w-full px-4 mb-3">
            {history.map((item, index) => (
              <StyledView
                key={index}
                className="flex-row items-center justify-between mb-2"
              >
                <StyledPressable
                  onPress={() => searchByHistory(item)}
                  className="mr-2"
                >
                  <StyledText className="text-sm text-[#A3A3A3]">
                    {item}
                  </StyledText>
                </StyledPressable>
                <StyledPressable onPress={() => removeHistory(item)}>
                  <Icon name="close" size={18} color="#A3A3A3" />
                </StyledPressable>
              </StyledView>
            ))}
          </StyledView>
        </StyledView>
      ) : null}

      {/* Exibição das Principais Marcas */}
      {isSearchPage && (
        <StyledView
          className={`w-full px-4 ${
            isFocused && history.length > 0 ? "mt-4" : "mt-0"
          }`}
        >
          <StyledText className="text-base font-semibold my-4">
            Em Alta
          </StyledText>
          <StyledView className="flex-row flex-wrap gap-3 mb-4">
            {trends.map((brand, index) => (
              <StyledPressable
                key={index}
                onPress={() => handleCategorySearch(brand.name)}
                className="border border-[#D4D4D4] py-1 px-3 rounded-md"
              >
                <StyledText>{brand.name}</StyledText>
              </StyledPressable>
            ))}
          </StyledView>
        </StyledView>
      )}
    </StyledView>
  );
}
