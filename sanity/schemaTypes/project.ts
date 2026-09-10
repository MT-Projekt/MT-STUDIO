import { defineType, defineField } from 'sanity'

const ALT_FIELDS = [
  defineField({
    name: 'alt_pl',
    title: 'Tekst alternatywny (PL)',
    type: 'string',
    description: 'Krótki opis tego, co widać na zdjęciu, np. „Rondo 3 Maja w Grodzisku Mazowieckim – widok z drona”. Pomaga w Google Grafika i osobom niewidomym. Puste = tytuł projektu.',
  }),
  defineField({ name: 'alt_en', title: 'Tekst alternatywny (EN)', type: 'string' }),
]

export const projectSchema = defineType({
  name: 'project',
  title: 'Projekt',
  type: 'document',
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO (wygląd w Google)',
      description: 'Opcjonalne. Puste pola = tytuł i opis projektu.',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title_pl' }, validation: r => r.required() }),
    defineField({ name: 'title_pl', title: 'Tytuł (PL)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'title_en', title: 'Tytuł (EN)', type: 'string' }),
    defineField({ name: 'year', title: 'Rok', type: 'number' }),
    defineField({ name: 'location', title: 'Lokalizacja', type: 'string' }),
    defineField({ name: 'area', title: 'Długość / Rozpiętość', type: 'string' }),
    defineField({
      name: 'featured',
      title: 'Umieść na głównej',
      type: 'boolean',
      initialValue: false,
      description: 'Projekt pojawi się w sekcji "Projekty" na stronie głównej.',
    }),
    defineField({ name: 'coverImage', title: 'Zdjęcie główne', type: 'image', options: { hotspot: true }, fields: ALT_FIELDS }),
    defineField({ name: 'images', title: 'Galeria', type: 'array', of: [{ type: 'image', options: { hotspot: true }, fields: ALT_FIELDS }] }),
    defineField({ name: 'description_pl', title: 'Opis (PL)', type: 'text', rows: 4 }),
    defineField({ name: 'description_en', title: 'Opis (EN)', type: 'text', rows: 4 }),
    defineField({
      name: 'pointCloudImage',
      title: 'Chmura punktów',
      type: 'image',
      options: { hotspot: true },
      description: 'Opcjonalne zdjęcie do sekcji "Chmura punktów" na stronie projektu. Sekcja pojawi się, jeśli wypełnione jest chociaż jedno z tych trzech pól.',
    }),
    defineField({
      name: 'terrainModelImage',
      title: 'Model terenu 3D',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'existingStateImage',
      title: 'Analiza istniejącego stanu',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'seoTitle_pl',
      title: 'Tytuł w Google (PL)',
      type: 'string',
      fieldset: 'seo',
      validation: r => r.max(60).warning('Google obcina tytuły dłuższe niż ok. 60 znaków.'),
    }),
    defineField({ name: 'seoTitle_en', title: 'Tytuł w Google (EN)', type: 'string', fieldset: 'seo', validation: r => r.max(60).warning('Google obcina tytuły dłuższe niż ok. 60 znaków.') }),
    defineField({
      name: 'seoDescription_pl',
      title: 'Opis w Google (PL)',
      type: 'text',
      rows: 3,
      fieldset: 'seo',
      description: 'Najlepiej 120–160 znaków.',
      validation: r => r.max(160).warning('Google obcina opisy dłuższe niż ok. 160 znaków.'),
    }),
    defineField({ name: 'seoDescription_en', title: 'Opis w Google (EN)', type: 'text', rows: 3, fieldset: 'seo', validation: r => r.max(160).warning('Google obcina opisy dłuższe niż ok. 160 znaków.') }),
  ],
  preview: {
    select: { title: 'title_pl', media: 'coverImage', subtitle: 'location' },
  },
})
