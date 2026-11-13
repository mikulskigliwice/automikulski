# SEO lokalne Auto Mikulski — utrzymanie

## Struktura strony

- Gliwice: strona główna.
- 13 podstron miast: Zabrze, Bytom, Chorzów, Katowice, Knurów, Mikołów, Pyskowice, Ruda Śląska, Siemianowice Śląskie, Świętochłowice, Tarnowskie Góry, Tychy, Sosnowiec.
- Dwie strony usług: skup aut uszkodzonych i skup aut do złomowania.
- Trzy poradniki: przygotowanie wyceny, czynniki wpływające na cenę, przygotowanie odbioru.
- Istniejąca strona kontaktu w sprawie lawety.
- `sitemap.xml` zawiera 20 publicznych adresów. Stare wersje i strony testowe pozostają poza mapą oraz mają `noindex`.

Treść strony jest w plikach HTML. Wspólne style: `assets/site.css`; menu i pomiar: `assets/site.js`; formularz: `assets/valuation.js` i wyłączona konfiguracja `assets/form-config.js`. Wspólny HTML formularza jest w `partials/valuation-form.html`; po edycji uruchomić `node scripts/sync-forms.mjs`. Przy zmianie zasobów należy zaktualizować parametr wersji w odnośnikach. [Raport v2](seo-v2-final-report.md), [backend formularza](form-backend.md), [prawdziwe realizacje](realizations.md).

Nie dopisywać oddziałów, niepotwierdzonych realizacji, ocen, godzin pracy, cen ani obietnic bezpłatnego transportu. Podstrony miast przedstawiają obszar dojazdu. Oferta skupu na umowę nie jest równoznaczna z wydaniem zaświadczenia o demontażu. Właściciel potwierdził współpracę ze stacją i możliwość organizacji przekazania pojazdu oraz uzyskania zaświadczenia od stacji. Nie przedstawiać Auto Mikulski jako stacji ani wystawcy dokumentu. Wersja v2 jest propozycją na gałęzi seo-rozbudowa-v2; publikacja wymaga odrębnej zgody właściciela.

## Pomiar kontaktu w Google Analytics

Zachowana usługa GA4: `G-2TNQWT3SF9`. Zdarzenia są wysyłane dopiero po wyrażeniu zgody na statystyki. Wycofanie zgody zatrzymuje pomiar.

| Zdarzenie | Co faktycznie mierzy |
| --- | --- |
| `phone_click` | Kliknięcie odnośnika do numeru firmy; nie potwierdza wykonania ani odebrania połączenia. |
| `sms_click` | Kliknięcie odnośnika otwierającego SMS. |
| `email_click` | Kliknięcie odnośnika otwierającego pocztę. |
| `valuation_draft` | Przygotowanie treści wiadomości lokalnie w formularzu; nie oznacza wysłania zapytania. |
| `valuation_received` | Kod przygotowany na przyszłe przyjęcie przez zatwierdzony backend; obecna wyłączona konfiguracja nie emituje tego zdarzenia. Nie potwierdza odebrania telefonu ani zakupu auta. |

Parametry `page_city`, `page_type`, `link_location` opisują stronę i położenie linku. Formularz nie przekazuje do zdarzeń numeru klienta, opisu samochodu ani wpisanego miasta. Nie dopisywać takich danych do analityki.

Aby analizować te parametry w raportach GA4, właściciel usługi może skonfigurować odpowiednie definicje niestandardowe o zakresie zdarzenia. Sam kod nie zmienia ustawień panelu GA4. Dane o kliknięciach nie zastępują rejestru odebranych telefonów i zakupionych samochodów.

## Search Console i ocena wyników

Search Console i OpenSEO są odłożone zgodnie z decyzją właściciela. Nie wymagać ich teraz. W późniejszym etapie dane usługi `automikulski.pl` można udostępnić przez obsługiwaną integrację lub eksport; nie wymagać podawania hasła do Google.

Mapa do zgłoszenia: `https://automikulski.pl/sitemap.xml`. Raport map i indeksowania pokaże, które adresy Google pobrał i zindeksował. Publikacja plików ani dodanie mapy nie gwarantują indeksowania lub pozycji.

Przed kolejnymi zmianami zestawiać porównywalne okresy, np. 28 dni względem poprzednich 28 dni: wyświetlenia, kliknięcia, zapytania lokalne, strony wejścia i kliknięcia telefonu. Uwzględnić sezonowość i datę wdrożenia. `llms.txt` jest uzupełniającym opisem oferty, nie zgłoszeniem do indeksu ani gwarancją polecania firmy.

## Materiały potrzebne od właściciela

1. Telefon potwierdzony przez właściciela: 517 936 676. Zachować ten numer.
2. Aktualne zdjęcia rzeczywistych odbiorów z modelem auta, miejscowością i krótkim opisem sytuacji. Nie przypisywać zdjęć do miast bez potwierdzenia.
3. Aktualne zasady wyceny i odbioru, godziny kontaktu oraz informacje o usługach, które firma rzeczywiście wykonuje.
4. Dostęp do danych Search Console i GA4, jeżeli mają być oceniane wyniki.

## Kontrole przed publikacją

```sh
node scripts/validate-site.mjs
node scripts/test-site-validation.mjs
node scripts/test-contact-analytics.mjs
node scripts/test-valuation.mjs
node scripts/test-realizations.mjs
git diff --check
```

Kontrole sprawdzają mapę, metadane, linki/kotwice, FAQ, osiągalność, błędne przypadki, zgodę i pomiar, formularz i dane realizacji. Przed publikacją sprawdzić wszystkie 20 URL i kontakt na telefonie. Rzeczywista wysyłka wymaga osobnego testu integracji z zatwierdzonym backendem. Po osobno zatwierdzonej publikacji ponownie sprawdzić stronę, zasoby i formularz; nie zastępować testów przeglądarkowych samym walidatorem.

## Źródła nazw dzielnic i obszarów

Nazwy sprawdzone 12 listopada 2026. Nie są deklaracją posiadania oddziałów.

- Gliwice: https://gliwice.eu/aktualnosci/dzieje-sie/gliwiczanie-aktywni-w-budzecie-obywatelskim-jest-wiecej-wnioskow-niz-przed
- Zabrze: https://miastozabrze.pl/miasto/miasto/dzielnice/
- Bytom: https://www.bytom.pl/bip/rada-miejska/radni-w-okregach
- Chorzów: https://turysta.chorzow.eu/locations/ulice
- Katowice: https://bip.katowice.eu/RadaMiasta/JednostkiPomocnicze/default.aspx
- Knurów: https://gzmetropolia.pl/knurow/
- Mikołów: https://bip.mikolow.eu/mapa-strony
- Pyskowice: https://www.pyskowice.pl/files/pl/lokalny-program-rewitalizacji/259lprmiastapyskowicedo2023.pdf
- Ruda Śląska: https://www.rudaslaska.pl/ruda-slaska/odkryj-rude-slaska/wizytowka-miasta
- Siemianowice Śląskie: https://siemianowice.pl/2026/05/rusza-budzet-obywatelski-na-2027-r/
- Świętochłowice: https://swietochlowice.pl/miasto/dokumenty-strategiczne/strategia-rozwoju-miasta-swietochlowice-do-2030-roku/
- Tarnowskie Góry: https://botg.tarnowskiegory.pl/o-budzecie/grupy-dzielnic
- Tychy: https://bip.umtychy.pl/osiedla
- Sosnowiec: https://www.sosnowiec.pl/2026/06/aktualnosci/62471/ oraz https://www.biblioteka.sosnowiec.pl/index.php/lokalizacje/zaglebiowska-mediateka

Dokumentacja:

- Linki: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Treści przydatne: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Zasady spamu: https://developers.google.com/search/docs/essentials/spam-policies
- Mapy w Search Console: https://support.google.com/webmasters/answer/7451001?hl=pl
- Zdarzenia GA4: https://developers.google.com/analytics/devguides/collection/ga4/events
