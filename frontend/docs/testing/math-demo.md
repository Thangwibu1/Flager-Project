# 🎯 Demo: Unit Testing với Math Utilities

Tài liệu hướng dẫn chi tiết về cách viết unit tests cho functions đơn giản.

## 📁 Files Đã Tạo

### 1. **math.util.ts** - Source Code

```
frontend/src/utils/math.util.ts
```

Chứa 4 functions:

- `sum(a, b)` - Cộng 2 số
- `subtract(a, b)` - Trừ 2 số
- `multiply(a, b)` - Nhân 2 số
- `divide(a, b)` - Chia 2 số

### 2. **math.util.test.ts** - Unit Tests

```
frontend/src/utils/__tests__/math.util.test.ts
```

Chứa **28 test cases** cho tất cả functions.

---

## 🧮 Function: sum(a, b)

### **Source Code**

```typescript
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
```

### **Logic Giải Thích**

1. **Kiểm tra type** - Phải là `number`
2. **Kiểm tra NaN** - Không được là `NaN`
3. **Return kết quả** - Cộng a + b

---

## ✅ Test Cases Cho sum()

### **1. Success Cases (7 tests)**

#### Test 1: Cộng 2 số dương

```typescript
it('should add two positive numbers', () => {
    // Arrange
    const a = 5;
    const b = 3;

    // Act
    const result = sum(a, b);

    // Assert
    expect(result).toBe(8);
});
```

**Giải thích:**

- Input: `5` và `3`
- Expected: `8`
- Verify: `5 + 3 = 8` ✅

#### Test 2: Cộng 2 số âm

```typescript
it('should add two negative numbers', () => {
    const result = sum(-5, -3);
    expect(result).toBe(-8);
});
```

**Giải thích:**

- Input: `-5` và `-3`
- Expected: `-8`
- Verify: `-5 + (-3) = -8` ✅

#### Test 3: Cộng số dương và số âm

```typescript
it('should add positive and negative numbers', () => {
    const result = sum(10, -3);
    expect(result).toBe(7);
});
```

#### Test 4: Cộng với 0

```typescript
it('should add zero to a number', () => {
    const result = sum(5, 0);
    expect(result).toBe(5);
});
```

#### Test 5: Cộng 0 + 0

```typescript
it('should add two zeros', () => {
    const result = sum(0, 0);
    expect(result).toBe(0);
});
```

#### Test 6: Số thập phân

```typescript
it('should handle decimal numbers', () => {
    const result = sum(1.5, 2.3);
    expect(result).toBeCloseTo(3.8);
    //              ↑ Dùng toBeCloseTo cho số thập phân
});
```

**Tại sao dùng `toBeCloseTo`?**

- Số thập phân có floating-point precision issues
- `1.5 + 2.3` có thể = `3.7999999999`
- `toBeCloseTo(3.8)` check gần bằng 3.8

#### Test 7: Số lớn

```typescript
it('should handle very large numbers', () => {
    const result = sum(1000000, 2000000);
    expect(result).toBe(3000000);
});
```

---

### **2. Error Cases (9 tests)**

#### Test 1: Argument đầu không phải number

```typescript
it('should throw error when first argument is not a number', () => {
    expect(() => sum('5' as any, 3)).toThrow('Both arguments must be numbers');
});
```

**Giải thích:**

- Input: `'5'` (string) và `3`
- Expected: Throw error
- `expect(() => ...)` - Wrap function trong arrow function
- `.toThrow()` - Verify function throw error

#### Test 2: Argument thứ 2 không phải number

```typescript
it('should throw error when second argument is not a number', () => {
    expect(() => sum(5, '3' as any)).toThrow('Both arguments must be numbers');
});
```

#### Test 3: Cả 2 arguments không phải number

```typescript
it('should throw error when both arguments are not numbers', () => {
    expect(() => sum('5' as any, '3' as any)).toThrow(
        'Both arguments must be numbers'
    );
});
```

#### Test 4: Argument đầu là NaN

```typescript
it('should throw error when first argument is NaN', () => {
    expect(() => sum(NaN, 3)).toThrow('Arguments cannot be NaN');
});
```

**Giải thích:**

- `NaN` = Not a Number
- `typeof NaN === 'number'` → true (weird!)
- Cần check riêng với `isNaN()`

#### Test 5: Argument thứ 2 là NaN

```typescript
it('should throw error when second argument is NaN', () => {
    expect(() => sum(5, NaN)).toThrow('Arguments cannot be NaN');
});
```

#### Test 6-9: Các types khác

```typescript
// null
expect(() => sum(null as any, 5)).toThrow('Both arguments must be numbers');

// undefined
expect(() => sum(undefined as any, 5)).toThrow(
    'Both arguments must be numbers'
);

// object
expect(() => sum({ value: 5 } as any, 3)).toThrow(
    'Both arguments must be numbers'
);

// array
expect(() => sum([5] as any, 3)).toThrow('Both arguments must be numbers');
```

---

## 🎯 Demo Test với Console.log

```typescript
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

    // ... more test cases
});
```

**Output khi chạy:**

```
============================================================
🎯 DEMO: sum() Function Test
============================================================

📋 Test Case 1: Positive Numbers
├─ Input a: 10
├─ Input b: 5
└─ Result: 15

📋 Test Case 2: Negative Numbers
├─ Input a: -10
├─ Input b: -5
└─ Result: -15

📋 Test Case 3: Mixed (Positive + Negative)
├─ Input a: 10
├─ Input b: -3
└─ Result: 7

📋 Test Case 4: Error Handling
├─ Input a: "hello" (string)
├─ Input b: 5
└─ Expected: Throw error
   ✅ Error thrown correctly!
```

---

## 📊 Test Results

```
✓ Math Utilities (28 tests) 15ms
  ✓ sum() (17 tests)
    ✓ Success Cases (7 tests)
      ✓ should add two positive numbers
      ✓ should add two negative numbers
      ✓ should add positive and negative numbers
      ✓ should add zero to a number
      ✓ should add two zeros
      ✓ should handle decimal numbers
      ✓ should handle very large numbers
    ✓ Error Cases (9 tests)
      ✓ should throw error when first argument is not a number
      ✓ should throw error when second argument is not a number
      ✓ should throw error when both arguments are not numbers
      ✓ should throw error when first argument is NaN
      ✓ should throw error when second argument is NaN
      ✓ should throw error when passing null
      ✓ should throw error when passing undefined
      ✓ should throw error when passing object
      ✓ should throw error when passing array
    ✓ 🎯 DEMO: Detailed Logging (1 test)
  ✓ subtract() (3 tests)
  ✓ multiply() (4 tests)
  ✓ divide() (4 tests)

Test Files  1 passed (1)
Tests       28 passed (28)
Duration    1.42s
```

---

## 🚀 Cách Chạy Tests

### **Chạy tất cả tests**

```bash
npm run test
```

### **Chạy chỉ math tests**

```bash
npm run test math.util.test.ts
```

### **Chạy với UI**

```bash
npm run test:ui
```

### **Chạy với watch mode**

```bash
npm run test:watch
```

---

## 💡 Key Concepts

### **1. AAA Pattern**

```typescript
it('test name', () => {
    // ARRANGE - Setup
    const a = 5;
    const b = 3;

    // ACT - Execute
    const result = sum(a, b);

    // ASSERT - Verify
    expect(result).toBe(8);
});
```

### **2. Testing Errors**

```typescript
// ✅ Correct way
expect(() => sum('5' as any, 3)).toThrow('error message');

// ❌ Wrong way
expect(sum('5' as any, 3)).toThrow(); // Won't work!
```

**Tại sao cần arrow function?**

- `expect()` cần **function** để execute
- Nếu gọi trực tiếp `sum('5', 3)` → error throw ngay
- Wrap trong `() => sum('5', 3)` → Vitest execute và catch error

### **3. Matchers**

```typescript
// Exact equality
expect(result).toBe(8);

// Deep equality
expect(obj).toEqual({ a: 1, b: 2 });

// Floating point
expect(result).toBeCloseTo(3.8);

// Error
expect(() => fn()).toThrow('message');
```

---

## 🎓 Best Practices

### **1. Test cả Success và Error cases**

```typescript
✅ Test với valid inputs
✅ Test với invalid inputs
✅ Test edge cases (0, negative, decimal)
✅ Test error handling
```

### **2. Descriptive test names**

```typescript
// ✅ Good
it('should add two positive numbers', () => {});

// ❌ Bad
it('test sum', () => {});
```

### **3. One assertion per concept**

```typescript
// ✅ Good - Test one thing
it('should add positive numbers', () => {
    expect(sum(5, 3)).toBe(8);
});

// ❌ Bad - Test too many things
it('should work', () => {
    expect(sum(5, 3)).toBe(8);
    expect(sum(-5, -3)).toBe(-8);
    expect(sum(0, 0)).toBe(0);
});
```

### **4. Organize tests**

```typescript
describe('sum()', () => {
    describe('Success Cases', () => {
        // All success tests
    });

    describe('Error Cases', () => {
        // All error tests
    });
});
```

---

## ✅ Checklist

- [x] Tạo function với validation
- [x] Viết success tests
- [x] Viết error tests
- [x] Test edge cases
- [x] Add demo test với logging
- [x] Chạy tests và verify pass
- [x] Document code

---

## 🎯 Kết Luận

**Đã học được:**

1. ✅ Cách viết function với validation
2. ✅ Cách test success cases
3. ✅ Cách test error cases
4. ✅ Cách dùng `expect().toThrow()`
5. ✅ Cách organize tests với `describe()`
6. ✅ Cách xem output với console.log

**Next steps:**

- Thử viết tests cho functions khác
- Thử test async functions
- Thử test với mocks
