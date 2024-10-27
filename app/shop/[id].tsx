import { StyledText } from '../../components/styleds/components';
import { useLocalSearchParams } from 'expo-router';

export default function ShopPage() {
    const { id } = useLocalSearchParams();
    return (
        <StyledText>Shop Page {id}</StyledText>
    )
}