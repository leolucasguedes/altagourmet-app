import { StyledText } from "../../../components/styleds/components";
import { useLocalSearchParams } from "expo-router";
import {
  StyledView,
  StyledPressable,
} from "../../../components/styleds/components";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

export default function CategoryPage() {
  const { name } = useLocalSearchParams();
  const router = useRouter();
  return (
    <>
      <StyledView className="flex flex-col items-center justify-start w-full p-2">
        <StyledView className="w-full flex flex-row items-center justify-start gap-x-3 px-2 py-4">
          <StyledPressable onPress={() => router.back()} className="min-w-16">
            <Icon name="arrow-back" size={25} color="#8B8B93" />
          </StyledPressable>
          <StyledText>Produtos ainda não adicionados</StyledText>
        </StyledView>
      </StyledView>
    </>
  );
}
