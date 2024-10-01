import { StyledText } from '../../../components/styleds/components';
import { useLocalSearchParams } from 'expo-router';

export default function CategoryPage() {
    const { name } = useLocalSearchParams();
    return (
        <StyledText>Category Page {name}</StyledText>
    )
}