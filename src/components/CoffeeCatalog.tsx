import styled from 'styled-components'
import { coffees } from '../data/coffees'
import { CoffeeCard } from './CoffeeCard'
const Catalog = styled.section`
 h2 { font-size: 32px; margin: 0 0 54px; }
`
const Grid = styled.div`
 display: grid; grid-template-columns: minmax(0, 1fr); gap: 40px 32px;
 @media(min-width: 650px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
 @media(min-width: 950px) { grid-template-columns: repeat(3, minmax(0, 1fr)); }
 @media(min-width: 1180px) { grid-template-columns: repeat(4, minmax(0, 1fr)); }
`
export function CoffeeCatalog() {
 return <Catalog aria-labelledby="catalog-title"><h2 id="catalog-title">Nossos cafés</h2><Grid>{coffees.map(coffee => <CoffeeCard key={coffee.id} coffee={coffee} />)}</Grid></Catalog>
}
