export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
}

export interface GalleryImage {
  url: string
  lqip?: string
}

export interface Project {
  id: string
  slug: string
  title: string
  year: number
  location: string
  coverImage: string
  coverImageLqip?: string
  images: GalleryImage[]
  description: string
  area?: string
  featured: boolean
  pointCloudImage?: string
  pointCloudImageLqip?: string
  terrainModelImage?: string
  terrainModelImageLqip?: string
  existingStateImage?: string
  existingStateImageLqip?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  photo: string
  photoLqip?: string
  bio?: string
}

export interface StudioInfo {
  headline: string
  subheadline: string
  about: string
  email: string
  phone: string
  address: string
}

export type JobCategory = 'roads' | 'bridges' | 'bim' | 'surveying' | 'team' | 'supervision' | 'networks'

export interface JobPosting {
  id: string
  slug: string
  title: string
  category: JobCategory
  location: string
  employmentType: string
  summary: string
  description?: string
  externalUrl?: string
}
