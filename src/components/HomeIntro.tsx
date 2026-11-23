import styled from 'styled-components'

const Intro = styled.section`
  position:relative;isolation:isolate;padding:60px 0 92px;
  display:grid;grid-template-columns:minmax(0,588fr) minmax(0,476fr);gap:56px;align-items:center;
  &::before{content:'';position:absolute;z-index:-1;inset:0 calc((1120px - 100vw)/2);background:url('/home/background.svg') center/cover no-repeat;opacity:${({theme})=>theme.mode==='dark'?.08:1};pointer-events:none}
  h1{font-size:clamp(34px,3.4vw,48px);line-height:1.3;font-weight:800;margin:0 0 16px}
  .description{font-size:20px;line-height:1.3;margin:0;color:${({theme})=>theme.text}}
  .hero{display:block;width:100%;height:auto;aspect-ratio:476/360}
  ul{list-style:none;padding:0;margin:64px 0 0;display:grid;grid-template-columns:minmax(0,231fr) minmax(0,294fr);gap:20px 32px}
  li{display:flex;align-items:center;gap:12px;font-size:16px;line-height:1.3;color:${({theme})=>theme.muted}}
  .icon{display:flex;align-items:center;justify-content:center;padding:8px;border-radius:50%;flex-shrink:0}
  .purchase{background:#C47F17}.package{background:#574F4D}.delivery{background:#DBAC2C}.coffee{background:#8047F8}
  @media(max-width:1159px){&::before{inset:0 -20px}gap:32px;ul{gap:20px 16px}}
  @media(max-width:900px){grid-template-columns:minmax(0,1fr);padding:28px 0 56px;gap:32px;.hero{max-width:476px;margin:0 auto}ul{margin-top:32px}}
  @media(max-width:540px){ul{grid-template-columns:minmax(0,1fr);gap:16px}.description{font-size:18px}&::before{inset:0 -16px}}
`
const benefits=[
 {icon:'purchase',text:'Compra simples e segura'},
 {icon:'package',text:'Embalagem mantém o café intacto'},
 {icon:'delivery',text:'Entrega rápida e rastreada'},
 {icon:'coffee',text:'O café chega fresquinho até você'},
]
export function HomeIntro(){
 return <Intro aria-labelledby="home-title"><div><h1 id="home-title">Encontre o café perfeito para qualquer hora do dia</h1><p className="description">Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora</p>
 <ul aria-label="Benefícios do Coffee Delivery">{benefits.map(benefit=><li key={benefit.icon}><span className={`icon ${benefit.icon}`}><img src={`/home/${benefit.icon}.svg`} alt=""/></span>{benefit.text}</li>)}</ul>
 </div><img className="hero" src="/home/hero.png" width="476" height="360" alt="Copo de café acompanhado de grãos e café moído sobre um fundo amarelo"/></Intro>
}
