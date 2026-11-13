# Końcowy przegląd przed publikacją — 13.11.2026

**Ocena: GOTOWE DO PUBLIKACJI po potwierdzeniu tej wersji przez właściciela.** Main i backup pozostają na a79e402528cc0e9f5ce5ce5e4b28c303f1d8bcf0. Nie scalono PR nr 1 i nie opublikowano nowej automikulski.pl.

Ten dokument aktualizuje wcześniejsze raporty v2. Wiążące potwierdzenie właściciela: skup aut używanych, uszkodzonych, powypadkowych, niesprawnych i do złomowania; odbiór kupowanych pojazdów własną lawetą; brak osobnej pomocy drogowej, przewozu na zlecenie, wynajmu lawety i obsługi całodobowej. Zaświadczenie wystawia uprawniona stacja demontażu.

## Dokładny zakres poprawek

- Przejrzano 20 istniejących stron i wspólne pliki. Usunięto wybór osobnego transportu, zależne opisy, dawny typ strony transport oraz taką usługę w przyszłych realizacjach.
- Zachowano /pomoc-drogowa-laweta-gliwice/ i jego self-canonical. Strona opisuje skup z odbiorem kupowanego auta własną lawetą. Zmieniono title, description, OG, H1, treść, pięć FAQ, okruszki i encję Service. Nie reklamuje osobnej pomocy drogowej i usług całodobowych.
- Nie wdrożono przekierowania HTTP 301, meta-refresh ani JavaScript redirect. Nie utworzono nowego konkurującego URL. Zachowany adres jest rozwiązaniem przejściowym dla istniejących wejść i linków.
- Na pozostałych stronach doprecyzowano odbiór w ramach zakupu i etykiety linków. Główna wyraźnie obejmuje samochody używane oraz odbiór własną lawetą. Zachowano poprawne lokalne tytuły, H1, adresy i wartościowe treści.
- Formularz i walidacja obsługują tylko skup lub demontaz. Uproszczono generator formularzy oraz poprawiono starszy fallback JS, aby zachowywał wybór przekazania do stacji.
- Zmieniono obsługę przyszłej odpowiedzi Formspree: oficjalny przykład AJAX opiera sukces na HTTP response.ok, bez obowiązkowego pola JSON ok. Testy obejmują brak tego pola, pustą poprawną odpowiedź i błędy HTTP mimo treści ok: true.
- Backend, endpoint i pole zdjęć pozostają wyłączone w konfiguracji. Wiadomość jest przygotowywana lokalnie; komunikat mówi, że nie została wysłana. Klient sam otwiera pocztę i wysyła e-mail. Nie aktywowano konta ani płatnego planu.
- Zachowano telefon 517 936 676 i GA4 G-2TNQWT3SF9. Własne zdarzenia nie zawierają danych klienta. Nie zmieniano ustawień konta Google.
- Zaktualizowano lastmod 20 adresów i daty modyfikacji poradników. Robots.txt pozostał bez zmiany; produkcyjne HTML są indeksowalne.
- Dodano blokady w walidatorze na fałszywą pomoc drogową/usługi całodobowe oraz nieoferowane opcje formularza. Archiwalny audyt zachowano jako dowód z datą, oznaczając nowy, wiążący zakres.
- Nie usunięto żadnego pliku ani historii. Zmiany kodu strony zapisuje się wyłącznie na seo-rozbudowa-v2 w PR nr 1.

## Formspree — podstawa zmiany

[Oficjalny przykład Formspree, sprawdzony 13.11.2026](https://formspree.io/blog/formspree-ajax/) pokazuje if (response.ok) dla przyjęcia żądania. Nie wymaga odczytania result.ok === true. [Aktualna dokumentacja AJAX](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax/) opisuje też oficjalną bibliotekę do obsługi formularzy.

To weryfikacja opublikowanego kontraktu przykładu, a nie test prawdziwego konta. Nie wysłano zgłoszenia do Formspree. Przed ewentualną aktywacją usługi nadal wymagane będą decyzja o koncie, informacja o danych i rzeczywisty test przyjęcia/powiadomień/załączników.

## Końcowa kontrola SEO

20 URL pozostaje bez zmiany. Jeden H1, unikalne title/description, canonicale, og:url, JSON-LD, zgodność FAQ, zasoby, linki, kotwice i osiągalność od głównej przechodzą walidację. Brak przypadkowego noindex na stronach produkcyjnych; stare pliki testowe zachowują noindex i są poza mapą.

Przejrzano treści pod kątem [Search Essentials](https://developers.google.com/search/docs/essentials) oraz [Spam Policies](https://developers.google.com/search/docs/essentials/spam-policies). Nie dodano nowych stron miast, fikcyjnych oddziałów, ocen, realizacji ani uprawnień. Lokalne strony pozwalają skontaktować się i przygotować wiadomość na miejscu, zamiast wymuszać przejście do jednej docelowej strony.

13 stron miast nadal korzysta z częściowo wspólnego szablonu, z własnymi wstępami, obszarami i przydatnymi pytaniami. Nie ma podstaw do gwarancji, że Google nie oceni części treści jako zbyt podobnej; warto rozwijać je prawdziwymi materiałami, gdy będą dostępne. Nie mnożono URL dla odmian fraz i nie dopisywano fikcyjnych lokalnych doświadczeń.

Zachowanie adresów i canonicali ogranicza ryzyko migracji, ale nie gwarantuje niezmiennych pozycji Google.

## Testy automatyczne

Wykonano na Node v24.22.1:

- node scripts/validate-site.mjs — PASS, 20 URL.
- node scripts/test-site-validation.mjs — PASS, poprawna kopia i 13 izolowanych regresji.
- node scripts/test-contact-analytics.mjs — PASS, zgody, oba tryby JS, poprawny rodzaj zgłoszenia, brak danych klienta we własnych zdarzeniach.
- node scripts/test-valuation.mjs — PASS, dozwolone usługi, brak sieci przy wyłączonej konfiguracji, pola, pliki, blokady endpointu/prywatności, kontrakt HTTP i błędy. Sieć mockowana.
- node scripts/test-realizations.mjs — PASS, brak pustej galerii, filtrowanie, escaping, kontrole plików, odrzucenie osobnego transportu.
- git diff --check — PASS.

W fazie przygotowania test regresji wykazał błędnie skonstruowaną mutację JSON-LD w samym teście: dodany drugi klucz description był nadpisywany przez istniejący klucz. Poprawiono przypadek testowy na zmianę serviceType i dodano kontrolę, czy mutacja zmienia fixture. Końcowy pakiet testów przechodzi.

## Testy przeglądarkowe

Wyniki: [final-browser-checks.json](final-browser-checks.json).

- Wszystkie 20 stron przy viewport 375 px i wszystkie 20 przy 1280 px.
- Dodatkowo pięć istotnych stron przy 320 px: główna, Świętochłowice, uszkodzone, demontaż i odbiór lawetą.
- Łącznie 45 sprawdzeń. Bez końcowego poziomego przepełnienia; menu mobilne rozwija się i zamyka po przejściu do kontaktu; FAQ działa.
- Na każdej stronie sprawdzono blokadę pustych pól, oba dozwolone rodzaje zgłoszenia, przygotowanie niewysłanej wiadomości, link mailto, prawidłowy telefon i ukrycie nieaktywnego pola zdjęć.
- Dodatkowo sprawdzono błędny telefon/rok i rzeczywiste kopiowanie lokalnego tekstu do schowka.
- W sprawdzonych załadowanych obrazach brak uszkodzonych plików. Istnienie wszystkich plików src/srcset sprawdza także walidator.
- Nie wykonano rozmowy, wysłania SMS/e-maila ani zewnętrznego zgłoszenia.

Metoda: desktopowy Chromium i ramka z rzeczywistym viewport CSS 375/1280/320 px. Nie jest to fizyczny Android/iOS ani emulacja dotyku. Żądania usługi formularza pozostają wyłączone.

## Lighthouse i ograniczenia

Uruchomiono Lighthouse CLI 13.6.0. Próba zakończyła się błędem chrome-launcher: waiting for dynamic debugging port. Osobny odczyt HTTP lokalnego podglądu z procesu powłoki zwracał Connection refused, mimo dostępności podglądu w przeglądarce środowiska.

Nie obchodzono ograniczeń środowiska. Brak miarodajnego wyniku Lighthouse, LCP, INP i CLS. Nie ogłaszamy 100/100 ani potwierdzonego braku regresji CWV. Dotychczasowe ograniczenia pełnego audytu WCAG i konfiguracji GA4 pozostają.

## Prywatny podgląd

[Otwórz prywatny podgląd](https://automikulski-podglad-20261113.gracefuljelly3.chatgpt.site)

To kopia do zatwierdzenia; nie zmienia domeny i hostingu produkcyjnej automikulski.pl. Dostęp ma wyłącznie właściciel na swoim koncie ChatGPT: potwierdzono owner, custom, 1 dozwolone konto i 0 zewnętrznych odwiedzających. Wymagana jest kontrola dostępu platformy, niezależnie od dodatkowych noindex/robots.

Prywatna wersja jest kopią tych samych sprawdzonych 20 HTML i zasobów, z dodanym paskiem podglądu i zakazem indeksowania. Konfiguracja formularza pozostaje wyłączona; nie jest to demonstracja działającego backendu.

## Co pozostaje po stronie właściciela

Obejrzeć tę wersję i potwierdzić publikację. Dopiero potem można scalić PR nr 1 i sprawdzić wdrożenie produkcyjne.

Nie wymagamy obecnie płatnego formularza ani materiałów galerii: niedokończone funkcje są bezpiecznie wyłączone. Prawdziwa integracja formularza, autentyczne realizacje, pełne pomiary wydajności i późniejsza analiza Search Console to dalsze zadania, nie deklarowane jako ukończone.
