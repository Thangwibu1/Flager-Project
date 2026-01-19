/**
 * Math Utility Functions
 * Demo file for unit testing examples
 */

/**
 * Add two numbers together
 * @param a - First number
 * @param b - Second number
 * @returns Sum of a and b
 * @throws Error if inputs are not numbers
 */
export function sum(a: number, b: number): number {
    // Validate inputs
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }

    // Check for NaN
    if (isNaN(a) || isNaN(b)) {
        throw new Error('Arguments cannot be NaN');
    }

    return a + b;
}

/**
 * Subtract b from a
 * @param a - First number
 * @param b - Second number
 * @returns Difference of a and b
 * @throws Error if inputs are not numbers
 */
export function subtract(a: number, b: number): number {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }

    if (isNaN(a) || isNaN(b)) {
        throw new Error('Arguments cannot be NaN');
    }

    return a - b;
}

/**
 * Multiply two numbers
 * @param a - First number
 * @param b - Second number
 * @returns Product of a and b
 * @throws Error if inputs are not numbers
 */
export function multiply(a: number, b: number): number {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }

    if (isNaN(a) || isNaN(b)) {
        throw new Error('Arguments cannot be NaN');
    }

    return a * b;
}

/**
 * Divide a by b
 * @param a - Dividend
 * @param b - Divisor
 * @returns Quotient of a and b
 * @throws Error if inputs are not numbers or if dividing by zero
 */
export function divide(a: number, b: number): number {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }

    if (isNaN(a) || isNaN(b)) {
        throw new Error('Arguments cannot be NaN');
    }

    if (b === 0) {
        throw new Error('Cannot divide by zero');
    }

    return a / b;
}
