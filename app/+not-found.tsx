import { Link, Stack, usePathname } from "expo-router";
import { Text, View } from "react-native";
export default function NotFoundScreen() {
  const pathname = usePathname();
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View>
        <Text>
          A página que você tentou acessar: {pathname} está em desenvolvimento.
        </Text>
        <Link href="/">
          <Text>Voltar ppara Home!</Text>
        </Link>
      </View>
    </>
  );
}
