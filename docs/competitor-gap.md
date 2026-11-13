# Konkurencja i luki — stan odczytu 12.11.2026

Analiza obejmuje publiczne strony i wybrane ścieżki. To nie jest pełny crawl wszystkich domen ani pomiar ich wyników sprzedaży. Wcześniejsze pozycje i szacunki 1700/670/499 wizyt oraz około 258 domen odsyłających do AUTO MIKULSKI **nie zostały niezależnie potwierdzone**. Nie użyto ich jako dowodu skuteczności zmian.

## Exmet — szczegółowe porównanie

Sprawdzono [główną](https://www.exmet.pl/), [złomowanie](https://www.exmet.pl/zlomowanie-samochodu/), [wycenę](https://www.exmet.pl/wycena-zlomowanie-auta/), [części](https://www.exmet.pl/szrot-auto-czesci/) i [kontakt](https://www.exmet.pl/kontakt-auto-zlomowanie/). Te pięć adresów odpowiadało HTTP 200 w odczycie.

| Obszar | Ustalenie | Wniosek dla AUTO MIKULSKI |
| --- | --- | --- |
| Intencja | Główna koncentruje się na auto złomie, dokumentach, transporcie i lokalizacji. Osobne strony odpowiadają na wycenę, złomowanie, części i kontakt. | Klient szukający dokumentu musi od razu dostać właściwą ścieżkę. W v2 wzmocniono istniejący URL demontażu i odnośniki do niego. |
| Zaufanie | Firma podaje fizyczny adres na Trynku, godziny, kontakt do pracowników i deklaruje długi staż oraz uprawnienia. | Potrzebujemy własnych potwierdzonych materiałów, procedury partnera i spójnych danych. Deklaracja konkurenta nie jest naszą weryfikacją jego zezwoleń. |
| Telefon | Numery są klikalne, mają opisy funkcji; kontakt jest powtarzany w treści i stopce. | Nie ma podstaw, aby twierdzić, że Exmet źle obsługuje telefon. U nas zachowano jeden zatwierdzony numer i mobilny pasek kontaktu. |
| Formularz | W odczycie pięciu badanych stron nie znaleziono formularza wyceny. Strona „wycena” opisuje czynniki ceny i rozmowę. | Prawdziwe zgłoszenie ze zdjęciami może być użyteczną różnicą dopiero po uruchomieniu i przetestowaniu backendu. Obecnie mamy kod roboczy, nie działającą przewagę w dostarczaniu formularzy. |
| Treści | Wyjaśnienie dokumentu, transportu i czynników ceny jest bardziej widoczne niż w poprzedniej produkcyjnej ofercie AUTO MIKULSKI. | Dodano role: skup / organizacja stacji / wystawca zaświadczenia / urząd, dokumenty i dalsze czynności. Nie skopiowano obietnic typu „najwięcej” ani automatycznych gwarancji. |
| Metadane i schema | Odczytano canonical i dane LocalBusiness/Organization/WebSite/WebPage. Na wybranych stronach są niedoskonałości nagłówków; w części grafik części samochodowych brakuje alt. | Nie każdy element konkurencji jest lepszy. Własny walidator kontroluje metadane, FAQ i linki zamiast kopiowania ich struktury. |
| Daty | Na stronie wyceny występują różne historyczne oznaczenia dat w treści/metadanych. | To nie dowód nieskuteczności strony. U nas daty i treści powinny wynikać z rzeczywistej aktualizacji, bez fikcyjnych nowych realizacji. |
| Mobilnie | Przy próbce 449 px CSS nie stwierdzono poziomego przepełnienia dokumentu. Duży banner cookies i grafika zajmowały znaczną część bardzo niskiego okna testowego. | Nie jest to test realnego telefonu ani pomiar konwersji. Nasz pasek telefonu i lokalny formularz sprawdzono osobno. |
| Publiczne powiązania | Kontakt publikuje listę marek/partnerów, m.in. Schrott i AutoHouse. | To dowód jawnych odnośników, nie wspólnej własności, PBN ani przyczyny pozycji. Warto wykorzystać prawdziwą współpracę, bez sztucznego zaplecza. |

Publiczne komunikaty o stacji i jej roli nie są w pełni jednoznaczne między wszystkimi zewnętrznymi wpisami Exmetu. Nie sprawdzono rejestrów zezwoleń. Nie należy budować porównania na twierdzeniu „Exmet ma własną stację, a my nie”. Nasz komunikat ma opisywać potwierdzoną rolę AUTO MIKULSKI.

W robots Exmetu znaleziono wskazanie `/wp-sitemap.xml`, które w odczycie zwróciło 404. Nie oznacza to, że nie ma innych map, że domena nie jest indeksowana ani że to tłumaczy jej pozycje.

## Pozostali konkurenci

| Firma / badane źródła | Mocne elementy widoczne w serwisie | Ograniczenia i obserwacje | Praktyczny wniosek |
| --- | --- | --- | --- |
| [skup-aut-gliwice.pl](https://www.skup-aut-gliwice.pl/) | Lokalny title/H1, obszerna prezentacja skupu i procesu, publiczny link do Schrott. | Na głównej brak odnośnika `tel:`. Jedyny znaleziony formularz jest wyszukiwarką GET, nie wyceną. Dwa odczytane adresy `/auto-skup/` i `/wiadomosci-dla-klientow/` zwróciły 404 w tej kontroli. Główna ma układ mieszczący się w 449 px. | Nasza przewaga użytkowa może wynikać z krótszej drogi do telefonu i zgłoszenia. Nie ma danych pozwalających porównać rzeczywistą liczbę klientów. |
| [Auto Skup L.O.M.](https://autoskup-lom.pl/) i [Gliwice](https://autoskup-lom.pl/skup-samochodow-gliwice/) | Rozbudowana architektura usług, miast, poradników i galerii; formularz CF7 na lokalnej stronie. | W źródle głównej nie znaleziono H1. Liczne elementy `form` obejmują także funkcje szablonu motoryzacyjnego; nie są wieloma niezależnymi formularzami wyceny. W badanych formularzach nie widziano pola pliku. Liczników klientów nie weryfikowano. | Rozbudowywać pokrycie potrzeb i prawdziwe przypadki. Nie kopiować liczby URL ani sztucznych liczników. |
| [Schrott](https://www.schrott.pl/) i [Gliwice](https://www.schrott.pl/auto-skup/gliwice/) | Jasne rozdzielenie usług, mocny telefon, dokumenty i lokalne strony; schema i materiał wideo. | W badanych stronach brak formularza. H1 głównej i Gliwic jest taki sam, ale lokalność jest obecna w title/H2. Publiczne linki partnerskie. Próbka 449 px bez poziomego przepełnienia. | Zachować własne unikalne title/H1 i lepszą drogę do opisania konkretnego auta. |
| [AutoHouse — kontakt](https://www.auto-house.pl/kontakt/) i [wycena](https://www.auto-house.pl/wycena-samochodu/) | Formularz POST Everest z kontaktem i treścią zgłoszenia, widoczne dane firmy. | W odczytanym formularzu brak plików. Na kontakcie brak meta description i JSON-LD; część innych żądań miała timeout. To nie dowód trwałej awarii serwisu. | Formularz ma przyjmować zgłoszenie faktycznie; kompletny kod interfejsu jest dopiero częścią tej ścieżki. |
| [KOWCZ / SDP Gliwice](https://sdpgliwice.pl/) i [kasacja](https://sdpgliwice.pl/kasacja_pojazdow/) | Jednoznaczna prezentacja kasacji, dokumentów, kontaktu i transportu; deklaracja uprawnienia S83. | Deklaracji zezwolenia nie zweryfikowano w rejestrze. Prosty serwis: na głównej brak H1/canonical/JSON-LD/odnośnika tel w odczycie. | Własne fakty i procedura mają większą wartość niż powielanie nazw usług. |

Próbkę mobilną czterech głównych domen wykonano w desktopowym Chromium, przy 449 px CSS uzyskanych skalą. Nie badano dotyku, Androida/iOS, realnych połączeń ani wysyłania formularzy konkurencji. W L.O.M. pierwsza próbka z bannerem cookies miała scrollWidth 899 px; po odrzuceniu cookies ponowny odczyt wyniósł 449 px. **Nie klasyfikuję tego jako stałego błędu poziomego przewijania serwisu.**

## Pięć luk i wykonane działania

| Luka | Stan / hipoteza | Co wykonano w v2 | Co nadal jest potrzebne |
| --- | --- | --- | --- |
| Keyword Gap | Exmet mocno odpowiada na dokument, transport i demontaż. Brak danych liczbowych o frazach. | [Mapa fraz](seo-keyword-map.md); skup Gliwice na głównej, demontaż na istniejącej usłudze, laweta jako osobna intencja. | Dane zapytań w późniejszym etapie; potwierdzenie procesu i godzin. |
| Content Gap | Dotychczas brak autentycznych realizacji na stronie i niedopowiedziany proces stacji. | Proces, dokumenty, źródła urzędowe, konkretne usterki, lokalne FAQ; silnik galerii bez wymyślonych wpisów. | Prawdziwe zdjęcia, opis współpracy i własne doświadczenie. |
| Link Gap | Widoczne powiązania branżowe konkurentów; brak pełnego eksportu backlinków. | Ustalono realne źródła/wzmianki i plan w [analizie lokalnej](local-presence-and-links.md). | Zweryfikowany eksport domen/anchorów. Nie ma podstaw do oceny całych 258 domen ani disavow. |
| Local SEO Gap | Własny profil ma już dużą publiczną liczbę opinii, ale nie wszystkie dane są spójne. Same nazwy 65 obszarów nie dowodzą doświadczenia lokalnego. | Bezpośredni odczyt Map, ocena 65 przypisań, brak fikcyjnych oddziałów; formularze z miastem. | Potwierdzić lokal 7, kontakt całodobowy i rzeczywiste zasady obsługi na miejscu; dostarczyć lokalne realizacje. |
| Conversion Gap | Klient musi obecnie wysłać przygotowaną wiadomość ze swojej poczty. | Pełny interfejs i adapter wysyłki, walidacja/zdjęcia/błędy, zachowanie telefonu; poprawione lokalne menu. | Decyzja o usłudze, konfiguracja, informacja o danych i test przyjęcia na rzeczywistym koncie. |

Nie można na podstawie tego audytu przypisać wyższych pozycji Exmetu jednemu czynnikowi ani obiecać ich przejęcia. Największa pozostała różnica jakościowa to własne, weryfikowalne dowody pracy i kompletna działająca ścieżka zgłoszenia. Większa liczba powtarzalnych miast nie zastąpi tych elementów.
