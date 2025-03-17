function calculateHandicaps() {
    let json_data = JSON.parse(localStorage.getItem("data"));
    const games = current_user_data.games;

    let previousGame;
    if (games.length === 1) {
        previousGame = {ega: -54};
    } else {
        previousGame = games[games.length-2];
    }

    const ega = calculate_old_hdc(previousGame, games[games.length-1]);
    const whci = whci(games);

    for (let x = 0; x < json_data.length; x++) {
        if (json_data[x].email === current_user_data.email) {
            json_data[x].current_ega = ega;
            json_data[x].games[games.length -1].ega = ega;
            json_data[x].current_whci = whci;
            json_data[x].games[games.length -1].whci = whci;
        }
    }

    document.getElementById("old_handicap").innerHTML = ega;
    document.getElementById("new_handicap").innerHTML = whci;
    localStorage.setItem("data", JSON.stringify(json_data))
}

function whci(games) {
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

function getScoreDifferentials(games) {
    const scoreDifferentials = [];
    games.forEach((game) => {
        scoreDifferentials.push(scoreDifferential(game));
    });
    return scoreDifferentials.sort((a, b) => a - b);
}


function scoreDifferential(game) {


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

function calcCourseHdc(game) {
    return Math.abs(game.hcp_index) * game.slope_rating / 113 + game.course_rating - (game.holes.reduce((acc, hole) => acc + hole.par, 0));
}

function calcStablefordPoints(par, hits) {
    if (hits <= 0) {
        throw new Error("Hits must be greater than 0");
    } else if(par <= 0) {
        throw new Error("Par must be greater than 0");
    }
    return Math.max(par - hits + 2, 0);
}

function calculate_stableford(game){

    let stable_points = 0

    for (let i = 0; i < 18; i++) {
        let parInput = game[i].par;
        let hitsInput = game[i].hits;
        stable_points += calcStablefordPoints(parInput, hitsInput);
    }
    return stable_points;
}

// Calculates the handicap using stableford points: https://serviceportal.dgv-intranet.de/regularien/vorgabensystem/i539_1.cfm
function calculate_old_hdc(game, currentGame){
    let previousHandicap = game.ega;

    let stable_points = calculate_stableford(currentGame);

    if (previousHandicap <= 4.4){                                                               // Checks the current handicap-class
        if (stable_points === 35 || stable_points === 36){                                                      // Handicap stays the same
            return previousHandicap;
        }
        else if (stable_points > 36){                                                   // Handicap gets reduced (player performed better than usual)
            while (stable_points > 36){
                stable_points = stable_points - 1;
                previousHandicap = previousHandicap - 0.1;
            }
            return previousHandicap;
        }
        else if (stable_points < 35){                                                   // Handicap gets increased (plyer perfomed worse than usual)
            while (stable_points < 35){
                stable_points = stable_points + 1;
                previousHandicap = previousHandicap + 0.1;
            }
            console.log(previousHandicap)
            return previousHandicap;
        }
    }
    else if (previousHandicap > 4.4 && previousHandicap <= 11.4){                                       // Handicap class 2
        if (stable_points >= 34 && stable_points <= 36){
            return previousHandicap;
        }
        else if (stable_points > 36){
            while (stable_points > 36){
                stable_points = stable_points - 1;
                previousHandicap = previousHandicap - 0.2;
            }
            return previousHandicap;
        }
        else if (stable_points < 34){
            while (stable_points < 34){
                stable_points = stable_points + 1;
                previousHandicap = previousHandicap + 0.1;
            }
            return previousHandicap;
        }
    }
    else if (previousHandicap > 11.4 && previousHandicap <= 18.4){                                      // Handicap class 3
        if (stable_points >= 33 && stable_points <= 36){
            return previousHandicap;
        }
        else if (stable_points > 36){
            while (stable_points > 36){
                stable_points = stable_points - 1;
                previousHandicap = previousHandicap - 0.3;
            }
            return previousHandicap;
        }
        else if (stable_points < 33){
            while (stable_points < 33){
                stable_points = stable_points + 1;
                previousHandicap = previousHandicap + 0.1;
            }
            return previousHandicap;
        }
    }
    else if (previousHandicap > 18.4 && previousHandicap <= 26.4){                                      // Handicap class 4
        if (stable_points >= 32 && stable_points <= 36){
            return previousHandicap;
        }
        else if (stable_points > 36){
            while (stable_points > 36){
                stable_points = stable_points - 1;
                previousHandicap = previousHandicap - 0.4;
            }
            return previousHandicap;
        }
        else if (stable_points < 32){
            while (stable_points < 32){
                stable_points = stable_points + 1;
                previousHandicap = previousHandicap + 0.1;
            }
            return previousHandicap;
        }
    }
    else if (previousHandicap > 26.4 && previousHandicap <= 36){                                        // Handicap class 5
        if (stable_points === 36){
            return previousHandicap;
        }
        else if (stable_points > 36){
            while (stable_points >= 36){
                stable_points = stable_points - 1;
                previousHandicap = previousHandicap - 0.5;
            }
            return previousHandicap;
        }
        else if (stable_points < 34){                                                   // On class 5 and upwards handicap can't increase
            return previousHandicap;
        }
        return previousHandicap;
    }
    else if (previousHandicap > 36 && previousHandicap <= 54){                                          // Handicap class 6
        if (stable_points === 36){
            return previousHandicap;
        }
        else if (stable_points > 36){
            while (stable_points >= 36){
                stable_points = stable_points - 1;
                previousHandicap = previousHandicap - 1;
            }
            return previousHandicap;
        }
        else if (stable_points < 34){
            return previousHandicap;
        }
        return previousHandicap;
    }
}

