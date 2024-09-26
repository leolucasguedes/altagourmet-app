import { useState, useEffect } from "react";
import { useRouter, usePathname } from "expo-router";
import {
  StyledView,
  StyledText,
  StyledPressable,
  StyledTextInput
} from "@/components/styleds/components";
import api from "@/utils/api";
import Icon from "react-native-vector-icons/MaterialIcons";

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
  const [trends, setTrends] = useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const isSearchPage = pathname.startsWith("/app/search");

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        //const response = await api.get("/trends");
        //setTrends(response.data);
      } catch (error) {
        console.error("Erro ao buscar as principais marcas:", error);
      }
    };

    fetchTrends();
    setSearchTerm("");
  }, [setSearchTerm]);

  const searchByHistory = (value: string) => {
    setIsFocused(false);
    setSearchTerm(value);
    router.push(`/app/search/${value}`);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    router.push("/app/search");
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

        {/* Limpar pesquisa */}
        {searchTerm?.length > 1 && (
          <StyledPressable onPress={handleClearSearch}>
            <StyledText className="text-red absolute right-10 -top-2.5 z-50">X</StyledText>
          </StyledPressable>
        )}

        {/* Botão de envio */}
        {searchTerm?.length > 1 && (
          <StyledPressable onPress={search}>
            <StyledText className="text-black absolute right-2.5 -top-2.5 z-50">{">"}</StyledText>
          </StyledPressable>
        )}
      </StyledView>

      {/* Histórico de pesquisas recentes */}
      {history.length > 0 && isFocused && isSearchPage ? (
        <StyledView className="w-full bg-white relative z-10 -mb-10">
          <StyledView className="w-full flex-row items-center justify-between pb-2 mb-3 border-b border-gray-300">
            <StyledText className="text-base font-semibold">
              Pesquisas Recentes
            </StyledText>
            <StyledPressable onPress={clearHistory}>
              <StyledText className="text-sm text-ascents">Limpar</StyledText>
            </StyledPressable>
          </StyledView>

          <StyledView className="w-full px-4">
            {history.map((item, index) => (
              <StyledView
                key={index}
                className="flex-row items-center justify-between"
              >
                <StyledPressable
                  onPress={() => searchByHistory(item)}
                  className="text-sm text-darker-grey mb-4"
                >
                  <StyledText>{item}</StyledText>
                </StyledPressable>
                <StyledPressable onPress={() => removeHistory(item)}>
                  <Icon name="close" size={18} color="#171717" />
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
          <StyledView className="flex-row flex-wrap gap-4 mb-4">
            {trends.map((brand, index) => (
              <StyledPressable
                key={index}
                onPress={() => searchByHistory(brand)}
                className="border border-gray-300 py-1 px-3.5 rounded-md"
              >
                <StyledText>{brand}</StyledText>
              </StyledPressable>
            ))}
          </StyledView>
        </StyledView>
      )}
    </StyledView>
  );
}
