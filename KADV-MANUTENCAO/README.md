# KADV MANUTENCAO

Landing page estática premium de site em construção para a Kiraly Advocacia.

## Objetivo

Reproduzir, com controle total em código, a página aprovada visualmente para uso temporário enquanto o novo site institucional é preparado.

## Arquivos principais

- `index.html`: estrutura da página.
- `styles.css`: visual, responsividade, animações e paleta.
- `script.js`: contador, modais, placeholders e acionamento do YayForms.
- `assets/logo-placeholder.svg`: logo temporário substituível.
- `assets/favicon.svg`: favicon provisório.

## Como rodar localmente

Abra `index.html` no navegador ou rode um servidor local:

```bash
python3 -m http.server 8080
```

Depois acesse:

```text
http://localhost:8080
```

## Pendências editáveis

- Substituir `assets/logo-placeholder.svg` pelo logo oficial.
- Informar URL de `Acompanhe seu Processo`.
- Informar URL de `Agende seu Atendimento`.
- Informar URL do Twitter/X.
- Validar integração final com YayForms em ambiente hospedado.

## Publicação

Pode ser hospedado em GitHub Pages, Vercel, Netlify, Cloudflare Pages ou servidor próprio.
