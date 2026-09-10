import { getAllProjects } from '@/lib/sanity'
import ProjectCard from '@/components/ProjectCard/ProjectCard'
import { Dictionary } from '@/lib/dictionaries'
import styles from '@/styles/projekty.module.css'

interface Props {
  lang: string
  dict: Dictionary
}

export default async function ProjektyPage({ lang, dict }: Props) {
  const projects = await getAllProjects(lang)

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        {projects.map(project => (
          <div key={project.id} className={styles.gridItem}>
            <ProjectCard project={project} lang={lang} imageOnly />
          </div>
        ))}
      </div>
    </div>
  )
}
