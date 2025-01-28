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
Hat der Spieler bei einem Loch Par + 2 Schläger oder noch mehr gebraucht, so erhält er 0 Stableford Punkte.  
Bei Par +1 bekommt er 1, bei Par 2, bei Par -1 3, usw..
Dies entspricht dem Brutto-Ergebnis nach Stableford--Wertung.

Zusätzlich kann auch ein Netto-Ergebnis berechnet werden. Hierfür wird einfach das Par um die Anzahl der Vorgabeschläge erhöht.
Dies entspricht dann dem persönlichen Par. Auch hier gilt wieder >= pPar +2 = 0 Punkte, pPar +1 = 1, pPar = 2, etc..

## Das alte System

Im alten System startet jeder Spieler bei einem Handicap von -54, höher ist besser. Die Anpassung des Handicaps wurde ausschließlich auf Basis der
Netto(?)-Stableford-Wertung berechnet. Andere Spielformen mussten in diese umgerechnet werden.  

Die Anpassung des Handicaps erfolgte basierend auf der Vorgabeklasse(1-6, 6 schlechteste), also dem definierten Interval, indem das Handicap liegt.  
Diese Klassen definieren, um wie viel sich das Handicap pro Stableford-Punkt, der mehr als 36 erziehlt wurde, verbessert.  
Außerdem kann ab Klasse 4 das Handicap schlechter werden, wenn weniger Stableford-Punkte als die pro Klasse definierte Pufferzone erreicht werden.
Die Verschlechterung ist immer pauschal 0,1 Punkte.  

Die genauen Klassen findet ihr unter https://de.wikipedia.org/wiki/Handicap_(Golf)#Berechnungsmethode_im_alten_EGA-Vorgabensystem

Ablauf für die Berechnung ist heir also:  
Course Handicap -> Loch-Handicap -> netto(?) SFP pro Loch -> SFP zusammenzählen -> in Tabelle schauen und Handicap anpassen.

## Das neue System




