import * as api from "../../services/burger-api";
import * as actions from "../../services/auth/actions";
import { userReducer, initialState } from "../../services/auth/reducer";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

jest.mock("../../services/burger-api");
const rawUser = {
  email: "test@example.ru",
  name: "testName",
};

const mockSuccessApiResponse = {
  success: true,
  user: { email: "test@example.ru", name: "testName" },
};

const mockErrorApiResponse = {
  success: false,
  message: "jest testing error",
};

const bodyFn = () => ({
  email: rawUser.email,
  name: rawUser.name,
  password: "123",
});

describe("Redux store and actions user", () => {
  let store;
  beforeEach(() => {
    const middleware = [thunk];
    const mockStore = configureMockStore(middleware);
    store = mockStore(initialState);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("register user success", async () => {
    api.registerRequest.mockImplementationOnce(() =>
      Promise.resolve(mockSuccessApiResponse)
    );

    const expectedActions = [
      actions.setUserAction(rawUser),
      actions.setAuthChecked(),
      actions.setAuthChecked(),
    ];
    await store.dispatch(actions.registerUserAction(bodyFn()));
    expect(api.registerRequest).toHaveBeenCalledWith(bodyFn());
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("register user false", async () => {
    api.registerRequest.mockImplementationOnce(() =>
      Promise.reject(mockErrorApiResponse)
    );

    const expectedActions = [
      actions.setUserAction(null),
      actions.setAuthChecked(),
    ];

    await store.dispatch(actions.registerUserAction(bodyFn()));
    expect(api.registerRequest).toHaveBeenCalledWith(bodyFn());
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("register user false Network", async () => {
    api.registerRequest.mockImplementationOnce(
      () => new Error("Network error")
    );

    const expectedActions = [
      actions.setUserAction(null),
      actions.setAuthChecked(),
    ];

    await store.dispatch(actions.registerUserAction(bodyFn()));
    expect(api.registerRequest).toHaveBeenCalledWith(bodyFn());
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("signInAction user success", async () => {
    api.loginRequest.mockImplementationOnce(() =>
      Promise.resolve(mockSuccessApiResponse)
    );

    const body = {
      email: "test@example.ru",
      password: "123",
    };
    const expectedActions = [
      actions.setUserAction(rawUser),
      actions.setAuthChecked(),
      actions.setAuthChecked(),
    ];
    await store.dispatch(actions.signInAction(body));
    expect(api.loginRequest).toHaveBeenCalledWith(body);
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("signInAction user false", async () => {
    api.loginRequest.mockImplementationOnce(() =>
      Promise.reject(mockErrorApiResponse)
    );

    const body = {
      email: "test@example.ru",
      password: "123",
    };
    const expectedActions = [
      actions.setUserAction(null),
      actions.setAuthChecked(),
    ];

    await store.dispatch(actions.signInAction(body));
    expect(api.loginRequest).toHaveBeenCalledWith(body);
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("signInActions user Network error", async () => {
    api.loginRequest.mockImplementationOnce(() => new Error("Network error"));

    const body = {
      email: "test@example.ru",
      password: "123",
    };
    const expectedActions = [
      actions.setUserAction(null),
      actions.setAuthChecked(),
    ];

    await store.dispatch(actions.signInAction(body));
    expect(api.loginRequest).toHaveBeenCalledWith(body);
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("getUserActions user success", async () => {
    api.getUserRequest.mockImplementationOnce(() =>
      Promise.resolve(mockSuccessApiResponse)
    );
    const expectedActions = [
      actions.setUserAction(rawUser),
      actions.setAuthChecked(),
      actions.setAuthChecked(),
    ];

    await store.dispatch(actions.getUserAction());
    expect(api.getUserRequest).toHaveBeenCalled();
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("getUserActions user false", async () => {
    api.getUserRequest.mockImplementationOnce(() =>
      Promise.reject(mockErrorApiResponse)
    );
    const expectedActions = [
      actions.setUserAction(null),
      actions.setAuthChecked(),
    ];
    await store.dispatch(actions.getUserAction());
    expect(api.getUserRequest).toHaveBeenCalled();
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("getUserActions user Network error", async () => {
    api.getUserRequest.mockImplementationOnce(() => new Error("Network error"));

    const expectedActions = [
      actions.setUserAction(null),
      actions.setAuthChecked(),
    ];
    await store.dispatch(actions.getUserAction());
    expect(api.getUserRequest).toHaveBeenCalled();
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("updateUserActions user success", async () => {
    api.updateUserRequest.mockImplementationOnce(() =>
      Promise.resolve(mockSuccessApiResponse)
    );

    const expectedActions = [
      actions.setUserAction(rawUser),
      actions.setAuthChecked(),
      actions.setAuthChecked(),
    ];

    await store.dispatch(actions.updateUserAction(bodyFn()));
    expect(api.updateUserRequest).toHaveBeenCalledWith(bodyFn());
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("updateUserActions user false", async () => {
    api.updateUserRequest.mockImplementationOnce(() =>
      Promise.reject(mockErrorApiResponse)
    );
    const expectedActions = [
      actions.setUserAction(null),
      actions.setAuthChecked(),
    ];
    await store.dispatch(actions.updateUserAction(bodyFn()));
    expect(api.updateUserRequest).toHaveBeenCalledWith(bodyFn());
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("updateUserActions user Network error", async () => {
    api.updateUserRequest.mockImplementationOnce(
      () => new Error("Network error")
    );
    const expectedActions = [
      actions.setUserAction(null),
      actions.setAuthChecked(),
    ];

    await store.dispatch(actions.updateUserAction(bodyFn()));
    expect(api.updateUserRequest).toHaveBeenLastCalledWith(bodyFn());
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("signOutActions user success", async () => {
    api.logoutRequest.mockImplementationOnce(() =>
      Promise.resolve(mockSuccessApiResponse)
    );
    const expectedActions = [actions.setUserAction(null)];

    const testToken = { token: "token" };

    await store.dispatch(actions.signOutAction(testToken));
    expect(api.logoutRequest).toHaveBeenCalledWith(testToken);
    expect(store.getActions()).toEqual(expectedActions);
  });

  // it("should dispatch setAuthChecked if no token in localStorage for checkUserAuth()", () => {


  //   const getItemMock = jest
  //     .spyOn(localStorage, "getItem")
  //     .mockReturnValue(null);
 

  //   const expectedAction = [actions.setAuthChecked()];

  //   store.dispatch(actions.checkUserAuth());
  //   expect(store.getActions()).toEqual(expectedAction);
  // });

  // it("should dispatch getUserAction if token is in localStorage for checkUserAuth()", async () => {
  //   api.getUserRequest.mockImplementationOnce(() =>
  //     Promise.resolve(mockSuccessApiResponse)
  //   );

  //   const getItemMock = jest.spyOn(localStorage, "getItem");
  //   getItemMock.mockReturnValue("token");

  //   const expectedAction = [
  //     actions.setUserAction(rawUser),
  //     actions.setAuthChecked(),
  //   ];


  //   await store.dispatch(actions.checkUserAuth());
  //   expect(store.getActions()).toEqual(expectedAction);

  //   getItemMock.mockRestore();
  // });

  // it("should dispatch setUserAction and setAuthChecked on successful getUserAction() request", async () => {
  //   const expectedActions = [
  //     actions.setUserAction(rawUser),
  //     actions.setAuthChecked(),
  //   ];

  //   await store.dispatch(getUserAction());

  //   expect(getUserRequest).toHaveBeenCalledTimes(1);
  //   expect(store.getActions()).toEqual(expectedActions);
  // });

  it("should dispatch setUserAction with null on failed getUserAction() request", async () => {
    api.getUserRequest.mockImplementationOnce(() => new Error("Error"));

    const expectedActions = [
      actions.setUserAction(null),
      actions.setAuthChecked(),
    ];

    await store.dispatch(actions.getUserAction());

    expect(api.getUserRequest).toHaveBeenCalledTimes(1);
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("should return default state with undefined", () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
    expect(userReducer(undefined, actions.setAuthChecked())).toEqual({
      ...initialState,
      isAuthChecked: true,
    });
    expect(userReducer(undefined, actions.setUserAction(rawUser))).toEqual({
      ...initialState,
      user: rawUser,
    });
  });
});
