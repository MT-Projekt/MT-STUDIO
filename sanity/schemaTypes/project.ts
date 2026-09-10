import { defineType, defineField } from 'sanity'

export const projectSchema = defineType({
  name: 'project',
  title: 'Projekt',
  type: 'document',
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
    defineField({ name: 'coverImage', title: 'Zdjęcie główne', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'images', title: 'Galeria', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
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
  ],
  preview: {
    select: { title: 'title_pl', media: 'coverImage', subtitle: 'location' },
  },
})
