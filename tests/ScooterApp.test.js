const Scooter = require("../src/Scooter");
const User = require("../src/User");
const ScooterApp = require("../src/ScooterApp");

const scooterApp = new ScooterApp();

// register user
describe("registerUser method tests", () => {
  it("Should return instance of User", () => {
    let response = scooterApp.registerUser("Joe Bloggs", "test123", 21);
    expect(response).toBeInstanceOf(User);
  });

  it("should update the scooter app properly", () => {
    expect(scooterApp.registeredUsers).toEqual({
      "Joe Bloggs": {
        username: "Joe Bloggs",
        password: "test123",
        age: 21,
        loggedIn: false,
      },
    });
  });

  it("should throw an error if the user exists", () => {
    try {
      scooterApp.registerUser("Joe Bloggs", "test123", 21);
    } catch (e) {
      expect(e.message).toBe("already registered.");
    }
  });

  it("should throw an error if the user is under 18", () => {
    try {
      scooterApp.registerUser("Chad", "1234", 17);
    } catch (e) {
      expect(e.message).toBe("too young to register.");
    }
  });
});

// log in
describe("Login method", () => {
  it("should throw an error if the username or password incorrect", () => {
    expect(() => scooterApp.loginUser("Joe", "1234")).toThrow(
      "Username or password is incorrect."
    );
    expect(() => scooterApp.loginUser("Joe Bloggs", "1234")).toThrow(
      "Username or password is incorrect."
    );
    expect(() => scooterApp.loginUser("Joe", "test123")).toThrow(
      "Username or password is incorrect."
    );
  });

  it("should log the user in properly", () => {
    scooterApp.loginUser("Joe Bloggs", "test123");
    expect(scooterApp.registeredUsers["Joe Bloggs"].loggedIn).toBe(true);
  });
});

// log out
describe("Logout method", () => {
  it("should return an error if no such user is logged in", () => {
    expect(() => scooterApp.logoutUser("Saman")).toThrow(
      "No such user is logged in."
    );
  });

  it("should log the user out properly", () => {
    scooterApp.logoutUser("Joe Bloggs");
    expect(scooterApp.registeredUsers["Joe Bloggs"].loggedIn).toBe(false);
  });
});

// create scooter
describe("Create scooter method", () => {
  it("should throw an error the station input is incorrect", () => {
    expect(() => scooterApp.createScooter("Milan")).toThrow("no such station.");
  });

  it("should return the instance of Scooter", () => {
    let response = scooterApp.createScooter("London");
    expect(response).toBeInstanceOf(Scooter);
  });

  it("should create a correct scooter object", () => {
    let response = scooterApp.createScooter("London");
    expect(response).toEqual({
      charge: 100,
      isBroken: false,
      serial: 2,
      station: "London",
      user: null,
    });
  });
});

// rent scooter
describe("Rent scoooter method", () => {
  it("should properly rent the scooter", () => {
    scooterApp.loginUser("Joe Bloggs", "test123");
    scooterApp.rentScooter(
      scooterApp.stations.London[0],
      scooterApp.registeredUsers["Joe Bloggs"]
    );
    expect(scooterApp.stations.London[0].user).toEqual({
      username: "Joe Bloggs",
      password: "test123",
      age: 21,
      loggedIn: true,
    });
  });
  it("should return an error if the scooter is already rented", () => {
    scooterApp.registerUser("Dash", "test123", 21);
    scooterApp.loginUser("Dash", "test123");
    try {
      scooterApp.rentScooter(
        scooterApp.stations.London[0],
        scooterApp.registeredUsers["Dash"]
      );
    } catch (e) {
      expect(e.message).toBe("scooter already rented.");
    }
  });
});

// dock scooter
describe("Dock scooter", () => {
  it("should throw an error if the scooter is already docked", () => {
    const scooter = scooterApp.createScooter("Manchester");
    try {
      scooterApp.dockScooter(scooter, "London");
    } catch (e) {
      expect(e.message).toBe("scooter already at station.");
    }
  });

  it("should throw an error if there are no such station as the input", () => {
    const scooter = scooterApp.createScooter("Hertford");
    const user = scooterApp.registerUser("Brad", "test123", 20);
    scooterApp.rentScooter(scooter, user);

    try {
      scooterApp.dockScooter(scooter, "Paddington");
    } catch (e) {
      expect(e.message).toBe("no such station.");
    }
  });

  it("should dock the scooter properly", () => {
    const scooter = scooterApp.createScooter("Borehamwood");
    const user = scooterApp.registerUser("John", "test123", 40);
    scooterApp.rentScooter(scooter, user);
    scooterApp.dockScooter(scooter, "London");
    expect(scooterApp.stations.Borehamwood[0]).toEqual({
      charge: 100,
      isBroken: false,
      serial: 5,
      station: "London",
      user: null,
    });
  });
});

describe("print method", () => {
  it("should console.log the stations", () => {
    console.log = jest.fn();
    scooterApp.print();
    expect(console.log).toHaveBeenCalledWith(scooterApp.stations);
    expect(console.log).toHaveBeenCalledWith(scooterApp.registeredUsers);
  });
});
