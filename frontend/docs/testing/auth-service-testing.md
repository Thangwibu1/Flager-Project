# Vitest Setup và Unit Tests cho Auth Service

Tài liệu hướng dẫn về việc thiết lập Vitest testing framework và viết unit tests cho `authService.login` trong frontend project.

## Tổng Quan

Vitest đã được cài đặt và cấu hình thành công với 6 test cases toàn diện cho hàm `authService.login`, bao gồm các kịch bản thành công, lỗi, và edge cases.

## Các Thay Đổi Đã Thực Hiện

### 1. Cài Đặt Dependencies

Đã cài đặt các packages sau:

- `vitest` - Testing framework
- `@vitest/ui` - UI dashboard cho tests
- `jsdom` - DOM environment
- `@testing-library/react` - React testing utilities
- `@testing-library/jest-dom` - Custom matchers

### 2. Cấu Hình Vitest

#### vite.config.ts

Đã thêm cấu hình test:

```typescript
test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    css: true,
}
```

#### vitest.setup.ts

Tạo file setup với:

- Import `@testing-library/jest-dom` cho custom matchers
- Auto cleanup sau mỗi test
- Mock localStorage

#### package.json

Thêm test scripts:

- `npm run test` - Chạy tests một lần
- `npm run test:watch` - Watch mode
- `npm run test:ui` - Mở UI dashboard
- `npm run test:coverage` - Coverage report

---

### 3. Unit Tests

#### auth.service.test.ts

Đã tạo 6 test cases toàn diện:

| Test Case                 | Mô Tả                                 | Kết Quả    |
| ------------------------- | ------------------------------------- | ---------- |
| ✅ Successful login       | Verify API call và response data đúng | PASS (6ms) |
| ✅ Invalid credentials    | Test error handling với 401           | PASS (2ms) |
| ✅ Network errors         | Test khi có lỗi network               | PASS (1ms) |
| ✅ Request payload format | Verify credentials được gửi đúng      | PASS (0ms) |
| ✅ Server errors (500)    | Test error handling với 500           | PASS (0ms) |
| ✅ Response structure     | Verify cấu trúc response đầy đủ       | PASS (1ms) |

**Kỹ thuật sử dụng:**

- Mock `apiClient` từ axios-client
- Sử dụng `vi.mocked()` để type-safe mocking
- Test cả success và error scenarios
- Verify API được gọi với đúng parameters

## Kết Quả Verification

### Test Output

```
✓ src/features/auth/services/__tests__/auth.service.test.ts (6 tests) 13ms
  ✓ authService.login (6)
    ✓ should successfully login with valid credentials 6ms
    ✓ should handle login failure with invalid credentials 2ms
    ✓ should handle network errors 1ms
    ✓ should send correct request payload format 0ms
    ✓ should handle server errors (500) 0ms
    ✓ should return the complete response data structure 1ms

Test Files  1 passed (1)
Tests       6 passed (6)
Duration    2.12s
```

**✅ Tất cả 6 tests đều PASS**

## Cách Sử Dụng

### Chạy Tests

```bash
# Chạy tất cả tests
npm run test

# Watch mode (tự động chạy lại khi có thay đổi)
npm run test:watch

# Mở UI dashboard
npm run test:ui

# Xem coverage report
npm run test:coverage
```

### Cấu Trúc Test File

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from '../auth.service';
import { apiClient } from '@/api/axios-client';

// Mock axios-client
vi.mock('@/api/axios-client', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

describe('authService.login', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should successfully login with valid credentials', async () => {
        // Arrange - Setup mock data
        // Act - Call the function
        // Assert - Verify results
    });
});
```

## Best Practices Áp Dụng

1. **AAA Pattern**: Arrange-Act-Assert trong mỗi test
2. **Mock External Dependencies**: Mock `apiClient` để không gọi API thật
3. **Clear Mocks**: Reset mocks trước mỗi test với `beforeEach`
4. **Type Safety**: Sử dụng `vi.mocked()` cho type-safe mocking
5. **Comprehensive Coverage**: Test cả success và error scenarios
6. **Descriptive Names**: Tên test cases rõ ràng, dễ hiểu

## Mở Rộng

Để test các hàm khác trong `authService`:

```typescript
describe('authService.register', () => {
    // Similar test structure
});

describe('authService.logout', () => {
    // Similar test structure
});
```

## Tài Liệu Tham Khảo

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Vitest UI](https://vitest.dev/guide/ui.html)
