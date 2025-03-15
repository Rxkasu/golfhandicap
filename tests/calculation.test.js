import { describe, it, test, expect } from "vitest";
import { calcStablefordPoints, calculate_stableford, calcCourseHdc, scoreDifferential, getScoreDifferentials } from "../Code/calculations.js";

const data = require('./data/test-data.json');

function copyOf(obj) {
    const _ = require('lodash');
    return _.cloneDeep(obj);
}

describe('TEST COURSE HANDICAP CALCULATIONS', () => {

    test('Validates Course Handicap calculations', () => {
        // Arrange:
        const data1 = copyOf(data);
        const game1 = data1.games[0];
        const game2 = data1.games[1];
        const game3 = data1.games[2];
        const game4 = data1.games[5];

        // Act:

        expect(calcCourseHdc(game1)).toBeCloseTo(53.9, 1);
        expect(calcCourseHdc(game2)).toBeCloseTo(36.6, 1);
        expect(calcCourseHdc(game3)).toBeCloseTo(37.7, 1);
        expect(calcCourseHdc(game4)).toBeCloseTo(23.2, 1);
    });

    test('Validates Score Differential calculations', () => {
        // Arrange:
        const data1 = copyOf(data);
        const game1 = data1.games[0];
        const game2 = data1.games[1];
        let game3 = data1.games[2];
        game3.holes[1].hits = 10;
        const game4 = data1.games[5];

        // Act:

        expect(scoreDifferential(game1)).toBeCloseTo(37.4, 1);
        expect(scoreDifferential(game2)).toBeCloseTo(29.6, 1);
        expect(scoreDifferential(game3)).toBeCloseTo(27.6, 1);
        expect(scoreDifferential(game4)).toBeCloseTo(31.1, 1);
    });

    test('Validates Getting and sorting all Score Differentials', () => {
        // Arrange:
        const data1 = copyOf(data);
        const game1 = data1.games[7];
        const game2 = data1.games[8];
        const game3 = data1.games[11];
        const games = [game1, game2, game3];
        

        // Act:

        const res = getScoreDifferentials(games);


        expect(res[0]).toBeCloseTo(scoreDifferential(game2), 1);
        expect(res[1]).toBeCloseTo(scoreDifferential(game1), 1);
        expect(res[2]).toBeCloseTo(scoreDifferential(game3), 1);
    });

});

describe('TEST STABLEFORD POINT CALCULATIONS', () => {

    test('Validates Stableford point calc for individual holes', () => {
        // Arrange:
        const hits1 = 5;
        const hits2 = 10;
        const hits3 = 1;
        const hits4 = -1;
        const par1 = 2;
        const par2 = 7;
        const par3 = -1;

        // Act & Assert:
        expect(calcStablefordPoints(par1, hits1)).toBe(0);
        expect(calcStablefordPoints(par2, hits2)).toBe(0);
        expect(calcStablefordPoints(par2, hits1)).toBe(4);
        expect(calcStablefordPoints(par2, hits3)).toBe(8);
        expect(() => calcStablefordPoints(par3, hits3)).toThrowError("Par must be greater than 0");
        expect(() => calcStablefordPoints(par1, hits4)).toThrowError("Hits must be greater than 0");
    });

    test('Validates Stableford point calc for all holes', () => {
        // Arrange:
        const data1 = copyOf(data);
        const game1 = data1.games[0];
        const gameData1 = [];
        game1.holes.forEach(hole => {
            gameData1.push({par: hole.par, hits: hole.hits});
        });

        const game2 = data1.games[1];
        const gameData2 = [];
        game2.holes.forEach(hole => {
            gameData2.push({par: hole.par, hits: hole.hits});
        });

        // Act:

        expect(calculate_stableford(gameData1)).toBe(2);
        expect(calculate_stableford(gameData2)).toBe(10);
    });
    
});