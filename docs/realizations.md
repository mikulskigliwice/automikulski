# Dodawanie prawdziwych realizacji

Mechanizm jest przygotowany; `data/realizations.json` zawiera obecnie **0 wpisów**. Sekcja nie pojawia się przy pustych danych. Nie dopisano demonstracyjnych samochodów do danych strony. Dotychczasowe trzy grafiki oferty są oznaczone jako ilustracje i nie są realizacjami.

Właściciel może przekazać zdjęcia wraz z marką, modelem, miastem, rodzajem usługi i krótkim opisem odbioru. Nie musi samodzielnie edytować JSON. Na podstawie zatwierdzonych materiałów można przygotować kolejny przegląd na gałęzi roboczej.

## Dane jednego rzeczywistego wpisu

| Pole | Wymaganie |
| --- | --- |
| `id` | Unikalny identyfikator: małe litery, cyfry i pojedyncze łączniki. Bez numeru rejestracyjnego i danych klienta. |
| `brand`, `model` | Rzeczywiste dane samochodu. |
| `year` | Opcjonalna liczba całkowita; nie zgadywać rocznika. |
| `city` | Rzeczywista miejscowość; dla wyświetlenia lokalnego dokładnie taka sama nazwa jak w `data-page-city` danej strony. |
| `condition` | Krótki, potwierdzony stan auta. |
| `description` | Rzeczywisty przebieg odbioru, bez adresu klienta, numerów dokumentów i danych osobowych. |
| `service` | `skup`, `demontaz` albo `transport`, zgodnie z wykonaną usługą. `demontaz` jest opisany jako organizacja przekazania do stacji. |
| `photos` | Od 1 do 5 obiektów `src`, `alt`. Lokalne JPG/JPEG/PNG/WebP w `/assets/realizations/`. |
| `approvedForPublication` | `true` dopiero po potwierdzeniu autentyczności i praw do publikacji. |
| `platesAndPersonalDataChecked` | `true` dopiero po rzeczywistym sprawdzeniu tablic, dokumentów, osób, oznaczeń i metadanych plików. Samo pole nie wykonuje anonimizacji. |

Walidator sprawdza wymagane dane, długości, zakres roku, identyfikatory, brak duplikatów, dozwolone ścieżki i istnienie lokalnych obrazów. Treści są escapowane przy generowaniu HTML. Nie potrafi ocenić praw do fotografii, autentyczności opisu ani odnaleźć tablic na zdjęciu — to wymaga sprawdzenia materiałów.

## Procedura przygotowania

1. Potwierdzić prawdziwą usługę, miejscowość, zgodę na publikację i prawa do zdjęć. Nie przejmować zdjęć klientów ani cudzych fotografii z Map Google bez właściwej podstawy.
2. Przygotować kopie zdjęć do strony. Usunąć/zanonimizować dane identyfikujące, sprawdzić metadane, zachować oryginały poza publicznym repozytorium. Nadać nazwy bez danych osobowych i tablic.
3. Dodać zatwierdzone pliki do `assets/realizations/` i dane wpisu do tablicy `items` w `data/realizations.json`, zachowując `version: 1`.
4. Uruchomić generowanie i kontrolę:

```sh
node scripts/render-realizations.mjs
node scripts/validate-site.mjs
node scripts/test-realizations.mjs
git diff --check
```

5. Sprawdzić obrazy, kadrowanie, opisy, kolejność i przewijanie galerii w podglądzie desktopowym oraz na telefonie. Przed pierwszym wpisem potrzebny jest taki test na prawdziwych materiałach.
6. Przedstawić zmiany do akceptacji. Nie scalać z `main` i nie publikować bez zgody.

## Wyświetlanie

Skrypt generuje statyczny HTML między znacznikami `realizations:start/end`: na stronie głównej i 13 stronach miast. Strona główna pokazuje maksymalnie 6 pierwszych wpisów, strona miasta maksymalnie 6 pasujących wpisów. Kolejność danych decyduje o kolejności kart; nowe materiały należy umieszczać świadomie.

Układ ma dwie kolumny na dużym ekranie i jedną na wąskim. Zdjęcia w karcie można przewijać poziomo. Zarezerwowany jest obszar obrazów o proporcjach 3:2; przed publikacją sprawdzić kadrowanie. Nie powstają nowe podstrony samochodów, brak pustych linków i osobnej mapy galerii.

Testy używają wyłącznie izolowanych plików technicznych w katalogu tymczasowym: pusty zbiór, filtrowanie miasta, escapowanie HTML, wymagane zatwierdzenia, błędne ścieżki, brak obrazu i duplikat ID. Żaden test nie dodaje fikcyjnego odbioru do strony.
