import { describe, test, it, expect } from "vitest";
import { template } from "../src/template";

describe('TEMPLATE', () => {
    it('TEST_NAME_1', () => {
        // Pattern: Arrange, Act, Assert.
        // Arrange:
        const a = 1;
        const b = -2;

        // Act:
        const res = template(a, b);

        // Assert:
        expect(res).toBe(1);
        expect(res).not.toBe(-2);
    });
    it('TEST_NAME_2', () => {
        // Alternative:
        expect(template(1, -2)).toBe(1);
        expect(template(-2, 1)).toBe(1);
        expect(template(1, 1)).toBe(1);
    });
});