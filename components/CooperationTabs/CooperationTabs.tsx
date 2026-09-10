import styles from './CooperationTabs.module.css'

interface Props {
  dict: {
    en_col1_title: string
    en_col1_items: string[]
    en_col2_title: string
    en_col2_items: string[]
  }
}

export default function CooperationTabs({ dict }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <div className={styles.cols}>
          <div>
            <h3 className={styles.colTitle}>{dict.en_col1_title}</h3>
            <ul className={styles.list}>
              {dict.en_col1_items.map(item => (
                <li key={item}><span>›</span>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={styles.colTitle}>{dict.en_col2_title}</h3>
            <ul className={styles.list}>
              {dict.en_col2_items.map(item => (
                <li key={item}><span>›</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
