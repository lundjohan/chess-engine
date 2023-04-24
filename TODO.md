  #TODO (Starting date: 24 of april 2023, 12:41)
  
  - Chess Engine. Man ska kunna spela mot den, och Engines ska kunna spela mot varandra. Det ska finnas olika svårighetsgrader. 
Flera utmaningar i detta.
  1. Grafiken. Jag tänker mig mkt enkel 8x8 i två färger. Och sen pjäser (jag antagligen bara nedladdat från Internet). Det ska funka att zooma, och det ska se bra ut.
  1.5 Du skulle kunna ha en enkel prompt baserad på tecken till att börja med,  t ex:

8

7

6

5

4

3

2

1  U+2656

    A    B    C    D    E    F    G    H






  2. Spelet ska kunna spelas antingen grafiskt (man drar pjäsen med musen dit man vill, eller kanske bättre: man trycker först på pjäsen/ rutan och sen på rutan dit man vill) eller via prompt squareFrom squareTo
  3. Regler för hur spelet fungerar. T ex så får inte en pjäs flytta utanför brädet. Två spelare av samma färg kan inte flytta till samma ruta etc.
  4. Det ska gå att spela två spelare mot varandra, eller human - computer eller computer - computer
  
  GUI:in
  Skulle kunna vara i HTML mha REACT, eller varför inte helt enkelt jQuery?
  Använd UNICODE för att printa pjäserna.

Steg 1.
  - Skriv ut i Browsern starting position, med bräde och alla pjäser.  

