# 📚 Hướng Dẫn Sử Dụng Testing Documentation

Chào mừng bạn đến với tài liệu testing của Flager Frontend Project!

## 📂 Cấu Trúc Tài Liệu

```
frontend/docs/testing/
├── README.md                      ← Bắt đầu từ đây!
├── auth-service-testing.md        ← Chi tiết về Auth Service tests
├── jwt-utilities-testing.md       ← Chi tiết về JWT utilities tests
└── GUIDE.md                       ← File này (hướng dẫn sử dụng)
```

## 🚀 Bắt Đầu Nhanh

### 1. Đọc Tài Liệu Tổng Quan

📖 **Bắt đầu với**: [`README.md`](./README.md)

File này cung cấp:

- ✅ Tổng quan về testing setup
- ✅ Quick start commands
- ✅ Cấu trúc project testing
- ✅ Best practices tổng quát

### 2. Tìm Hiểu Chi Tiết Từng Phần

#### 🔐 Auth Service Testing

📖 **Đọc**: [`auth-service-testing.md`](./auth-service-testing.md)

**Khi nào cần đọc:**

- Bạn muốn test authentication logic
- Cần hiểu cách mock API calls
- Muốn test error handling (401, 500, network errors)

**Nội dung chính:**

- 6 test cases cho `authService.login`
- Cách mock `apiClient`
- Test success và error scenarios

#### 🎫 JWT Utilities Testing

📖 **Đọc**: [`jwt-utilities-testing.md`](./jwt-utilities-testing.md)

**Khi nào cần đọc:**

- Bạn muốn test JWT token logic
- Cần test time-based functionality
- Muốn hiểu cách mock time với Vitest

**Nội dung chính:**

- 15 test cases cho JWT utilities
- Time mocking với `vi.useFakeTimers()`
- Edge cases testing (exact time, ±1 second)

## 📖 Cách Sử Dụng Tài Liệu

### Scenario 1: Tôi mới bắt đầu với testing

```
1. Đọc README.md (phần "Quick Start")
2. Chạy thử: npm run test
3. Xem test output để hiểu cấu trúc
4. Đọc "Testing Best Practices" trong README.md
5. Xem example code trong auth-service-testing.md
```

### Scenario 2: Tôi muốn viết test cho function mới

```
1. Đọc README.md → "Viết Test Mới" section
2. Copy template từ README.md
3. Tham khảo auth-service-testing.md hoặc jwt-utilities-testing.md
   (tùy thuộc function của bạn gần giống cái nào hơn)
4. Viết test theo AAA pattern
5. Chạy: npm run test:watch
```

### Scenario 3: Tôi cần test API calls

```
1. Đọc auth-service-testing.md
2. Xem phần "Kỹ thuật sử dụng"
3. Copy mock setup cho apiClient
4. Adapt cho API endpoint của bạn
```

### Scenario 4: Tôi cần test time-based logic

```
1. Đọc jwt-utilities-testing.md
2. Xem phần "Time Mocking cho Token Expiration"
3. Copy setup cho vi.useFakeTimers()
4. Adapt cho logic của bạn
```

### Scenario 5: Tests của tôi bị fail

```
1. Đọc README.md → "Troubleshooting" section
2. Check console output để xem error message
3. Verify mocks được setup đúng
4. Đảm bảo clearAllMocks() trong beforeEach()
```

## 🎯 Các Commands Quan Trọng

```bash
# Chạy tất cả tests
npm run test

# Watch mode (recommended khi đang viết tests)
npm run test:watch

# UI dashboard (dễ debug hơn)
npm run test:ui

# Coverage report (xem code coverage)
npm run test:coverage

# Chạy specific test file
npm run test auth.service.test.ts
npm run test jwt.util.test.ts
```

## 📊 Roadmap Đọc Tài Liệu

### Level 1: Beginner (Mới bắt đầu)

1. ✅ README.md → "Tổng Quan"
2. ✅ README.md → "Quick Start"
3. ✅ Chạy `npm run test` để xem tests hoạt động
4. ✅ README.md → "Testing Best Practices"

### Level 2: Intermediate (Đã hiểu cơ bản)

1. ✅ auth-service-testing.md → Toàn bộ
2. ✅ jwt-utilities-testing.md → Toàn bộ
3. ✅ Thử viết 1 test đơn giản
4. ✅ README.md → "Viết Test Mới"

### Level 3: Advanced (Muốn master testing)

1. ✅ Đọc kỹ "Best Practices" trong cả 3 files
2. ✅ Xem source code của test files:
    - `src/features/auth/services/__tests__/auth.service.test.ts`
    - `src/utils/__tests__/jwt.util.test.ts`
3. ✅ Thử viết tests cho functions phức tạp
4. ✅ Tìm hiểu về coverage report

## 🔍 Tìm Kiếm Nhanh

### Tôi muốn tìm hiểu về...

| Topic           | Đọc File                 | Section                |
| --------------- | ------------------------ | ---------------------- |
| Cách chạy tests | README.md                | Quick Start            |
| Mock API calls  | auth-service-testing.md  | Kỹ thuật sử dụng       |
| Mock time       | jwt-utilities-testing.md | Time Mocking           |
| AAA Pattern     | README.md                | Testing Best Practices |
| Viết test mới   | README.md                | Viết Test Mới          |
| Edge cases      | jwt-utilities-testing.md | Edge Cases Testing     |
| Error handling  | auth-service-testing.md  | Test Cases table       |
| Coverage report | README.md                | Test Coverage          |
| Troubleshooting | README.md                | Troubleshooting        |

## 💡 Tips & Tricks

### Tip 1: Sử dụng Watch Mode

```bash
npm run test:watch
```

Tests sẽ tự động chạy lại khi bạn save file. Rất hữu ích khi đang viết tests!

### Tip 2: Sử dụng UI Dashboard

```bash
npm run test:ui
```

Giao diện đẹp hơn, dễ debug hơn console.

### Tip 3: Focus vào 1 test

```typescript
it.only('should test this specific case', () => {
    // Only this test will run
});
```

### Tip 4: Skip test tạm thời

```typescript
it.skip('should test this later', () => {
    // This test will be skipped
});
```

### Tip 5: Xem coverage để biết còn thiếu gì

```bash
npm run test:coverage
```

## 📞 Cần Giúp Đỡ?

1. **Đọc Troubleshooting**: README.md → "Troubleshooting" section
2. **Xem Examples**: Đọc code trong test files
3. **Check Official Docs**: Links trong "Tài Liệu Tham Khảo"

## ✅ Checklist Học Testing

- [ ] Đọc README.md
- [ ] Chạy thử `npm run test`
- [ ] Xem UI với `npm run test:ui`
- [ ] Đọc auth-service-testing.md
- [ ] Đọc jwt-utilities-testing.md
- [ ] Viết test đầu tiên của bạn
- [ ] Chạy coverage report
- [ ] Master mocking techniques
- [ ] Hiểu AAA pattern
- [ ] Có thể debug failing tests

## 🎓 Kết Luận

**Bắt đầu từ đây:**

1. Đọc [`README.md`](./README.md) trước
2. Chạy `npm run test` để xem tests hoạt động
3. Đọc chi tiết 2 files còn lại khi cần

**Remember:**

- Tests giúp code của bạn robust hơn
- Viết tests không khó, chỉ cần practice
- Sử dụng tài liệu này như reference khi cần

Happy Testing! 🚀
