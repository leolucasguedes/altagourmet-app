import { StyledImage } from "./styleds/components"

export default function PlaceHolderImage({ category }: { category: string }) {
    const categoriesImages = {
        'remedios': require('../assets/images/placeholder.png'),
        'testes': require('../assets/images/placeholder.png'),
        'cosmeticos': require('../assets/images/placeholder.png'),
        'beleza': require('../assets/images/placeholder.png'),
        'primeiros-socorros': require('../assets/images/placeholder.png'),
        'higiene-pessoal': require('../assets/images/placeholder.png'),
        'cuidados-infantis': require('../assets/images/placeholder.png'),
        'mercearia': require('../assets/images/placeholder.png'),
    }
    return (
        <StyledImage className='w-full h-full' source={categoriesImages[category as keyof typeof categoriesImages]} alt={category} />
    )

}