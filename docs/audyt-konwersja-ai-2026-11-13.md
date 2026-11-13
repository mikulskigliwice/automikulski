# AUTO MIKULSKI — kontakt, SEO i czytelność dla systemów AI

Stan przeglądu: 13.11.2026. **GOTOWE DO NIEZALEŻNEJ KONTROLI. To wersja robocza, bez zgody na publikację.**

## Zabezpieczenie i stan początkowy

- Repozytorium: mikulskigliwice/automikulski; baza main `e1b7e79d74be2b0b447477ac5e138a455e6c5b17`, tree `058eaf89551b09f48a78f87ce24258cf371132dc`.
- PR nr 2 rzeczywiście scalony 13.11.2026; [wdrożenie Pages](https://github.com/mikulskigliwice/automikulski/actions/runs/43421760079) zakończone sukcesem. Na początku brak otwartych PR.
- 20/20 publicznych HTML zwracało HTTP 200 i było identycznych bajtowo z main. Spis 69 wersji plików zapisano przed edycją.
- Nowa gałąź: `audyt-max-seo-ai-konwersja`. Nowy punkt powrotu: `backup-przed-audytem-konwersja-2026-11-13` na powyższym main.
- Istniejący `backup-przed-seo-2026-11-12` pozostaje na `a79e402528cc0e9f5ce5ce5e4b28c303f1d8bcf0`. Bez force-push i bez zmian produkcji, DNS, hostingu, domeny lub ustawień kont.

## Problemy i wykonane poprawki

Nie stwierdzono krytycznej awarii 20 stron produkcyjnych. Poniższe poprawki wynikają z kontroli kodu, pomiaru kolorów i odtworzenia zachowania w przeglądarce.

| Priorytet | Ustalenie przed zmianą | Poprawka i pliki |
| --- | --- | --- |
| WAŻNE | Zmiana modelu po przygotowaniu wiadomości zostawiała widoczny mailto ze starym modelem. Odtworzone na produkcyjnym Bytomiu. | Oba moduły JS usuwają nieaktualny draft i mailto po zmianie danych. Klient przygotowuje nową wiadomość. Edycja samej wiadomości nadal działa. `assets/valuation.js`, `assets/site.js`. |
| WAŻNE | Podpowiedzi pól: kontrast 3,85:1. | Kolor istniejącego `--muted`, kontrast 6,15:1, jawne opacity 1. `assets/site.css`. |
| WAŻNE | Brak informacji o działalności od 2013 r. na 20 HTML. | Fakt potwierdzony przez właściciela: wspólna stopka na 20 stronach i otwarcie 17 stron ofertowych. Zgodny opis głównej firmy w JSON-LD i jedna linia `llms.txt`. Bez fikcyjnej pełnej daty założenia. |
| WAŻNE | Niestandardowy błąd roku nie wskazywał pola; awaryjny formularz pomijał zakres roku, markę z samych spacji, imię i wybrany stan auta. | Fokus i aria-invalid w module, uzupełnienie walidacji i treści fallbacku; honeypot działa również w fallbacku. Oba JS. |
| WAŻNE | Publiczne stare/testowe HTML zawierały historyczne usługi, obcy numer telefonu i stary kod GA poza obecną obsługą zgody. Sam noindex nie wyłącza tych funkcji. | 10 plików zachowano pod tymi samymi adresami jako proste archiwalne plansze: noindex,nofollow, link do aktualnej strony i zatwierdzony telefon. Brak skryptów i formularzy. Oryginały są w Git i backupach. |
| OPCJONALNE | Identyczny draft mógł naliczać kolejne zdarzenie; prywatny podgląd mógł zasilać produkcyjny GA po zgodzie. | Deduplikacja przygotowania identycznej wiadomości w pamięci strony. GA działa po zgodzie wyłącznie na automikulski.pl i www.automikulski.pl. Bez nowych trackerów. |
| OPCJONALNE | Domyślny GET formularza i brak dolnego odstępu przy przewijaniu do elementów na mobile. | Method POST jako zabezpieczenie przed polami w URL w razie awarii obsługi JS; formularz pokazywany po instalacji obsługi. Dolny scroll-padding uwzględnia pasek kontaktu. To nie jest uruchomienie backendu. |
| OPCJONALNE | Brak wskazówki ograniczającej nadmiar danych w opisie. | Prośba o niepodawanie PESEL i danych dokumentu, w szablonie oraz wszystkich 20 formularzach. |

`scripts/test-contact-analytics.mjs` rozszerzono o rzeczywiste regresje: stary draft, edycję ręczną, deduplikację, oba moduły, rok, honeypot i wyłączenie pomiaru podglądów. `scripts/validate-site.mjs` kontroluje POST i bezpieczne archiwa. Wersje URL zmienionych CSS/JS odświeżono do `20261113-audit1`. Aktualna instrukcja formularza: [form-backend.md](form-backend.md).

## Co zachowano

Rzeczywista oferta: zakup aut używanych, uszkodzonych, powypadkowych i niesprawnych; własna laweta służy odbiorowi kupowanych aut po uzgodnieniu. Bez osobnej pomocy drogowej, przewozów na zlecenie i usług całodobowych. Zaświadczenie wystawia uprawniona stacja demontażu, z którą firma współpracuje. Telefon `517 936 676`, e-mail `automikulski@gmail.com`.

13 zatwierdzonych tekstów miast pozostaje bez przepisywania. Porównanie z bazą potwierdza te same lokalne sekcje, nagłówki H1–H3, menu, linki, FAQ i jego dane strukturalne. Wspólne elementy zaufania i formularzy zmieniono tak samo na wszystkich właściwych stronach. Miasta nadal oznaczają obszar odbioru, bez oddziałów. Nie ma podstaw do uznania wyniku matematycznego podobieństwa za ocenę Google ani do gwarantowania braku ryzyka doorway; zachowano odrębne tematy i możliwość kontaktu bezpośrednio na każdej stronie.

Bez zmian: 20 URL, title, meta description, canonical, metadane robots stron produkcyjnych, sitemap, robots.txt, CNAME, formularzowa konfiguracja wyłączonego backendu, obrazy i pusta galeria realizacji. Nie dodano opinii, godzin, oddziałów ani statystyk klientów. Dotychczasowa struktura usług, poradników i linków jest czytelna bez JS. FAQ jest zgodne z JSON-LD, co samo w sobie nie gwarantuje rozszerzonych wyników.

## Kontrole i pomiary

| Kontrola | Przed | Po |
| --- | --- | --- |
| Pięć istniejących skryptów projektu | PASS | PASS, w tym rozszerzone regresje |
| 20 produkcyjnych HTML, HTTP i zgodność z main | 20/20 HTTP 200, identyczne z bazą | Produkcji nie zmieniono; kandydat sprawdzony lokalnie i w podglądzie |
| Kontrast podpowiedzi, #fafbf8 jako tło | 3,85:1 | 6,15:1 |
| Nieaktualny draft po zmianie modelu | Błąd odtworzony na produkcji | Naprawa potwierdzona w testach obu modułów i w przeglądarce |
| Widoczny rok rozpoczęcia działalności | 0/20 HTML | 20/20 HTML; 17 otwarć ofertowych |
| Archiwa | 10 dostępnych starych wersji, 9 zawierało identyfikator GA4 | 10 plansz z noindex, bez formularzy i skryptów źródłowych |
| Chromium, 20 stron, szerokości CSS 375 i 1280 px | Nie wykonywano nowej pełnej serii przed edycją | 40/40 PASS; rzeczywista szerokość treści 360 i 1265 px po odjęciu paska przewijania |
| Dodatkowe próbki CSS 320 px | Nie wykonywano | 4/4 PASS, treść 305 px: główna, Siemianowice, odbiór lawetą, poradnik wyceny |
| PageSpeed API | Próba pomiaru produkcji: HTTP 429, wyczerpana dostępna kwota | Brak porównywalnego wyniku |
| Lighthouse 13.6.0 | — | Próba na lokalnym podglądzie: błąd uruchomienia Chrome „waiting for dynamic debugging port”. Brak punktacji |

Polecenia: `node scripts/validate-site.mjs`, `node scripts/test-site-validation.mjs`, `node scripts/test-contact-analytics.mjs`, `node scripts/test-valuation.mjs`, `node scripts/test-realizations.mjs`, `git diff --check`. Synchronizacja formularzy jest powtarzalna bez kolejnych zmian plików.

W przeglądarce: wszystkie FAQ otwierane i zamykane klawiaturą, menu mobilne i Escape, przejście do kontaktu, prawidłowe tel, blokada pustego formularza, draft, zmiana modelu, ponowne przygotowanie z aktualnymi danymi i rodzajem demontaz. Dodatkowo fokus błędu roku, ręczna edycja oraz kopiowanie do schowka. Wariant awaryjny badano w osobnej kopii bez valuation.js. 10 plansz archiwalnych sprawdzono osobno. Serwer lokalnego podglądu dokłada własny skrypt odświeżania CSS; nie jest on częścią kodu ani archiwów w repozytorium. W obserwowanej konsoli brak błędów skryptów strony. To desktopowy Chromium z ramką CSS, bez fizycznego telefonu, iOS/Safari i testu połączenia telefonicznego. Nie wysyłano e-maila, SMS ani rzeczywistego zgłoszenia.

Nie uzyskano pomiaru LCP/INP/CLS w rzeczywistym ruchu ani pełnego audytu zgodności WCAG. Wydajność nie jest oceniona punktowo. Zachowano systemowe czcionki, brak frameworków, wymiary i lazy loading ilustracji oraz warianty WebP. Kod CSS/JS nieco urósł ze względu na walidację i zabezpieczenia; nie przedstawiamy tego jako przyspieszenia. Cache z produkcji: `max-age=600`, ETag i Last-Modified. Nie zmieniano cache hostingu. HTTP i www przekierowują 301 do HTTPS domeny głównej; nieistniejący kontrolny adres zwrócił 404.

## Google, Bing, Schema i boty

- Produkcyjne robots.txt zezwala na Googlebot, Bingbot i OAI-SearchBot. Ogólne Allow obejmuje także GPTBot i Google-Extended; nie zmieniono decyzji o dostępie treningowym. ChatGPT-User służy odczytom inicjowanym przez użytkownika i nie jest robotem indeksującym Search. Reguły robots nie są zabezpieczeniem prywatności.
- Odczytane nagłówki 20 HTML nie zawierają blokującego X-Robots-Tag. Brak dostępu do administracji CDN/hostingu i logów prawdziwych robotów; odczyt pliku robots nie dowodzi faktycznego pobrania przez dany bot.
- Jedna tożsamość firmy LocalBusiness, istniejące Service i areaServed oraz Article/FAQ/Breadcrumb zachowane. Jedyna zmiana JSON-LD to potwierdzony staż w opisie firmy na głównej, widoczny również w treści. Nie dodano ocen, fikcyjnych godzin ani oddziałów.
- `llms.txt` zachowano jako mały opis pomocniczy, dodając potwierdzony rok. Nie jest przedstawiany jako czynnik rankingu ani warunek cytowania. Google nie wymaga specjalnych plików lub odmiennego Schema dla swoich funkcji AI.

Źródła pierwotne odczytane w tej realizacji:

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google Spam Policies — doorway i inne nadużycia](https://developers.google.com/search/docs/essentials/spam-policies)
- [Google — funkcje AI i witryna](https://developers.google.com/search/docs/appearance/ai-features)
- [Google — roboty i Google-Extended](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers)
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a) — dokumentacja dostępna w indeksie wyszukiwarki; bezpośrednia strona pomocy wymaga JS.
- [OpenAI — OAI-SearchBot, GPTBot i ChatGPT-User](https://developers.openai.com/api/docs/bots)
- [Schema.org LocalBusiness](https://schema.org/LocalBusiness)
- [W3C — kontrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [W3C — fokus niezasłonięty](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)

## Konkurencja, spójność danych i blokady

Publiczne porównanie: [Exmet — wycena](https://www.exmet.pl/wycena-zlomowanie-auta/), [Schrott — Gliwice](https://www.schrott.pl/auto-skup/gliwice/), [AutoHouse — wycena](https://www.auto-house.pl/wycena-samochodu/). Widoczny telefon i wyjaśnienie danych potrzebnych do wyceny już są u AUTO MIKULSKI. Dodano własny, potwierdzony staż; zachowano indywidualną wycenę i prawdziwe role przy demontażu. Nie badano wyników sprzedaży konkurencji, nie kopiowano tekstów ani obietnic cenowych/terminów.

| Sprawa | Status i następny krok |
| --- | --- |
| Backend zgłoszeń | BLOKOWANE: endpoint, konto, decyzja o dostawcy i informacja o danych. Adapter jest wyłączony; wiadomość musi wysłać klient. Przed aktywacją rzeczywisty test HTTP, panelu i dostarczenia do skrzynki. Bez zakupu usług. |
| Dane osobowe | BLOKOWANE: pełna informacja administratora wymaga potwierdzenia zasad, odbiorców i retencji. Nie wygenerowano fikcyjnej polityki. Lokalna wskazówka ogranicza nadmiar danych. |
| GA4 / Search Console / Bing Webmaster | BLOKOWANE: brak dostępu do raportów i ustawień paneli. Zachowano GA4 G-2TNQWT3SF9. Własne zdarzenia bez danych pól; rozszerzone pomiary Google wymagają osobnej kontroli, w szczególności dla mailto zawierającego treść wiadomości. |
| Profil Google | Bieżący bezpośredni odczyt przez narzędzie zakończył się błędem. Nie przedstawiamy wcześniejszych ocen/liczników/godzin jako nowego sprawdzenia. Wymagane potwierdzenie właściciela: aktualny lokal 7, obsługa na miejscu i godziny. Nie zmieniano profilu. |
| Targeo | [Publiczny wpis](https://mapa.targeo.pl/auto-mikulski-jaroslawa-dabrowskiego-23-44-100-gliwice~10245519/pomoc-drogowa/adres) ma prawidłowy telefon/adres budynku, ale kategorię pomoc drogowa oraz nieprawdziwe 24h/7. Zgłoszone do osobnej korekty właściciela, bez edycji katalogu. |
| Stare strony Wix | Wyniki wyszukiwania pokazują stare deklaracje pomocy drogowej/całodobowości na mikulskigliwice.wixsite.com. Oddzielny serwis, niezmieniany. Właściciel powinien sprawdzić i uporządkować posiadane profile/strony. |
| Dowody zaufania | Nie dodano fikcyjnych realizacji. Zdjęcia i opis prawdziwego partnera demontażu wymagają materiałów i zgody właściciela. Galeria nadal wyłączona. |
| Pomiary jakości | Brak działającego pomiaru Lighthouse/PSI i danych terenowych CWV w tym środowisku. To ograniczenie pomiaru, nie stwierdzenie awarii witryny. |

## Plan pomiaru po osobno zatwierdzonej publikacji

1. Zanotować datę i SHA publikacji. Porównywać równe 28-dniowe okresy, opisując sezonowość i inne zmiany reklamowe. Bez obietnicy wzrostu procentowego.
2. Po nadaniu dostępu w GSC mierzyć kliknięcia, wyświetlenia, CTR, zapytania, urządzenia i strony docelowe; sprawdzić indeksację wszystkich 20 canonicali. W GA4 kontrolować phone_click / sms_click / email_click oraz valuation_draft. valuation_received dopiero z prawdziwym, zatwierdzonym backendem. Przygotowanie wiadomości i kliknięcie telefonu nie są rzeczywistym klientem ani odebraną rozmową.
3. Właściciel może prowadzić prosty zbiorczy rejestr: odebrane rozmowy, sensowne zapytania, uzgodnione zakupy; bez publikowania numerów klientów. To pozwoli ocenić konwersję na zakup, a nie tylko kliknięcia. Dane po odmowie analityki nie staną się automatycznie pełnym pomiarem ruchu.
4. Raz w tygodniu ręcznie powtarzać tę samą próbkę zapytań: „skup aut Gliwice”, „sprzedaż uszkodzonego auta Zabrze”, „skup auta z uszkodzonym silnikiem Mikołów”, „auto do złomowania Gliwice zaświadczenie”, „AUTO MIKULSKI odbiór auta”, „jak przygotować auto do wyceny”. Zapisywać datę, system, tryb wyszukiwania, lokalizację/język i rzeczywisty URL cytowania. Cytat, wzmianka marki i ogólny tekst odpowiedzi to różne wyniki. Nie uznawać pojedynczej odpowiedzi AI za pozycję stałą.
5. W Bing Webmaster sprawdzić dostępne raporty indeksowania i użycia w AI po nadaniu dostępu. Nie instalować dodatkowych trackerów ani automatycznej kampanii. Ten punkt jest planem, nie uruchomionym harmonogramem.

## Ryzyko, kontrola i cofnięcie

Największa widoczna zmiana poza 20 stronami to archiwalne plansze. Duży ubytek linii w diff dotyczy starych wariantów, nie skasowanych plików ani treści 13 miast. Każdy plik nadal istnieje. Odtworzenie starszej wersji jest możliwe z nowego backupu/bazowego SHA; przed przywróceniem archiwów trzeba uwzględnić ich stare deklaracje i pomiary.

Ryzyko formularza: zmiana danych celowo usuwa ręcznie edytowany draft; komunikat wyjaśnia potrzebę ponownego przygotowania. Nie zapisujemy prywatnych tekstów do localStorage. Deduplikacja działa tylko w pamięci danej strony, nie łączy użytkowników ani rozmów. Nowy POST jest zabezpieczeniem, nie serwerem wysyłki.

Przed ewentualnym scaleniem: sprawdzić, czy main nadal odpowiada zapisanej bazie, przejrzeć pełny diff i potwierdzić zakres prywatności oraz treści. W tej realizacji nie scalać. Jeśli po przyszłej publikacji wystąpi regresja, przygotować PR odwracający tę zmianę przez zwykły revert, wykonać testy i wdrożyć po decyzji właściciela. Nie resetować main, nie wykonywać force-push i nie przestawiać backupów.

## Pełna lista adresów i wyników

HTTP dotyczy publicznej bazy produkcyjnej; mobile/desktop dotyczą nowej wersji w lokalnym podglądzie Chromium.

| Adres produkcyjny | HTTP bazy | CSS 375 px | CSS 1280 px |
| --- | --- | --- | --- |
| [/](https://automikulski.pl/) | 200, zgodny z main | PASS | PASS |
| [/skup-aut-bytom/](https://automikulski.pl/skup-aut-bytom/) | 200, zgodny z main | PASS | PASS |
| [/skup-aut-chorzow/](https://automikulski.pl/skup-aut-chorzow/) | 200, zgodny z main | PASS | PASS |
| [/skup-aut-katowice/](https://automikulski.pl/skup-aut-katowice/) | 200, zgodny z main | PASS | PASS |
| [/skup-aut-knurow/](https://automikulski.pl/skup-aut-knurow/) | 200, zgodny z main | PASS | PASS |
| [/skup-aut-pyskowice/](https://automikulski.pl/skup-aut-pyskowice/) | 200, zgodny z main | PASS | PASS |
| [/skup-aut-ruda-slaska/](https://automikulski.pl/skup-aut-ruda-slaska/) | 200, zgodny z main | PASS | PASS |
| [/skup-aut-siemianowice-slaskie/](https://automikulski.pl/skup-aut-siemianowice-slaskie/) | 200, zgodny z main | PASS | PASS |
| [/skup-aut-swietochlowice/](https://automikulski.pl/skup-aut-swietochlowice/) | 200, zgodny z main | PASS | PASS |
| [/skup-aut-tarnowskie-gory/](https://automikulski.pl/skup-aut-tarnowskie-gory/) | 200, zgodny z main | PASS | PASS |
| [/skup-aut-zabrze/](https://automikulski.pl/skup-aut-zabrze/) | 200, zgodny z main | PASS | PASS |
| [/skup-aut-uszkodzonych-gliwice/](https://automikulski.pl/skup-aut-uszkodzonych-gliwice/) | 200, zgodny z main | PASS | PASS |
| [/skup-aut-do-zlomowania-gliwice/](https://automikulski.pl/skup-aut-do-zlomowania-gliwice/) | 200, zgodny z main | PASS | PASS |
| [/pomoc-drogowa-laweta-gliwice/](https://automikulski.pl/pomoc-drogowa-laweta-gliwice/) | 200, zgodny z main | PASS | PASS |
| [/skup-aut-mikolow/](https://automikulski.pl/skup-aut-mikolow/) | 200, zgodny z main | PASS | PASS |
| [/skup-aut-tychy/](https://automikulski.pl/skup-aut-tychy/) | 200, zgodny z main | PASS | PASS |
| [/skup-aut-sosnowiec/](https://automikulski.pl/skup-aut-sosnowiec/) | 200, zgodny z main | PASS | PASS |
| [/jak-przygotowac-auto-do-wyceny/](https://automikulski.pl/jak-przygotowac-auto-do-wyceny/) | 200, zgodny z main | PASS | PASS |
| [/co-wplywa-na-cene-uszkodzonego-auta/](https://automikulski.pl/co-wplywa-na-cene-uszkodzonego-auta/) | 200, zgodny z main | PASS | PASS |
| [/jak-przygotowac-auto-do-odbioru/](https://automikulski.pl/jak-przygotowac-auto-do-odbioru/) | 200, zgodny z main | PASS | PASS |

## Pełna lista zmienionych plików

- `assets/site.css`
- `assets/site.js`
- `assets/valuation.js`
- `co-wplywa-na-cene-uszkodzonego-auta/index.html`
- `docs/audyt-konwersja-ai-2026-11-13.md`
- `docs/form-backend.md`
- `gpt-zwykly.html`
- `holmech/test.html`
- `hybryda.html`
- `index-astra.html`
- `index-gemini.html`
- `index.html`
- `inxex2.html`
- `jak-przygotowac-auto-do-odbioru/index.html`
- `jak-przygotowac-auto-do-wyceny/index.html`
- `llms.txt`
- `old-index.html`
- `partials/valuation-form.html`
- `pomoc-drogowa-laweta-gliwice/index.html`
- `scripts/test-contact-analytics.mjs`
- `scripts/test-site-validation.mjs`
- `scripts/validate-site.mjs`
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
- `test.html`
- `test2.html`
- `test3.html`

## Prywatny podgląd

[Podgląd właściciela](https://automikulski-podglad-20261113.gracefuljelly3.chatgpt.site/) zaktualizowano w oddzielnym projekcie podglądowym, bez zmiany automikulski.pl. Dostęp custom: wyłącznie właściciel, brak grup, innych użytkowników i zaproszeń zewnętrznych; rewizja uprawnień pozostała 1. Wdrożenie prywatnego podglądu zakończone sukcesem. Przeglądarka bez sesji właściciela pokazuje bramkę logowania, więc nie zweryfikowano za nią interfejsu nowego wdrożenia. Widoki i działanie sprawdzono w lokalnym podglądzie tego samego kodu.

20 HTML podglądu jest identycznych z kandydatem poza celowym noindex,nofollow; robots podglądu ma Disallow: /. Źródłowe CSS, JS i wyłączona konfiguracja formularza są identyczne. Prywatność zapewniają uprawnienia, nie sam robots/noindex. Podgląd nie zasila produkcyjnego GA4.
