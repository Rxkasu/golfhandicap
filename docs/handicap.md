# Der Handicap-Index (ehem. Stammvorgabe): 

## Course Handicap (ehem. Spielvorgabe):   
Grundsätzlich muss zuerst das Course Handicap berechnet werden:

$$\text{Course Handicap} = \text{Handicap-Index} * { \text{Slope Rating} \over 113 } + \text{Course Rating} - \text{Par}$$

Der Handicap-Index ist hier das persönliche Handicap vor dem Spiel, die anderen Parameter sind Course-spezifisch.  
Um hieraus das Handicap der einzelnen Löcher (auch Vorgabeschläge) zu berechnen wird das Course Handicap auf die  
Löcher nach dem Round-Robin-Prinzip anhand des relativen Schwierigkeitsgrads der Löcher verteilt.  
Dieser ist in der Regel angegeben (1-18, 1 schwerstes Loch, manchmal auch HCP1, Hdc1, Handicap 1, etc ).      
Man macht also der Reihe nach einen Strich bei den Löchern beginnend beim Schwersten und zieht 1 vom Course Rating ab, solange
bis man bei 0 ankommt. Die Anzahl der Striche sind dann die Vorgabeschläge.  
Zur Berechnung würde ich sagen teilst du das Course Handicap durch 18, rundest ab, und für die ersten Course Handicap modulo 18
Löcher rechnest du noch eins drauf.

Also etwa so

    floor(CH / 18) + ( HCP <= CH % 18 ? 1 : 0)

## Stableford Punkte (SFP)

Grundsätzlich werden Stableford-Punkte nach folgendem Prinzip verteilt.  
Hat der Spieler bei einem Loch Par + 2 Schläge oder noch mehr gebraucht, so erhält er 0 Stableford Punkte.  
Bei Par +1 bekommt er 1, bei Par 2, bei Par -1 3, usw..

Zusätzlich kann auch ein Netto-Ergebnis berechnet werden. Hierfür wird einfach das Par um die Anzahl der Vorgabeschläge erhöht.
Dies entspricht dann dem persönlichen Par. Auch hier gilt wieder >= pPar +2 = 0 Punkte, pPar +1 = 1, pPar = 2, etc..

## Das alte System

Im alten System startet jeder Spieler bei einem Handicap von -54, höher ist besser (also weniger minus, -4 besser als -20). Die Anpassung des Handicaps wurde ausschließlich auf Basis der
Netto(?)-Stableford-Wertung berechnet. Andere Spielformen mussten in diese umgerechnet werden.  

Die Anpassung des Handicaps erfolgte basierend auf der Vorgabeklasse(1-6, 6 schlechteste), also dem definierten Interval, indem das Handicap liegt.  
Diese Klassen definieren, um wie viel sich das Handicap pro SFP, der mehr als 36 erziehlt wurde, verbessert.  
Außerdem kann ab Klasse 4 das Handicap schlechter werden, wenn weniger Stableford-Punkte als die pro Klasse definierte Pufferzone erreicht werden.
Die Verschlechterung ist immer pauschal 0,1 Punkte.  

Die genauen Klassen findet ihr unter https://de.wikipedia.org/wiki/Handicap_(Golf)#Berechnungsmethode_im_alten_EGA-Vorgabensystem

Ablauf für die Berechnung ist hier also:  
Course Handicap -> Loch-Handicap -> Netto(?)-SFP pro Loch -> SFP zusammenzählen -> in Tabelle schauen und Handicap anpassen.

Für 9-Loch Runden werden für die nicht gespielten 9 Löcher pauschal 18 SFP addiert. Allerdings werden 9-Loch Runden nur für die Klassen 2-6 gewertet.

## Das neue System

Im Gegensatz zum alten System dreht sich im neuen System das Vorzeichen, also 20 ist schlechter als 4.
Im neuen System hat ein neuer Spieler gar kein Handicap. Stattdessen wird pauschal ein Course Handicap von 54 angenommen, was 3 Vorgabeschlägen pro Loch entspricht.  
Ein Handicap erhält ein Spieler, sobald er eine Runde mit einem Ergebnis abschließt, das dem maximalen Handicap-Index von 54 entspricht. Dies bedeutet aufgrund der
Anpassung bei unter 20 Spielen, dass das Score Differental (SD) kleiner oder gleich 56 sein muss.  
Mehr zur Anpassung bei unter 20 Spielen findet ihr hier: https://gchp.de/ihr-einstieg-in-den-handicap-index/

Ab 20 Spielen entspricht der Handicap-Index dem Mittel über die niedrigsten 8 SDs der letzten 20 gespielten Runden.  


Im neuen System sind 9-Loch-Runden auch für Klasse 1 gewertet. Die Berechnung des SDs für 9-Loch Runden ist etwas anders, hier muss der Anteil der anderen 9 Löcher berechnet werden.  
Mehr dazu hier unter 4.: https://www.golf.de/regeln/i6056_1_FAQ_Handicap_Regeln.html

Auf einer Seite hab ich was gelesen von wegen dass auch beim neuen System ähnlich wie beim altennur Runden gezählt werden, welche das Handicap nicht verschlechtern, solange man über 24 ist.  
Da ich aber nicht weiß, wie das umgesetzt werden sollte und ich es auch nur einmal gelesen habe würde ich das erstmal ignorieren.

### Gewertetes Bruttoergebnis
#### Zählspiel begrenzt durch Netto-Doppelbogey
Im Zählspiel wird pro Loch maximal der Netto-Doppelbogey, also pPar + 2 gewertet, also

$$ \text{Score} = \min(\text{Schläge}, \text{Par} + \text{Vorgabe} + 2)$$

Das gewertete Bruttoergebnis ist die Summe aller Scores für die ganze Runde.

$$ \text{gewertetes Bruttoergebnis} = \sum_{i=1}^{18} \text{Score}_i$$

#### Stableford
Mit SFP berechnet sich das gewertete Bruttoergebnis wie folgt:  

$$ \text{gewertetes Bruttoergebnis} = \text{Par} + \text{Course Handicap} + 36 - \sum_{i=1}^{18} \text{SFP}_i$$

### Score Differential (SD)

Das Score Differential berechnet sich wie folgt:

$$\text{SD} = (\text{gewertetes Bruttoergebnis} - \text{Course Rating} - \text{Course Rating Korrektur}) * { 113 \over \text{Slope Rating}}$$

SDs werden kaufmännisch auf die erste Nachkommazahl gerundet.

---




