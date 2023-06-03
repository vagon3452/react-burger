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

describe("request and response", () => {
  let mockFetch;
  beforeEach(() => {
    mockFetch = jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ result: "ok" }),
      ok: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("calls fetchWithRefresh with the correct arguments", async () => {
    const request = createRequest(ENDPOINTS.login, "POST");
    await request(body);
    expect(mockFetch).toHaveBeenCalledWith(ENDPOINTS.login, {
      headers: {
        "Content-Type": "application/json",
        authorization: "",
      },
      method: "POST",
      body: JSON.stringify(body),
    });
  });
});
