import { StyledImage } from "./styleds/components"

export default function PlaceHolderImage({ category }: { category: string }) {
    const categoriesImages = {
        'remedios': require('../assets/images/remedios-placeholder.png'),
        'testes': require('../assets/images/testes-placeholder.png'),
        'cosmeticos': require('../assets/images/cosmeticos-placeholder.png'),
        'beleza': require('../assets/images/beleza-placeholder.png'),
        'primeiros-socorros': require('../assets/images/primeiros-socorros-placeholder.png'),
        'higiene-pessoal': require('../assets/images/higiene-pessoal-placeholder.png'),
        'cuidados-infantis': require('../assets/images/cuidados-infantis-placeholder.png'),
        'mercearia': require('../assets/images/mercearia-placeholder.png'),
    }
    return (
        <StyledImage className='w-full h-full' source={categoriesImages[category as keyof typeof categoriesImages]} alt={category} />
    )

}