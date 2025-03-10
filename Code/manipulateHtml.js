createCourseSelect();

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
    //container.appendChild(input_name)
    // Extra button
    let delete_holes = document.getElementById("delete_holes")
    if (delete_holes == null) {
        delete_holes.remove();
    }
    delete_holes = document.createElement("input");
    delete_holes = document.createElement("input");
    delete_holes.type = "button";
    delete_holes.value = "Kurs löschen"
    delete_holes.onclick = delete_game;
    //container.appendChild(delete_holes)

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

function createCourseSelect() {
    const dropdown = document.getElementById("courseSelect");

    dropdown.innerHTML = '<option value="" disabled selected hidden>Bitte wähle einen Kurs</option>';

    let savedCourses = JSON.parse(localStorage.getItem("courses")) || ["No course"];
    savedCourses.forEach(course => {
        const option = document.createElement("option");
        option.value = course.course_name;
        option.textContent = course.course_name;
        dropdown.appendChild(option);
    });
}