import { defineType, defineField } from 'sanity'

export const teamMemberSchema = defineType({
  name: 'teamMember',
  title: 'Członek zespołu',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Imię i nazwisko', type: 'string', validation: r => r.required() }),
    defineField({ name: 'role_pl', title: 'Stanowisko (PL)', type: 'string' }),
    defineField({ name: 'role_en', title: 'Stanowisko (EN)', type: 'string' }),
    defineField({ name: 'photo', title: 'Zdjęcie', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio_pl', title: 'Bio (PL)', type: 'text', rows: 3 }),
    defineField({ name: 'bio_en', title: 'Bio (EN)', type: 'text', rows: 3 }),
    defineField({ name: 'order', title: 'Kolejność', type: 'number' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role_pl', media: 'photo' },
  },
})
