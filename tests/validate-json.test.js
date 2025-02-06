import { describe, it, test, expect } from "vitest";
import { validateJson } from "../src/validate-json.js";

const data = require('./data/test-data.json');

function copyOf(obj) {
    const _ = require('lodash');
    return _.cloneDeep(obj);
}

describe('JSON VALIDATION TEST', () => {

    test('Validates the test data', () => {
        // Pattern: Arrange, Act, Assert.
        // Arrange:
        const data1 = copyOf(data);

        // Act:
        const res1 = validateJson(data1);

        // Assert:
        expect(res1).toBe(true);
    });

    test('Fails if data is not json', () => {
        // Pattern: Arrange, Act, Assert.
        // Arrange:
        let data1 = "Hello my friend";

        // Act:
        const res1 = validateJson(data1);

        // Assert:
        expect(res1).toBe(false);
    });

    test('Fails if additional properties are added', () => {
        // Pattern: Arrange, Act, Assert.
        // Arrange:
        let data1 = copyOf(data);
        data1.another = "string";

        let data2 = copyOf(data);
        data2.games.at(7).another = "string";

        let data3 = copyOf(data);

        data3.games.at(3).holes.at(6).another = "string";

        // Act:
        const res1 = validateJson(data1);
        const res2 = validateJson(data2);
        const res3 = validateJson(data3);

        // Assert:
        expect(res1).toBe(false);
        expect(res2).toBe(false);
        expect(res3).toBe(false);
    });

    test('Fails if properties are missing', () => {
        // Pattern: Arrange, Act, Assert.
        // Arrange:
        let data1 = copyOf(data);
        delete data1.surname;

        let data2 = copyOf(data);
        delete data2.games.at(7).hcp_index;

        let data3 = copyOf(data);
        delete data3.games.at(9).holes.at(4).hits;

        // Act:
        const res1 = validateJson(data1);
        const res2 = validateJson(data2);
        const res3 = validateJson(data3);

        // Assert:
        expect(res1).toBe(false);
        expect(res2).toBe(false);
        expect(res3).toBe(false);
    });  
});

describe('JSON PROPERTIES TEST', () => {

    test('User ID', () => {

        // Pattern: Arrange, Act, Assert.
        // Arrange:
        let data1 = copyOf(data);
        data1.user_id = 512;

        let data2 = copyOf(data);
        data2.user_id = 0;

        let data3 = copyOf(data);
        data3.user_id = -21;

        let data4 = copyOf(data);
        data4.user_id = "string";

        // Act:
        const res1 = validateJson(data1);
        const res2 = validateJson(data2);
        const res3 = validateJson(data3);
        const res4 = validateJson(data4);

        // Assert:
        expect(res1).toBe(true);
        expect(res2).toBe(false);
        expect(res3).toBe(false);
        expect(res4).toBe(false);
    });

    test('Surname', () => {

        // Pattern: Arrange, Act, Assert.
        // Arrange:

        // No numbers allowed
        let data1 = copyOf(data);
        data1.surname = 512;

        // No empty strings allowed
        let data2 = copyOf(data); 
        data2.surname = "";

        // No strings longer than 40 symbols allowed
        let data3 = copyOf(data);
        data3.surname = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"; 

        // Valid
        let data4 = copyOf(data); 
        data4.surname = "van Maximus";

        // Act:
        const res1 = validateJson(data1);
        const res2 = validateJson(data2);
        const res3 = validateJson(data3);
        const res4 = validateJson(data4);

        // Assert:
        expect(res1).toBe(false);
        expect(res2).toBe(false);
        expect(res3).toBe(false);
        expect(res4).toBe(true);
    });

    test('First Name', () => {

        // Pattern: Arrange, Act, Assert.
        // Arrange:

        // No numbers allowed
        let data1 = copyOf(data); 
        data1.first_name = 512;

        // No empty strings allowed
        let data2 = copyOf(data); 
        data2.first_name = "";

        // No strings longer than 40 symbols allowed
        let data3 = copyOf(data);
        data3.first_name = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"; 

        // Valid
        let data4 = copyOf(data); 
        data4.first_name = "Plebertus, Jr.";

        // Act:
        const res1 = validateJson(data1);
        const res2 = validateJson(data2);
        const res3 = validateJson(data3);
        const res4 = validateJson(data4);

        // Assert:
        expect(res1).toBe(false);
        expect(res2).toBe(false);
        expect(res3).toBe(false);
        expect(res4).toBe(true);
    });

    test('Games -> Game ID', () => {

        // Pattern: Arrange, Act, Assert.
        // Arrange:

        // Valid
        let data1 = copyOf(data); 
        data1.games.at(0).game_id = 512;

        // No strings allowed
        let data2 = copyOf(data); 
        data2.games.at(0).game_id = "help";

        // No zero allowed
        let data3 = copyOf(data);
        data3.games.at(0).game_id = 0; 

        // No negative numbers allowed
        let data4 = copyOf(data); 
        data4.games.at(0).game_id = -15;

        // Act:
        const res1 = validateJson(data1);
        const res2 = validateJson(data2);
        const res3 = validateJson(data3);
        const res4 = validateJson(data4);

        // Assert:
        expect(res1).toBe(true);
        expect(res2).toBe(false);
        expect(res3).toBe(false);
        expect(res4).toBe(false);
    });

    test('Games -> Course Name', () => {

        // Pattern: Arrange, Act, Assert.
        // Arrange:

        // No numbers allowed
        let data1 = copyOf(data); 
        data1.games.at(3).course_name = 512;

        // No empty strings allowed
        let data2 = copyOf(data); 
        data2.games.at(3).course_name = "";

        // No strings longer than 40 symbols allowed
        let data3 = copyOf(data);
        data3.games.at(3).course_name = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"; 

        // Valid
        let data4 = copyOf(data); 
        data4.games.at(3).course_name = "Pleb Gold Club Course 18-hole";

        // Act:
        const res1 = validateJson(data1);
        const res2 = validateJson(data2);
        const res3 = validateJson(data3);
        const res4 = validateJson(data4);

        // Assert:
        expect(res1).toBe(false);
        expect(res2).toBe(false);
        expect(res3).toBe(false);
        expect(res4).toBe(true);
    });

    test('Games -> Date', () => {

        // Pattern: Arrange, Act, Assert.
        // Arrange:

        // No numbers allowed
        let data1 = copyOf(data); 
        data1.games.at(7).date = 512;

        // No empty strings allowed
        let data2 = copyOf(data); 
        data2.games.at(7).date = "";

        // No random strings allowed
        let data3 = copyOf(data);
        data3.games.at(7).date = "abcdefghij"; 

        // Valid
        let data4 = copyOf(data); 
        data4.games.at(7).date = "2012/12/12";

        // Wrong partition symbol
        let data5 = copyOf(data);
        data5.games.at(7).date = "2012-12-12"; 

        // Date format YYYY/DD/MM not allowed
        let data6 = copyOf(data); 
        data6.games.at(7).date = "2012/31/13";

        // Date format DD/MM/YYYY not allowed
        let data7 = copyOf(data); 
        data7.games.at(7).date = "31/03/2012";

        // Single digit dates and months not allowed
        let data8 = copyOf(data); 
        data8.games.at(7).date = "2012/1/3";

        // Act:
        const res1 = validateJson(data1);
        const res2 = validateJson(data2);
        const res3 = validateJson(data3);
        const res4 = validateJson(data4);
        const res5 = validateJson(data5);
        const res6 = validateJson(data6);
        const res7 = validateJson(data7);
        const res8 = validateJson(data8);

        // Assert:
        expect(res1).toBe(false);
        expect(res2).toBe(false);
        expect(res3).toBe(false);
        expect(res4).toBe(true);
        expect(res5).toBe(false);
        expect(res6).toBe(false);
        expect(res7).toBe(false);
        expect(res8).toBe(false);
        
    });

    test('Games -> HCP Index', () => {

        // Pattern: Arrange, Act, Assert.
        // Arrange:

        // No strings allowed
        let data1 = copyOf(data); 
        data1.games.at(4).hcp_index = "I HATE JAVASCRIPT";

        // No number lower than -54 allowed
        let data2 = copyOf(data); 
        data2.games.at(4).hcp_index = -55.5;

        // No number higher than 54 allowed
        let data3 = copyOf(data);
        data3.games.at(4).hcp_index = 55.5; 

        // Valid
        let data4 = copyOf(data); 
        data4.games.at(4).hcp_index = 15.7;

        // Valid
        let data5 = copyOf(data); 
        data5.games.at(4).hcp_index = -23.1;


        // Act:
        const res1 = validateJson(data1);
        const res2 = validateJson(data2);
        const res3 = validateJson(data3);
        const res4 = validateJson(data4);
        const res5 = validateJson(data5);

        // Assert:
        expect(res1).toBe(false);
        expect(res2).toBe(false);
        expect(res3).toBe(false);
        expect(res4).toBe(true);
        expect(res5).toBe(true);
        
    });

    test('Games -> Course Rating', () => {

        // Pattern: Arrange, Act, Assert.
        // Arrange:

        // No strings allowed
        let data1 = copyOf(data); 
        data1.games.at(1).course_rating = "I HATE JAVASCRIPT";

        // No number lower than 30 allowed
        let data2 = copyOf(data); 
        data2.games.at(1).course_rating = 29.5;

        // No number higher than 90 allowed
        let data3 = copyOf(data);
        data3.games.at(1).course_rating = 90.5; 

        // Valid
        let data4 = copyOf(data); 
        data4.games.at(1).course_rating = 70.1;

        // Valid
        let data5 = copyOf(data); 
        data5.games.at(1).course_rating = 36.3;


        // Act:
        const res1 = validateJson(data1);
        const res2 = validateJson(data2);
        const res3 = validateJson(data3);
        const res4 = validateJson(data4);
        const res5 = validateJson(data5);

        // Assert:
        expect(res1).toBe(false);
        expect(res2).toBe(false);
        expect(res3).toBe(false);
        expect(res4).toBe(true);
        expect(res5).toBe(true);
        
    });

    test('Games -> Slope Rating', () => {

        // Pattern: Arrange, Act, Assert.
        // Arrange:

        // No strings allowed
        let data1 = copyOf(data); 
        data1.games.at(8).slope_rating = "I HATE JAVASCRIPT";

        // No number lower than 55 allowed
        let data2 = copyOf(data); 
        data2.games.at(8).slope_rating = 54.5;

        // No number higher than 155 allowed
        let data3 = copyOf(data);
        data3.games.at(8).slope_rating = 156; 

        // Valid
        let data4 = copyOf(data); 
        data4.games.at(8).slope_rating = 102;

        // Valid
        let data5 = copyOf(data); 
        data5.games.at(8).slope_rating = 134;


        // Act:
        const res1 = validateJson(data1);
        const res2 = validateJson(data2);
        const res3 = validateJson(data3);
        const res4 = validateJson(data4);
        const res5 = validateJson(data5);

        // Assert:
        expect(res1).toBe(false);
        expect(res2).toBe(false);
        expect(res3).toBe(false);
        expect(res4).toBe(true);
        expect(res5).toBe(true);
        
    });

    test('Games -> Holes', () => {

        // Pattern: Arrange, Act, Assert.
        // Arrange:

        // Number of holes must be equal to or lower than 18
        let data1 = copyOf(data);
        data1.games.at(5).holes.push({
            "hole_id": 15,
            "par": 3,
            "hcp": 4,
            "hits": 5
        })

        // Number of holes must be either 9 or 18
        let data2 = copyOf(data);
        data2.games.at(5).holes.push({
            "hole_id": 5,
            "par": 3,
            "hcp": 4,
            "hits": 5
        })

        // Number of holes must be equal to or higher than 9
        let data3 = copyOf(data);
        data3.games.at(5).holes = [];

        // Act:
        const res1 = validateJson(data1);
        const res2 = validateJson(data2);
        const res3 = validateJson(data3);

        // Assert:
        expect(res1).toBe(false);
        expect(res2).toBe(false);
        expect(res3).toBe(false);
    });

    test('Games -> Holes -> Hole ID', () => {

        // Pattern: Arrange, Act, Assert.
        // Arrange:

        // Valid
        let data1 = copyOf(data); 
        data1.games.at(10).holes.at(0).hole_id = 7;

        // No strings allowed
        let data2 = copyOf(data); 
        data2.games.at(10).holes.at(0).hole_id = "help";

        // Hole id must be greater or equal to 1
        let data3 = copyOf(data);
        data3.games.at(10).holes.at(0).hole_id = 0; 

        // Hole id must be smaller or equal to 18
        let data4 = copyOf(data); 
        data4.games.at(10).holes.at(0).hole_id = 19;

        // Act:
        const res1 = validateJson(data1);
        const res2 = validateJson(data2);
        const res3 = validateJson(data3);
        const res4 = validateJson(data4);

        // Assert:
        expect(res1).toBe(true);
        expect(res2).toBe(false);
        expect(res3).toBe(false);
        expect(res4).toBe(false);
    });

    test('Games -> Holes -> Par', () => {

        // Pattern: Arrange, Act, Assert.
        // Arrange:

        // Valid
        let data1 = copyOf(data); 
        data1.games.at(2).holes.at(6).par = 5;

        // No strings allowed
        let data2 = copyOf(data); 
        data2.games.at(2).holes.at(6).par = "help";

        // Hole id must be greater or equal to 2
        let data3 = copyOf(data);
        data3.games.at(2).holes.at(6).par = 1; 

        // Hole id must be smaller or equal to 6
        let data4 = copyOf(data); 
        data4.games.at(2).holes.at(6).par = 7;

        // Act:
        const res1 = validateJson(data1);
        const res2 = validateJson(data2);
        const res3 = validateJson(data3);
        const res4 = validateJson(data4);

        // Assert:
        expect(res1).toBe(true);
        expect(res2).toBe(false);
        expect(res3).toBe(false);
        expect(res4).toBe(false);
    });

    test('Games -> Holes -> HCP', () => {

        // Pattern: Arrange, Act, Assert.
        // Arrange:

        // Valid
        let data1 = copyOf(data); 
        data1.games.at(11).holes.at(3).hcp = 7;

        // No strings allowed
        let data2 = copyOf(data); 
        data2.games.at(11).holes.at(3).hcp = "help";

        // HCP must be greater or equal to 1
        let data3 = copyOf(data);
        data3.games.at(11).holes.at(3).hcp = 0; 

        // HCP must be smaller or equal to 18
        let data4 = copyOf(data); 
        data4.games.at(11).holes.at(3).hcp = 19;

        // Act:
        const res1 = validateJson(data1);
        const res2 = validateJson(data2);
        const res3 = validateJson(data3);
        const res4 = validateJson(data4);

        // Assert:
        expect(res1).toBe(true);
        expect(res2).toBe(false);
        expect(res3).toBe(false);
        expect(res4).toBe(false);
    });

    test('Games -> Holes -> Hits', () => {

        // Pattern: Arrange, Act, Assert.
        // Arrange:

        // Valid
        let data1 = copyOf(data); 
        data1.games.at(11).holes.at(3).hits = 7;

        // No strings allowed
        let data2 = copyOf(data); 
        data2.games.at(11).holes.at(3).hits = "help";

        // HCP must be greater or equal to 1
        let data3 = copyOf(data);
        data3.games.at(11).holes.at(3).hits = 0; 

        // Act:
        const res1 = validateJson(data1);
        const res2 = validateJson(data2);
        const res3 = validateJson(data3);

        // Assert:
        expect(res1).toBe(true);
        expect(res2).toBe(false);
        expect(res3).toBe(false);
    });
});