import { StyledText } from '@/components/styleds/components';
import { useLocalSearchParams } from 'expo-router';

export default function ProductPage() {
    const { id } = useLocalSearchParams();
    return (
        <StyledText>Product Page {id}</StyledText>
    )
}