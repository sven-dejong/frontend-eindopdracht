# ParkPal

## GitHub Repository

De volledige broncode is beschikbaar op [GitHub](https://github.com/sven-dejong/frontend-eindopdracht).
## Inleiding

Ik heb een overzichtelijke webapplicatie geprobeerd te maken waarin informatie van alle National Parks staan. Amerika telt meer dan 60
parken en het kan lastig zijn om informatie over al deze parken op één plaats te verzamelen. Ik wil mensen die hierin
geïnteresseerd de gelegenheid bieden om van alles te weten te komen over parken die ze interessant lijken en dat mensen
die ze willen bezoeken goed voorbereid zijn door bijvoorbeeld te kunnen zien waar ze kunnen parkeren, hoeveel entree kost, wat de weersvoorspellingen zijn
en nog veel meer.

![Screenshot van de applicatie](./src/assets/screenshot-homepage-parkpal.png)
## Benodigdheden

Om deze applicatie te kunnen runnen heb je het volgende nodig:

- **Node.js**
- **npm**
- **API Keys**:
    - **National Park Service API Key**: `g03LCaiZ6htcYZYagV0ECJax5yRSL5kN10204TgB`
    - **Novi Backend API Key**: `parkpal:eCBGnZ1sIu7QwZZja1D3`
- **Internetverbinding** voor het ophalen van park data en gebruikersaccounts

## Installatie-instructies

Volg deze stappen om de applicatie lokaal te installeren en te runnen:

1. **Clone de repository**
   ```bash
   git clone [jouw-repository-url]
   cd [project-naam]
   ```

2. **Installeer dependencies**
   ```bash
   npm install
   ```

3. **Configureer environment variabelen**
    - Maak een `.env` bestand aan in de root directory
    - Voeg de volgende variabelen toe:
   ```
   VITE_API_KEY=g03LCaiZ6htcYZYagV0ECJax5yRSL5kN10204TgB
   VITE_X_API_KEY=parkpal:eCBGnZ1sIu7QwZZja1D3
   ```

4. **Start de ontwikkelserver**
   ```bash
   npm run dev
   ```

5. **Open de applicatie**
    - Ga naar `http://localhost:5173` in je browser

## Inloggegevens

**Test Account:**

- Username: `sventest1`
- Wachtwoord: `12345678`

Of maak een nieuw account aan via de registratiepagina.

## Beschikbare NPM Commando's

In dit project zijn de volgende npm scripts beschikbaar:

- **`npm run dev`** - Start de ontwikkelserver (meestal op poort 5173)
- **`npm run build`** - Bouwt de applicatie voor productie
- **`npm run preview`** - Preview van de productie build lokaal
- **`npm run lint`** - Controleert de code op linting fouten (als ESLint geconfigureerd is)
- **`npm test`** - Runt de tests (als er tests geconfigureerd zijn)

## Functionaliteiten

De applicatie bevat de volgende pagina's en functionaliteiten:

- **Home** (`/`) - Hoofdpagina van de applicatie
- **Alle Parken** (`/parks`) - Overzicht van alle beschikbare parken
- **Park Details** (`/parks/:id`) - Detailpagina van een specifiek park
- **Zoekresultaten** (`/search`) - Pagina met zoekresultaten
- **Login** (`/login`) - Inlogpagina voor gebruikers
- **Registratie** (`/register`) - Registratiepagina voor nieuwe gebruikers
- **Profiel** (`/profile`) - Gebruikersprofiel pagina
- **Favorieten** (`/favorites`) - Overzicht van favoriete parken
- **404 Pagina** - Voor niet-bestaande pagina's

## Technische Details

- **Framework**: React 18 met Vite
- **Routing**: React Router DOM
- **State Management**: Context API (AuthContext en FavoritesContext)
- **Styling**: CSS modules/bestanden
- **APIs**:
    - National Park Service API (voor park informatie)
    - Novi Backend API (voor gebruikersaccounts en authenticatie)

## Troubleshooting

**Applicatie start niet op:**

- Controleer of Node.js geïnstalleerd is: `node --version`
- Controleer of alle dependencies geïnstalleerd zijn: `npm install`
- Controleer of de .env variabelen correct zijn ingesteld

**API errors:**

- Controleer of de API key geldig is
- Controleer internetverbinding
- Controleer of de API endpoints bereikbaar zijn