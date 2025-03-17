// Funktion, um die Scorecard zu drucken
function printScorecard() {
    const courseRadios = document.getElementsByName('course');
    const userRadios = document.getElementsByName('user');

    const selectedCourse = Array.from(courseRadios).find(radio => radio.checked);
    const selectedUser = Array.from(userRadios).find(radio => radio.checked);

    if (!selectedCourse || !selectedUser) {
        window.alert('Bitte wählen Sie sowohl einen Kurs als auch einen Golfer aus!');
    } else {

        let selectedCourseName = selectedCourse.value;
        let selectedUserEmail = selectedUser.value;
        
        // Richtigen Kurs aus Local Storage holen
        let courses = JSON.parse(localStorage.getItem("courses"));

        let selectedCourseData;

        for (let x = 0; x < courses.length; x++){
            if (courses[x].course_name === selectedCourseName){
                selectedCourseData = courses[x];
                break;
            }
        }

        // Richtigen User aus Local Storage holen
        let data = JSON.parse(localStorage.getItem("data"));

        let selectedUserData;

        for (let x = 0; x < data.length; x++){
            if (data[x].email === selectedUserEmail){
                selectedUserData = data[x];
                break;
            }
        }

        // Course-Handicap berechnen
        let courseHandicap = calculate_course_handicap(selectedUserData.current_whc, selectedCourseData.course_rating, selectedCourseData.slope_rating, calculate_course_par(selectedCourseData.holes));

        // Hier kannst du die Funktion für das tatsächliche Drucken oder PDF-Generieren einfügen
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Titel
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Golf Scorecard", 105, 15, null, null, "center");

        // Spielerinformationen
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("E-Mail: " + selectedUserEmail, 10, 30);
        doc.text("Course Rating: " + selectedCourseData.course_rating, 10, 40);
        doc.text("Slope Rating: " + selectedCourseData.slope_rating, 10, 50);
        doc.text("Handicap: " + selectedUserData.current_whc, 10, 60);
        doc.text("Course Handicap: "+ courseHandicap, 10, 70);

        // Tabellenkopf & leere Daten
        const tableColumn = ["Loch", "Par", "HCP", "Vorgabe", "Schläge"];
        const tableRows = [
            [1, "", "", "", ""], [2, "", "", "", ""], [3, "", "", "", ""],
            [4, "", "", "", ""], [5, "", "", "", ""], [6, "", "", "", ""],
            [7, "", "", "", ""], [8, "", "", "", ""], [9, "", "", "", ""],
            [10, "", "", "", ""], [11, "", "", "", ""], [12, "", "", "", ""],
            [13, "", "", "", ""], [14, "", "", "", ""], [15, "", "", "", ""],
            [16, "", "", "", ""], [17, "", "", "", ""], [18, "", "", "", ""]
        ];

        // Gehe durch jedes Loch im selectedCourseData und aktualisiere die Tabelle
        for (let i = 0; i < selectedCourseData.holes.length; i++) {
            let holeData = selectedCourseData.holes[i];
            
            // Füge den `par` und `hcp` Wert zu der entsprechenden Zeile hinzu
            tableRows[i][1] = holeData.par;  // Setzt den `par` Wert in die zweite Spalte
            tableRows[i][2] = holeData.hcp;  // Setzt den `hcp` Wert in die dritte Spalte
        }

        // Zuerst sortiere die Tabelle nach dem HCP-Wert
        tableRows.sort((a, b) => {
            const aHcp = selectedCourseData.holes[a[0] - 1].hcp; // HCP des Lochs a
            const bHcp = selectedCourseData.holes[b[0] - 1].hcp; // HCP des Lochs b
            return aHcp - bHcp;
        });

        // Durchlaufe die Tabelle und setze die Vorgabe, bis das Course Handicap aufgebraucht ist
        let holeIndex = 0;
        while (courseHandicap > 0) {
            // Wenn noch ein Course Handicap übrig ist, erhöhe die Vorgabe für das Loch
            tableRows[holeIndex][3] = (tableRows[holeIndex][3] || "") + "/";  // Vorgabe um 1 erhöhen

            // Decrease das Course Handicap
            courseHandicap--;

            // Gehe zum nächsten Loch (kreiere einen zyklischen Zugriff auf die Löcher)
            holeIndex = (holeIndex + 1) % tableRows.length; // Gehe zurück zu Loch 1, wenn das Ende erreicht ist
        }

        // Zum Schluss sortiere die Tabelle wieder nach der Lochnummer aufsteigend
        tableRows.sort((a, b) => a[0] - b[0]);

        // Tabelle mit autoTable
        doc.autoTable({
            startY: 80,
            head: [tableColumn],
            body: tableRows,
            theme: "grid",
            styles: { fontSize: 10, cellPadding: 3, halign: "center" },
            headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }
        });

        // PDF speichern
        doc.save("golf_scorecard.pdf");
        
        notificationAlert(`Scorecard für ${selectedUser.value} - Kurs: ${selectedCourse.value} steht zum Download bereit!`);
    }
}

// Event-Listener für den "Scorecard drucken"-Button
document.getElementById('print-scorecard').addEventListener('click', printScorecard);

function calculate_course_handicap(user_handicap, course_rating, slope_rating, par) {
    return Math.abs(Math.round(user_handicap * (parseFloat(slope_rating) / 113) + parseFloat(course_rating) - par)); //Runden richtig???
}

function calculate_course_par(holes) {
    let par = 0;
    for (let i = 0; i < holes.length; i++) {
        par += holes[i].par;
    }
    return par;
}