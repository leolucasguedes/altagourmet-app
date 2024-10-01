import { Link, Stack, usePathname } from 'expo-router';
import { Text, View } from 'react-native';
export default function NotFoundScreen() {
  const pathname = usePathname()
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View>
        <Text>The page {pathname} doesn't exist.</Text>
        <Link href="/">
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
