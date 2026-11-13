# SEO v2 — propozycja do sprawdzenia, bez publikacji

> Aktualizacja zakresu 13.11.2026: właściciel potwierdził brak osobnych usług pomocy drogowej/transportu oraz brak usług całodobowych. Opisy wcześniejszego wariantu są historyczne. Bieżący zakres, nowe testy i gotowość opisuje [końcowy przegląd](final-release-review.md).

> Ten dokument zachowuje raport **pierwszej, wcześniejszej części v2** (commit 32dd900). Po późniejszym poleceniu kompleksowej modernizacji rozszerzono formularz, CSS, wszystkie 20 stron i dokumentację. Aktualny pełny zakres, testy, stan backendu i decyzje są w [raporcie końcowym v2](seo-v2-final-report.md). Poniższych stwierdzeń „nie zmieniano CSS/JS/formularza” nie należy odnosić do późniejszej części prac.

Data: 12 listopada 2026, Europe/Warsaw. Repozytorium: `mikulskigliwice/automikulski`.

**Wszystkie opisane niżej zmiany strony są robocze. Produkcja i backup pozostają na `a79e402528cc0e9f5ce5ce5e4b28c303f1d8bcf0`. Zgoda na przygotowanie gałęzi nie jest zgodą na publikację.**

## 1. Zabezpieczenie przed rozpoczęciem

- Produkcyjny SHA: `a79e402528cc0e9f5ce5ce5e4b28c303f1d8bcf0`.
- Drzewo plików: `d007df7d90c08cf9480100f6504a6b925354c6de`.
- Gałąź backupowa: https://github.com/mikulskigliwice/automikulski/tree/backup-przed-seo-2026-11-12
- Gałąź robocza: https://github.com/mikulskigliwice/automikulski/tree/seo-rozbudowa-v2
- ZIP: `Backup_AUTOMIKULSKI_2026-11-12_a79e402.zip`, 993748 bajtów, 40 plików repozytorium i pełna historia osiągalna z produkcji: 171 commitów.
- SHA-256 ZIP: `78421ccd2873415014994db06c352372f4d85e46f4f5653030741aac1fc3c62b`.
- ZIP sprawdzony przez CRC i porównanie każdego pliku z blobem Git; przeprowadzono niezależne odtworzenie z Git bundle i `git fsck --full`.
- Instrukcja odtworzenia znajduje się w ZIP jako `PRZYWRACANIE.md`. Przywracanie odbywa się przez nowy commit i przegląd na gałęzi ratunkowej, bez force-push ani kasowania historii.

Archiwum obejmuje pliki repozytorium. Nie jest kopią kont Google, DNS ani infrastruktury zewnętrznego hostingu obrazów.

## 2. Wykryte problemy i zakres propozycji

| Priorytet | Problem | Przygotowane rozwiązanie | Stan |
| --- | --- | --- | --- |
| Wysoki | Oferta skupu do złomowania nie wykorzystuje potwierdzonej współpracy ze stacją | Jasna informacja o organizacji przekazania pojazdu i zaświadczeniu wystawianym przez stację | Propozycja w dwóch istniejących stronach, wymaga przeglądu właściciela |
| Wysoki | Aktualny formularz wymaga wysłania wiadomości we własnej poczcie | Porównanie wariantów prawdziwego backendu w punkcie 6 | Brak wdrożenia i brak dodatkowych kosztów |
| Średni | Dotychczasowy test canonical sprawdzał dowolny fragment href; poprawny link w menu mógł zamaskować błędny canonical | Kontrola dokładnie jednego linku rel=canonical, zgodności z mapą i siedem testów wykrywających błędne przypadki | Gotowe na gałęzi roboczej |
| Średni | Tytuł Open Graph strony głównej nadal zawierał starszy slogan | Dopasowanie og:title do istniejącego tytułu SEO; aktualizacja opisów o potwierdzoną ofertę | Gotowe na gałęzi roboczej |
| Średni | Część linków z głównych stron kierowała bezwzględnie na produkcję, co wyprowadzało użytkownika z podglądu | Wewnętrzne odnośniki względne, bez zmiany URL docelowych na produkcji | Gotowe na gałęzi roboczej |
| Średni | Dokumentacja nadal prosiła o potwierdzenie potwierdzonego już telefonu | Zapis potwierdzenia numeru 517 936 676 | Gotowe na gałęzi roboczej |

Nie tworzono nowych miast, adresów URL, oddziałów, opinii ani realizacji. Nie usuwano plików. Nie zmieniano istniejącego JS formularza, analityki, CSS, mapy, robots.txt ani numeru telefonu.

## 3. Porównanie z produkcją

| Element | Produkcja / backup | Propozycja v2 |
| --- | --- | --- |
| H1 strony głównej | Skup aut Gliwice i Śląsk. | Bez zmiany |
| Tytuł strony głównej | Skup aut Gliwice i Śląsk — odbiór auta / Auto Mikulski | Bez zmiany |
| Pierwszy opis oferty | Zakup na umowę i odbiór | Zakup, odbiór i możliwość organizacji przekazania do współpracującej stacji |
| Informacja o zaświadczeniu na stronie głównej | Brak wyodrębnionej sekcji | Osobna sekcja wyjaśniająca rolę stacji i wcześniejsze ustalenie potrzeb |
| URL oferty aut do złomowania | /skup-aut-do-zlomowania-gliwice/ | Bez zmiany |
| Tytuł oferty | Skup aut do złomowania Gliwice — umowa / Auto Mikulski | Złomowanie aut Gliwice — organizacja i odbiór / Auto Mikulski |
| H1 oferty | Auto do złomowania? Porozmawiajmy o skupie. | Złomowanie aut Gliwice i Śląsk. |
| Wyjaśnienie formalności | Ogólne rozróżnienie skupu i zaświadczenia | Trzy kroki rozmowy oraz rozróżnienie sprzedaży, dokumentu stacji i wyrejestrowania przez urząd |
| Wystawca zaświadczenia | Niepotwierdzony sposób dalszego postępowania | Wyraźnie wskazana uprawniona stacja; AUTO MIKULSKI jako organizator przekazania |
| FAQ i JSON-LD | Starszy opis zakresu | Spójne z proponowaną widoczną treścią |
| Formularz | Lokalny draft i mailto | Bez zmiany; nadal nie wysyła zgłoszenia przez serwer |
| Mapa witryny | 20 URL | Bez zmiany, nadal 20 URL |

Właściciel potwierdził współpracę ze stacją i możliwość zorganizowania zaświadczenia. Nie dopisano nazwy stacji, ceny, terminu dokumentu, darmowego transportu ani automatycznego wydawania zaświadczenia przy każdym zakupie. Wersja nie przedstawia AUTO MIKULSKI jako stacji demontażu lub wystawcy zaświadczenia.

Podstawowe rozróżnienie formalności sprawdzono w oficjalnym źródle: https://www.gov.pl/web/gov/wyrejestruj-pojazd. Nie opracowano jeszcze szczegółowej firmowej procedury, ponieważ wymaga informacji od właściciela.

## 4. Pliki objęte propozycją

Zmodyfikowane:
- `index.html` — opis oferty, sekcja stacji, FAQ, metadane i JSON-LD, względne linki wewnętrzne.
- `skup-aut-do-zlomowania-gliwice/index.html` — tytuł i H1, opisy organizacji, sekcja formalności, FAQ i JSON-LD, linki; poprawiona czytelność noty źródłowej na ciemnym tle.
- `llms.txt` — rzeczowy opis potwierdzonej współpracy; bez instrukcji manipulujących odpowiedziami modeli.
- `scripts/validate-site.mjs` — rzeczywista kontrola canonicali, unikalności tytułów/opisów, og:url, adresów WebPage, FAQ, starych noindex i bezpiecznej nawigacji podglądu.
- `docs/seo-maintenance.md` — potwierdzenie telefonu, zakres współpracy i zakaz publikacji bez zgody.

Nowe:
- `scripts/test-site-validation.mjs` — siedem regresji uruchamianych na odizolowanej kopii testowej; nie modyfikuje produkcji ani plików źródłowych.
- `docs/seo-v2-review.md` — ten raport i dalsze decyzje.

Usunięte pliki: 0. Nowe publiczne podstrony: 0. Nowe usługi zewnętrzne i płatności: 0.

## 5. Kontrole i ograniczenia weryfikacji

Kontrole automatyczne:
1. `node scripts/validate-site.mjs`: 20 stron, właściwe znaczniki canonical, unikalne title i description, og:url, JSON-LD, FAQ, cele odnośników, kotwice, osiągalność ze strony głównej, noindex starych HTML.
2. `node scripts/test-site-validation.mjs`: poprawna kopia przechodzi; błędny/brakujący/podwójny canonical, powielony tytuł, powielony opis, błędny og:url i wyjście linkiem z podglądu na produkcję są wykrywane. Testy korzystają z własnego katalogu tymczasowego.
3. `node scripts/test-contact-analytics.mjs`: dotychczasowy pomiar po zgodzie, wycofanie zgody, brak wartości formularza w zdarzeniach i rozróżnienie draftu od dostarczonego zgłoszenia.
4. `git diff --check`.

Kontrola przeglądarkowa w wewnętrznym podglądzie:
- Szerokości dokumentu 337, 449 i 1348 pikseli CSS. Nie stwierdzono poziomego przepełnienia strony głównej i oferty złomowania.
- Przy wąskim układzie widoczne menu i stały pasek kontaktu; menu rozwija się, przejście do kontaktu zamyka je i pozostaje w podglądzie.
- Błędny numer `abc` blokuje przygotowanie wiadomości.
- Poprawne testowe dane generują draft, mailto i wyraźny komunikat, że wiadomość nie została wysłana.
- Kopiowanie wiadomości działa.
- FAQ otwiera właściwą odpowiedź o wystawcy zaświadczenia.
- Numer odnośników do telefonu pozostaje +48517936676.
- W odczytanych logach nie było błędów pochodzących z zasobów strony; występował szum z rozszerzenia środowiska przeglądarkowego, nieprzypisany kodowi strony.
- Użyto wyłącznie fikcyjnych danych testowych. Nie wysłano e-maila, SMS-a ani zgłoszenia do zewnętrznego systemu.

Weryfikacja szerokości odbyła się w przeglądarce desktopowej przy zmianie skali. Nie jest to test rzeczywistego Androida/iOS ani emulacja dotyku. Narzędzia deweloperskie były zablokowane przez środowisko; nie obchodzono blokady.

PageSpeed Insights dla mobile i desktop zwrócił HTTP 429. Brak wyniku Lighthouse, CrUX, LCP, INP i CLS. Nie twierdzę, że wydajność lub Core Web Vitals poprawiły się. Ostatecznego testu rzeczywistych urządzeń i pomiaru wydajności nie należy zastępować wynikiem walidatora HTML.

## 6. Prawdziwy formularz — konkretne warianty do osobnej decyzji

GitHub Pages pozostaje hostingiem strony. Backend formularza byłby oddzielną usługą; nie wymaga przenoszenia witryny.

**Wariant A: gotowa obsługa formularza, np. Formspree.** Według oficjalnego cennika odczytanego 12.11.2026 plan Personal kosztuje 15 USD miesięcznie albo 120 USD za rok przy płatności rocznej, obejmuje 200 zgłoszeń miesięcznie i 1 GB miejsca na pliki. Free nie obejmuje zdjęć. Przed wyborem trzeba potwierdzić warunki rozliczenia, wymagania firmy, przetwarzanie danych i rzeczywiste limity. Nie utworzono konta, nie aktywowano planu, nie przekazano danych klientów. Źródła: https://formspree.io/plans oraz https://help.formspree.io/articles/building-your-form/file-uploads/ .

**Wariant B: własny mały backend poza GitHub Pages.** Daje kontrolę nad przyjmowaniem zgłoszeń i zdjęciami, ale wymaga zatwierdzonego konta/usługi, serwerowej wysyłki powiadomień, ochrony przed spamem, limitów, retencji i obsługi błędów. Nie obiecuję bezpłatności bez weryfikacji konkretnego wariantu. Nie utworzono żadnej infrastruktury.

Docelowo komunikat powinien potwierdzać przyjęcie przez backend, a nie deklarować dostarczenia e-maila bez dowodu. Zdarzenie nowego dostarczonego zgłoszenia musi być odrębne od `valuation_draft`; w analityce nie wolno umieszczać telefonu, danych auta ani zdjęć klienta.

Do decyzji: wybór usługi/kosztów, adres odbiorczy (obecnie publiczny kontakt to automikulski@gmail.com), zakres danych i zdjęć oraz informacje o przetwarzaniu i czasie przechowywania. Sekrety pozostają po stronie serwera. Obecnego formularza nie zastąpiono atrapą wysyłki.

## 7. Mapa intencji, konkurencja i następne treści

Mapa głównych intencji:
- `/`: skup aut / skup samochodów Gliwice, firma i zasięg.
- `/skup-aut-uszkodzonych-gliwice/`: auta uszkodzone i powypadkowe, sprzedaż mimo usterek.
- `/skup-aut-do-zlomowania-gliwice/`: organizacja przekazania auta do stacji, złomowanie, dokumenty. Wzmocnienie istniejącej strony zamiast tworzenia kolejnego konkurującego adresu pod tę samą intencję.
- 13 istniejących stron miast: skup + nazwa miasta; dzielnice jako obszary odbioru, bez osobnych fikcyjnych oddziałów.
- `/pomoc-drogowa-laweta-gliwice/`: transport; występująca tam deklaracja 24h wymaga potwierdzenia przez właściciela. Nie zmieniono jej teraz.
- Trzy istniejące poradniki: przygotowanie wyceny, czynniki ceny i przygotowanie odbioru. Nie utworzono ich duplikatów.

Odczytano strony główne czterech konkurentów i ich publiczną nawigację. To wstępna analiza, a nie pełny crawl wszystkich ich URL lub potwierdzenie miejsc w Google:
- Exmet: wyraźnie przedstawia demontaż, dokument, lokalizację i kontakt. Nie zweryfikowano uprawnień ani rzeczywistego ruchu.
- skup-aut-gliwice.pl: rozbudowana treść o procesie i powiązanie z partnerem Schrott; w odczytanej stronie głównej brak bezpośredniego linku tel. Nie należy zakładać lepszej konwersji niż u nas.
- Autoskup L.O.M.: rozbudowana architektura usług i miast, blog, galeria i formularze. Liczba elementów form nie oznacza liczby formularzy wyceny; mogą obejmować wyszukiwarki i inne funkcje. Liczniki przedstawiane na stronie są deklaracjami firmy.
- Schrott: wyraźna oferta skupu i złomowania, kilka stron lokalnych, nacisk na telefon i formalności.

Źródła: https://www.exmet.pl/ , https://www.skup-aut-gliwice.pl/ , https://autoskup-lom.pl/ , https://www.schrott.pl/ . Brak potwierdzonych danych o ich ruchu, klientach, backlinkach i aktualnych lokalnych pozycjach. Wartości 1700/670/499 z wcześniejszego narzędzia nie zostały niezależnie potwierdzone i nie służą do obliczania efektu tych zmian.

Znaleziono również publiczne wpisy AUTO MIKULSKI w katalogach. Potwierdzają obecność marki, ale nie zastępują bezpośredniej kontroli Profilu Firmy Google. Nie przeniesiono do witryny ich ocen, liczby opinii, godzin ani dodatkowego numeru lokalu. Nie edytowano wizytówek.

Kolejne treści: szczegółowy proces demontażu po potwierdzeniu procedury stacji, dokumenty i współwłaściciele na podstawie aktualnych źródeł, rzeczywiste realizacje z Gliwic i najważniejszych miast. Nie dopisywać cenników, czasów przyjazdu ani lokalnych zdjęć bez materiałów właściciela.

Link building: najpierw inwentaryzacja istniejących wpisów i spójności danych, potem propozycje rzeczywistej współpracy z warsztatami i lokalnymi publikacjami. Nie kontaktowano osób trzecich, nie kupowano linków i nie tworzono nowych katalogowych wpisów.

## 8. Granica zatwierdzenia i dalsza praca

Przygotowany zakres wymaga sprawdzenia przez właściciela przed jakąkolwiek zmianą `main`. Szczególnie trzeba zaakceptować nowy opis roli firmy przy demontażu i dokumentach.

Do doprecyzowania przed szczegółową procedurą: nazwa współpracującej stacji, kto zawiera umowę i przyjmuje pojazd w tej ścieżce, wymagane dokumenty oraz sposób/termin przekazania zaświadczenia. Nie dopisano tych nieznanych zasad do strony.

Search Console i OpenSEO nadal odłożone. Nie wymaga się podłączania ich teraz. Plan pomiaru: wejście organiczne → kliknięcie kontaktu → dostarczone zapytanie / odebrana rozmowa → zakup samochodu. Nie ma jeszcze danych potwierdzających wzrost pozycji, ruchu ani sprzedaży.

Przed publikacją trzeba ponownie sprawdzić aktualny `main`, porównać zmiany i wyniki kontroli oraz uzyskać jednoznaczną zgodę. Jeśli w międzyczasie pojawi się cudzy commit, nie nadpisywać go ani nie używać force-push. Nie zmieniać backupu, hostingu, domeny, DNS, uprawnień ani innych repozytoriów.
