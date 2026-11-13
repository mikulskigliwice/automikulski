# AUTO MIKULSKI — skup i organizacja złomowania

**GOTOWE DO ZATWIERDZENIA.** Wersja robocza; bez scalenia i bez publikacji.

Stan wyjściowy: `334572b9820d42899832933b42fb20e8445d8b76` na `main`, już opublikowany przez GitHub Pages (udane wdrożenie: https://github.com/mikulskigliwice/automikulski/actions/runs/43443243219). Na starcie nie było otwartych PR. Prace wykonano na `skup-i-zlomowanie-dwa-filary`. Nowy punkt przywracania `backup-przed-dwoma-uslugami-2026-11-13` wskazuje commit wyjściowy. Wcześniejsze backupy pozostawiono bez zmian. Data kontroli: 13.11.2026.

## Co zmieniono i dlaczego

| Element | Przed | Po |
|---|---|---|
| Główne menu | 0/20 stron z pozycją „Złomowanie” | 20/20; osobne „Skup aut” i „Złomowanie” |
| Pierwszy ekran strony głównej i 13 miast | Przewaga komunikatu o skupie | Obie usługi w H1; para równych przycisków oraz jasna rola stacji |
| Zgłoszenie | Wybór usługi głównie w formularzu | Przyciski ustawiają istniejące wartości `skup` / `demontaz`; zmiana intencji unieważnia poprzedni szkic |
| Istniejąca strona złomowania | Poprawne informacje, część sekcji wspólnych skupiona na zakupie | Wyraźny odbiorca usługi, organizacja procesu, kontakt, dodatkowe FAQ o różnicy między skupem i demontażem |
| 13 miast | Dobre, odrębne lokalne akapity | Zachowane; dodany po jednym indywidualnym objaśnieniu złomowania z linkiem do istniejącej strony |
| SEO | Metadane miast koncentrowały się na skupie | Spójne title, description, Open Graph i WebPage; osobno opisane rzeczywiste usługi |

Firma organizuje przekazanie pojazdu do uprawnionej stacji; to stacja przyjmuje samochód i wydaje zaświadczenie. Nie dodano nazwy stacji, uprawnień, oddziałów, opinii, terminów ani gwarancji dokumentów. Własna laweta nadal dotyczy odbioru aut kupowanych przez firmę. Nie dodano pomocy drogowej, transportu na zlecenie ani obsługi 24h. Telefon `517 936 676`, e-mail, adres kontaktowy i działalność od 2013 roku zachowano.

Nowy mały plik `assets/service-intents.js` łączy przyciski z istniejącym formularzem, wywołując jego zdarzenie zmiany. Nie wysyła danych ani nie dodaje analityki. Drobne reguły CSS zapewniają równą prezentację obu wyborów i mieszczące się nagłówki. Treść szablonu i skrypt synchronizacji zmieniono wyłącznie dla jasnych nazw obu usług. `llms.txt` opisuje te same fakty; nie traktujemy go jako wymogu ani gwarancji widoczności w AI.

## Kontrole i ich granice

- Sześć skryptów projektu: `validate-site.mjs`, `test-site-validation.mjs` (19 przypadków regresyjnych), `test-contact-analytics.mjs`, `test-valuation.mjs`, `test-realizations.mjs`, nowy `test-service-intents.mjs` — wszystkie PASS. `git diff --check` — PASS. Ponowna synchronizacja formularzy nie zmieniła plików.
- Chrome: 20 adresów × 2 szerokości CSS (375 i 1280 px) = 40 poprawnych przypadków; dodatkowo 5 przypadków przy 320, 760 i 1000 px. To widoki w ramce przeglądarki, nie fizyczny telefon; obszar treści był o 15 px węższy z powodu paska przewijania.
- W każdym z 45 przypadków: menu, brak poziomego przepełnienia, przyciski obu usług, wszystkie FAQ, e-mail dla złomowania i skupu, unieważnienie starego szkicu, zgodne linki telefoniczne. Cztery potrzeby klienta sprawdzono przez stany: sprawny, po kolizji, awaria silnika, niekompletny/do demontażu. Nie wykonywano telefonów ani nie wysyłano wiadomości.
- Osobno: rzeczywiste przejścia menu do obu usług i formularz awaryjny bez głównego modułu wyceny — PASS. W zebranych logach brak ostrzeżeń/błędów pochodzących ze strony; odfiltrowano 485 komunikatów rozszerzenia Chrome.
- Statyczna kontrola 20 HTML: canonical, pojedynczy H1, index, Schema/FAQ oraz 842 wewnętrzne odsyłacze z kotwicami — PASS. Wszystkie 14 lokalnych zasobów odnaleziono; podgląd ma identyczne pliki. FAQ porównano także po normalizacji białych znaków przy linkach i interpunkcji; treść 13 miejskich FAQ nie została zmieniona.
- HTML przeanalizowano bez wykonywania JavaScript: treści i linki nawigacji istnieją w źródle; dostępny jest kontakt telefon/e-mail i komunikat noscript. Nie wykonano osobnej sesji przeglądarki z całkowicie wyłączonym JS. Bezpośredni HTTP do zarządzanego podglądu z terminala był niedostępny; nie podajemy dla niego zmyślonych kodów HTTP ani testu Googlebota. Wszystkie 20 tras otwarto w podglądzie przeglądarkowym. Przed zmianami produkcyjne 20/20 adresów miało HTTP 200 i odpowiadało `main`.
- Próba Lighthouse: błąd „waiting for dynamic debugging port in chrome-err.log”, bez wyniku. Dwie próby PageSpeed dla obecnej produkcji: HTTP 429, limit API. Brak nowych ocen laboratoryjnych i danych terenowych Core Web Vitals.
- Bitowo identyczne z bazą: `assets/site.js` (GA4 `G-2TNQWT3SF9`), `assets/valuation.js`, `assets/form-config.js`, `robots.txt`, `sitemap.xml`, `CNAME`, `data/realizations.json`. Nie zmieniono URL, canonicali, obrazów, konfiguracji hostingu ani kont. Nie usunięto żadnego pliku.

## Wszystkie 20 adresów

Poniżej wyniki wersji roboczej, nie nowej produkcji. „FAQ zgodne” oznacza zgodność tekstu widocznego z JSON-LD. Podobieństwo dotyczy średniej danego miasta względem pozostałych 12, a nie porównania słowo w słowo starej i nowej wersji.

| Ścieżka | Mobile / desktop | FAQ: liczba / zgodność | Podobieństwo lokalne przed → po |
|---|---|---|---|
| `/` | OK / OK | 6 / zgodne | — |
| `/skup-aut-bytom/` | OK / OK | 6 / zgodne | 17,59% → 16,42% |
| `/skup-aut-chorzow/` | OK / OK | 6 / zgodne | 17,43% → 16,20% |
| `/skup-aut-katowice/` | OK / OK | 6 / zgodne | 17,25% → 16,05% |
| `/skup-aut-knurow/` | OK / OK | 6 / zgodne | 17,31% → 16,15% |
| `/skup-aut-pyskowice/` | OK / OK | 6 / zgodne | 17,56% → 16,33% |
| `/skup-aut-ruda-slaska/` | OK / OK | 6 / zgodne | 17,22% → 16,05% |
| `/skup-aut-siemianowice-slaskie/` | OK / OK | 6 / zgodne | 17,31% → 16,06% |
| `/skup-aut-swietochlowice/` | OK / OK | 6 / zgodne | 17,34% → 16,09% |
| `/skup-aut-tarnowskie-gory/` | OK / OK | 6 / zgodne | 16,79% → 15,69% |
| `/skup-aut-zabrze/` | OK / OK | 6 / zgodne | 15,90% → 14,85% |
| `/skup-aut-uszkodzonych-gliwice/` | OK / OK | 7 / zgodne | — |
| `/skup-aut-do-zlomowania-gliwice/` | OK / OK | 7 / zgodne | — |
| `/pomoc-drogowa-laweta-gliwice/` | OK / OK | 5 / zgodne | — |
| `/skup-aut-mikolow/` | OK / OK | 6 / zgodne | 17,39% → 16,17% |
| `/skup-aut-tychy/` | OK / OK | 6 / zgodne | 17,33% → 16,09% |
| `/skup-aut-sosnowiec/` | OK / OK | 6 / zgodne | 17,38% → 16,14% |
| `/jak-przygotowac-auto-do-wyceny/` | OK / OK | 3 / zgodne | — |
| `/co-wplywa-na-cene-uszkodzonego-auta/` | OK / OK | 3 / zgodne | — |
| `/jak-przygotowac-auto-do-odbioru/` | OK / OK | 3 / zgodne | — |

Średnie podobieństwo części redakcyjnej 13 miast: **17,22% → 16,02%**. Metoda: Jaccard zbiorów pięciowyrazowych fragmentów, małe litery i słowa Unicode, te same selektory przed/po, 78 par; wyłączono menu, formularz, stopkę i wspólne bloki firmowe. Wszystkie dotychczasowe otwarcia, akapity lokalne, wstępy kontaktu i FAQ miast zachowano. To pomocnicza miara podobieństwa, nie ocena Google ani prognoza wzrostu klientów. Punktem porównania jest obecna produkcja po wcześniejszych modernizacjach.

## Dokładna lista plików

- `assets/service-intents.js`
- `assets/site.css`
- `co-wplywa-na-cene-uszkodzonego-auta/index.html`
- `docs/skup-i-zlomowanie-review.md`
- `index.html`
- `jak-przygotowac-auto-do-odbioru/index.html`
- `jak-przygotowac-auto-do-wyceny/index.html`
- `llms.txt`
- `partials/valuation-form.html`
- `pomoc-drogowa-laweta-gliwice/index.html`
- `scripts/sync-forms.mjs`
- `scripts/test-service-intents.mjs`
- `skup-aut-bytom/index.html`
- `skup-aut-chorzow/index.html`
- `skup-aut-do-zlomowania-gliwice/index.html`
- `skup-aut-katowice/index.html`
- `skup-aut-knurow/index.html`
- `skup-aut-mikolow/index.html`
- `skup-aut-pyskowice/index.html`
- `skup-aut-ruda-slaska/index.html`
- `skup-aut-siemianowice-slaskie/index.html`
- `skup-aut-sosnowiec/index.html`
- `skup-aut-swietochlowice/index.html`
- `skup-aut-tarnowskie-gory/index.html`
- `skup-aut-tychy/index.html`
- `skup-aut-uszkodzonych-gliwice/index.html`
- `skup-aut-zabrze/index.html`

## Dostępy i decyzje zewnętrzne

Backend formularza nadal jest wyłączony. Strona przygotowuje e-mail lokalnie i informuje „jeszcze niewysłana”; klient musi wysłać go z własnej poczty. Testy adaptera Formspree korzystały wyłącznie z symulowanej sieci. Realnego doręczenia, konta ani planu nie aktywowano i nie potwierdzono.

Brak dostępu do paneli Search Console, GA4 i Google Business Profile: nie potwierdzono rzeczywistej indeksacji, pozycji, liczby telefonów ani konwersji; nie zmieniano ustawień tych usług. Zgodność kodu śledzącego i jego mechanizmów sprawdzono testami, a podgląd nie wysyła danych do produkcyjnego GA4. Nie opublikowano fikcyjnych realizacji.

Nie wykryto blokującego błędu w przygotowanej wersji. Pozostaje przegląd właściciela i osobna zgoda na scalenie/publikację. Po niej należy ponownie sprawdzić niezmienność `main`, wdrożenie Pages i rzeczywistą wersję produkcyjną.

Podstawa kontroli SEO: [Google Search Essentials / spam policies](https://developers.google.com/search/docs/essentials/spam-policies), [dane strukturalne](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), [AI features](https://developers.google.com/search/docs/appearance/ai-features), [Schema.org Service](https://schema.org/Service). Ocena treści jest oceną redakcyjną i techniczną, nie certyfikacją ani obietnicą wyników Google.
