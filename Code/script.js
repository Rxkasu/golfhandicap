let current_user_data;
let logged_in;
//if (!JSON.parse(localStorage.getItem("data"))) addTestUserAndGame();

function addTestUserAndGame(){ //TESTING ONLY call this function to add the Test-Data to your Local-Storage: first game of Testing-Data
    let json_data = JSON.parse(localStorage.getItem("data")) || [];
    let courses = JSON.parse(localStorage.getItem("courses")) || [];

    json_data.push({email: "Tester@123", password: "123", role: "Golfer", current_whc: 15.2, current_ega: 15.0, games:
            [
                {game_id: "", course_name: "Test-Kurs", date: "17/03/2025", whc: 20, ega: 20, course_rating: "70.9", slope_rating: "115", par: 72, holes:
                [
                    {hole_id: 1, par: 3, hcp: 4, hits: 5},
                    {hole_id: 2, par: 4, hcp: 16, hits: 6},
                    {hole_id: 3, par: 4, hcp: 1, hits: 8},
                    {hole_id: 4, par: 5, hcp: 10, hits: 7},
                    {hole_id: 5, par: 4, hcp: 7, hits: 6},
                    {hole_id: 6, par: 4, hcp: 13, hits: 6},
                    {hole_id: 7, par: 3, hcp: 5, hits: 6},
                    {hole_id: 8, par: 4, hcp: 17, hits: 6},
                    {hole_id: 9, par: 4, hcp: 2, hits: 6},
                    {hole_id: 10, par: 5, hcp: 11, hits: 7},
                    {hole_id: 11, par: 4, hcp: 8, hits: 6},
                    {hole_id: 12, par: 4, hcp: 14, hits: 6},
                    {hole_id: 13, par: 3, hcp: 6, hits: 5},
                    {hole_id: 14, par: 4, hcp: 18, hits: 6},
                    {hole_id: 15, par: 4, hcp: 3, hits: 6},
                    {hole_id: 16, par: 5, hcp: 12, hits: 6},
                    {hole_id: 17, par: 4, hcp: 9, hits: 5},
                    {hole_id: 18, par: 4, hcp: 15, hits: 6}
                ]}/*,
                {game_id: "", course_name: "Test-Kurs", date: "17/03/2025", whc: 18.2, ega:	18.1},
                {game_id: "", course_name: "Test-Kurs", date: "17/03/2025", whc: 17.8, ega: 17.7},
                {game_id: "", course_name: "Test-Kurs", date: "17/03/2025", whc: 17.3, ega: 17.1},
                {game_id: "", course_name: "Test-Kurs", date: "17/03/2025", whc: 17.5, ega: 17.4},
                {game_id: "", course_name: "Test-Kurs", date: "17/03/2025", whc: 17.0, ega: 16.9},
                {game_id: "", course_name: "Test-Kurs", date: "17/03/2025", whc: 16.6, ega: 16.5},
                {game_id: "", course_name: "Test-Kurs", date: "17/03/2025", whc: 16.2, ega: 16.0},
                {game_id: "", course_name: "Test-Kurs", date: "17/03/2025", whc: 16.4, ega: 16.3},
                {game_id: "", course_name: "Test-Kurs", date: "17/03/2025", whc: 15.8, ega: 15.7},
                {game_id: "", course_name: "Test-Kurs", date: "17/03/2025", whc: 15.2, ega: 15.0}*/
            ]})
    courses.push({course_name: "Test-Kurs", course_rating: "70.9", slope_rating: "115",holes:
            [
                {hole_id: 1, par: 3, hcp: 4},
                {hole_id: 2, par: 4, hcp: 16},
                {hole_id: 3, par: 4, hcp: 1},
                {hole_id: 4, par: 5, hcp: 10},
                {hole_id: 5, par: 4, hcp: 7},
                {hole_id: 6, par: 4, hcp: 13},
                {hole_id: 7, par: 3, hcp: 5},
                {hole_id: 8, par: 4, hcp: 17},
                {hole_id: 9, par: 4, hcp: 2},
                {hole_id: 10, par: 5, hcp: 11},
                {hole_id: 11, par: 4, hcp: 8},
                {hole_id: 12, par: 4, hcp: 14},
                {hole_id: 13, par: 3, hcp: 6},
                {hole_id: 14, par: 4, hcp: 18},
                {hole_id: 15, par: 4, hcp: 3},
                {hole_id: 16, par: 5, hcp: 12},
                {hole_id: 17, par: 4, hcp: 9},
                {hole_id: 18, par: 4, hcp: 15}
            ]})
    localStorage.setItem("data", JSON.stringify(json_data));
    localStorage.setItem("courses", JSON.stringify(courses));
}

// Gets actual Date in Day/Month/Year-format
function get_date(){
    let today = new Date();
    let day = (today.getDate().toString().padStart(2, '0'));
    let month = ((today.getMonth() + 1).toString().padStart(2, '0'));
    let year = today.getFullYear();
    return `${day}/${month}/${year}`;
}

// Logs in user if user exists and password fits username
function login(){
    let json_data = JSON.parse(localStorage.getItem("data")) || null;
    let email = (document.getElementById("loginEmail").value);
    let password = (document.getElementById("loginPass").value);

    if (!email || !email.trim()) return window.alert("Email-Feld ist leer"); // Duplicated (Formular checkt es schon)
    if (!password || !password.trim()) return window.alert("Passwort-Feld ist leer");

    if (!json_data) return window.alert("Es wurde noch kein Nutzer angelegt!");
    let log_user = json_data.find(user => user.email === email) || null;

    if (!log_user) return notificationAlert("Es gibt keinen Nutzer mit dieser E-Mail!");                     // Check if user exists
    if (log_user.password !== password) return notificationAlert("Passwort ist falsch!"); // Check if Password is correct
    logged_in = true;
    current_user_data = log_user;
    hideAuthModal();
    showContentModal();
    showRoleSpecificTabs(current_user_data.role);
    setUserInfo(email, current_user_data.role);
}

// logs out users
function logout(){
    if (logged_in === true){                                             // Check if user is logged in
        logged_in = false
        document.getElementById("loginPass").value = "";
        document.getElementById("regisPass").value = "";
        document.getElementById("regisPassCheck").value = "";
        clearUserInfo();
        clearGameFields();
        clearCourseFields();
        clearGameLeaderGameFields();
        hideContentModal();
        showAuthModal();
        notificationAlert("Erfolgreich ausgeloggt!");
    } else {
        window.alert("Nicht eingeloggt") //unreachable?
    }
}

// Saves a newly registered User
function register(){
    let json_data = JSON.parse(localStorage.getItem("data")) || [];               // Load JSON from local storage of browser
    let email = (document.getElementById("regisEmail").value);
    let role = (document.getElementById("regisRole").value);
    let password = (document.getElementById("regisPass").value);
    let passwordCheck = (document.getElementById("regisPassCheck").value);

    if (!email || !email.trim()) return window.alert("Email-Feld ist leer"); // Duplicated (Formular checkt es schon)
    if (!password || !password.trim()) return window.alert("Passwort-Feld ist leer");
    if (!password || !passwordCheck.trim()) return window.alert("Passwort-Wiederholen-Feld ist leer");

    if (json_data.find(user => user.email === email)){             // Check if user already exists
        window.alert("Die E-Mail: " + email + " ist schon vergeben!");
    } else {
        if (password !== passwordCheck) return window.alert("Passwort und Wiederholen-Passwort stimmen nicht überein"); // Check if Password is also the Check (Wiederholen)

        const new_user = {"email": email, "role": role, "password": password, current_whc: 54, current_ega: 54, "games": []};
        json_data.push(new_user)                                        // Append new user
        localStorage.setItem("data", JSON.stringify(json_data))         // save JSON with new user
        current_user_data = new_user;
        logged_in = true;
        notificationAlert("Registrierung erfolgreich! Jetzt kannst du dich einloggen.");
        switchAuthTabs("login");
        document.getElementById("loginPass").value = "";
        document.getElementById("regisPass").value = "";
        document.getElementById("regisPassCheck").value = "";
        document.getElementById("regisEmail").value = "";
        document.getElementById("loginEmail").value = email;
        showPrintScorecardInputs();
        createGameLeaderUserSelect();
    }
}

// saves data of an 18-hole-game in an array
function save_inputs(){
    const course_name = document.getElementById("courseSelect").value;
    if (!course_name.trim()) {                                            // Check for name
        return window.alert("Bitte einen Kurs auswählen!");
    }

    const savedCourses = JSON.parse(localStorage.getItem("courses"));
    const course = savedCourses.find(obj => obj.course_name === course_name);
    const json_data = JSON.parse(localStorage.getItem("data"));
    const user = json_data.find(user => user.email === current_user_data.email);

    const game_data = {"game_id": '',"course_name": course_name, "date": get_date(), "whc": user.current_whc, "ega": user.current_ega, "course_rating": course.course_rating, "slope_rating": course.slope_rating, "par": '',
            "holes": [
                {"hole_id": 1, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 2, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 3, "par": 0, "hcp": 0, "hits":0},
                {"hole_id": 4, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 5, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 6, "par": 0, "hcp": 0, "hits":0},
                {"hole_id": 7, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 8, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 9, "par": 0, "hcp": 0, "hits":0},
                {"hole_id": 10, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 11, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 12, "par": 0, "hcp": 0, "hits":0},
                {"hole_id": 13, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 14, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 15, "par": 0, "hcp": 0, "hits":0},
                {"hole_id": 16, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 17, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 18, "par": 0, "hcp": 0, "hits":0}
            ]}

    for (let i = 1; i <= 18; i++) {
        let par = document.getElementById(`par${i}`).value || null;
        let hcp = document.getElementById(`hcp${i}`).value || null;
        let hits = document.getElementById(`hits${i}`).value || null;
        if (hits == null) return window.alert("Schläge Eingabefeld " + i + " darf nicht leer sein!");
        if (hits < 1) return window.alert("Schläge Eingabefeld " + i + " darf nicht kleiner als 1 sein!");

        // Set values in JSON-object
        game_data.holes[i - 1].par = par ? parseInt(par) : 0;
        game_data.holes[i - 1].hcp = hcp ? parseInt(hcp) : 0;
        game_data.holes[i - 1].hits = hits ? parseInt(hits) : 0;
    }


    // Add new course to user
    for (let i = 0; i < json_data.length; i++) {
        if (json_data[i].email === current_user_data.email) {
          json_data[i].games.push(game_data);
          localStorage.setItem("data", JSON.stringify(json_data));
          break;
        }
    }
    calculate_par();
    notificationAlert("Spiel erfolgreich gespeichert!");
    const { ega, whc } = calculateHandicaps(current_user_data.email);
    document.getElementById("old_handicap").innerHTML = (-ega).toFixed(1);
    document.getElementById("new_handicap").innerHTML = whc.toFixed(1);
}

//calculates total Par of Golf-course
function calculate_par(){
    let json_data = JSON.parse(localStorage.getItem("data"));
    let name = document.getElementById("courseSelect").value;
    let total_par = 0;

    for (let i = 0; i < json_data.length; i++) {
        if (json_data[i].email === current_user_data.email) {

            for (let y = 0; y <= json_data[i].games.length; y++){
                if (json_data[i].games[y].course_name === name) {
                    for (let x = 0; x <= 17; x++) {
                        total_par = total_par + json_data[i].games[y].holes[x].par;
                    }
                    json_data[i].games[y].par = total_par;
                    break;
                }
            }

            break;
        }
    }
    localStorage.setItem("data", JSON.stringify(json_data));
}

// Deletes current 18-hole inputs of course
function delete_holes(){
    let json_data = JSON.parse(localStorage.getItem("data"));
    let name = document.getElementById("courseSelect").value
    for (let x = 0; x < json_data.length; x++){
        if (json_data[x].email === current_user_data.email){
            for (let y = 0; y < json_data[x].games.length; y++){
                if (json_data[x].games[y].course_name === name){
                    json_data[x].games.splice(y, 1)
                    localStorage.setItem("data", JSON.stringify(json_data))
                    break
                }
            }
        }
    }
}

function load_course_holes(){
    let courses = JSON.parse(localStorage.getItem("courses"));
    let name = document.getElementById("courseSelect").value;
    for (let x = 0; x < courses.length; x++){
        if (courses[x].course_name === name){

            document.getElementById("game_course_rating").value = courses[x].course_rating;
            document.getElementById("game_course_slope").value = courses[x].slope_rating;
            for (let i = 1; i <= 18; i++) {
                let parInput = document.getElementById(`par${i}`);
                let hcpInput = document.getElementById(`hcp${i}`);

                if (parInput && hcpInput) {
                    parInput.value = courses[x].holes[i - 1].par;
                    hcpInput.value = courses[x].holes[i - 1].hcp;
                }
            }
            break
        }
    }
}

function load_edit_course_holes(){
    const courses = JSON.parse(localStorage.getItem("courses"));
    const name = document.getElementById("edit_course_select").value;
    for (let x = 0; x < courses.length; x++){
        if (courses[x].course_name === name){

            document.getElementById("course_rating").value = courses[x].course_rating;
            document.getElementById("course_slope").value = courses[x].slope_rating;

            for (let i = 1; i <= 18; i++) {
                let parInput = document.getElementById(`cpar${i}`);
                let hcpInput = document.getElementById(`chcp${i}`);

                if (parInput && hcpInput) {
                    parInput.value = courses[x].holes[i - 1].par;
                    hcpInput.value = courses[x].holes[i - 1].hcp;
                }
            }
            break
        }
    }
}

function load_gameLeader_holes(game_index){
    const json_data = JSON.parse(localStorage.getItem("data"));
    document.getElementById("gameLeader_send_mail").disabled = true;

    const email = document.getElementById("gameLeader_user_select").value;

    for (let x = 0; x < json_data.length; x++){
        if (json_data[x].email === email){

            document.getElementById("gameLeader_course_rating").value = json_data[x].games[game_index].course_rating;
            document.getElementById("gameLeader_course_slope").value = json_data[x].games[game_index].slope_rating;
            for (let i = 1; i <= 18; i++) {
                let parInput = document.getElementById(`gLpar${i}`);
                let hcpInput = document.getElementById(`gLhcp${i}`);
                let hitsInput = document.getElementById(`gLhits${i}`);

                if (parInput && hcpInput && hitsInput) {
                    parInput.value = json_data[x].games[game_index].holes[i - 1].par;
                    hcpInput.value = json_data[x].games[game_index].holes[i - 1].hcp;
                    hitsInput.value = json_data[x].games[game_index].holes[i - 1].hits;
                }
            }
            break;
        }
    }
}

function save_gameLeader_editedHoles(){
    const email = document.getElementById("gameLeader_user_select").value;
    const game_index = parseInt(document.getElementById("gameLeader_game_select").value);
    if (!email) return window.alert("Bitte einen Golfer auswählen!");
    if (!game_index && game_index !== 0) return window.alert("Bitte ein Spiel auswählen!");

    const json_data = JSON.parse(localStorage.getItem("data"));
    let game_data;

    for (let i = 0; i < json_data.length; i++) {
        if (json_data[i].email === email) {
            game_data = json_data[i].games[game_index];
            break;
        }
    }

    for (let i = 1; i <= 18; i++) {
        let hits = document.getElementById(`gLhits${i}`).value || null;
        if (hits == null) return window.alert("Schläge Eingabefeld " + i + " darf nicht leer sein!");
        if (hits < 1) return window.alert("Schläge Eingabefeld " + i + " darf nicht kleiner als 1 sein!");

        game_data.holes[i - 1].hits = hits ? parseInt(hits) : 0;
    }

    for (let i = 0; i < json_data.length; i++) {
        if (json_data[i].email === email) {
            json_data[i].games[game_index] = game_data;

            let ega = calculate_old_hdc(json_data[i].games[game_index]);
            let whc = calculate_whci(json_data[i].games.slice(0, game_index+1));

            for (let j = game_index +1; j < json_data[i].games.length; j++) {
                console.log(json_data[i].games[j].ega);
                json_data[i].games[j].ega = ega;
                json_data[i].games[j].whc = whc;

                json_data[i].games[j].ega = calculate_old_hdc(json_data[i].games[j]);
                json_data[i].games[j].whc = calculate_whci(json_data[i].games.slice(0, j+1));
            }
            json_data[i].current_ega = ega;
            json_data[i].current_whc = whc;

            localStorage.setItem("data", JSON.stringify(json_data));
            break;
        }
    }
    notificationAlert("Spiel erfolgreich bearbeitet!");
    document.getElementById("gameLeader_send_mail").disabled = false;
}

// Delets a single course game
function delete_game(){
    let json_data = JSON.parse(localStorage.getItem("data"));
    let remove_game = document.getElementById("course_name").value
    for (let x = 0; x < json_data.length; x++){
        if (json_data[x].email === current_user_data.email) {
            for (let y = 0; y < json_data[x].games.length; y++){
                if (json_data[x].games[y].course_name === remove_game){
                    json_data[x].games.splice(y, 1);
                    break
                }
            }
        }
        
    }
    localStorage.setItem("data", JSON.stringify(json_data))
}

function save_course(){
    const course = {
        course_name: document.getElementById("course_name").value,
        course_rating: document.getElementById("course_rating").value,
        slope_rating: document.getElementById("course_slope").value
    };

    if (!course.course_name.trim()) return window.alert("Kursname darf nicht leer sein!");
    if (!course.course_rating.trim() && course.course_rating !== 0) return window.alert("Kurs-Rating darf nicht leer sein!");
    if (!course.slope_rating.trim() && course.slope_rating !== 0) return window.alert("Slope-Rating darf nicht leer sein!");
    if (course.course_rating < 1) return window.alert(`Ungültiges Kurs-Rating gefunden\nKurs-Rating darf nicht unter 1 liegen!`);
    if (course.slope_rating < 1) return window.alert(`Ungültiges Slope-Rating gefunden\nSlope-Rating darf nicht unter 1 liegen!`);

    const holes = [];
    for (let i = 1; i <= 18; i++) {
        let hcp = document.getElementById(`chcp${i}`).value || null;
        let par = document.getElementById(`cpar${i}`).value || null;
        if (hcp == null) return window.alert("HCP Eingabefeld " + i + " darf nicht leer sein!");
        if (par == null) return window.alert("Par Eingabefeld " + i + " darf nicht leer sein!");
        if (par < 1) return window.alert(`Ungültiger Par-Wert gefunden: ${par} bei Loch ${i} gefunden\nPar darf nicht unter 1 liegen!`);

        holes.push({
            hole_id: i,
            par: parseInt(par) || 0,
            hcp: parseInt(hcp) || 0
        });
    }

    // Check for duplicates
    const seenHcps = new Map();

    for (let hole of holes) {
        let hcp = hole.hcp;

        if (hcp > 18 || hcp < 1) return window.alert(`Ungültiger HCP-Wert gefunden: ${hcp} bei Loch ${hole.hole_id} gefunden\nHCP darf nur zwischen 1 und 18 liegen!`);

        if (seenHcps.has(hcp)) {
            let firstHoleId = seenHcps.get(hcp);                        // First hole with same hcp
            return window.alert(`Doppelter HCP-Wert gefunden: ${hcp} bei Loch ${firstHoleId} und ${hole.hole_id}!`);
        }

        seenHcps.set(hcp, hole.hole_id);                                // Save hcp with hole
    }
    course.holes = holes;

    const savedCourses = JSON.parse(localStorage.getItem("courses")) || [];

    const courseNameDuplicate = savedCourses.find(obj => obj.course_name === course.course_name) || null;
    if (courseNameDuplicate) {
        return window.alert(course.course_name + " ist schon vergeben!");
    }

    savedCourses.push(course);

    localStorage.setItem("courses", JSON.stringify(savedCourses));
    notificationAlert("Kurs erfolgreich erstellt!");
    createCourseSelect();
    showPrintScorecardInputs();
}

function saveEditCourse() {
    const course = {
        course_name: document.getElementById("edit_course_select").value,
        course_rating: document.getElementById("course_rating").value,
        slope_rating: document.getElementById("course_slope").value
    };

    if (!course.course_name.trim()) return window.alert("Kursname darf nicht leer sein!");
    if (!course.course_rating.trim() && course.course_rating !== 0) return window.alert("Kurs-Rating darf nicht leer sein!");
    if (!course.slope_rating.trim() && course.slope_rating !== 0) return window.alert("Slope-Rating darf nicht leer sein!");
    if (course.course_rating < 1) return window.alert(`Ungültiges Kurs-Rating gefunden\nKurs-Rating darf nicht unter 1 liegen!`);
    if (course.slope_rating < 1) return window.alert(`Ungültiges Slope-Rating gefunden\nSlope-Rating darf nicht unter 1 liegen!`);

    const holes = [];
    for (let i = 1; i <= 18; i++) {
        let hcp = document.getElementById(`chcp${i}`).value || null;
        let par = document.getElementById(`cpar${i}`).value || null;
        if (hcp == null) return window.alert("HCP Eingabefeld " + i + " darf nicht leer sein!");
        if (par == null) return window.alert("Par Eingabefeld " + i + " darf nicht leer sein!");
        if (par < 1) return window.alert(`Ungültiger Par-Wert gefunden: ${par} bei Loch ${i} gefunden\nPar darf nicht unter 1 liegen!`);

        holes.push({
            hole_id: i,
            par: parseInt(par) || 0,
            hcp: parseInt(hcp) || 0
        });
    }

    // Check for duplicates
    const seenHcps = new Map();

    for (let hole of holes) {
        let hcp = hole.hcp;

        if (hcp > 18 || hcp < 1) return window.alert(`Ungültiger HCP-Wert gefunden: ${hcp} bei Loch ${hole.hole_id} gefunden\nHCP darf nur zwischen 1 und 18 liegen!`);

        if (seenHcps.has(hcp)) {
            let firstHoleId = seenHcps.get(hcp);                        // First hole with same hcp
            return window.alert(`Doppelter HCP-Wert gefunden: ${hcp} bei Loch ${firstHoleId} und ${hole.hole_id}!`);
        }

        seenHcps.set(hcp, hole.hole_id);                                // Save hcp with hole
    }
    course.holes = holes;

    const savedCourses = JSON.parse(localStorage.getItem("courses")) || [];

    const courseNameDuplicate = savedCourses.find(obj => obj.course_name === course.course_name) || null;
    if (courseNameDuplicate) {
        // Wenn der Kursname schon existiert, ersetze die Daten
        const index = savedCourses.findIndex(obj => obj.course_name === course.course_name);
        if (index !== -1) {
            // Ersetze die Kursdaten an diesem Index
            savedCourses[index] = course;
        }
    } else {
        savedCourses.push(course);
    }   
    localStorage.setItem("courses", JSON.stringify(savedCourses));
    notificationAlert("Kurs erfolgreich bearbeitet!");
    cancelEditCourse();
    createCourseSelect();
    showPrintScorecardInputs();
}

function sendMail(){
    const userEmail = document.getElementById("gameLeader_user_select").value;
    const users = JSON.parse(localStorage.getItem("data"));
    const user = users.find(user => user.email === userEmail);
    let name = user.email.substring(0, user.email.indexOf("@"));
    let nachricht = "Hallo " + name + ",\n\ndein Golf-Handicap wurde aktualisiert und ist nun:\nEGA: " + (-user.current_ega).toFixed(1) + "\nWHC: " + user.current_whc.toFixed(1) + "\n\nMit freundlichen Grüßen dein Golf-HCC Team";
    let mailtoLink = "mailto:" + user.email
        + "?subject=" + encodeURIComponent("Golf-Handicap aktualisiert - Golf-HCC")
        + "&body=" + encodeURIComponent(nachricht);
    window.open(mailtoLink, "_blank");
}