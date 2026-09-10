import { defineType, defineField } from 'sanity'

const CATEGORIES = [
  { title: 'Drogi i ulice', value: 'roads' },
  { title: 'Mosty i obiekty inżynierskie', value: 'bridges' },
  { title: 'BIM / CAD', value: 'bim' },
  { title: 'Geodezja', value: 'surveying' },
  { title: 'Zespół / Asystent', value: 'team' },
  { title: 'Nadzór inwestorski', value: 'supervision' },
  { title: 'Sieci i odwodnienie', value: 'networks' },
]

export const jobPostingSchema = defineType({
  name: 'jobPosting',
  title: 'Oferta pracy',
  type: 'document',
  fields: [
    defineField({ name: 'title_pl', title: 'Stanowisko (PL)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'title_en', title: 'Stanowisko (EN)', type: 'string' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title_pl' },
      validation: r => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategoria (decyduje o ikonie)',
      type: 'string',
      options: { list: CATEGORIES, layout: 'dropdown' },
      initialValue: 'roads',
    }),
    defineField({ name: 'location', title: 'Lokalizacja', type: 'string', initialValue: 'Grójec' }),
    defineField({
      name: 'employment_type_pl',
      title: 'Wymiar pracy (PL)',
      type: 'string',
      initialValue: 'Pełny etat',
    }),
    defineField({
      name: 'employment_type_en',
      title: 'Wymiar pracy (EN)',
      type: 'string',
      initialValue: 'Full-time',
    }),
    defineField({
      name: 'summary_pl',
      title: 'Krótki opis na liście (PL)',
      type: 'text',
      rows: 2,
      description: 'Jedno-dwa zdania widoczne na liście ofert.',
      validation: r => r.required(),
    }),
    defineField({ name: 'summary_en', title: 'Krótki opis na liście (EN)', type: 'text', rows: 2 }),
    defineField({
      name: 'externalUrl',
      title: 'Link do ogłoszenia (OLX / Pracuj.pl)',
      type: 'url',
      description: 'Pełny adres ogłoszenia. Kliknięcie w ofertę na stronie otworzy ten link w nowej karcie.',
      validation: r => r.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'description_pl',
      title: 'Pełny opis oferty (PL)',
      type: 'text',
      rows: 10,
      description: 'Widoczny na stronie szczegółów oferty.',
    }),
    defineField({ name: 'description_en', title: 'Pełny opis oferty (EN)', type: 'text', rows: 10 }),
    defineField({
      name: 'active',
      title: 'Aktywna (widoczna na stronie)',
      type: 'boolean',
      initialValue: true,
      description: 'Odznacz, żeby ukryć ofertę bez jej usuwania.',
    }),
    defineField({ name: 'order', title: 'Kolejność wyświetlania', type: 'number', initialValue: 0 }),
    defineField({
      name: 'publishedAt',
      title: 'Data publikacji',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: 'Kolejność ręczna',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title_pl', subtitle: 'location', active: 'active' },
    prepare({ title, subtitle, active }) {
      return { title, subtitle: active ? subtitle : `${subtitle} — nieaktywna` }
    },
  },
})
