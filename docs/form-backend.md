# Formularz wyceny — kod roboczy i uruchomienie

> Aktualny przegląd 13.11.2026: backend nadal jest wyłączony. Bieżące poprawki i ograniczenia opisuje [audyt kontaktu i czytelności dla wyszukiwarek](audyt-konwersja-ai-2026-11-13.md). Poniższe historyczne ceny i opisy wcześniejszych testów nie są aktualną ofertą dostawcy ani dowodem działania konta.

Stan: 12.11.2026. **Backend wyłączony. Nie utworzono konta ani usługi i nie poniesiono kosztów.** GitHub Pages nadal obsługuje stronę. W obecnej konfiguracji formularz przygotowuje wiadomość lokalnie, a klient wysyła ją ze swojej poczty. Zdjęcia trzeba dołączyć w poczcie. Telefon i SMS pozostają dostępne.

## Co jest przygotowane

| Element | Zachowanie |
| --- | --- |
| Pola wymagane | Telefon, miasto, marka, model. |
| Pola opcjonalne | Osoba kontaktowa, rok, stan, opis i zdjęcia. Wybór: zakup / organizacja przekazania do uprawnionej stacji. Osobny transport nie jest oferowany. |
| Kontekst | Miasto jest wypełnione na 13 stronach lokalnych; strona demontażu ma rodzaj demontaz; zachowany URL lawety dotyczy odbioru kupowanego auta i ma rodzaj skup. |
| Zdjęcia | Maksymalnie 5 plików JPG/PNG/WebP, do 5 MiB każdy i 20 MiB łącznie. Są to limity klienta, nie dowód serwerowej weryfikacji zawartości obrazu. |
| Wysyłka | Adapter `FormData` / HTTPS POST do zatwierdzonego endpointu Formspree. Bez kluczy API w przeglądarce, bez cookies w tym żądaniu, bez automatycznych ponowień. |
| Odpowiedź | Przyjęcie według oficjalnego przykładu Formspree: HTTP 2xx (`response.ok`), bez wymagania pola JSON `ok`. Błąd HTTP, sieci i timeout nie wyświetlają sukcesu. Backend nadal jest wyłączony; nie potwierdzono prawdziwej integracji konta. |
| Stan interfejsu | Przycisk blokowany podczas wysyłania; dane pozostają w formularzu przy błędzie. Potwierdzenie oznacza przyjęcie przez usługę, nie przeczytanie ani dostarczenie powiadomienia do skrzynki. |
| Spam | Ukryte pole `_gotcha`, sprawdzenie klienta i adaptera. Wymaga również filtrów i ograniczeń po stronie dostawcy. Sam JavaScript można ominąć. |
| Prywatność | Bez zapisu danych klienta do localStorage. Zdarzenia strony nie zawierają wartości pól ani nazw/treści zdjęć. |
| Analityka | `valuation_draft` dla wiadomości lokalnej; `valuation_received` dopiero po przyjęciu przez backend i tylko po zgodzie na statystyki. |

Pliki: `partials/valuation-form.html`, `assets/valuation.js`, `assets/form-config.js`, `scripts/sync-forms.mjs`. Formularz jest statycznie generowany do 20 istniejących plików HTML. Zmiany wspólnego fragmentu odtwarza polecenie:

```sh
node scripts/sync-forms.mjs
```

`assets/site.js` zachowuje poprzednią obsługę wiadomości jako fallback na wypadek niedostępności nowego modułu. Bez JavaScript dostępny jest bezpośredni kontakt. Formularz nie wysyła zwykłego GET z prywatnymi polami.

## Decyzja o usłudze

| Wariant | Koszt i zależności | Co pozostaje do zatwierdzenia |
| --- | --- | --- |
| Formspree z obsługą plików | Według cennika z 12.11.2026: Personal 15 USD/mies. albo 120 USD/rok; 200 zgłoszeń/mies. i 1 GB miejsca. Free nie obsługuje zdjęć. | Plan i rozliczenie, właściciel konta, adres odbiorczy, zasady danych, limity i test rzeczywistego odbioru. |
| Własny backend/serverless | Oddzielna usługa przyjmująca zgłoszenia, prywatne przechowywanie zdjęć, poczta, monitoring i utrzymanie. Nie wyceniono ani nie utworzono infrastruktury. | Dostawca, konto, budżet, region danych, retencja, obsługa błędów i administrator. Obecny adapter wymagałby dostosowania. |

Najprostsza propozycja do decyzji: Formspree z plikami. Nie jest to zakup ani zgoda na cykliczną płatność. Nie należy wybierać droższego planu tylko ze względu na nazwę funkcji „Custom Honeypot”: standardowe `_gotcha` opisano w dokumentacji jako dostępne we wszystkich planach.

Źródła dostawcy, odczytane 12.11.2026: [cennik](https://formspree.io/plans), [pliki i limity](https://help.formspree.io/articles/building-your-form/file-uploads/), [AJAX](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax/), [honeypot](https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering/).

## Konfiguracja pozostawiona wyłączona

`assets/form-config.js` ma `enabled: false`, pusty endpoint, `privacyNoticeApproved: false`, pusty adres informacji o danych i `previewPhotoUI: false`.

Samo podanie adresu usługi nie wystarcza do włączenia wysyłki. `canSend()` wymaga równocześnie zatwierdzonego trybu, dostawcy, endpointu HTTPS `formspree.io/f/…` i lokalnego adresu zatwierdzonej informacji o danych. Walidator strony sprawdza także istnienie jej pliku, gdy wysyłka jest włączona. To kontrola procesu przygotowania kodu, nie zastępstwo zabezpieczeń serwera.

Podgląd wewnętrzny ma osobną kopię konfiguracji z `previewPhotoUI: true`. Pokazuje pole zdjęć z jednoznaczną informacją, że pliki nie są przesyłane. Nie przenosić tej opcji do kodu produkcyjnego przed uruchomieniem backendu.

## Czynności po zgodzie właściciela, przed uruchomieniem

1. Potwierdzić odbiorcę zgłoszeń. Obecny publiczny kontakt to `automikulski@gmail.com`; nie zakładano nowej skrzynki.
2. W zatwierdzonym koncie utworzyć formularz i potwierdzić skrzynkę odbiorczą. Publiczny identyfikator formularza nie jest sekretnym kluczem API.
3. Ustawić po stronie usługi ograniczenie domeny, filtry spamu, walidację typu plików i reguły właściwe dla wybranego planu. Nie traktować atrybutu HTML `accept` jako ochrony serwera. W razie potrzeby zweryfikować CAPTCHA z dostawcą; obecny kod nie integruje widgetu CAPTCHA.
4. Uzgodnić administratora danych, cele i podstawy przetwarzania, odbiorców/podmioty przetwarzające, transfery danych, czas przechowywania, prawa i kontakt. Dopiero z rzeczywistych ustaleń przygotować i zatwierdzić informację dla klientów. Nie opublikowano zastępczej, wymyślonej polityki.
5. Ustawić retencję zgłoszeń i zdjęć oraz dostęp do nich. Nie włączać zapisywania zdjęć do publicznego repozytorium ani do analityki. Dane formularza nie stają się automatycznie materiałem do sekcji realizacji.
6. Przetestować rzeczywisty kontrakt odpowiedzi. Testy adaptera używają wyłącznie mocków HTTP, w tym sukcesu bez pola JSON ok oraz błędów mimo treści ok: true; nie potwierdzają działania konkretnego konta Formspree. Dostosować adapter do oficjalnej i zaobserwowanej odpowiedzi, jeśli jest inna. Sprawdzić zapis w panelu i odbiór powiadomienia oraz zdjęć.
7. Sprawdzić zgłoszenie bez zdjęć, z 1 i 5 zdjęciami, duże pliki, błędne dane, brak sieci, przekroczenie limitu, filtrowanie spamu i wolne połączenie. Timeout klienta wynosi obecnie 20 s; brak potwierdzenia nie dowodzi, że serwer niczego nie zapisał. Nie ponawiać automatycznie, sprawdzić ryzyko duplikacji.
8. Zweryfikować ustawienia automatycznych pomiarów w panelu GA4, zwłaszcza formularzy i linków. Testy kodu własnego nie są audytem całej konfiguracji usługi Google. Nie przekazywać treści mailto ani pól klienta do pomiaru.
9. Dopiero po poprawnych testach uzupełnić zatwierdzoną konfigurację, wykonać walidację i przedstawić zmianę do odrębnej zgody na publikację.

## Wykonane testy

`node scripts/test-valuation.mjs`: brak sieci przy wyłączonej konfiguracji; blokady endpointu i informacji o danych; pola, rok, typ/rozmiar/liczba plików; honeypot; odróżnienie potwierdzonego HTTP od błędów HTTP i sieci; odrzucenie nieoferowanego rodzaju transport. Wszystkie żądania były pozorowane.

W przeglądarce sprawdzono błędny telefon, rok, wiadomość i mailto, kopiowanie, wybór transportu, jedną kopię publicznej ilustracji oraz odrzucenie 6 plików, pliku ponad 5 MiB i pliku tekstowego. Nie wysłano e-maila, SMS-a ani rzeczywistego zgłoszenia.

## Potwierdzenie właściciela i korekta 13.11.2026

Odbiór własną lawetą dotyczy kupowanych aut. Firma nie oferuje osobnej pomocy drogowej, przewozów na zlecenie, wynajmu lawety ani obsługi całodobowej. Dopuszczalne rodzaje: skup i demontaz. Nie aktywowano konta ani płatnego planu.

## Bieżący przegląd adaptera i wiadomości — 13.11.2026

Aktualna [dokumentacja AJAX Formspree](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax/) opisuje bibliotekę `@formspree/ajax`; poprzednio przywoływany blog zmienił zawartość. Nie traktujemy go jako aktualnej specyfikacji odpowiedzi ręcznego adaptera. Zachowano kontrolę HTTP `response.ok`, bez wymuszania nieudokumentowanego pola JSON `ok`. Obsługa 429 jest zgodna z [dokumentacją limitów](https://help.formspree.io/articles/form-and-project-settings/system-limits/). Nie przeprowadzono prawdziwego POST ani odczytu konkretnego konta — integracja pozostaje niepotwierdzona i wyłączona. Przed aktywacją nadal obowiązują kroki 1–9 powyżej, w tym obserwacja odpowiedzi i odbioru powiadomienia; mocki potwierdzają tylko zachowanie kodu.

Po zmianie danych samochodu stara wiadomość i jej mailto są usuwane z interfejsu. Klient przygotowuje nową wiadomość z aktualnymi danymi. Ręczna edycja treści wiadomości pozostaje dostępna; ponowne przygotowanie identycznego tekstu nie liczy kolejnego zdarzenia `valuation_draft` w tej samej stronie. Wariant awaryjny sprawdza również markę, rok i honeypot oraz zachowuje imię i wybrany stan auta.

Formularz ma `method="post"` jako ochronę przed danymi w adresie URL w razie awarii obsługi zdarzeń; nie oznacza to uruchomienia backendu na GitHub Pages. Jest pokazywany dopiero po zarejestrowaniu obsługi JS. Dodano prośbę o nieprzekazywanie numeru PESEL i danych dokumentu. Pełna informacja o przetwarzaniu danych nadal wymaga rzeczywistych ustaleń administratora.

Własny GA4 pozostaje ograniczony do domen automikulski.pl i www.automikulski.pl oraz zgody użytkownika. Podglądy i localhost nie zasilają statystyk produkcyjnych. Ustawienia rozszerzonych pomiarów i kluczowych zdarzeń w panelu GA4 pozostają poza zakresem dostępu.
