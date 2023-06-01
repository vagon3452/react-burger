import {
  checkResponse,
  createRequest,
  ENDPOINTS,
} from "../services/burger-api";

describe("checkResponse", () => {
  it("should return correct response when res.ok is true", () => {
    const testObject = {
      ok: true,
      json: jest.fn(() => ({ result: "ok" })),
    };
    expect(checkResponse(testObject)).toStrictEqual({
      result: "ok",
    });
    expect(testObject.json).toHaveBeenCalledTimes(1);
  });
  it("should reject the Promise with the correct error message when res.ok is false", async () => {
    const testObject = {
      ok: false,
      json: () => ({
        then: (callback) =>
          Promise.resolve(callback({ message: "jwt expired" })),
      }),
    };
    await expect(checkResponse(testObject)).rejects.toStrictEqual({
      message: "jwt expired",
    });
  });
});

const body = { email: "test@mail.ru", password: "12345" };

describe("createRequest function", () => {
  let mockFetch;
  const mockData = { success: true };
  beforeEach(() => {
    mockFetch = jest.fn(() => Promise.resolve(mockData));
    global.fetch = mockFetch;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("calls fetchWithRefresh with the correct arguments", async () => {
    const request = createRequest(ENDPOINTS.login, "POST");
    await request(body);
    expect(mockFetch).toHaveBeenCalledWith(ENDPOINTS.user, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });
  });
});
