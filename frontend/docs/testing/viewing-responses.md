# 🔍 Hướng Dẫn Xem Response Trong Vitest

Tài liệu này hướng dẫn cách xem **response thực tế** từ tests, không chỉ PASS/FAIL.

## 🎯 Các Cách Xem Response

### **Cách 1: Console.log trong Test** ✅ Đơn giản nhất

```typescript
it('should login successfully', async () => {
    // Setup mock
    const mockResponse = { success: true, data: {...} };
    vi.mocked(apiClient.post).mockResolvedValueOnce({ data: mockResponse });

    // Call function
    const result = await authService.login(credentials);

    // 🔍 XEM RESPONSE
    console.log('Response:', JSON.stringify(result, null, 2));

    // Assert
    expect(result.success).toBe(true);
});
```

**Chạy test:**

```bash
npm run test auth.service.test.ts
```

**Output sẽ hiển thị:**

```
Response: {
  "success": true,
  "data": {
    "accessToken": "...",
    "user": {...}
  }
}
```

---

### **Cách 2: Vitest UI** 🎨 Đẹp hơn

1. **Chạy UI:**

```bash
npm run test:ui
```

2. **Mở browser:**

```
http://localhost:51204/__vitest__/
```

3. **Xem logs:**

- Click vào test case
- Xem tab **Console** để thấy tất cả console.log

**Ưu điểm:**

- ✅ Giao diện đẹp
- ✅ Dễ navigate giữa các tests
- ✅ Có syntax highlighting
- ✅ Có filter, search

---

### **Cách 3: Debug với Breakpoints** 🐛 Nâng cao

**VS Code:**

1. Đặt breakpoint trong test file
2. Click "Debug" trên test
3. Hover chuột lên biến để xem value

**Chrome DevTools:**

1. Thêm `debugger;` trong test
2. Chạy `npm run test:ui`
3. Mở DevTools trong browser
4. Step through code

---

## 📝 Demo Test Đã Tạo

Tôi đã thêm test demo với **console.log chi tiết**:

```typescript
it('🔍 DEMO: should show detailed response logging', async () => {
    console.log('\n' + '='.repeat(60));
    console.log('🎯 DEMO TEST: Xem Response Chi Tiết');

    // STEP 1: Request
    console.log('\n📋 STEP 1: Prepare Request');
    console.log('├─ Email:', mockCredentials.email);

    // STEP 2: Mock Setup
    console.log('\n🎭 STEP 2: Mock API Response');
    console.table({ success, message, user });

    // STEP 3: Call Function
    console.log('\n⚡ STEP 3: Call authService.login()');
    const result = await authService.login(credentials);

    // STEP 4: Response Structure
    console.log('\n✅ STEP 4: Response Received!');
    console.log('┌─ Response Structure:');
    console.log('│  ├─ success:', result.success);
    console.log('│  ├─ message:', result.message);
    console.log('│  └─ data: {...}');

    // STEP 5: Full Object
    console.log('\n📊 STEP 5: Full Response Object:');
    console.log(JSON.stringify(result, null, 2));

    // STEP 6: API Call Details
    console.log('\n🔍 STEP 6: API Call Details:');
    console.log('├─ API được gọi:', mockCalls.length, 'lần');
    console.log('├─ Endpoint:', mockCalls[0][0]);
    console.log('└─ Payload:', JSON.stringify(mockCalls[0][1], null, 2));
});
```

---

## 🚀 Cách Chạy Demo Test

### **Option A: Terminal** (Xem console.log)

```bash
# Chạy tất cả tests
npm run test

# Chạy chỉ auth service tests
npm run test auth.service.test.ts

# Chạy chỉ demo test
npm run test -- -t "DEMO"
```

### **Option B: Vitest UI** (Giao diện đẹp)

```bash
npm run test:ui
```

Sau đó:

1. Mở browser tại URL hiển thị
2. Tìm test "🔍 DEMO: should show detailed response logging"
3. Click vào test
4. Xem tab **Console**

---

## 💡 Tips & Tricks

### 1. **Format JSON đẹp**

```typescript
console.log(JSON.stringify(result, null, 2));
//                                    ↑
//                              Indent 2 spaces
```

### 2. **Xem cấu trúc object dạng table**

```typescript
console.table({
    success: result.success,
    message: result.message,
    email: result.data.user.email,
});
```

### 3. **Group logs**

```typescript
console.group('🔍 Response Details');
console.log('Success:', result.success);
console.log('Token:', result.data.accessToken);
console.groupEnd();
```

### 4. **Xem mock calls**

```typescript
const mockCalls = vi.mocked(apiClient.post).mock.calls;
console.log('API called:', mockCalls.length, 'times');
console.log('First call args:', mockCalls[0]);
```

### 5. **Conditional logging**

```typescript
if (result.success) {
    console.log('✅ Login successful');
} else {
    console.error('❌ Login failed');
}
```

---

## 🎨 Output Formatting

### **Basic**

```typescript
console.log('Result:', result);
```

### **With Colors** (trong terminal)

```typescript
console.log('\x1b[32m%s\x1b[0m', '✅ Success'); // Green
console.log('\x1b[31m%s\x1b[0m', '❌ Error'); // Red
```

### **Tree Structure**

```typescript
console.log('Response:');
console.log('├─ success:', result.success);
console.log('├─ message:', result.message);
console.log('└─ data:');
console.log('   ├─ token:', result.data.token);
console.log('   └─ user:', result.data.user);
```

---

## 📊 So Sánh Các Cách

| Cách            | Ưu Điểm          | Nhược Điểm            | Khi Nào Dùng    |
| --------------- | ---------------- | --------------------- | --------------- |
| **console.log** | Đơn giản, nhanh  | Output nhiều, khó đọc | Quick debugging |
| **Vitest UI**   | Đẹp, dễ navigate | Cần mở browser        | Development     |
| **Debugger**    | Chi tiết nhất    | Chậm hơn              | Complex issues  |

---

## 🔧 Troubleshooting

### **Không thấy console.log?**

**Giải pháp 1:** Chạy test thường (không UI)

```bash
npm run test auth.service.test.ts
```

**Giải pháp 2:** Check tab Console trong Vitest UI

**Giải pháp 3:** Thêm `--reporter=verbose`

```bash
npm run test -- --reporter=verbose
```

### **Output bị truncate?**

```typescript
// Thay vì
console.log(result);

// Dùng
console.dir(result, { depth: null });
```

---

## ✅ Checklist

- [ ] Đã thêm console.log vào test
- [ ] Chạy `npm run test` để xem output
- [ ] Hoặc chạy `npm run test:ui` để xem UI
- [ ] Thấy được response structure
- [ ] Hiểu được data flow

---

## 🎯 Kết Luận

**3 bước đơn giản:**

1. **Thêm console.log** trong test

```typescript
const result = await authService.login(credentials);
console.log('Response:', JSON.stringify(result, null, 2));
```

2. **Chạy test**

```bash
npm run test auth.service.test.ts
```

3. **Xem output** trong terminal hoặc Vitest UI

**Đơn giản vậy thôi!** 🎉
