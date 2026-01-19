# Testing Documentation

Tài liệu hướng dẫn về testing trong Flager Frontend Project.

## Tổng Quan

Project sử dụng **Vitest** làm testing framework với cấu hình cho React và TypeScript.

### Test Statistics

- **Total Tests**: 21 tests
- **Test Files**: 2 files
- **Status**: ✅ All passing
- **Duration**: ~2.35s

## Cấu Trúc Testing

```
frontend/
├── docs/
│   └── testing/
│       ├── README.md (file này)
│       ├── auth-service-testing.md
│       └── jwt-utilities-testing.md
├── src/
│   ├── features/
│   │   └── auth/
│   │       └── services/
│   │           └── __tests__/
│   │               └── auth.service.test.ts (6 tests)
│   └── utils/
│       └── __tests__/
│           └── jwt.util.test.ts (15 tests)
├── vite.config.ts (Vitest config)
└── vitest.setup.ts (Test setup)
```

## Quick Start

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

### Chạy Tests Cụ Thể

```bash
# Chỉ chạy auth service tests
npm run test auth.service.test.ts

# Chỉ chạy JWT utilities tests
npm run test jwt.util.test.ts
```

## Test Suites

### 1. Auth Service Tests (6 tests)

📄 **Chi tiết**: [auth-service-testing.md](./auth-service-testing.md)

Tests cho authentication service, bao gồm:

- Login với credentials hợp lệ
- Error handling (401, 500, network errors)
- Request payload validation
- Response structure verification

**File**: `src/features/auth/services/__tests__/auth.service.test.ts`

### 2. JWT Utilities Tests (15 tests)

📄 **Chi tiết**: [jwt-utilities-testing.md](./jwt-utilities-testing.md)

Tests cho JWT token utilities, bao gồm:

- Token decoding (5 tests)
- Token expiration verification (8 tests)
- Integration tests (2 tests)
- Edge cases: exact time, ±1 second, missing fields

**File**: `src/utils/__tests__/jwt.util.test.ts`

## Vitest Configuration

### vite.config.ts

```typescript
test: {
    globals: true,           // Sử dụng global APIs (describe, it, expect)
    environment: 'jsdom',    // DOM environment cho React
    setupFiles: './vitest.setup.ts',
    css: true,              // Support CSS imports
}
```

### vitest.setup.ts

```typescript
import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
    cleanup();
});

// Mock localStorage
(globalThis as any).localStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
};
```

## Testing Best Practices

### 1. AAA Pattern

```typescript
it('should do something', () => {
    // Arrange - Setup test data
    const input = 'test';

    // Act - Execute function
    const result = myFunction(input);

    // Assert - Verify results
    expect(result).toBe('expected');
});
```

### 2. Mock External Dependencies

```typescript
// Mock API client
vi.mock('@/api/axios-client', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

// Mock library
vi.mock('jwt-decode', () => ({
    jwtDecode: vi.fn(),
}));
```

### 3. Clear Mocks Between Tests

```typescript
beforeEach(() => {
    vi.clearAllMocks();
});
```

### 4. Time Mocking

```typescript
beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
});

it('should handle time-based logic', () => {
    vi.setSystemTime(new Date('2024-01-15T12:00:00Z'));
    // Test time-dependent code
});
```

### 5. Type-Safe Mocking

```typescript
vi.mocked(apiClient.post).mockResolvedValueOnce({
    data: mockResponse,
});
```

## Viết Test Mới

### Template Cơ Bản

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('MyFunction', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should handle success case', () => {
        // Arrange
        const input = 'test';

        // Act
        const result = myFunction(input);

        // Assert
        expect(result).toBe('expected');
    });

    it('should handle error case', () => {
        // Test error scenarios
    });
});
```

### Tạo Test File Mới

1. Tạo folder `__tests__` cùng cấp với file cần test
2. Tạo file `<filename>.test.ts`
3. Import functions cần test và dependencies
4. Viết test cases theo AAA pattern

## Test Coverage

Để xem coverage report:

```bash
npm run test:coverage
```

Coverage report sẽ hiển thị:

- % Lines covered
- % Statements covered
- % Functions covered
- % Branches covered

## Troubleshooting

### Tests không chạy

```bash
# Kiểm tra Vitest đã được cài đặt
npm list vitest

# Cài đặt lại dependencies
npm install
```

### Mock không hoạt động

- Đảm bảo mock được define trước khi import module
- Sử dụng `vi.mocked()` cho type safety
- Clear mocks trong `beforeEach()`

### Time-based tests không ổn định

- Sử dụng `vi.useFakeTimers()`
- Set specific time với `vi.setSystemTime()`
- Restore timers trong `afterEach()`

## Tài Liệu Tham Khảo

### Official Documentation

- [Vitest](https://vitest.dev/) - Testing framework
- [Testing Library](https://testing-library.com/) - Testing utilities
- [Vitest UI](https://vitest.dev/guide/ui.html) - UI dashboard

### Guides

- [Vitest Mocking Guide](https://vitest.dev/guide/mocking.html)
- [Vitest Fake Timers](https://vitest.dev/guide/mocking.html#timers)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Liên Hệ & Đóng Góp

Nếu bạn tìm thấy bugs hoặc muốn thêm tests mới:

1. Tạo test case mới theo template
2. Đảm bảo tất cả tests pass
3. Update documentation nếu cần
4. Submit PR với mô tả rõ ràng
