import { Project, StudioInfo, TeamMember } from './types'

export const studioInfo: StudioInfo = {
  headline: 'Tworzymy infrastrukturę, która łączy ludzi',
  subheadline: 'Kompleksowe projekty inżynierskie dróg, mostów i infrastruktury towarzyszącej.',
  about: 'MT-Projekt Sp. z o.o. to polskie biuro projektowe z siedzibą w Grójcu. Zajmujemy się szerokim zakresem projektów inżynierskich — od projektowania dróg i ulic, przez mosty i wiadukty, po sieci sanitarne, teletechniczne i elektroenergetyczne. Nasze projekty realizujemy w oparciu o nowoczesne technologie, w tym drony i zaawansowane oprogramowanie CAD/BIM.',
  email: 'biuro@mt-p.pl',
  phone: '+48 732 707 800',
  address: 'ul. Piłsudskiego 42A, 05-600 Grójec',
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'skrzyzowania-warszawa',
    title: 'Przebudowa skrzyżowań — Warszawa',
    year: 2024,
    location: 'Warszawa',
    coverImage: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1200&q=85',
    images: [
      { url: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1600&q=85' },
      { url: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1600&q=85' },
      { url: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1600&q=85' },
    ],
    description: 'Projekt przebudowy skrzyżowań i ronda w Warszawie. Zakres obejmował przebudowę geometrii skrzyżowań, organizację ruchu, odwodnienie oraz infrastrukturę dla pieszych i rowerzystów.',
    area: '2,4 km',
    featured: true,
  },
  {
    id: '2',
    slug: 'droga-grodzisk',
    title: 'Budowa drogi z rondem — Grodzisk Maz.',
    year: 2023,
    location: 'Grodzisk Mazowiecki',
    coverImage: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1200&q=85',
    images: [
      { url: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1600&q=85' },
      { url: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1600&q=85' },
    ],
    description: 'Projekt budowy nowej drogi gminnej z rondem jednopasmowym. Projekt obejmował jezdnię, chodniki, ścieżkę rowerową, oświetlenie drogowe oraz przebudowę sieci kolidujących.',
    area: '1,1 km',
    featured: true,
  },
  {
    id: '3',
    slug: 'wiadukt-grzegorzewice',
    title: 'Przebudowa wiaduktu — Grzegorzewice',
    year: 2024,
    location: 'Grzegorzewice',
    coverImage: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1200&q=85',
    images: [
      { url: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1600&q=85' },
      { url: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1600&q=85' },
    ],
    description: 'Projekt przebudowy wiaduktu drogowego nad linią kolejową. Zakres obejmował nową konstrukcję nośną, izolację, wyposażenie mostu oraz dojazdy po obu stronach obiektu.',
    area: '48 m',
    featured: true,
  },
  {
    id: '4',
    slug: 'droga-kampinos',
    title: 'Przebudowa drogi powiatowej — Kampinos',
    year: 2023,
    location: 'Kampinos',
    coverImage: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1200&q=85',
    images: [
      { url: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1600&q=85' },
      { url: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1600&q=85' },
    ],
    description: 'Projekt przebudowy drogi powiatowej wraz z budową chodnika i oświetlenia. Projekt uwzględniał ochronę środowiska na terenie Kampinoskiego Parku Narodowego.',
    area: '3,2 km',
    featured: false,
  },
  {
    id: '5',
    slug: 'infrastruktura-zyrardow',
    title: 'Infrastruktura drogowa — Żyrardów',
    year: 2022,
    location: 'Żyrardów',
    coverImage: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1200&q=85',
    images: [
      { url: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1600&q=85' },
      { url: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1600&q=85' },
    ],
    description: 'Kompleksowy projekt infrastruktury drogowej w strefie przemysłowej. Projekt obejmował drogi wewnętrzne, place manewrowe, odwodnienie, oświetlenie i sieci podziemne.',
    area: '1,8 km',
    featured: false,
  },
  {
    id: '6',
    slug: 'audit-brd-tamka',
    title: 'Audyt BRD i inżynieria ruchu — Tamka',
    year: 2023,
    location: 'Warszawa',
    coverImage: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1200&q=85',
    images: [
      { url: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1600&q=85' },
      { url: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1600&q=85' },
    ],
    description: 'Audyt bezpieczeństwa ruchu drogowego (BRD) wraz z projektem stałej organizacji ruchu. Zakres obejmował analizę kolizyjności, projekt sygnalizacji świetlnej i oznakowania.',
    featured: false,
  },
]

export const team: TeamMember[] = [
  {
    id: '1',
    name: 'Marek Tomaszewski',
    role: 'Główny projektant, założyciel',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80',
    bio: 'Inżynier dróg i mostów z wieloletnim doświadczeniem w projektowaniu infrastruktury drogowej.',
  },
  {
    id: '2',
    name: 'Anna Wiśniewska',
    role: 'Projektant dróg',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    bio: 'Specjalizuje się w projektowaniu dróg miejskich i skrzyżowań. Absolwentka Politechniki Warszawskiej.',
  },
  {
    id: '3',
    name: 'Piotr Kowalski',
    role: 'Projektant mostów',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
    bio: 'Doświadczony konstruktor obiektów mostowych i inżynierskich. Specjalista BIM.',
  },
  {
    id: '4',
    name: 'Zofia Dąbrowska',
    role: 'Inżynier geodeta',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
    bio: 'Geodeta uprawniony, specjalizuje się w pomiarach UAV i opracowaniach geodezyjnych.',
  },
]

export function getAllProjects(): Project[] {
  return projects
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return projects.map(p => p.slug)
}

export function getTeam(): TeamMember[] {
  return team
}
