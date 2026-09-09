import Link from 'next/link'
import { studioInfo } from '@/lib/mockData'
import { Dictionary } from '@/lib/dictionaries'
import styles from '@/styles/polityka.module.css'

interface Props {
  lang: string
  dict: Dictionary
}

interface Section {
  title: string
  title_en: string
  body: string[]
  body_en: string[]
}

// UWAGA: dokument wymaga weryfikacji prawnej przed publikacja.
// Fragmenty oznaczone [DO UZUPELNIENIA] zawieraja dane, ktorych nie wolno zgadywac.
const sections: Section[] = [
  {
    title: 'Administrator danych osobowych',
    title_en: 'Data controller',
    body: [
      `Administratorem Twoich danych osobowych jest MT-Projekt Sp. z o.o. z siedzibą w Grójcu, ${studioInfo.address}.`,
      `Kontakt w sprawach dotyczących danych osobowych: ${studioInfo.email}, tel. ${studioInfo.phone}.`,
      'Adres do doręczeń elektronicznych: AE:PL-12056-90342-WDIAT-06.',
      '[DO UZUPEŁNIENIA: NIP, REGON, numer KRS oraz sąd rejestrowy.]',
      '[DO UZUPEŁNIENIA: informacja, czy powołano Inspektora Ochrony Danych, a jeśli tak — jego dane kontaktowe.]',
    ],
    body_en: [
      `The controller of your personal data is MT-Projekt Sp. z o.o., registered in Grójec, Poland, ${studioInfo.address}.`,
      `Contact for personal data matters: ${studioInfo.email}, phone ${studioInfo.phone}.`,
      'Electronic delivery address: AE:PL-12056-90342-WDIAT-06.',
      '[TO BE COMPLETED: tax ID (NIP), REGON, KRS number and registry court.]',
      '[TO BE COMPLETED: whether a Data Protection Officer has been appointed and, if so, their contact details.]',
    ],
  },
  {
    title: 'Jakie dane zbieramy',
    title_en: 'What data we collect',
    body: [
      'Formularz kontaktowy — imię i nazwisko, adres e-mail oraz treść wiadomości, którą nam przesyłasz.',
      'Korespondencja e-mail, w tym aplikacje na oferty pracy — dane zawarte w wiadomości i załącznikach, które przesyłasz z własnej inicjatywy.',
      'Nie zbieramy danych automatycznie w celach analitycznych ani marketingowych. Nie profilujemy użytkowników i nie podejmujemy wobec nich zautomatyzowanych decyzji.',
    ],
    body_en: [
      'Contact form — your name, e-mail address and the content of the message you send us.',
      'E-mail correspondence, including job applications — data contained in messages and attachments you send on your own initiative.',
      'We do not collect data automatically for analytics or marketing purposes. We do not profile users and do not make automated decisions about them.',
    ],
  },
  {
    title: 'Cele i podstawy prawne przetwarzania',
    title_en: 'Purposes and legal bases of processing',
    body: [
      'Odpowiedź na zapytanie przesłane przez formularz lub e-mail — na podstawie Twojej zgody (art. 6 ust. 1 lit. a RODO) oraz naszego prawnie uzasadnionego interesu polegającego na prowadzeniu korespondencji (art. 6 ust. 1 lit. f RODO).',
      'Podjęcie działań przed zawarciem umowy oraz jej wykonanie — art. 6 ust. 1 lit. b RODO.',
      'Rozpatrzenie aplikacji o pracę — art. 6 ust. 1 lit. a i b RODO oraz przepisy Kodeksu pracy.',
      'Ustalenie, dochodzenie lub obrona roszczeń — art. 6 ust. 1 lit. f RODO.',
      'Podanie danych jest dobrowolne, ale niezbędne do udzielenia odpowiedzi na zapytanie.',
    ],
    body_en: [
      'Responding to enquiries sent via the form or by e-mail — based on your consent (Art. 6(1)(a) GDPR) and our legitimate interest in conducting correspondence (Art. 6(1)(f) GDPR).',
      'Taking steps prior to entering into a contract and performing it — Art. 6(1)(b) GDPR.',
      'Processing job applications — Art. 6(1)(a) and (b) GDPR and the provisions of the Polish Labour Code.',
      'Establishing, pursuing or defending legal claims — Art. 6(1)(f) GDPR.',
      'Providing your data is voluntary but necessary for us to respond to your enquiry.',
    ],
  },
  {
    title: 'Okres przechowywania danych',
    title_en: 'Data retention period',
    body: [
      '[DO UZUPEŁNIENIA: okres przechowywania korespondencji z formularza kontaktowego — np. 12 miesięcy od zakończenia korespondencji.]',
      '[DO UZUPEŁNIENIA: okres przechowywania aplikacji o pracę — np. do zakończenia rekrutacji, a za zgodą kandydata przez kolejne 12 miesięcy.]',
      'Dane związane z realizacją umów przechowujemy przez okres wymagany przepisami podatkowymi i rachunkowymi oraz do upływu terminu przedawnienia roszczeń.',
    ],
    body_en: [
      '[TO BE COMPLETED: retention period for contact form correspondence — e.g. 12 months after the correspondence ends.]',
      '[TO BE COMPLETED: retention period for job applications — e.g. until the recruitment process ends, and with the candidate consent for a further 12 months.]',
      'Data related to the performance of contracts is retained for the period required by tax and accounting regulations and until claims become time-barred.',
    ],
  },
  {
    title: 'Odbiorcy danych',
    title_en: 'Data recipients',
    body: [
      'Dostawca hostingu, na którym działa niniejsza strona internetowa.',
      'Sanity.io — system zarządzania treścią, w którym przechowujemy materiały publikowane na stronie (opisy projektów, ogłoszenia o pracę, zdjęcia). System ten nie przechowuje danych przesyłanych przez formularz kontaktowy.',
      'Google Ireland Limited — usługa Google Fonts, z której pobierane są kroje pisma używane na stronie. Przy pobraniu kroju pisma przeglądarka przekazuje do Google adres IP użytkownika.',
      'Dostawca poczty elektronicznej, za pośrednictwem którego prowadzimy korespondencję.',
      '[DO UZUPEŁNIENIA: pozostałe podmioty przetwarzające — np. biuro rachunkowe, kancelaria prawna, dostawcy oprogramowania.]',
    ],
    body_en: [
      'The hosting provider on which this website operates.',
      'Sanity.io — the content management system storing the material published on this site (project descriptions, job postings, photographs). It does not store data submitted through the contact form.',
      'Google Ireland Limited — the Google Fonts service, from which the typefaces used on this site are loaded. When a typeface is loaded, the browser transmits the user IP address to Google.',
      'Our e-mail service provider, through which we conduct correspondence.',
      '[TO BE COMPLETED: other processors — e.g. accounting office, law firm, software providers.]',
    ],
  },
  {
    title: 'Przekazywanie danych poza Europejski Obszar Gospodarczy',
    title_en: 'Transfers outside the European Economic Area',
    body: [
      'Część usług, z których korzystamy, może przetwarzać dane poza Europejskim Obszarem Gospodarczym, w szczególności na terenie Stanów Zjednoczonych.',
      'Przekazanie odbywa się na podstawie standardowych klauzul umownych zatwierdzonych przez Komisję Europejską lub decyzji o odpowiednim stopniu ochrony.',
      '[DO UZUPEŁNIENIA: potwierdzić u dostawcy hostingu oraz w Sanity.io, na jakiej podstawie prawnej odbywa się transfer, i wskazać ją w tym miejscu.]',
    ],
    body_en: [
      'Some of the services we use may process data outside the European Economic Area, in particular in the United States.',
      'Such transfers take place on the basis of Standard Contractual Clauses approved by the European Commission or an adequacy decision.',
      '[TO BE COMPLETED: confirm with the hosting provider and Sanity.io the legal basis for the transfer and state it here.]',
    ],
  },
  {
    title: 'Twoje prawa',
    title_en: 'Your rights',
    body: [
      'Masz prawo dostępu do swoich danych oraz otrzymania ich kopii.',
      'Masz prawo do sprostowania (poprawiania) swoich danych.',
      'Masz prawo do usunięcia danych, ograniczenia ich przetwarzania oraz do przenoszenia danych.',
      'Masz prawo wniesienia sprzeciwu wobec przetwarzania opartego na naszym prawnie uzasadnionym interesie.',
      'Jeżeli przetwarzanie odbywa się na podstawie zgody, masz prawo cofnąć ją w dowolnym momencie. Cofnięcie zgody nie wpływa na zgodność z prawem przetwarzania, którego dokonano przed jej cofnięciem.',
      `Aby skorzystać z powyższych praw, napisz na adres ${studioInfo.email}.`,
      'Przysługuje Ci również prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.',
    ],
    body_en: [
      'You have the right to access your data and to obtain a copy of it.',
      'You have the right to rectify (correct) your data.',
      'You have the right to erasure, to restriction of processing and to data portability.',
      'You have the right to object to processing based on our legitimate interest.',
      'Where processing is based on consent, you may withdraw it at any time. Withdrawal does not affect the lawfulness of processing carried out before the withdrawal.',
      `To exercise these rights, please write to ${studioInfo.email}.`,
      'You also have the right to lodge a complaint with the President of the Personal Data Protection Office, ul. Stawki 2, 00-193 Warsaw, Poland.',
    ],
  },
  {
    title: 'Pliki cookie i technologie śledzące',
    title_en: 'Cookies and tracking technologies',
    body: [
      'Niniejsza strona nie wykorzystuje plików cookie w celach analitycznych, marketingowych ani do śledzenia użytkowników.',
      'Nie korzystamy z narzędzi analitycznych takich jak Google Analytics ani z pikseli śledzących serwisów społecznościowych.',
      'W pamięci lokalnej przeglądarki zapisujemy wyłącznie informację o zamknięciu komunikatu o prywatności, aby nie wyświetlać go ponownie przy kolejnych odwiedzinach. Informacja ta nie jest nam przesyłana i pozostaje wyłącznie na Twoim urządzeniu.',
      'W razie wprowadzenia w przyszłości narzędzi analitycznych niniejsza polityka zostanie zaktualizowana, a ich uruchomienie będzie wymagało Twojej zgody.',
    ],
    body_en: [
      'This website does not use cookies for analytics, marketing or user tracking.',
      'We do not use analytics tools such as Google Analytics, nor social media tracking pixels.',
      'We store in your browser local storage only the fact that you dismissed the privacy notice, so that it is not shown again on subsequent visits. This information is not transmitted to us and remains solely on your device.',
      'Should analytics tools be introduced in the future, this policy will be updated and their activation will require your consent.',
    ],
  },
  {
    title: 'Bezpieczeństwo danych',
    title_en: 'Data security',
    body: [
      'Strona działa w oparciu o szyfrowane połączenie HTTPS.',
      'Stosujemy środki techniczne i organizacyjne odpowiednie do ryzyka, mające chronić dane przed nieuprawnionym dostępem, utratą i zniszczeniem.',
    ],
    body_en: [
      'The website operates over an encrypted HTTPS connection.',
      'We apply technical and organisational measures appropriate to the risk, designed to protect data against unauthorised access, loss and destruction.',
    ],
  },
  {
    title: 'Zmiany polityki prywatności',
    title_en: 'Changes to this policy',
    body: [
      'Politykę możemy aktualizować w związku ze zmianami przepisów lub sposobu działania strony. Aktualna wersja jest zawsze dostępna pod tym adresem.',
      '[DO UZUPEŁNIENIA: data ostatniej aktualizacji dokumentu.]',
    ],
    body_en: [
      'We may update this policy in connection with changes in legislation or in the way the website operates. The current version is always available at this address.',
      '[TO BE COMPLETED: date of the last update of this document.]',
    ],
  },
]

export default function PolitykaPrywatnosciPage({ lang, dict }: Props) {
  const isEn = lang === 'en'
  const base = isEn ? '/en' : ''
  const d = (dict as any).privacy_page

  return (
    <article className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Link href={base || '/'}>{d.home}</Link>
        <span> › </span>
        <span className={styles.breadcrumbCurrent}>{d.title}</span>
      </div>

      <header className={styles.header}>
        <span className={styles.eyebrow}>{d.eyebrow}</span>
        <h1 className={styles.title}>{d.title}</h1>
        <p className={styles.intro}>{d.intro}</p>
      </header>

      <div className={styles.content}>
        {sections.map((section, i) => (
          <section key={section.title} className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNum}>{String(i + 1).padStart(2, '0')}</span>
              {isEn ? section.title_en : section.title}
            </h2>
            {(isEn ? section.body_en : section.body).map((paragraph, j) => (
              <p key={j} className={styles.paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </article>
  )
}
