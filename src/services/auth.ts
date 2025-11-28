// Client-side mock auth: no network calls, always succeeds.
// Keeps the same function signatures so UI code stays unchanged.

type UserRecord = {
  password: string;
};

const users = new Map<string, UserRecord>();

function mockToken() {
  return Math.random().toString(36).slice(2, 10);
}

function mockResponse<T>(value: T, delay = 150): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), delay));
}

export async function requestSignup(payload: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const email = payload.email || `user-${mockToken()}@example.com`;
  users.set(email, { password: payload.password });
  return mockResponse({
    success: true,
    email,
    twoFactorToken: mockToken(),
    demoCode: "000000",
  });
}

export async function requestLogin(payload: { email: string; password: string }) {
  const email = payload.email || `user-${mockToken()}@example.com`;
  if (!users.has(email)) {
    users.set(email, { password: payload.password });
  }
  return mockResponse({
    success: true,
    email,
    twoFactorToken: mockToken(),
    demoCode: "000000",
  });
}

export async function verifyTwoFactor(_payload: { twoFactorToken: string; code: string }) {
  return mockResponse({ success: true, message: "Verification skipped." });
}
