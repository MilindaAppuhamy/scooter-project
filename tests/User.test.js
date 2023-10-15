const User = require("../src/User");

const user = new User("Joe Bloggs", "test123", 21);

describe("User property tests", () => {
  // test username
  test("username should be a string", () => {
    expect(typeof user.username).toBe("string");
  });
  // test password
  test("password should be a string", () => {
    expect(typeof user.password).toBe("string");
  });

  // test age
  test("age should be a number", () => {
    expect(typeof user.age).toBe("number");
  });

  //object
  test("user is an instance of User", () => {
    expect(user instanceof User).toBeTruthy();
  });

  test("user should create a valid user object", () => {
    expect(user).toEqual({
      username: "Joe Bloggs",
      password: "test123",
      age: 21,
      loggedIn: false,
    });
  });
});

// test login
describe("Login method", () => {
  it("should throw an error if the password is incorrect", () => {
    expect(() => user.login("1234")).toThrow("Incorrect password.");
  });

  it("should log the user properly if the password is correct", () => {
    user.login(user.password);
    expect(user.loggedIn).toBeTruthy();
  });
});

// test logout
describe("Logout method", () => {
  it("should logout the user properly", () => {
    user.login(user.password);
    user.logout();
    expect(user.loggedIn).toBeFalsy();
  });
});
