import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

for(const theme of ['light','dark'] as const){
 test('fluxo completo, acessibilidade e responsividade: '+theme,async({page})=>{
  const errors:string[]=[]
  page.on('pageerror',error=>errors.push(error.message))
  await page.emulateMedia({colorScheme:theme})
  await page.route('https://viacep.com.br/ws/**',route=>route.fulfill({json:{logradouro:'Praça da Sé',bairro:'Sé',localidade:'São Paulo',uf:'SP'}}))
  await page.goto('/')
  await expect(page.getByRole('article')).toHaveCount(14)
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link',{name:'Pular para conteúdo'})).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
  async function check(screen:string){
   for(const width of [320,390,768,1440]){
    await page.setViewportSize({width,height:900})
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
   }
   const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()
   expect(audit.violations).toEqual([])
   await page.evaluate(()=>scrollTo(0,0))
   await page.screenshot({path:'docs/evidencias/final-'+screen+'-'+theme+'-desktop.png',fullPage:true})
   await page.setViewportSize({width:390,height:844})
   await page.screenshot({path:'docs/evidencias/final-'+screen+'-'+theme+'-mobile.png',fullPage:true})
  }
  await check('home')
  await page.getByRole('button',{name:'Adicionar Latte ao carrinho',exact:true}).click()
  await page.getByRole('button',{name:'Adicionar Latte ao carrinho',exact:true}).click()
  await page.getByRole('link',{name:'Abrir carrinho, 2 unidades'}).click()
  await page.getByRole('button',{name:'Confirmar pedido'}).click()
  await expect(page.locator('#cep-error')).toBeVisible()
  await page.locator('#cep').fill('01001-000');await page.locator('#number').focus()
  await expect(page.locator('#street')).toHaveValue('Praça da Sé')
  await page.locator('#number').fill('12A')
  await page.getByRole('button',{name:'Confirmar pedido'}).click()
  await expect(page.locator('#payment-error')).toBeVisible()
  await page.getByRole('radio',{name:'Dinheiro',exact:true}).check()
  await check('checkout')
  await page.getByRole('button',{name:'Confirmar pedido'}).click()
  await expect(page.getByRole('heading',{name:'Uhu! Pedido confirmado'})).toBeVisible()
  await expect(page.getByText('Total: R$ 23,30',{exact:false})).toBeVisible()
  await page.reload()
  await expect(page.getByText('Praça da Sé, 12A',{exact:false})).toBeVisible()
  await check('success')
  expect(await page.evaluate(()=>localStorage.getItem('coffee-delivery:cart:v1'))).toBe('[]')
  await page.goto('/checkout')
  await expect(page.getByRole('heading',{name:'Seu carrinho está vazio'})).toBeVisible()
  await page.evaluate(()=>sessionStorage.setItem('coffee-delivery:order:v1','bad'))
  await page.goto('/success')
  await expect(page.getByRole('heading',{name:'Nenhum pedido confirmado'})).toBeVisible()
  expect(errors).toEqual([])
 })
}

test('CEP: erro de rede permite correção manual; resposta antiga não sobrescreve novo CEP',async({page})=>{
 await page.goto('/')
 await page.getByRole('button',{name:'Adicionar Latte ao carrinho',exact:true}).click()
 await page.getByRole('link',{name:'Abrir carrinho, 1 unidades'}).click()
 await page.route('https://viacep.com.br/ws/**',async route=>{
  if(route.request().url().includes('01001000')){
   await new Promise(resolve=>setTimeout(resolve,700))
   await route.fulfill({json:{logradouro:'Endereço antigo',bairro:'Antigo',localidade:'São Paulo',uf:'SP'}}).catch(()=>{})
  }else if(route.request().url().includes('22222222')){
   await new Promise(resolve=>setTimeout(resolve,1200))
   await route.fulfill({json:{logradouro:'Endereço novo',bairro:'Novo',localidade:'São Paulo',uf:'SP'}})
  }else await route.abort()
 })
 await page.locator('#cep').fill('01001-000');await page.locator('#number').focus()
 await expect(page.getByText('Consultando CEP…')).toBeVisible()
 await page.locator('#cep').fill('22222-222');await page.locator('#number').focus()
 await expect(page.getByRole('button',{name:'Confirmar pedido'})).toBeDisabled()
 await expect(page.locator('#street')).toHaveValue('Endereço novo')
 await page.locator('#cep').fill('33333-333');await page.locator('#number').focus()
 await expect(page.getByText('Não foi possível consultar o CEP.',{exact:false})).toBeVisible()
 for(const [id,value] of Object.entries({street:'Rua de exemplo',number:'12',neighborhood:'Centro',city:'São Paulo',uf:'SP'}))await page.locator('#'+id).fill(value)
 await page.getByRole('radio',{name:'Cartão de crédito',exact:true}).check()
 await page.getByRole('button',{name:'Confirmar pedido'}).click()
 await expect(page.getByRole('heading',{name:'Uhu! Pedido confirmado'})).toBeVisible()
})

test('storage bloqueado mantém compra em memória e avisa',async({page})=>{
 await page.addInitScript(()=>{
  Storage.prototype.getItem=()=>{throw Error('blocked')}
  Storage.prototype.setItem=()=>{throw Error('blocked')}
 })
 await page.route('https://viacep.com.br/ws/**',route=>route.fulfill({json:{logradouro:'Praça da Sé',bairro:'Sé',localidade:'São Paulo',uf:'SP'}}))
 await page.goto('/')
 await page.getByRole('button',{name:'Adicionar Latte ao carrinho',exact:true}).click()
 await page.getByRole('link',{name:'Abrir carrinho, 1 unidades'}).click()
 await expect(page.getByText('Seu navegador não permitiu salvar o carrinho.',{exact:false})).toBeVisible()
 await page.locator('#cep').fill('01001-000');await page.locator('#number').focus()
 await expect(page.locator('#street')).toHaveValue('Praça da Sé')
 await page.locator('#number').fill('12')
 await page.getByRole('radio',{name:'Cartão de débito',exact:true}).check()
 await page.getByRole('button',{name:'Confirmar pedido'}).click()
 await expect(page.getByRole('heading',{name:'Uhu! Pedido confirmado'})).toBeVisible()
 await expect(page.getByText('Não foi possível salvar o resumo nesta sessão.',{exact:false})).toBeVisible()
})
