# AUTO MIKULSKI — raport modernizacji v2 do zatwierdzenia

Data: 12 listopada 2026, Europe/Warsaw. Repozytorium: `mikulskigliwice/automikulski`. Gałąź: **`seo-rozbudowa-v2`**. Bazą jest zabezpieczona produkcja `a79e402528cc0e9f5ce5ce5e4b28c303f1d8bcf0`; kontynuowano wcześniejszy roboczy commit `32dd900015028e5bd297ced21de8214f69bd8cea`.

**Uzupełnienie statusu, 13.11.2026 po północy czasu polskiego:** przygotowanie i testy wykonano 12.11. Zapis pliku do GitHuba został następnie przerwany. Zdalna gałąź v2 nadal wskazuje `32dd900015028e5bd297ced21de8214f69bd8cea`. Nowy zakres jest przygotowany lokalnie; nie utworzono dla niego pull requesta ani nowego zdalnego commita. Zdalne `main` i backup ponownie sprawdzono: nadal a79. To rozróżnienie ma pierwszeństwo przed opisem docelowego PR poniżej.

**To propozycja zmian w istniejącej witrynie. Nie opublikowano jej na automikulski.pl, nie zmieniono `main`, nie scalono PR.** Raport opisuje cały zakres v2 względem zabezpieczonej produkcji, także przygotowaną wcześniej pierwszą część o stacji. Nie przypisuje tej modernizacji wcześniejszego utworzenia Mikołowa, Tychów, Sosnowca czy poradników: te adresy istniały już w bazie a79.

## Stan wykonania i dowody

| Warstwa | Stan |
| --- | --- |
| Backup | Istnieje gałąź i zweryfikowany ZIP; SHA zgodny z a79. Backup nie był wykonywany ponownie. |
| Kod v2 | Zmodyfikowane wszystkie 20 istniejących HTML; wspólne moduły, obrazy, mechanizm realizacji, testy i dokumentacja. |
| GitHub | Zapis nowego zakresu przerwany; remote v2 pozostał na 32dd900. Kod i dokumentacja są przygotowane lokalnie na `seo-rozbudowa-v2`. Docelowy PR → `main` nie został utworzony. |
| Podgląd | Wewnętrzna kopia robocza, `noindex,nofollow,noarchive`, robots `Disallow: /`, brak publikacji publicznego serwisu. Pokazuje pole zdjęć bez przesyłania. Podgląd jest tymczasowy. |
| Produkcja | Przy odczycie wszystkich 20 URL: HTTP 200 i bajty zgodne z zabezpieczonym a79. Przed zapisem ponownie sprawdzono remote `main`/backup: nadal a79. |
| Rzeczywista wysyłka formularza | **Nieuruchomiona**. Pełny interfejs i adapter są przygotowane; potrzebne konto/usługa, decyzja właściciela, informacja o danych i test integracyjny. |
| Prawdziwe realizacje | Mechanizm gotowy, 0 wpisów. Galeria nie jest pokazywana, dopóki nie otrzymamy zatwierdzonych materiałów. |
| SEO wyniki biznesowe | Nie ma jeszcze wdrożenia ani danych potwierdzających wzrost pozycji, ruchu, telefonów czy zakupów. |

Najważniejsze dokumenty:

- [Indywidualny audyt wszystkich 20 URL, 17 pól i ocena 65 obszarów](audit-20-urls.md).
- [Dane przed/po i wyniki kontroli w JSON](audit-20-urls.json).
- [Mapa fraz, intencji i ryzyka kanibalizacji](seo-keyword-map.md).
- [Konkurencja i pięć luk, ze szczególnym uwzględnieniem Exmetu](competitor-gap.md).
- [Profil Google, rozbieżności danych i plan linków](local-presence-and-links.md).
- [Kod formularza, koszty wariantów i uruchomienie](form-backend.md).
- [Dodawanie prawdziwych realizacji](realizations.md).

## Co wykryto i poprawiono

1. **Strona główna i skup Gliwice.** Zachowano poprawny title i H1 „Skup aut Gliwice i Śląsk.”. Skrócono pierwszy opis, pozostawiono mocny telefon i wycenę, dodano skrót do właściwej ścieżki złomowania. Pierwsza część v2 wprowadza osobną sekcję potwierdzonej współpracy ze stacją oraz dopasowane metadane/FAQ/schema.
2. **Złomowanie Gliwice.** Wykorzystano istniejący `/skup-aut-do-zlomowania-gliwice/`. W v2 title to „Złomowanie aut Gliwice — organizacja i odbiór | Auto Mikulski”, H1 „Złomowanie aut Gliwice i Śląsk.”. Wyjaśniono zgłoszenie, wycenę/odbiór, organizację przekazania do stacji i dokument wystawiany przez uprawnioną stację. Dodano listę informacji o dokumentach, współwłasności/brakach, dalszych czynnościach i aktualne źródło MI. Nie zagwarantowano zaświadczenia przy każdym zakupie.
3. **Wszystkie miasta.** Indywidualnie oceniono 13 podstron i Gliwice na głównej. Zachowano dobre lokalne wstępy/title/H1 i 65 przypisań obszarów. Na 13 stronach dopasowano jedno dodatkowe pytanie do opisanej sytuacji oraz pytanie o stację z linkiem do formalności. Nie twierdzimy, że każde FAQ jest całkowicie unikalne — część pytań i sekcji pozostaje wspólna. To szablon obsługujący różne lokalizacje, który warto uzupełnić prawdziwym doświadczeniem.
4. **Zabrze.** Dodano krótką odpowiedź o organizacji przekazania auta do stacji i zaświadczeniu, z linkiem do centralnej usługi. Nie utworzono drugiej konkurującej strony Zabrza.
5. **Uszkodzone/powypadkowe.** Dodano trzy konkretne bloki: kolizja, silnik/skrzynia i utrudnienia przetoczenia/załadunku; dwa nowe FAQ. Bez osobnego URL dla każdej usterki.
6. **Laweta.** Przebudowano najuboższą stronę w obrębie obecnego serwisu: spójna oprawa, nawigacja, sam transport jako intencja, trzy kroki, cztery FAQ, formularz z właściwym wyborem i komplet właściwych encji schema. Zachowano kierunki dojazdu, opinie i telefon. Deklaracja 24h pochodzi z produkcji; wymaga potwierdzenia przed publikacją v2.
7. **Poradniki.** Zachowano wartościowe artykuły i ich adresy. Do wyceny dodano dokumenty, współwłasność oraz ostrożną sekcję OC/przeglądu ze źródłem RF. Do czynników ceny — rozróżnienie zakupu i organizacji stacji. Do odbioru — odnośnik do samej lawety i ścieżki zaświadczenia.
8. **Kontakt na danej podstronie.** Menu „Kontakt”, „Pytania” i górny skrót kierują do odpowiedniej sekcji tej strony. Klient z Mikołowa nie traci kontekstu przez skok na główną. Został stały mobilny pasek kontaktu; nie dodano popupów sprzedażowych.
9. **Mobile.** Naprawiono robocze przepełnienie kontaktu w Świętochłowicach, wyrównanie pól i przewijanie menu w bardzo niskim oknie. Uzupełniono lokalne fallbacki fontów dla znaków strzałek; brak nowej zewnętrznej czcionki.
10. **Obrazy i wiarygodność.** Trzy dotychczasowe grafiki miały podpisy sugerujące faktyczne odbiory. Nie mieliśmy potwierdzenia takich realizacji, więc opisano je jednoznacznie jako ilustracje. Przeniesiono je do lokalnych zoptymalizowanych WebP/JPEG, z srcset, wymiarami, lazy loading i opisami alt. W LocalBusiness usunięto niepotwierdzone `priceRange: "$"` i ilustracje podawane jako zdjęcia firmy. Obrazy ilustracyjne pozostały w odpowiednich metadanych stron.

## Techniczne SEO — co się rzeczywiście zmieniło

| Element | Stan v2 |
| --- | --- |
| Publiczne URL | Nadal 20 adresów z sitemap. Brak zmiany istniejących ścieżek i canonicali. |
| Title/H1 | Zachowano poprawne lokalne i poradnikowe wartości. Istotna zmiana intencji tytułu/H1 na stronie złomowania; laweta ma spójne formatowanie H1. Dokładne wartości przed/po w audycie. |
| Description/OG | Unikalne opisy; dopasowanie głównej i złomowania do potwierdzonej oferty, lokalne obrazy OG, właściwe og:url. |
| Słowa kluczowe | Użyte w odpowiednich usługach i konkretnych odpowiedziach; nie dodawano list powtarzanych synonimów ani ukrytych treści. |
| Schema.org | Zachowana firma i odwołania do niej, właściwe Service/WebPage/Breadcrumb/Article; zgodne widoczne FAQ. Laweta otrzymała brakujące typy. Bez fałszywych stacji, opinii i AggregateRating. |
| FAQ | Przydatne odpowiedzi i zgodność HTML/JSON-LD; **brak obietnicy rozszerzonych wyników FAQ**. Google wycofał ten typ wyniku od 7.05.2026. |
| Linkowanie | Kontekstowe usługi/poradniki/miasta, brak sierot, poprawne kotwice; nie zwiększano linków mechanicznie. |
| sitemap.xml | Bez zmiany, nadal dokładnie te same 20 URL. Nie ma nowych adresów, które należałoby dopisać. |
| robots.txt | Bez zmiany w v2. OAI-SearchBot i ChatGPT-User były już jawnie dozwolone w zabezpieczonej produkcji; reguła ogólna także pozwalała na dostęp. |
| llms.txt | Pierwsza część v2 doprecyzowuje współpracę ze stacją. To opis oferty, nie zgłoszenie do indeksu i nie mechanizm zapewniający rekomendacje. |
| Stare HTML | 10 plików zachowano; HTTP 200, noindex, poza mapą. Nie przekierowywano i nie kasowano. |

Źródła kierunku SEO: [zasady spamu](https://developers.google.com/search/docs/essentials/spam-policies), [AI w Google Search](https://developers.google.com/search/docs/appearance/ai-features), [aktualizacje dokumentacji — FAQ](https://developers.google.com/search/updates). Brak specjalnego schematu czy skryptu gwarantującego polecenia AI. Sama dostępność robotowi nie gwarantuje indeksowania ani cytowania.

## Wydajność — liczby i granice pomiaru

Trzy oryginalne ilustracje: **2 142 046 B**. Trzy największe nowe wersje WebP: **241 026 B**, redukcja **88,75% rozmiaru plików**. Są również warianty 320 px i JPEG fallback. Przeglądarka wybiera wariant przez srcset; nie sumuje wszystkich dziewięciu plików jako jednego transferu.

Nie jest to pomiar przyspieszenia strony ani LCP. Dodano także kod formularza (9 057 B) i konfigurację (346 B). CSS wzrósł z 20 761 do 23 521 B, wspólny JS z 6 419 do 6 595 B; to wielkości nieskompresowane plików. Główna HTML wzrosła z 33 415 do 38 289 B, laweta z 6 269 do 22 819 B po rozbudowie. Trzeba uczciwie uwzględnić ten koszt.

PageSpeed mobile/desktop zwrócił HTTP 429. Brak wyników Lighthouse, CrUX, LCP, INP i CLS. Narzędzia deweloperskie przeglądarki były blokowane przez środowisko; blokady nie obchodzono. Nie ogłaszam „100 punktów” ani braku regresji Core Web Vitals bez pomiaru. Wykonano kontrole zasobów, renderowania i wymiarów, opisane poniżej.

## Formularz i realizacje

Formularz ma wymagane minimum: telefon, miasto, markę i model; pozostałe informacje i zdjęcia są opcjonalne. Kod wspiera pięć zdjęć, wybór celu zgłoszenia, błędy i potwierdzenie dopiero po odpowiedzi usługi. **Konfiguracja pozostaje wyłączona.** Nie utworzono konta, nie wykupiono planu i nie wysłano danych. Aktualnie klient przygotowuje wiadomość lokalnie i sam wysyła ją w poczcie. Szczegóły oraz konkretne warianty kosztów: [formularz](form-backend.md).

Mechanizm realizacji generuje bezpieczny statyczny HTML na głównej i stronach miast na podstawie zatwierdzonego JSON i lokalnych fotografii. Dane są puste, więc brak pustej galerii. Nie wykorzystano ilustracji, testowych danych ani cudzych zdjęć jako rzekomych realizacji. Wymagane są prawdziwe materiały właściciela i kontrola prywatności.

## Testy wykonane

| Kontrola | Wynik i zakres |
| --- | --- |
| `node scripts/validate-site.mjs` | PASS, 20 URL: rzeczywisty canonical, jeden H1, unikalne title/description, og:url, WebPage.url, JSON-LD, zgodne FAQ, cele wewnętrzne/srcset, kotwice, brak sierot i przypadkowego noindex, zatwierdzony telefon, konfiguracja formularza i dane realizacji. |
| `node scripts/test-site-validation.mjs` | PASS, poprawna kopia i 9 izolowanych uszkodzonych przypadków wykrywanych: canonical, powielenia, OG, wyjście z podglądu, noindex z inną kolejnością atrybutów, zły telefon. |
| `node scripts/test-contact-analytics.mjs` | PASS: brak zgody, odmowa, zapamiętanie/wycofanie, kliknięcia, lokalny draft i brak danych pól w zdarzeniach własnego kodu. |
| `node scripts/test-valuation.mjs` | PASS: wyłączenie sieci, endpoint i informacja o danych, pola i zdjęcia, honeypot, prawidłowe/nieprawidłowe odpowiedzi i błędy. **Sieć mockowana; nie jest to test konta dostawcy.** |
| `node scripts/test-realizations.mjs` | PASS: brak pustej sekcji, filtrowanie miasta, escaping, wymagane zatwierdzenia, lokalne obrazy, duplikaty. Izolowane techniczne fixture. |
| Generowanie | Formularz zsynchronizowany na 20 stronach; realizacje: 0 zatwierdzonych wpisów, 14 miejsc osadzenia. |
| `git diff --check` | PASS. |
| Przeglądarka | 20/20 stron przy szerokościach 1348, 449 i 337 px CSS: właściwa strona, FAQ, menu, pusty formularz, telefon, brak końcowego poziomego przepełnienia. Mobilne przyciski kontaktowe mają co najmniej 46 px wysokości. |
| Formularz w przeglądarce | Błędny numer/rok, poprawny draft/mailto, kopiowanie, wybór transportu, zdjęcie lokalne, 6 plików, za duży plik i zły format: zgodnie z opisem. Bez zewnętrznej wysyłki. |
| Obrazy | Trzy lokalne ilustracje załadowane w przeglądarce; pliki i srcset istnieją. Brak błędów z zasobów witryny w odczytanych logach; błędy rozszerzenia środowiska oddzielono od strony. |
| Produkcja / stare pliki | Na początku wszystkie 20 produkcyjnych stron: 200, identyczne z a79. Osobno wszystkie 10 starych HTML: 200 i noindex. |

Testy uruchomiono na Node v24.22.1. Wąski układ uzyskano skalą desktopowego Chromium, bez emulacji dotyku. Nie wykonano prawdziwego połączenia telefonicznego, wysłania SMS/e-mail, audytu pełnego WCAG/W3C, pełnego badania zewnętrznych linków ani prawdziwej wysyłki do usługi. Próba HTTP z powłoki do wewnętrznego adresu podglądu nie mogła się połączyć; nie zaliczono jej do sukcesów. Ten sam podgląd był dostępny i sprawdzony w przeglądarce.

## Google Maps i przewaga nad konkurencją

Bezpośredni profil Google pokazał nazwę Auto Mikulski Dariusz Mikulski, telefon 517 936 676, domenę automikulski.pl, kategorię „Złomowanie samochodów”, 4,9/320 opinii i 186 zdjęć. Są to wartości wyświetlone w chwili kontroli, nie nowe publikowane na stronie deklaracje. Istnieją rozbieżności adresu (`lok. 7`) i godzin wobec strony/katalogów. Szczegóły i ograniczenia odczytu: [analiza lokalna](local-presence-and-links.md).

W porównaniu z Exmetem poprawiono klarowność organizacji demontażu i dokumentów, drogę z lokalnych stron do kontaktu, opisy konkretnych problemów i przygotowanie zgłoszenia ze zdjęciami. **Nie twierdzę, że już wyprzedziliśmy Exmet w Google lub pozyskaliśmy więcej klientów.** Nadal brakuje autentycznych realizacji w witrynie, dokładnej uzgodnionej procedury stacji i aktywnego backendu. Te elementy są ważniejsze od dalszego dopisywania podobnych miast.

Nie zweryfikowano całego profilu backlinków ani danych płatnych narzędzi. Przygotowano plan rzeczywistych wzmianek i współpracy; nie kupowano linków, nie budowano zaplecza, nie wysyłano wiadomości firmom ani nie edytowano wizytówek.

## Backup, commity i kontrola publikacji

- Produkcja i backup: [`a79e402528cc0e9f5ce5ce5e4b28c303f1d8bcf0`](https://github.com/mikulskigliwice/automikulski/commit/a79e402528cc0e9f5ce5ce5e4b28c303f1d8bcf0).
- [Gałąź backupowa](https://github.com/mikulskigliwice/automikulski/tree/backup-przed-seo-2026-11-12).
- ZIP: `Backup_AUTOMIKULSKI_2026-11-12_a79e402.zip`, 993 748 B, 40 plików repozytorium i 171 osiągalnych commitów. Zawiera instrukcję `PRZYWRACANIE.md` z przywróceniem przez nowy commit, bez kasowania historii.
- SHA-256 ZIP ponownie sprawdzony: `78421ccd2873415014994db06c352372f4d85e46f4f5653030741aac1fc3c62b`.
- Pierwsza część robocza v2: [`32dd900015028e5bd297ced21de8214f69bd8cea`](https://github.com/mikulskigliwice/automikulski/commit/32dd900015028e5bd297ced21de8214f69bd8cea).
- [Historia wszystkich commitów v2](https://github.com/mikulskigliwice/automikulski/commits/seo-rozbudowa-v2) i [pełne porównanie z main](https://github.com/mikulskigliwice/automikulski/compare/main...seo-rozbudowa-v2).
- Ostatnia sprawdzona publikacja produkcyjna: [Pages run 43300788294](https://github.com/mikulskigliwice/automikulski/actions/runs/43300788294), main/a79, success, 12.11.2026 20:30:02 UTC. Nie uruchamiano nowej publikacji dla v2.

ZIP zabezpiecza repozytorium i historię, a nie konta Google, DNS lub wszystkie zewnętrzne usługi. W tej fazie nie zmieniano hostingu, domeny, DNS, CNAME, uprawnień, numeru ani innych repozytoriów. Nie wykonano force-push i nie usunięto żadnego istniejącego pliku.

## Decyzje i prace pozostałe

| Priorytet | Potrzebna decyzja / materiał | Co jest przygotowane |
| --- | --- | --- |
| 1 | Wybór backendu, budżet, konto i odbiorca, informacja o danych | Interfejs, adapter, zabezpieczenia aktywacji, testy i [instrukcja](form-backend.md). Bez tej decyzji formularz pozostaje szkicem do poczty. |
| 2 | Rzeczywista procedura ze stacją: kto przyjmuje pojazd/zawiera dokumenty, wymagania, sposób i termin przekazania zaświadczenia | Ostrożny opis potwierdzonej współpracy. Nie wymyślono nieznanych szczegółów. |
| 3 | Czy transport faktycznie działa 24h; czy podany adres/lokal 7 jest aktualny i obsługuje klientów | Zachowany dotychczasowy numer i adres; rozbieżności udokumentowane, bez samodzielnych zmian w Google. |
| 4 | Autentyczne fotografie i opisy realizacji | Działający mechanizm dodawania i filtrowania; brak pustej/fikcyjnej galerii. |
| 5 | Ponowienie przerwanego zapisu gałęzi i utworzenie PR, potem przegląd treści i osobna zgoda na publikację | Kod, porównanie, testy i raport są przygotowane. PR pozostaje niewykonanym krokiem. **Brak zgody na publikację oznacza brak merge/deploy.** |
| Kolejny etap | Prawdziwy telefon, pomiar wydajności, ustawienia GA4, później GSC/OpenSEO i eksport linków | Model pomiaru poniżej; nie wymagano teraz podłączenia Search Console. |

Proponowany model późniejszych wyników: wyświetlenia/zapytania/CTR → wejścia organiczne i strony wejścia → kliknięcia kontaktowe → rzeczywiście przyjęte formularze i odebrane rozmowy → wyceny i zakupione auta. Zachowany GA4 `G-2TNQWT3SF9`; kliknięć nie utożsamiać z rozmowami, draftów z wysłaniem ani przyjętych zgłoszeń z zakupami. Porównywać równe okresy, np. 28 dni, uwzględniając wdrożenie i sezonowość. Nie deklarować efektu bez tych danych.

## Dokładny wykaz plików

<!-- file-manifest:start -->
Względem zabezpieczonego `a79e402`: **26 zmodyfikowanych plików, 27 nowych plików, 0 usuniętych**. Wszystkie 20 dotychczasowych HTML pozostaje. Nowe podstrony HTML: **0**; nowe miasta i obszary: **0**. Pliki dokumentacji/kodu nie są nowymi stronami ofertowymi w sitemap.

| Status | Plik |
| --- | --- |
| Zmodyfikowany | `assets/site.css` |
| Zmodyfikowany | `assets/site.js` |
| Zmodyfikowany | `co-wplywa-na-cene-uszkodzonego-auta/index.html` |
| Zmodyfikowany | `docs/seo-maintenance.md` |
| Zmodyfikowany | `index.html` |
| Zmodyfikowany | `jak-przygotowac-auto-do-odbioru/index.html` |
| Zmodyfikowany | `jak-przygotowac-auto-do-wyceny/index.html` |
| Zmodyfikowany | `llms.txt` |
| Zmodyfikowany | `pomoc-drogowa-laweta-gliwice/index.html` |
| Zmodyfikowany | `scripts/test-contact-analytics.mjs` |
| Zmodyfikowany | `scripts/validate-site.mjs` |
| Zmodyfikowany | `skup-aut-bytom/index.html` |
| Zmodyfikowany | `skup-aut-chorzow/index.html` |
| Zmodyfikowany | `skup-aut-do-zlomowania-gliwice/index.html` |
| Zmodyfikowany | `skup-aut-katowice/index.html` |
| Zmodyfikowany | `skup-aut-knurow/index.html` |
| Zmodyfikowany | `skup-aut-mikolow/index.html` |
| Zmodyfikowany | `skup-aut-pyskowice/index.html` |
| Zmodyfikowany | `skup-aut-ruda-slaska/index.html` |
| Zmodyfikowany | `skup-aut-siemianowice-slaskie/index.html` |
| Zmodyfikowany | `skup-aut-sosnowiec/index.html` |
| Zmodyfikowany | `skup-aut-swietochlowice/index.html` |
| Zmodyfikowany | `skup-aut-tarnowskie-gory/index.html` |
| Zmodyfikowany | `skup-aut-tychy/index.html` |
| Zmodyfikowany | `skup-aut-uszkodzonych-gliwice/index.html` |
| Zmodyfikowany | `skup-aut-zabrze/index.html` |
| Nowy | `assets/form-config.js` |
| Nowy | `assets/images/illustration-1-320.webp` |
| Nowy | `assets/images/illustration-1-766.webp` |
| Nowy | `assets/images/illustration-1.jpg` |
| Nowy | `assets/images/illustration-2-320.webp` |
| Nowy | `assets/images/illustration-2-772.webp` |
| Nowy | `assets/images/illustration-2.jpg` |
| Nowy | `assets/images/illustration-3-320.webp` |
| Nowy | `assets/images/illustration-3-772.webp` |
| Nowy | `assets/images/illustration-3.jpg` |
| Nowy | `assets/valuation.js` |
| Nowy | `data/realizations.json` |
| Nowy | `docs/audit-20-urls.json` |
| Nowy | `docs/audit-20-urls.md` |
| Nowy | `docs/competitor-gap.md` |
| Nowy | `docs/form-backend.md` |
| Nowy | `docs/local-presence-and-links.md` |
| Nowy | `docs/realizations.md` |
| Nowy | `docs/seo-keyword-map.md` |
| Nowy | `docs/seo-v2-final-report.md` |
| Nowy | `docs/seo-v2-review.md` |
| Nowy | `partials/valuation-form.html` |
| Nowy | `scripts/render-realizations.mjs` |
| Nowy | `scripts/sync-forms.mjs` |
| Nowy | `scripts/test-realizations.mjs` |
| Nowy | `scripts/test-site-validation.mjs` |
| Nowy | `scripts/test-valuation.mjs` |
<!-- file-manifest:end -->
