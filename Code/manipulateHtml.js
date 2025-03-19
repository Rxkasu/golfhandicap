createCourseSelect();
createGameLeaderUserSelect();
generateGameFields();
generateGameLeaderGameFields();
generateCourseInputFields();
showPrintScorecardInputs();

// Generates 18x3 input-fields for 18 holes with par, hcp and hits
function generateGameFields() {
    let container = document.getElementById("game-fields");
    let inputs = container.querySelectorAll("input[type=text]");
    inputs.forEach(input => input.remove());

    // Überschrift für die Felder
    let title = document.createElement("h5");
    title.innerText = "Spiel-Daten eingeben:";
    title.className = "mt-3";
    container.appendChild(title);

    generateGameInputFields(container, ["hcp", "par", "hits"]);
}

function generateGameLeaderGameFields() {
    let container = document.getElementById("gameLeader_game_fields");
    let inputs = container.querySelectorAll("input[type=text]");
    inputs.forEach(input => input.remove());

    let title = document.createElement("h5");
    title.innerText = "Spiel-Daten eingeben:";
    title.className = "mt-3";
    container.appendChild(title);

    generateGameInputFields(container, ["gLhcp", "gLpar", "gLhits"]);
}

function generateGameInputFields(container, fieldNames) {
    let div = document.createElement("div");
    div.className = "row g-2 mb-2";
    div.style.display = 'flex';
    div.style.flexWrap = 'wrap';
    div.style.width = '100%';

    const holesPerTable = 9;
    const totalHoles = 18 / holesPerTable;

    for (let tableIndex = 0; tableIndex < totalHoles; tableIndex++) {
        let tableWrapper = document.createElement("div");
        tableWrapper.className = "col-md-6 mb-4";

        let table = document.createElement("table");
        table.className = "table text-center shadow-sm";

        let thead = document.createElement("thead");
        thead.className = "table-light";
        let headerRow = document.createElement("tr");
        ["Loch", "HCP", "Par", "Schläge"].forEach(text => {
            let th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        let tbody = document.createElement("tbody");
        for (let i = 1; i <= holesPerTable; i++) {
            let holeNumber = i + tableIndex * holesPerTable;
            let row = document.createElement("tr");

            let tdHole = document.createElement("td");
            tdHole.textContent = ""+holeNumber;
            tdHole.style.fontWeight = "bold";
            tdHole.style.fontSize = "1.2rem";
            row.appendChild(tdHole);

            let tdHcp = document.createElement("td");
            let inputHcp = document.createElement("input");
            inputHcp.type = "number";
            inputHcp.className = "form-control text-center border-secondary";
            inputHcp.placeholder = "HCP";
            inputHcp.disabled = true;
            inputHcp.id = fieldNames[0] +""+ holeNumber;
            tdHcp.appendChild(inputHcp);
            row.appendChild(tdHcp);

            let tdPar = document.createElement("td");
            let inputPar = document.createElement("input");
            inputPar.type = "number";
            inputPar.className = "form-control text-center border-secondary";
            inputPar.placeholder = "Par";
            inputPar.disabled = true;
            inputPar.id = fieldNames[1] +""+ holeNumber;
            tdPar.appendChild(inputPar);
            row.appendChild(tdPar);

            let tdHits = document.createElement("td");
            let inputHits = document.createElement("input");
            inputHits.type = "number";
            inputHits.className = "form-control text-center border-secondary";
            inputHits.placeholder = "Schläge";
            inputHits.id = fieldNames[2] +""+ holeNumber;
            tdHits.appendChild(inputHits);
            row.appendChild(tdHits);

            tbody.appendChild(row);
        }

        table.appendChild(tbody);
        tableWrapper.appendChild(table);
        div.appendChild(tableWrapper);

    }
    container.appendChild(div);
}

function clearGameFields() {
    createCourseSelect();
    //document.getElementById("currentHci").value = "";
    document.getElementById("old_handicap").value = "N/A";
    document.getElementById("new_handicap").value = "N/A";

    for (let i = 1; i <= 18; i++) {
        document.getElementById(`par${i}`).value = "";
        document.getElementById(`hcp${i}`).value = "";
        document.getElementById(`hits${i}`).value = "";
    }
}

function clearCourseFields() {
    createCourseSelect();
    document.getElementById("course_name").value = "";
    document.getElementById("course_slope").value = "";
    document.getElementById("course_rating").value = "";

    for (let i = 1; i <= 18; i++) {
        document.getElementById(`cpar${i}`).value = "";
        document.getElementById(`chcp${i}`).value = "";
    }
}

function clearGameLeaderGameFields() {
    createGameLeaderUserSelect();
    createGameLeaderGameSelect();
    document.getElementById("gameLeader_course_slope").value = "";
    document.getElementById("gameLeader_course_rating").value = "";
    document.getElementById("gameLeader_send_mail").disabled = true;
    document.getElementById("gameLeader_game_select_container").classList.add("hidden");

    for (let i = 1; i <= 18; i++) {
        document.getElementById(`gLpar${i}`).value = "";
        document.getElementById(`gLhcp${i}`).value = "";
        document.getElementById(`gLhits${i}`).value = "";
    }
}

function generateCourseInputFields() {
    let container = document.getElementById("course-input-hole-fields");
    let inputs = container.querySelectorAll("input[type=text]");
    inputs.forEach(input => input.remove());

    let div = document.createElement("div");
    div.className = "row g-2 mb-2";
    div.style.display = 'flex';
    div.style.flexWrap = 'wrap';
    div.style.width = '100%';

    const holesPerTable = 9;
    const totalHoles = 18 / holesPerTable;

    for (let tableIndex = 0; tableIndex < totalHoles; tableIndex++) {
        let tableWrapper = document.createElement("div");
        tableWrapper.className = "col-md-6 mb-4";

        let table = document.createElement("table");
        table.className = "table text-center shadow-sm";

        let thead = document.createElement("thead");
        thead.className = "table-light";
        let headerRow = document.createElement("tr");
        ["Loch", "HCP", "Par"].forEach(text => {
            let th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        let tbody = document.createElement("tbody");
        for (let i = 1; i <= holesPerTable; i++) {
            let holeNumber = i + tableIndex * holesPerTable;
            let row = document.createElement("tr");

            let tdHole = document.createElement("td");
            tdHole.textContent = ""+holeNumber;
            tdHole.style.fontWeight = "bold";
            tdHole.style.fontSize = "1.2rem";
            row.appendChild(tdHole);

            let tdHcp = document.createElement("td");
            let inputHcp = document.createElement("input");
            inputHcp.type = "number";
            inputHcp.className = "form-control text-center border-secondary";
            inputHcp.placeholder = "HCP";
            inputHcp.id = `chcp${holeNumber}`;
            tdHcp.appendChild(inputHcp);
            row.appendChild(tdHcp);

            let tdPar = document.createElement("td");
            let inputPar = document.createElement("input");
            inputPar.type = "number";
            inputPar.className = "form-control text-center border-secondary";
            inputPar.placeholder = "Par";
            inputPar.id = `cpar${holeNumber}`;
            tdPar.appendChild(inputPar);
            row.appendChild(tdPar);

            tbody.appendChild(row);
        }

        table.appendChild(tbody);
        tableWrapper.appendChild(table);
        div.appendChild(tableWrapper);

    }
    container.appendChild(div);

}


function createCourseSelect() {
    const dropdown = document.getElementById("courseSelect");

    dropdown.innerHTML = '<option value="" disabled selected hidden>Bitte wähle einen Kurs</option>';

    const savedCourses = JSON.parse(localStorage.getItem("courses")) || [{course_name: "Kein Kurs vorhanden", disabled: true}];
    savedCourses.forEach(course => {
        const option = document.createElement("option");
        option.value = course.course_name;
        option.textContent = course.course_name;
        if (course.disabled === true) option.disabled = true;
        dropdown.appendChild(option);
    });
    dropdown.onclick = () => savedCourses.forEach(course => course.disabled === true ? window.alert("Kein Kurs vorhanden.\nDer Sekretär ist dafür zuständig die Kurse des Golfplatzes zu pflegen!") : null);
    dropdown.onchange = load_course_holes;
    createEditCourseSelect();
}

function createEditCourseSelect() {
    const dropdown = document.getElementById("edit_course_select");

    dropdown.innerHTML = '<option value="" disabled selected hidden>Bitte wähle einen Kurs</option>';

    const savedCourses = JSON.parse(localStorage.getItem("courses")) || [{course_name: "Kein Kurs vorhanden", disabled: true}];
    savedCourses.forEach(course => {
        const option = document.createElement("option");
        option.value = course.course_name;
        option.textContent = course.course_name;
        if (course.disabled === true) option.disabled = true;
        dropdown.appendChild(option);
    });
    dropdown.onchange = load_edit_course_holes;
}

function createGameLeaderUserSelect() {
    const dropdown = document.getElementById("gameLeader_user_select");

    dropdown.innerHTML = '<option value="" disabled selected hidden>Bitte wähle einen Golfer</option>';

    const data = JSON.parse(localStorage.getItem("data")) || [{email: "Kein Golfer vorhanden", disabled: true}];
    const golfers = data.filter(user => user.role === "Golfer");
    golfers.forEach(user => {
        const option = document.createElement("option");
        option.value = user.email;
        option.textContent = user.email;
        if (user.disabled === true) option.disabled = true;
        dropdown.appendChild(option);
    });
    dropdown.onchange = (event) => createGameLeaderGameSelect(event.target.value);
}

function createGameLeaderGameSelect(user_email) {
    const dropdown = document.getElementById("gameLeader_game_select");
    document.getElementById("gameLeader_game_select_container").classList.remove("hidden");
    document.getElementById("gameLeader_send_mail").disabled = true;

    dropdown.innerHTML = '<option value="" disabled selected hidden>Bitte wähle ein Spiel</option>';

    const data = JSON.parse(localStorage.getItem("data"));
    const user = data.find(user => user.email === user_email) || {games: [{course_name: "Kein Spiel vorhanden", disabled: true}]};
    if (user.games.length === 0) {
        user.games.push({course_name: "Kein Spiel vorhanden", disabled: true});
    }

    user.games.forEach((game, i) => {
        const option = document.createElement("option");
        option.value = i;
        if (game.disabled === true) {
            option.textContent = game.course_name;
            option.disabled = true;
        } else {
            option.textContent = game.course_name + " (" + game.date + ")";
        }
        dropdown.appendChild(option);
    });
    dropdown.onchange = (event) => load_gameLeader_holes(event.target.value);
}

function switchAuthTabs(type) {
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("register-form").classList.add("hidden");
    document.getElementById("login-tab").classList.remove("active");
    document.getElementById("register-tab").classList.remove("active");

    if (type === "login") {
        document.getElementById("login-form").classList.remove("hidden");
        document.getElementById("login-tab").classList.add("active");
    } else {
        document.getElementById("register-form").classList.remove("hidden");
        document.getElementById("register-tab").classList.add("active");
    }
}

function showAuthModal() {
    document.getElementById("auth-backdrop").classList.remove("hidden");
}

function hideAuthModal() {
    document.getElementById("auth-backdrop").classList.add("hidden");
}

function switchContentTabs(type) {
    document.getElementById("game").classList.add("hidden");
    document.getElementById("course").classList.add("hidden");
    document.getElementById("stats").classList.add("hidden");
    document.getElementById("scorecard").classList.add("hidden");
    document.getElementById("gameLeader").classList.add("hidden");
    document.getElementById("game-tab").classList.remove("active");
    document.getElementById("course-tab").classList.remove("active");
    document.getElementById("stats-tab").classList.remove("active");
    document.getElementById("scorecard-tab").classList.remove("active");
    document.getElementById("gameLeader-tab").classList.remove("active");

    if (type === "game") {
        document.getElementById("game").classList.remove("hidden");
        document.getElementById("game-tab").classList.add("active");
    } else if (type === "course") {
        document.getElementById("course").classList.remove("hidden");
        document.getElementById("course-tab").classList.add("active");
    } else if (type === "stats") {
        document.getElementById("stats").classList.remove("hidden");
        document.getElementById("stats-tab").classList.add("active");
        generateHandicapChart();
    } else if (type === "scorecard") {
        document.getElementById("scorecard").classList.remove("hidden");
        document.getElementById("scorecard-tab").classList.add("active");
    } else {
        document.getElementById("gameLeader").classList.remove("hidden");
        document.getElementById("gameLeader-tab").classList.add("active");
    }
}

function showContentModal() {
    document.getElementById("content").classList.remove("hidden");
}

function hideContentModal() {
    document.getElementById("content").classList.add("hidden");
}

function showRoleSpecificTabs(role) {
    document.getElementById("game").classList.add("hidden");
    document.getElementById("game-tab").classList.add("hidden");
    document.getElementById("game-tab").classList.remove("active");
    document.getElementById("stats").classList.add("hidden");
    document.getElementById("stats-tab").classList.add("hidden");
    document.getElementById("stats-tab").classList.remove("active");

    document.getElementById("course").classList.add("hidden");
    document.getElementById("course-tab").classList.add("hidden");
    document.getElementById("course-tab").classList.remove("active");
    document.getElementById("scorecard").classList.add("hidden");
    document.getElementById("scorecard-tab").classList.add("hidden");
    document.getElementById("scorecard-tab").classList.remove("active");

    document.getElementById("gameLeader").classList.add("hidden");
    document.getElementById("gameLeader-tab").classList.add("hidden");
    document.getElementById("gameLeader-tab").classList.remove("active");

    if (role === "Golfer") {
        document.getElementById("game").classList.remove("hidden");
        document.getElementById("game-tab").classList.remove("hidden");
        document.getElementById("game-tab").classList.add("active");
        document.getElementById("stats-tab").classList.remove("hidden");
    } else if (role === "Sekretär") {
        document.getElementById("course").classList.remove("hidden");
        document.getElementById("course-tab").classList.remove("hidden");
        document.getElementById("course-tab").classList.add("active");
        document.getElementById("scorecard-tab").classList.remove("hidden");
    } else if (role === "Spielleiter") {
        document.getElementById("gameLeader").classList.remove("hidden");
        document.getElementById("gameLeader-tab").classList.remove("hidden");
        document.getElementById("gameLeader-tab").classList.add("active");
    }
}

function setUserInfo(email, role) {
    let userInfo = document.getElementById("user-info");
    userInfo.innerText = `${email} (${role})`;

    /*
    const ega = current_user_data.current_ega; // set Handicap in das deprecated eingabefeld, falls vorhanden
    if (!ega && ega !== 0) {
        current_user_data.current_ega = -54;
    }
    document.getElementById("currentHandicap").value = current_user_data.current_ega;*/
}

function clearUserInfo() {
    document.getElementById("user-info").innerText = "";
}

function notificationAlert(message) {
    let notification = document.getElementById("notification");
    notification.innerText = message;
    notification.style.display = "block";
    setTimeout(() => notification.style.display = "none", 3000); // Nach 3 Sek. ausblenden
}

function showPrintScorecardInputs() {
    let courseRadiosContainer = document.getElementById('course-radios');
    courseRadiosContainer.innerHTML = '';
    let userRadiosContainer = document.getElementById('user-radios');
    userRadiosContainer.innerHTML = '';
    let printButton = document.getElementById('print-scorecard');

    // Radio-Buttons für Kurse hinzufügen
    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    if (courses.length === 0) {
        const info = document.createElement("p");
        info.innerHTML = 'Keine Kurse vorhanden';
        courseRadiosContainer.appendChild(info);
    } else {
        courses.forEach(course => {
            const radioButton = document.createElement('div');
            radioButton.classList.add('form-check');
    
            radioButton.innerHTML = `
                <input class="form-check-input" type="radio" name="course" value="${course.course_name}">
                <label class="form-check-label" for="${course.id}">
                    ${course.course_name}
                </label>
            `;
            courseRadiosContainer.appendChild(radioButton);
        });
    }
    
    // Radio-Buttons für User hinzufügen
    let data = JSON.parse(localStorage.getItem('data')) || [];
    const golfers = data.filter(user => user.role === "Golfer");
    if (golfers.length === 0) {
        const info = document.createElement("p");
        info.innerHTML = 'Keine Golfer vorhanden';
        userRadiosContainer.appendChild(info);
    } else {
        golfers.forEach(data => {
            const radioButton = document.createElement('div');
            radioButton.classList.add('form-check');
            radioButton.innerHTML = `
            <input class="form-check-input" type="radio" name="user" value="${data.email}">
            <label class="form-check-label" for="${data.email}">
                ${data.email}
            </label>
            `;
            userRadiosContainer.appendChild(radioButton);
        });
    }

    // Event Listener für Kurs- und Benutzer-Auswahl
    const courseRadios = document.getElementsByName('course');
    const userRadios = document.getElementsByName('user');

    courseRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            checkSelections(courseRadios, userRadios, printButton);
        });
    });

    userRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            checkSelections(courseRadios, userRadios, printButton);
        });
    });
}

// Funktion, um zu überprüfen, ob sowohl Kurs als auch Benutzer ausgewählt sind bei Scorecard-Druck, um Button zu disabeln
function checkSelections(courseRadios, userRadios, printButton) {
    const selectedCourse = Array.from(courseRadios).find(radio => radio.checked);
    const selectedUser = Array.from(userRadios).find(radio => radio.checked);

    printButton.disabled = !(selectedCourse && selectedUser);
}

function showEditCourse() {
    document.getElementById("course_title").innerHTML = "Kurs bearbeiten:";
    document.getElementById("course_name").classList.add("hidden");
    document.getElementById("edit_course_select").classList.remove("hidden");
    document.getElementById("course_name_label").classList.add("hidden");
    document.getElementById("edit_course_select_label").classList.remove("hidden");
    document.getElementById("edit_course_button").classList.add("hidden");
    document.getElementById("cancel_edit_course").classList.remove("hidden");
    document.getElementById("save_course").classList.add("hidden");
    document.getElementById("save_edit_course").classList.remove("hidden");
}

function cancelEditCourse() {
    document.getElementById("course_title").innerHTML = "Kurs hinzufügen:";
    document.getElementById("course_name").classList.remove("hidden");
    document.getElementById("edit_course_select").classList.add("hidden");
    document.getElementById("course_name_label").classList.remove("hidden");
    document.getElementById("edit_course_select_label").classList.add("hidden");
    document.getElementById("edit_course_button").classList.remove("hidden");
    document.getElementById("cancel_edit_course").classList.add("hidden");
    document.getElementById("save_course").classList.remove("hidden");
    document.getElementById("save_edit_course").classList.add("hidden");
    clearCourseFields();
}