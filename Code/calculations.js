
function whci() {
    const games = current_user_data.games;
    const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

    games.slice(-20);
    const scoreDifferentials = getScoreDifferentials(games);

    if (games.length <= 3) {
        return scoreDifferentials[0] - 2;
    } else if (games.length === 4) {
        return scoreDifferentials[0] - 1;
    } else if (games.length === 5) {
        return scoreDifferentials[0];
    } else if (games.length === 6) {
        return mean(scoreDifferentials.slice(0, 2)) - 1;
    } else if (games.length <= 8) {
        return mean(scoreDifferentials.slice(0, 2));
    } else if (games.length <= 11) {
        return mean(scoreDifferentials.slice(0, 3));
    } else if (games.length <= 14) {
        return mean(scoreDifferentials.slice(0, 4));
    } else if (games.length <= 16) {
        return mean(scoreDifferentials.slice(0, 5));
    } else if (games.length <= 18) {
        return mean(scoreDifferentials.slice(0, 6));
    } else if (games.length === 19) {
        return mean(scoreDifferentials.slice(0, 7));
    } else {
        return mean(scoreDifferentials.slice(0, 8));
    }
}

export function getScoreDifferentials(games) {
    const scoreDifferentials = [];
    games.forEach((game) => {
        scoreDifferentials.push(scoreDifferential(game));
    });
    return scoreDifferentials.sort((a, b) => a - b);
}


export function scoreDifferential(game) {


    let courseHdc = calcCourseHdc(game);

    let roundedCourseHdc = Math.round(courseHdc);
    let div = Math.floor(roundedCourseHdc / game.holes.length);
    let mod = roundedCourseHdc % game.holes.length;

    let grossHits = 0;

    

    for(let i = 0; i < game.holes.length; i++) {
        let hole = game.holes[i];
        if(hole.hcp <= mod) {
            grossHits += Math.min(hole.hits, hole.par + 2 + div + 1);
        } else {
            grossHits += Math.min(hole.hits, hole.par + 2 + div);
        }
    }

    let otherNine = game.holes.length === 9 ? (Math.abs(game.hcp_index) * 1.04 + 2.4) / 2 : 0;

    return Math.round(((grossHits - game.course_rating) * 113 / game.slope_rating + otherNine) * 10) / 10;
}

export function calcCourseHdc(game) {
    return Math.abs(game.hcp_index) * game.slope_rating / 113 + game.course_rating - (game.holes.reduce((acc, hole) => acc + hole.par, 0));
}

export function calcStablefordPoints(par, hits) {
    if (hits <= 0) {
        throw new Error("Hits must be greater than 0");
    } else if(par <= 0) {
        throw new Error("Par must be greater than 0");
    }
    return Math.max(par - hits + 2, 0);
}

export function calculate_stableford(game){

    let stable_points = 0

    for (let i = 0; i < 18; i++) {
        let parInput = game[i].par;
        let hitsInput = game[i].hits;
        stable_points += calcStablefordPoints(parInput, hitsInput);
    }
    return stable_points;
}

// Calculates the handicap using stableford points: https://serviceportal.dgv-intranet.de/regularien/vorgabensystem/i539_1.cfm
function calculate_old_hdc(){
    let json_data = JSON.parse(localStorage.getItem("data"));
    let course_name = document.getElementById("courseSelect").value
    if (course_name == false){
        window.alert("Bitte Kurs auswählen")
        return
    }
    let handicap = 0
    let game = [];
    for (let i = 1; i <= 18; i++) {
        let parInput = document.getElementById(`par${i}`).value;
        let hitsInput = document.getElementById(`hits${i}`).value;
        game.push({par: parInput, hits: hitsInput}); 
    }

    let stable_points = calculate_stableford(game);

    for (let x = 0; x < json_data.length; x++){
        if (json_data[x].email === current_user_data.email){                                            // Find data of current user
            for (let y = 0; y < json_data[x].games.length; y++){
                if (json_data[x].games[y].course_name === course_name){
                    handicap = json_data[x].games[y].hcp_index
                    if (handicap <= 4.4){                                                               // Checks the current handicap-class
                        if (stable_points === 36){                                                      // Handicap stays the same
                            json_data[x].games[y].hcp_index = handicap
                            return
                        }
                        else if (stable_points > 36){                                                   // Handicap gets reduced (player performed better than usual)
                            while (stable_points >= 36){
                                stable_points = stable_points - 1
                                handicap = handicap - 0.1
                            }
                            json_data[x].games[y].hcp_index = handicap
                        }
                        else if (stable_points < 35){                                                   // Handicap gets increased (plyer perfomed worse than usual)
                            while (stable_points <= 36){
                                stable_points = stable_points + 1
                                handicap = handicap + 0.1
                            }
                            json_data[x].games[y].hcp_index = handicap
                            console.log(handicap)
                        }
                    }
                    else if (handicap > 4.4 && handicap <= 11.4){                                       // Handicap class 2
                        if (stable_points === 36){
                            json_data[x].games[y].hcp_index = json_data[x].games[y].hcp_index
                            return
                        }
                        else if (stable_points > 36){
                            while (stable_points >= 36){
                                stable_points = stable_points - 1
                                handicap = handicap - 0.2
                            }
                            json_data[x].games[y].hcp_index = handicap
                        }
                        else if (stable_points < 34){
                            while (stable_points <= 36){
                                stable_points = stable_points + 1
                                handicap = handicap + 0.1
                            }
                            json_data[x].games[y].hcp_index = handicap
                        }
                    }
                    else if (handicap > 11.4 && handicap <= 18.4){                                      // Handicap class 3
                        if (stable_points === 36){
                            json_data[x].games[y].hcp_index = json_data[x].games[y].hcp_index
                            return
                        }
                        else if (stable_points > 36){
                            while (stable_points >= 36){
                                stable_points = stable_points - 1
                                handicap = handicap - 0.3
                            }
                            json_data[x].games[y].hcp_index = handicap
                        }
                        else if (stable_points < 34){
                            while (stable_points <= 36){
                                stable_points = stable_points + 1
                                handicap = handicap + 0.1
                            }
                            json_data[x].games[y].hcp_index = handicap
                        }
                    }
                    else if (handicap > 18.4 && handicap <= 26.4){                                      // Handicap class 4
                        if (stable_points === 36){
                            json_data[x].games[y].hcp_index = json_data[x].games[y].hcp_index
                            return
                        }
                        else if (stable_points > 36){
                            while (stable_points >= 36){
                                stable_points = stable_points - 1
                                handicap = handicap - 0.4
                            }
                            json_data[x].games[y].hcp_index = handicap
                        }
                        else if (stable_points < 34){
                            while (stable_points <= 36){
                                stable_points = stable_points + 1
                                handicap = handicap + 0.1
                            }
                            json_data[x].games[y].hcp_index = handicap
                        }
                    }
                    else if (handicap > 26.4 && handicap <= 36){                                        // Handicap class 5
                        if (stable_points === 36){
                            json_data[x].games[y].hcp_index = json_data[x].games[y].hcp_index
                            return
                        }
                        else if (stable_points > 36){
                            while (stable_points >= 36){
                                stable_points = stable_points - 1
                                handicap = handicap - 0.5
                            }
                            json_data[x].games[y].hcp_index = handicap
                        }
                        else if (stable_points < 34){                                                   // On class 5 and upwards handicap can't increase
                            json_data[x].games[y].hcp_index = handicap
                            return
                        }
                        json_data[x].games[y].hcp_index = handicap
                    }
                    else if (handicap > 36 && handicap <= 54){                                          // Handicap class 6
                        if (stable_points === 36){
                            json_data[x].games[y].hcp_index = handicap
                            return
                        }
                        else if (stable_points > 36){
                            while (stable_points >= 36){
                                stable_points = stable_points - 1
                                handicap = handicap - 1
                            }
                            json_data[x].games[y].hcp_index = handicap
                        }
                        else if (stable_points < 34){
                            json_data[x].games[y].hcp_index = handicap
                            return
                        }
                        json_data[x].games[y].hcp_index = handicap
                    }
                    localStorage.setItem("data", JSON.stringify(json_data))
                    console.log(json_data[x].games[y].hcp_index)
                    break
                }
            }
            break
        }
    }
}

