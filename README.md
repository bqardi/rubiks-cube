# Professor Terning

### Hvordan man løser en Rubiks Cube/professor terning.
:scroll:På https://bqardi.github.io/professor/ vil jeg vise dig den nemmeste måde at løse en professor terning/Rubiks Cube på, med udførlige trin for trin forklaringer.

:1st_place_medal:[Min metode](https://bqardi.github.io/professor/my-method.html) -siden indeholder den metode jeg bruger til at løse terningen på, som er lidt mere avanceret end begyndermetoden. Den indeholder også en liste over de algoritmer, jeg personligt bruger/foretrækker sammen med forklaringer på forskellige fingerteknikker og metoder til at blive hurtigere til at løse terningen.

:jigsaw:Du kan også finde et [lille program](https://bqardi.github.io/professor/online-cube.html), jeg har lavet i [Unity](https://unity.com/), hvor du kan prøve at løse en professer terning på tid, ved at pege med musen på en side og så dreje med WASD tasterne på keyboardet (fungerer bedst på stor skærm/desktop og links til denne side er derfor skjult på mobil).

:hourglass_flowing_sand:Jeg har lavet en [timer](https://bqardi.github.io/professor/timer.html), som specifikt er lavet til at måle din tid med en fysisk terning.
* Den indeholder en algoritme-blandings-generator der genererer en tilfældig algoritme du kan bruge til at blande din terning med (denne algoritme bliver "gemt" sammen med dine tidsregistreringer).
* Ifølge officielle regler ved speedcubing konkurrencer har man 15 sekunder til at inspicere terningen før man går i gang med at løse. Derfor har jeg inkorporeret en countdown tæller der tæller ned fra 15 sekunder før tiden går i gang (man kan trykke i feltet for at starte timeren før tid).
* Når man stopper tiden, sammenlignes tiden med dine andre tider og bliver sorteret på en liste over alle dine tider (tryk på :stopwatch: stopur-ikonet for at se listen).
* Der er også en indikator til at sammenligne din nuværende tid med din rekordtid, som vises mens timeren kører (rød gradient box der fader ind og bliver mere og mere tydelig jo tættere du kommer på din rekord tid. Den skifter til komplet rød farve når du overskrider din rekordtid).
---
### Opbygning
Siden er lavet med semantisk HTML og med ekstern CSS styling.

Hero billedet er tegnet af vores ældste søn, Simon (og er det eneste reele billede der er på samtlige sider), og terningen er udelukkende bygget med CSS. Den er animeret med CSS animations for at dreje den rundt (i 3D space).

JavaScript er benyttet til menuen på mobil, til timeren, til forskellige knapper og så er jeg for nyligt blevet introduceret for [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) (tak [Ronny](https://github.com/ronfrontweb) fordi du fandt denne geniale API).

Intersection Observer er en API der "observerer" eller "holder øje" med HTML-elementerne på siden og når et element "kommer til syne" i viewporten (eller et andet specificeret forældre-element) fyrer observeren en event af.
* Denne event har jeg brugt til at animere mine "CSS konstruerede billeder" ind på plads når man scroller ned til dem.
* Den er også brugt til min To Top knap, som er skjult når man er scrollet helt op til toppen af siden og når man scroller helt ned til footeren, skifter den fra `position: fixed;` til `position: absolute;`, så den ikke "er i vejen" for footeren.

Held og lykke med løsning af professor terningen.
