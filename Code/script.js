
function create_json(){
    //if (localStorage.getItem("data") == null){

        //json_data= {"user_id": '', "sur_name": '', "first_name": '', "games": []}
        //localStorage.setItem("data", JSON.stringify(json_data))
    //}
    //else {
    //    let data = localStorage.getItem("data")
    //     json_data = JSON.parse(data)
    //}
}

// Gets actual Date in Day/Month/Year-format
function get_date(){
    let today = new Date();
    let day = (today.getDate().toString().padStart(2, '0'))
    let month = ((today.getMonth() + 1).toString().padStart(2, '0'))
    let year = today.getFullYear()
    let date = `${day}/${month}/${year}`
    return date
}

// Shows Block to Log in
function login_block(){
    document.getElementById("register").style.display = "none"
    let container = document.getElementById("login")
    container.style.display = "block"
}

// Logs in user if user exists and password fits username
function login(){
    let json_data = JSON.parse(localStorage.getItem("data"));
    let email = (document.getElementById("loginuser").value) || '';
    let password = (document.getElementById("loginpass").value) || '';
    if (email == '' || password == ''){                                 // Check for inputs
        window.alert("Email und/oder Passwort leer")
        
    }
    let log_user = json_data.find(user => user.email === email)

    if (log_user){                                                      // Check if user exists
        if (log_user.password === password){                            // Check if Password is correct
            logged_in = true
            current_user_data = log_user
            close_con(document.getElementById("try_login"))
            showlogg()
            console.log(log_user)
        }
        else{
            window.alert("Passwort ist falsch")
            logged_in = false
            return
        }
    }
    else{
        window.alert("user existiert nicht")
        console.log(json_data)
        return
    }
}

// logs out users
function logout(){
    if (logged_in == true){                                             // Check if user is logged in
        logged_in = false
        showlogg()
        window.alert("Erfolgreich ausgeloggt")
    }
    else{
        window.alert("Nicht eingeloggt")
    }
}

// shows and hides user Elements depending if logged in
function showlogg(){
    let visible = document.getElementById("calculate")                  // necessary calculator buttons
    let user_privilege = document.getElementById("logback")             // logout and E-mail buttons
    let log_reg = document.getElementById("logreg")                     // Login and Register buttons
    if (logged_in == true){                                             // Check if user is logged in
        visible.style.display = "block"
        user_privilege.style.display = "block"
        log_reg.style.display = "none"
    }
    else{
        visible.style.display = "none"
        user_privilege.style.display = "none"
        log_reg.style.display = "block"
    }
}

// Shows register-Block
function register_block(){
    document.getElementById("login").style.display = "none"
    let container = document.getElementById("register")
    container.style.display = "block"
}

// Saves a newly registered User
function save_regis(){
    let json_data = JSON.parse(localStorage.getItem("data"));               // Load JSON from local storage of browser
    json_data = []
    let email = (document.getElementById("regisuser").value) || '';
    let password = (document.getElementById("regispass").value) || '';
    if (email == '' || password == ''){                                 // Check for inputs
        window.alert("Email und/oder Passwort leer")
        
    }
    else if (json_data.find(user => user.email === email)){             // Check if user already exists
        window.alert("User " + email + " existiert bereits.")
        console.log(json_data)
    }
    else{
        new_user= {"email": email, "password": password, "games": []}
        json_data.push(new_user)                                        // Append new user
        localStorage.setItem("data", JSON.stringify(json_data))         // save JSON with new user
    }
    console.log(json_data)
}

// Deletes a registered user
function delete_user(){
    let json_data = JSON.parse(localStorage.getItem("data"));
    let email = (document.getElementById("regisuser").value) || '';
    let password = (document.getElementById("regispass").value) || '';
    if (email == '' || password == ''){                                 // Check for inputs
        window.alert("Email und/oder Passwort leer")
    }

    let del_user = json_data.find(user => user.email === email)
    if (del_user){
        if (del_user.password === password){                            // Check if Password is correct
            json_data = json_data.filter(user => user.email !== email)
            console.log(json_data)
        }
        else{
            window.alert("Passwort ist falsch")
        }
    }
    else{
        window.alert("user existiert nicht")
        console.log(json_data)
    }
    localStorage.setItem("data", JSON.stringify(json_data))             // Save JSON 
}

// Generates 18x3 inputfields for 18 holes with par, hcp and hits
function generateFields() {
    let container = document.getElementById("container2");
    let inputs = container.querySelectorAll("input[type=text]");
    inputs.forEach(input => input.remove());
    container.style.display = "block"
    // Extra input-field
    let input_name = document.createElement("input");
    input_name.type ="text";
    input_name.placeholder = "Kursname"
    input_name.id = "course_name"
    container.appendChild(input_name)
    // Extra button
    let delete_holes = document.createElement("input");
    delete_holes.type = "button";
    delete_holes.value = "Kurs löschen"
    delete_holes.onclick = delete_game;
    container.appendChild(delete_holes)

    // Generating fields
    for (let i = 1; i <= 18; i++) {
        let div = document.createElement("div");
        div.className = "input-group";

        let input1 = document.createElement("input");                   // First collumn Par
        input1.type = "text";
        input1.placeholder = `par - Loch ${i}`;
        input1.id = `par${i}`
        //input1.defaultValue = 0

        let input2 = document.createElement("input");                   // Second collumn Handycap
        input2.type = "text";
        input2.placeholder = `hcp - Loch ${i}`;
        input2.id = `hcp${i}`
        //input2.defaultValue = 0

        let input3 = document.createElement("input");                   // Third collumn needed hits
        input3.type = "text";
        input3.placeholder = `hits - Loch ${i}`;
        input3.id = `hits${i}`
        //input3.defaultValue = 0

        div.appendChild(input1);
        div.appendChild(input2);
        div.appendChild(input3);

        container.appendChild(div);
    }
}

// Closes the window of a button
function close_con(button){
    let container = button.parentElement;
    container.style.display= 'none'
}

// saves data of an 18-hole-game in an array
function save_inputs(){
    let name = document.getElementById("course_name").value
    console.log("name:"+ name);
    if (!name.trim()){                                            // Check for name
        window.alert("Bitte Namen eingeben")
        return
    }
    game_data = {"game_id": '',"course_name": name, "date": get_date(), "hcp_index": 0, "course_rating": '', "slope_rating": '',
            "holes": [{"hole_id": 1, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 2, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 3, "par": 0, "hcp": 0, "hits":0},
            {"hole_id": 4, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 5, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 6, "par": 0, "hcp": 0, "hits":0},
            {"hole_id": 7, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 8, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 9, "par": 0, "hcp": 0, "hits":0},
            {"hole_id": 10, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 11, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 12, "par": 0, "hcp": 0, "hits":0},
            {"hole_id": 13, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 14, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 15, "par": 0, "hcp": 0, "hits":0},
            {"hole_id": 16, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 17, "par": 0, "hcp": 0, "hits":0}, {"hole_id": 18, "par": 0, "hcp": 0, "hits":0}]}
    let json_data = JSON.parse(localStorage.getItem("data"));
    for (let i = 1; i <= 18; i++) {
        let par = document.getElementById(`par${i}`).value || 0;
        let hcp = document.getElementById(`hcp${i}`).value || 0;
        let hits = document.getElementById(`hits${i}`).value || 0;

        // Set values in JSON-object
        game_data.holes[i - 1].par = par ? parseInt(par) : 0;
        game_data.holes[i - 1].hcp = hcp ? parseInt(hcp) : 0;
        game_data.holes[i - 1].hits = hits ? parseInt(hits) : 0;
    }

    // Check for duplicates
    let seenHcps = new Map(); 

    for (let hole of game_data.holes) {
        let hcp = hole.hcp;
        
        if (seenHcps.has(hcp)) {
            let firstHoleId = seenHcps.get(hcp);                        // First hole with same hcp
            window.alert(`Doppelter HCP-Wert gefunden: ${hcp} bei Loch ${firstHoleId} und ${hole.hole_id}`);
            return 
        }
        
        seenHcps.set(hcp, hole.hole_id);                                // Save hcp with hole 
    }

    // Add new course to user
    for (let i = 0; i < json_data.length; i++) {
        if (json_data[i].email === current_user_data.email) {
          json_data[i].games.push(game_data);
          localStorage.setItem("data", JSON.stringify(json_data))
          break;  
        }
      }
    console.log(JSON.stringify(json_data));
}

// Delets a single 18-hole game
function delete_game(){
    let json_data = JSON.parse(localStorage.getItem("data"));

    json_data.forEach(user => {
        let gameToRemove = document.getElementById("course_name").value
        if (user.email === current_user_data.email) {
            user.games = user.games.filter(game => game.course_name !== gameToRemove);
        }
    });
    console.log(JSON.stringify(json_data));
    localStorage.setItem("data", JSON.stringify(json_data))
          
}

// Makes container for a new course visible
function new_course(){
    let container = document.getElementById("container");
    container.style.display = "block"
}

function save_course(){
    let json_data = JSON.parse(localStorage.getItem("data"));
    let course_name = document.getElementById("course_name_ra").value
    json_data.forEach(user => {
        if (user.email === current_user_data.email) {
            for (let i = 0; i < user.games.length; i++){
                if (user.games.course_name === course_name){
                    user.games.course_rating = document.getElementById("course_rating").value
                    user.games.slope_rating = document.getElementById("slope").value
                    console.log(JSON.stringify(json_data));
                    localStorage.setItem("data", JSON.stringify(json_data))
                    break
                }
            } 
        }
        window.alert("Kurs " + course_name + " existiert nicht!")
    });
    console.log(JSON.stringify(json_data));
}

function sendMail(){
    let name = "Max Mustermann";
    let nachricht = "Hallo " + name + ",\ndein Golf-Handicap wurde aktualisiert und ist nun XX.\nMit freundichen Grüßen dein Gold-HCC Team";
    let mailtoLink = "mailto:empfaenger@example.com"
        + "?subject=" + encodeURIComponent("Golf-Handicap aktualisiert - Golf-HCC")
        + "&body=" + encodeURIComponent(nachricht);
    window.location.href = mailtoLink;
}


function course_hdc(){
    let json_data = JSON.parse(localStorage.getItem("data"));
    let slope_rating = ''
    let course_rating = ''
    for (let i = 0; i < json_data.length; i++) {
        if (json_data[i].email === current_user_data.email) {
            slope_rating = json_data[i].slope_rating
            course_rating = json_data[i].course_rating
            break
        }
    }
    let course_hdc = hdc_in * slope_rating/113 +course_rating - par
}