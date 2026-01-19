import { describe, it, expect } from 'vitest';
import { sum, subtract, multiply, divide } from '../math.util';

describe('Math Utilities', () => {
    // ============================================
    // 🧮 SUM FUNCTION TESTS
    // ============================================
    describe('sum()', () => {
        // ✅ SUCCESS CASES
        describe('Success Cases', () => {
            it('should add two positive numbers', () => {
                // Arrange
                const a = 5;
                const b = 3;

                // Act
                const result = sum(a, b);

                // Assert
                expect(result).toBe(8);
            });

            it('should add two negative numbers', () => {
                const result = sum(-5, -3);
                expect(result).toBe(-8);
            });

            it('should add positive and negative numbers', () => {
                const result = sum(10, -3);
                expect(result).toBe(7);
            });

            it('should add zero to a number', () => {
                const result = sum(5, 0);
                expect(result).toBe(5);
            });

            it('should add two zeros', () => {
                const result = sum(0, 0);
                expect(result).toBe(0);
            });

            it('should handle decimal numbers', () => {
                const result = sum(1.5, 2.3);
                expect(result).toBeCloseTo(3.8); // Use toBeCloseTo for floats
            });

            it('should handle very large numbers', () => {
                const result = sum(1000000, 2000000);
                expect(result).toBe(3000000);
            });
        });

        // ❌ ERROR CASES
        describe('Error Cases', () => {
            it('should throw error when first argument is not a number', () => {
                // Assert
                expect(() => sum('5' as any, 3)).toThrow(
                    'Both arguments must be numbers'
                );
            });

            it('should throw error when second argument is not a number', () => {
                expect(() => sum(5, '3' as any)).toThrow(
                    'Both arguments must be numbers'
                );
            });

            it('should throw error when both arguments are not numbers', () => {
                expect(() => sum('5' as any, '3' as any)).toThrow(
                    'Both arguments must be numbers'
                );
            });

            it('should throw error when first argument is NaN', () => {
                expect(() => sum(NaN, 3)).toThrow('Arguments cannot be NaN');
            });

            it('should throw error when second argument is NaN', () => {
                expect(() => sum(5, NaN)).toThrow('Arguments cannot be NaN');
            });

            it('should throw error when passing null', () => {
                expect(() => sum(null as any, 5)).toThrow(
                    'Both arguments must be numbers'
                );
            });

            it('should throw error when passing undefined', () => {
                expect(() => sum(undefined as any, 5)).toThrow(
                    'Both arguments must be numbers'
                );
            });

            it('should throw error when passing object', () => {
                expect(() => sum({ value: 5 } as any, 3)).toThrow(
                    'Both arguments must be numbers'
                );
            });

            it('should throw error when passing array', () => {
                expect(() => sum([5] as any, 3)).toThrow(
                    'Both arguments must be numbers'
                );
            });
        });

        // 🔍 DEMO: Xem chi tiết
        describe('🎯 DEMO: Detailed Logging', () => {
            it('should demonstrate sum with logging', () => {
                console.log('\n' + '='.repeat(60));
                console.log('🎯 DEMO: sum() Function Test');
                console.log('='.repeat(60));

                // Test Case 1: Positive numbers
                console.log('\n📋 Test Case 1: Positive Numbers');
                const a1 = 10;
                const b1 = 5;
                console.log('├─ Input a:', a1);
                console.log('├─ Input b:', b1);
                const result1 = sum(a1, b1);
                console.log('└─ Result:', result1);
                expect(result1).toBe(15);

                // Test Case 2: Negative numbers
                console.log('\n📋 Test Case 2: Negative Numbers');
                const a2 = -10;
                const b2 = -5;
                console.log('├─ Input a:', a2);
                console.log('├─ Input b:', b2);
                const result2 = sum(a2, b2);
                console.log('└─ Result:', result2);
                expect(result2).toBe(-15);

                // Test Case 3: Mixed
                console.log('\n📋 Test Case 3: Mixed (Positive + Negative)');
                const a3 = 10;
                const b3 = -3;
                console.log('├─ Input a:', a3);
                console.log('├─ Input b:', b3);
                const result3 = sum(a3, b3);
                console.log('└─ Result:', result3);
                expect(result3).toBe(7);

                // Test Case 4: Error handling
                console.log('\n📋 Test Case 4: Error Handling');
                console.log('├─ Input a: "hello" (string)');
                console.log('├─ Input b: 5');
                console.log('└─ Expected: Throw error');
                expect(() => sum('hello' as any, 5)).toThrow(
                    'Both arguments must be numbers'
                );
                console.log('   ✅ Error thrown correctly!');

                console.log('\n' + '='.repeat(60));
                console.log('✨ DEMO COMPLETED');
                console.log('='.repeat(60) + '\n');
            });
        });
    });

    // ============================================
    // ➖ SUBTRACT FUNCTION TESTS
    // ============================================
    describe('subtract()', () => {
        it('should subtract two positive numbers', () => {
            expect(subtract(10, 3)).toBe(7);
        });

        it('should subtract negative from positive', () => {
            expect(subtract(10, -3)).toBe(13);
        });

        it('should throw error for non-number inputs', () => {
            expect(() => subtract('10' as any, 3)).toThrow(
                'Both arguments must be numbers'
            );
        });
    });

    // ============================================
    // ✖️ MULTIPLY FUNCTION TESTS
    // ============================================
    describe('multiply()', () => {
        it('should multiply two positive numbers', () => {
            expect(multiply(5, 3)).toBe(15);
        });

        it('should multiply by zero', () => {
            expect(multiply(5, 0)).toBe(0);
        });

        it('should multiply negative numbers', () => {
            expect(multiply(-5, -3)).toBe(15);
        });

        it('should throw error for non-number inputs', () => {
            expect(() => multiply(5, '3' as any)).toThrow(
                'Both arguments must be numbers'
            );
        });
    });

    // ============================================
    // ➗ DIVIDE FUNCTION TESTS
    // ============================================
    describe('divide()', () => {
        it('should divide two positive numbers', () => {
            expect(divide(10, 2)).toBe(5);
        });

        it('should handle decimal results', () => {
            expect(divide(10, 3)).toBeCloseTo(3.333, 2);
        });

        it('should throw error when dividing by zero', () => {
            expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
        });

        it('should throw error for non-number inputs', () => {
            expect(() => divide('10' as any, 2)).toThrow(
                'Both arguments must be numbers'
            );
        });
    });
});
