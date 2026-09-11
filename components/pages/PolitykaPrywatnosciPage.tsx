import Link from 'next/link'
import { Dictionary } from '@/lib/dictionaries'
import styles from '@/styles/polityka.module.css'

interface Props {
  lang: string
  dict: Dictionary
}

interface Item {
  text: string
  text_en: string
  sub?: { text: string; text_en: string }[]
}

// UWAGA: dokument oparty na wzorcu przygotowanym przez kancelarie prawna,
// zaadaptowanym do dzialalnosci MT-Projekt Sp. z o.o.
// Dane rejestrowe zweryfikowane z odpisem KRS 0000764092 (api-krs.ms.gov.pl) w dniu 2026-09-11.
// Calosc powinna zostac zweryfikowana przez prawnika przed publikacja.
const items: Item[] = [
  {
    text: 'Administratorem danych osobowych zawartych w Serwisie jest MT-PROJEKT Spółka z ograniczoną odpowiedzialnością z siedzibą w Grójcu, ul. Józefa Piłsudskiego 42A, 05-600 Grójec, wpisana do rejestru przedsiębiorców Krajowego Rejestru Sądowego pod numerem KRS 0000764092, NIP 7972068087, REGON 382132889.',
    text_en: 'The controller of personal data contained in the Website is MT-PROJEKT Spółka z ograniczoną odpowiedzialnością (a limited liability company) with its registered office in Grójec, ul. Józefa Piłsudskiego 42A, 05-600 Grójec, Poland, entered into the register of entrepreneurs of the National Court Register under KRS number 0000764092, tax identification number (NIP) 7972068087, statistical number (REGON) 382132889.',
  },
  {
    text: 'W trosce o bezpieczeństwo powierzonych nam danych opracowaliśmy wewnętrzne procedury i zalecenia, które mają zapobiec udostępnieniu danych osobom nieupoważnionym. Kontrolujemy ich wykonywanie i stale sprawdzamy ich zgodność z odpowiednimi aktami prawnymi – ustawą o ochronie danych osobowych, ustawą o świadczeniu usług drogą elektroniczną, a także wszelkiego rodzaju aktami wykonawczymi i aktami prawa wspólnotowego.',
    text_en: 'In order to safeguard the data entrusted to us, we have developed internal procedures and guidelines intended to prevent the disclosure of data to unauthorised persons. We monitor their implementation and continuously verify their compliance with the relevant legal acts – the Personal Data Protection Act, the Act on Providing Services by Electronic Means, as well as all implementing acts and acts of Community law.',
  },
  {
    text: 'Dane osobowe przetwarzane są na podstawie zgody wyrażanej przez Użytkownika/Klienta oraz w przypadkach, w których przepisy prawa upoważniają Administratora do przetwarzania danych osobowych, na podstawie Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (RODO/GDPR), dalej zwanego „RODO”. W szczególności podstawą faktyczną przetwarzania danych osobowych jest:',
    text_en: 'Personal data is processed on the basis of consent given by the User/Client and in cases where the law authorises the Controller to process personal data, pursuant to Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data, and repealing Directive 95/46/EC (GDPR), hereinafter referred to as the "GDPR". In particular, the factual basis for processing personal data is:',
    sub: [
      {
        text: 'świadczenie usług projektowych i inżynierskich, w tym prowadzenie korespondencji na wskazany przez Klienta numer telefonu lub adres e-mail w celu uzgodnienia zakresu, warunków oraz przebiegu realizacji zlecenia (art. 6 ust. 1 lit. b RODO);',
        text_en: 'the provision of design and engineering services, including correspondence to the telephone number or e-mail address indicated by the Client for the purpose of agreeing the scope, terms and course of performance of the commission (Art. 6(1)(b) GDPR);',
      },
      {
        text: 'udzielenie odpowiedzi na zapytanie przesłane za pośrednictwem formularza kontaktowego lub poczty elektronicznej (art. 6 ust. 1 lit. a oraz lit. f RODO);',
        text_en: 'responding to enquiries sent via the contact form or by e-mail (Art. 6(1)(a) and (f) GDPR);',
      },
      {
        text: 'przeprowadzenie procesu rekrutacji na stanowiska oferowane przez Administratora, w tym rozpatrzenie dokumentów aplikacyjnych przesłanych z inicjatywy kandydata (art. 6 ust. 1 lit. a i lit. b RODO oraz art. 22(1) Kodeksu pracy);',
        text_en: 'conducting recruitment processes for positions offered by the Controller, including the review of application documents submitted on the candidate’s own initiative (Art. 6(1)(a) and (b) GDPR and Art. 22(1) of the Polish Labour Code);',
      },
      {
        text: 'konieczność wypełnienia wymagań podatkowych i rachunkowych, w tym przechowywanie faktur oraz innych dokumentów księgowych (ustawa z dnia 29 września 1994 roku o rachunkowości oraz art. 6 ust. 1 lit. c RODO);',
        text_en: 'the need to fulfil tax and accounting requirements, including the retention of invoices and other accounting documents (the Accounting Act of 29 September 1994 and Art. 6(1)(c) GDPR);',
      },
      {
        text: 'konieczność rozpatrywania oraz przekazywania reklamacji i zgłoszeń kierowanych przez Klientów (art. 6 ust. 1 lit. c i lit. f RODO);',
        text_en: 'the need to examine and forward complaints and notifications submitted by Clients (Art. 6(1)(c) and (f) GDPR);',
      },
      {
        text: 'konieczność rozpatrywania roszczeń kierowanych przez Klientów przeciwko Administratorowi oraz dochodzenie przez Administratora roszczeń przeciwko Klientom (art. 6 ust. 1 lit. c i lit. f RODO).',
        text_en: 'the need to examine claims brought by Clients against the Controller and the pursuit by the Controller of claims against Clients (Art. 6(1)(c) and (f) GDPR).',
      },
    ],
  },
  {
    text: 'Serwis przetwarza dane osobowe w następujący sposób:',
    text_en: 'The Website processes personal data in the following ways:',
    sub: [
      {
        text: 'poprzez dobrowolnie wprowadzone dane osobowe w formularzu kontaktowym, tj. imię i nazwisko, adres e-mail oraz treść wiadomości;',
        text_en: 'through personal data voluntarily entered in the contact form, i.e. name and surname, e-mail address and the content of the message;',
      },
      {
        text: 'poprzez dobrowolnie przesłane dane osobowe zawarte w korespondencji kierowanej na adresy poczty elektronicznej Administratora, w tym w dokumentach aplikacyjnych przesyłanych w związku z ofertami pracy;',
        text_en: 'through personal data voluntarily provided in correspondence sent to the Controller’s e-mail addresses, including application documents submitted in connection with job offers;',
      },
      {
        text: 'poprzez informacje zapisywane w pamięci lokalnej przeglądarki Użytkownika, w zakresie niezbędnym do prawidłowego wyświetlania Serwisu.',
        text_en: 'through information stored in the local storage of the User’s browser, to the extent necessary for the correct display of the Website.',
      },
    ],
  },
  {
    text: 'Serwis zbiera wyłącznie informacje dobrowolnie podane przez Użytkownika.',
    text_en: 'The Website collects only information voluntarily provided by the User.',
  },
  {
    text: 'Podane dane są przetwarzane w celu wynikającym z funkcji konkretnego formularza, tzn. w celu obsługi kontaktu informacyjnego, przygotowania i przedstawienia oferty, zawarcia i realizacji umowy o prace projektowe, przeprowadzenia procesu rekrutacji, rozpatrzenia reklamacji, dochodzenia roszczeń pomiędzy stronami oraz prowadzenia księgowości.',
    text_en: 'The data provided is processed for the purpose arising from the function of the particular form, i.e. handling informational contact, preparing and presenting an offer, concluding and performing a design services contract, conducting recruitment processes, examining complaints, pursuing claims between the parties and maintaining accounting records.',
  },
  {
    text: 'W związku z przetwarzaniem przez Administratora danych osobowych, podmiotom, których dane osobowe są przetwarzane, przysługuje prawo dostępu do treści danych na podstawie art. 15 RODO, prawo do sprostowania danych na podstawie art. 16 RODO, prawo do usunięcia danych na podstawie art. 17 RODO, prawo do ograniczenia przetwarzania danych na podstawie art. 18 RODO, prawo do przenoszenia danych na podstawie art. 20 RODO oraz prawo do wniesienia sprzeciwu wobec przetwarzania danych na podstawie art. 21 RODO. W zakresie, w jakim przetwarzanie odbywa się na podstawie zgody, przysługuje również prawo do jej cofnięcia w dowolnym momencie, bez wpływu na zgodność z prawem przetwarzania dokonanego przed cofnięciem zgody.',
    text_en: 'In connection with the processing of personal data by the Controller, data subjects have the right of access to their data pursuant to Art. 15 GDPR, the right to rectification pursuant to Art. 16 GDPR, the right to erasure pursuant to Art. 17 GDPR, the right to restriction of processing pursuant to Art. 18 GDPR, the right to data portability pursuant to Art. 20 GDPR and the right to object to processing pursuant to Art. 21 GDPR. To the extent that processing is based on consent, the data subject also has the right to withdraw it at any time, without affecting the lawfulness of processing carried out before the withdrawal.',
  },
  {
    text: 'Podmiotom, których dane osobowe są przetwarzane, przysługuje prawo do wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.',
    text_en: 'Data subjects have the right to lodge a complaint with the President of the Personal Data Protection Office, ul. Stawki 2, 00-193 Warsaw, Poland.',
  },
  {
    text: 'Dane osobowe będą przechowywane odpowiednio: w celu udzielenia odpowiedzi na zapytanie przesłane za pośrednictwem formularza kontaktowego lub poczty elektronicznej – przez okres 12 miesięcy od zakończenia korespondencji; w celu przeprowadzenia procesu rekrutacji – do czasu jego zakończenia, a w przypadku wyrażenia odrębnej zgody na udział w przyszłych rekrutacjach – przez okres 12 miesięcy od zakończenia rekrutacji, nie dłużej jednak niż do chwili cofnięcia zgody; w celu przechowywania dokumentacji księgowej – przez okres 5 lat od końca roku kalendarzowego, w którym powstał obowiązek podatkowy; w celu dochodzenia roszczeń pomiędzy stronami – przez okres przedawnienia roszczeń.',
    text_en: 'Personal data will be retained as follows: for the purpose of responding to an enquiry sent via the contact form or by e-mail – for a period of 12 months from the end of the correspondence; for the purpose of conducting a recruitment process – until its completion and, where separate consent to participate in future recruitment processes has been given, for a period of 12 months from the end of the recruitment process, but no longer than until the consent is withdrawn; for the purpose of retaining accounting records – for a period of 5 years from the end of the calendar year in which the tax obligation arose; for the purpose of pursuing claims between the parties – for the limitation period applicable to such claims.',
  },
  {
    text: 'Dane udostępnione przez Klientów będą podlegały udostępnieniu następującym podmiotom trzecim:',
    text_en: 'Data provided by Clients may be disclosed to the following third parties:',
    sub: [
      {
        text: 'podmiotom obsługującym i utrzymującym system informatyczny Administratora, w szczególności dostawcy usług hostingowych Serwisu oraz dostawcy systemu zarządzania treścią Serwisu;',
        text_en: 'entities operating and maintaining the Controller’s IT systems, in particular the Website hosting provider and the provider of the Website content management system;',
      },
      {
        text: 'dostawcy usług poczty elektronicznej, za pośrednictwem którego Administrator prowadzi korespondencję;',
        text_en: 'the e-mail service provider through which the Controller conducts correspondence;',
      },
      {
        text: 'podmiotom współpracującym z Administratorem przy realizacji prac projektowych oraz pozostałych świadczonych usług;',
        text_en: 'entities cooperating with the Controller in the performance of design work and other services provided;',
      },
      {
        text: 'podmiotom współpracującym z nami przy obsłudze spraw księgowych, podatkowych i prawnych – w zakresie, w jakim staną się administratorem danych;',
        text_en: 'entities cooperating with us in accounting, tax and legal matters – to the extent that they become controllers of the data;',
      },
      {
        text: 'podmiotom świadczącym działalność pocztową lub kurierską;',
        text_en: 'entities providing postal or courier services;',
      },
      {
        text: 'sądom lub innym organom państwowym na podstawie postanowienia sądu, żądania organów ścigania lub innej wiążącej podstawie prawnej.',
        text_en: 'courts or other state authorities on the basis of a court order, a request from law enforcement authorities or another binding legal basis.',
      },
    ],
  },
  {
    text: 'Dane udostępnione przez Klienta nie będą podlegały profilowaniu ani zautomatyzowanemu podejmowaniu decyzji.',
    text_en: 'Data provided by the Client will not be subject to profiling or automated decision-making.',
  },
  {
    text: 'Korzystanie przez Administratora z usług dostawców infrastruktury informatycznej, w szczególności dostawcy usług hostingowych Serwisu, może wiązać się z przekazywaniem danych osobowych do państwa trzeciego, w szczególności na terytorium Stanów Zjednoczonych. W takim przypadku przekazanie następuje wyłącznie na podstawie mechanizmów przewidzianych w rozdziale V RODO, tj. decyzji Komisji Europejskiej stwierdzającej odpowiedni stopień ochrony, w tym w ramach programu EU-US Data Privacy Framework, albo standardowych klauzul umownych przyjętych przez Komisję Europejską.',
    text_en: 'The Controller’s use of IT infrastructure providers, in particular the Website hosting provider, may involve the transfer of personal data to a third country, in particular to the territory of the United States. In such a case, the transfer takes place solely on the basis of the mechanisms provided for in Chapter V of the GDPR, i.e. an adequacy decision of the European Commission, including under the EU-US Data Privacy Framework, or Standard Contractual Clauses adopted by the European Commission.',
  },
  {
    text: 'Ponadto, pod warunkiem uzyskania zgody Klienta w tym zakresie, jego dane osobowe będą mogły być wykorzystywane, z zachowaniem wszelkich jego praw, do celów informowania Klienta za pośrednictwem poczty elektronicznej lub telefonicznie o usługach świadczonych przez MT-Projekt Sp. z o.o. oraz o jej ofertach.',
    text_en: 'Furthermore, subject to obtaining the Client’s consent in this respect, their personal data may be used, with all their rights preserved, for the purpose of informing the Client by e-mail or by telephone about the services provided by MT-Projekt Sp. z o.o. and about its offers.',
  },
  {
    text: 'W związku z prawem do wglądu, zmiany oraz usunięcia danych osobowych, a także możliwością sprzeciwienia się ich przetwarzaniu, prawo to Klient może zrealizować w każdym czasie, kontaktując się:',
    text_en: 'In connection with the right to access, rectify and erase personal data, as well as the possibility to object to its processing, the Client may exercise these rights at any time by contacting us:',
    sub: [
      {
        text: 'listownie, na adres: MT-PROJEKT Sp. z o.o., ul. Józefa Piłsudskiego 42A, 05-600 Grójec;',
        text_en: 'by post, to the address: MT-PROJEKT Sp. z o.o., ul. Józefa Piłsudskiego 42A, 05-600 Grójec, Poland;',
      },
      {
        text: 'telefonicznie, w dni robocze w godzinach 8:00–16:00, pod numerem telefonu +48 732 707 800;',
        text_en: 'by telephone on working days between 8:00 and 16:00 (Polish time), on +48 732 707 800;',
      },
      {
        text: 'pisząc na adres e-mail: biuro@mt-p.pl;',
        text_en: 'by writing to the e-mail address: biuro@mt-p.pl;',
      },
      {
        text: 'na adres do doręczeń elektronicznych: AE:PL-12056-90342-WDIAT-06.',
        text_en: 'to the electronic delivery address: AE:PL-12056-90342-WDIAT-06.',
      },
    ],
  },
  {
    text: 'Zastrzegamy sobie prawo do zmiany w polityce ochrony prywatności Serwisu, na którą może wpłynąć rozwój technologii internetowej, ewentualne zmiany prawa w zakresie ochrony danych osobowych oraz rozwój naszego serwisu internetowego. O wszelkich zmianach będziemy informować w sposób widoczny i zrozumiały.',
    text_en: 'We reserve the right to amend the Website privacy policy, which may be affected by developments in internet technology, possible changes in personal data protection law and the development of our website. We will communicate any changes in a visible and comprehensible manner.',
  },
  {
    text: 'W Serwisie mogą pojawiać się linki do innych stron internetowych. Takie strony internetowe działają niezależnie od Serwisu i nie są w żaden sposób nadzorowane przez serwis www.mt-p.pl. Strony te mogą posiadać własne polityki dotyczące prywatności oraz regulaminy, z którymi zalecamy się zapoznać.',
    text_en: 'The Website may contain links to other websites. Such websites operate independently of the Website and are in no way supervised by www.mt-p.pl. These websites may have their own privacy policies and terms of use, which we recommend reviewing.',
  },
  {
    text: 'Serwis nie wykorzystuje plików cookies w celach analitycznych, marketingowych ani w celu śledzenia aktywności Użytkowników. Administrator nie korzysta z narzędzi analitycznych ani z pikseli śledzących serwisów społecznościowych. W pamięci lokalnej przeglądarki Użytkownika zapisywana jest wyłącznie informacja o zamknięciu komunikatu o prywatności, w celu uniknięcia jego ponownego wyświetlania przy kolejnych odwiedzinach; informacja ta nie jest przekazywana Administratorowi i pozostaje wyłącznie na urządzeniu Użytkownika. Użytkownik może w każdej chwili usunąć te dane w ustawieniach swojej przeglądarki. W przypadku wdrożenia w przyszłości narzędzi analitycznych lub marketingowych niniejsza Polityka zostanie zaktualizowana, a ich uruchomienie zostanie poprzedzone uzyskaniem zgody Użytkownika.',
    text_en: 'The Website does not use cookies for analytical or marketing purposes, nor to track User activity. The Controller does not use analytics tools or social media tracking pixels. Only information about the dismissal of the privacy notice is stored in the local storage of the User’s browser, in order to avoid displaying it again on subsequent visits; this information is not transmitted to the Controller and remains solely on the User’s device. The User may delete this data at any time in their browser settings. Should analytical or marketing tools be implemented in the future, this Policy will be updated and their activation will be preceded by obtaining the User’s consent.',
  },
  {
    text: 'Wszelkie pytania związane z przetwarzaniem przez nas danych osobowych można kierować w sposób określony w pkt 14 niniejszej Polityki Prywatności.',
    text_en: 'Any questions relating to our processing of personal data may be directed in the manner set out in point 14 of this Privacy Policy.',
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

      <ol className={styles.list}>
        {items.map((item, i) => (
          <li key={i} className={styles.item}>
            <span className={styles.itemText}>{isEn ? item.text_en : item.text}</span>
            {item.sub && (
              <ol className={styles.subList}>
                {item.sub.map((s, j) => (
                  <li key={j} className={styles.subItem}>
                    {isEn ? s.text_en : s.text}
                  </li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ol>

      {isEn && <p className={styles.binding}>{d.binding}</p>}
    </article>
  )
}
