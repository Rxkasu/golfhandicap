Hier ein Vorschlag wie die Datenbank-Struktur zusammengesetzt aussehen könnte

    {
        "user_id": 1,
        "surname": "Maximus",
        "first_name": "Plebertus",
        "games": [
            {
                "game_id": 1,
                "course_name": "Pleb Golf Club Course",
                "date": "2025/04/01",
                "course_rating": 70.9,
                "slope_rating": 115,
                "holes": [
                    {
                    "hole_id": 1,
                    "par": 3,
                    "hcp": 4,
                    "hits": 5
                    }
                ]
            }
        ]
    }

Das ließe sich anhand des ersten Arrays unterteilen in zwei Tabellen.

Spieler-Daten:

    {
        "user_id": 1,
        "surname": "Maximus",
        "first_name": "Plebertus",
        "games": [
            {
                "game_id": 1,
            },
            {
                "game_id": 8,
            },
            {
                "game_id": 221,
            }
        ]
    }

Spiel-Daten:

    {
        "game_id": 1,
        "course_name": "Pleb Golf Club Course",
        "date": "2025/04/01",
        "course_rating": 70.9,
        "slope_rating": 115,
        "holes": [
            {
                "hole_id": 1,
                "par": 3,
                "hcp": 4,
                "hits": 5
            },
            {
                "hole_id": 2,
                "par": 3,
                "hcp": 4,
                "hits": 5
            },
            {
                "hole_id": 3,
                "par": 3,
                "hcp": 4,
                "hits": 5
            },
            {
                "hole_id": 4,
                "par": 3,
                "hcp": 4,
                "hits": 5
            },
            {
                "hole_id": 5,
                "par": 3,
                "hcp": 4,
                "hits": 5
            },
            {
                "hole_id": 6,
                "par": 3,
                "hcp": 4,
                "hits": 5
            },
            {
                "hole_id": 7,
                "par": 3,
                "hcp": 4,
                "hits": 5
            },
            {
                "hole_id": 8,
                "par": 3,
                "hcp": 4,
                "hits": 5
            },
            {
                "hole_id": 9,
                "par": 3,
                "hcp": 4,
                "hits": 5
            },
        ]
    }

Alles andere sollte sich daraus berechnen lassen.  
Man könnte das noch in eine dritte Tabelle für die Löcher aufsplitten, dann müsste man aber den Objekten die game_id mitgeben da hole_id nicht unique ist.

Zusätzlich könnte man eine Tabelle über Golfkurse führen, auf denen man spielen kann, wenn gewünscht. Schema wäre fast identisch.
