# JWT Utilities Testing Guide

Tài liệu hướng dẫn về unit tests cho JWT utilities (`decodeUserFromToken` và `isTokenExpired`) trong frontend project.

## Tổng Quan

Đã tạo 15 test cases toàn diện cho JWT utilities, bao gồm:

- **5 tests** cho `decodeUserFromToken`
- **8 tests** cho `isTokenExpired` (bao gồm edge cases)
- **2 integration tests**

## Test Cases

### decodeUserFromToken (5 tests)

| Test Case             | Mô Tả                            | Kết Quả    |
| --------------------- | -------------------------------- | ---------- |
| ✅ Valid token decode | Decode token với payload đầy đủ  | PASS (3ms) |
| ✅ Missing userId     | Return null khi thiếu userId     | PASS (1ms) |
| ✅ Missing email      | Return null khi thiếu email      | PASS (0ms) |
| ✅ Missing username   | Return null khi thiếu username   | PASS (0ms) |
| ✅ Decode error       | Handle exception khi decode fail | PASS (1ms) |

### isTokenExpired (8 tests)

| Test Case                | Mô Tả                            | Kết Quả    |
| ------------------------ | -------------------------------- | ---------- |
| ✅ Non-expired token     | Token còn hạn (future exp)       | PASS (4ms) |
| ✅ Expired token         | Token hết hạn (past exp)         | PASS (1ms) |
| ✅ Exact time expiration | Token expire đúng current time   | PASS (1ms) |
| ✅ No exp field          | Token không có exp field         | PASS (1ms) |
| ✅ Decode error          | Handle exception khi decode fail | PASS (1ms) |
| ✅ Expiring in 1 second  | Token còn 1 giây                 | PASS (1ms) |
| ✅ Expired 1 second ago  | Token hết hạn 1 giây trước       | PASS (0ms) |
| ✅ Far future expiration | Token expire rất xa (1 năm)      | PASS (0ms) |

### Integration Tests (2 tests)

| Test Case                   | Mô Tả                         | Kết Quả    |
| --------------------------- | ----------------------------- | ---------- |
| ✅ Decode non-expired token | Decode + verify token còn hạn | PASS (0ms) |
| ✅ Decode expired token     | Decode + verify token hết hạn | PASS (0ms) |

## Kỹ Thuật Sử Dụng

### 1. Mock jwt-decode Library

```typescript
import { jwtDecode } from 'jwt-decode';

vi.mock('jwt-decode', () => ({
    jwtDecode: vi.fn(),
}));
```

### 2. Time Mocking cho Token Expiration

```typescript
beforeEach(() => {
    vi.useFakeTimers(); // Freeze time
});

afterEach(() => {
    vi.useRealTimers();
});

it('should return true for expired token', () => {
    const currentTime = new Date('2024-01-15T12:00:00Z');
    vi.setSystemTime(currentTime);

    const pastExp = Math.floor(currentTime.getTime() / 1000) - 3600; // 1 hour ago

    vi.mocked(jwtDecode).mockReturnValueOnce({
        userId: 'user-123',
        exp: pastExp,
    });

    const result = isTokenExpired('token');
    expect(result).toBe(true);
});
```

### 3. Edge Cases Testing

#### Exact Time Expiration

```typescript
// Token expire đúng bằng current time
const currentExp = Math.floor(currentTime.getTime() / 1000);
// Implementation: exp < currentTime → false (still valid)
```

#### ±1 Second Precision

```typescript
// Token còn 1 giây
const nearFutureExp = Math.floor(currentTime.getTime() / 1000) + 1;

// Token hết hạn 1 giây trước
const justPastExp = Math.floor(currentTime.getTime() / 1000) - 1;
```

## Kết Quả Verification

```
✓ src/utils/__tests__/jwt.util.test.ts (15 tests) 21ms
  ✓ JWT Utilities (15)
    ✓ decodeUserFromToken (5)
      ✓ should successfully decode valid token with complete payload 3ms
      ✓ should return null when token payload is missing userId 1ms
      ✓ should return null when token payload is missing email 0ms
      ✓ should return null when token payload is missing username 0ms
      ✓ should return null when jwtDecode throws an error 1ms
    ✓ isTokenExpired (8)
      ✓ should return false for valid non-expired token 4ms
      ✓ should return true for expired token 1ms
      ✓ should return false when token is expiring at exact current time 1ms
      ✓ should return true when token has no exp field 1ms
      ✓ should return true when jwtDecode throws an error 1ms
      ✓ should correctly handle token expiring in 1 second 1ms
      ✓ should correctly handle token expired 1 second ago 0ms
      ✓ should handle token with very far future expiration 0ms
    ✓ Integration: decodeUserFromToken and isTokenExpired (2)
      ✓ should decode user from non-expired token 0ms
      ✓ should handle expired token with valid payload 0ms

Test Files  1 passed (1)
Tests       15 passed (15)
Duration    1.87s
```

## Cách Chạy Tests

```bash
# Chạy tất cả tests
npm run test

# Chạy chỉ JWT tests
npm run test jwt.util.test.ts

# Watch mode
npm run test:watch

# UI dashboard
npm run test:ui

# Coverage report
npm run test:coverage
```

## Best Practices

1. **Time Control**: Sử dụng `vi.useFakeTimers()` để test time-based logic
2. **Edge Cases**: Test boundary conditions (exact time, ±1 second)
3. **Mock External Libraries**: Mock `jwtDecode` để control test data
4. **Integration Tests**: Verify multiple functions work together
5. **Error Handling**: Test cả success và error scenarios
6. **Type Safety**: Sử dụng `vi.mocked()` cho type-safe mocking

## Highlights - Token Expiration Logic

### Implementation Behavior

```typescript
// isTokenExpired implementation
return decoded.exp < currentTime;
```

### Test Scenarios

- `exp > currentTime` → **false** (not expired)
- `exp < currentTime` → **true** (expired)
- `exp === currentTime` → **false** (still valid)
- No `exp` field → **true** (treated as expired)
- Decode error → **true** (treated as expired)

## Mở Rộng

Để test các JWT utilities khác:

```typescript
describe('refreshToken', () => {
    // Test refresh token logic
});

describe('getTokenExpirationTime', () => {
    // Test getting expiration timestamp
});
```

## Tài Liệu Tham Khảo

- [Vitest Documentation](https://vitest.dev/)
- [Vitest Mocking Guide](https://vitest.dev/guide/mocking.html)
- [Vitest Fake Timers](https://vitest.dev/guide/mocking.html#timers)
- [jwt-decode Library](https://github.com/auth0/jwt-decode)
