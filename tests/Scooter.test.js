const Scooter = require("../src/Scooter");
const User = require("../src/User");

describe("scooter object", () => {
  it("Scooter class should create Scooter instance", () => {
    const scooter = new Scooter("Milan");
    expect(scooter).toBeInstanceOf(Scooter);
  });

  it("Scooter should create a correct scooter object", () => {
    const scooter = new Scooter("Peru");
    const expected = {
      station: "Peru",
      user: null,
      charge: 100,
      isBroken: false,
      serial: 2,
    };
    expect(scooter).toEqual(expected);
  });

  it("Scooter should increment the serial number each time a scooter is created", () => {
    const scooter1 = new Scooter("London");
    const scooter2 = new Scooter("Portsmouth");
    expect(scooter1.serial).toBe(3);
    expect(scooter2.serial).toBe(4);
  });
});

//Method tests
describe("Scooter methods", () => {
  //rent method
  describe("Rent method", () => {
    it("Rent method should throw an error if the user is not a User instance", () => {
      const scooter = new Scooter("Peru");
      expect(() => scooter.rent({ username: "Dash", age: 18 })).toThrow(
        "User is not accepted."
      );
    });

    it("Rent method should throw an error if the scooter is not ready", () => {
      const user = new User("Dash", "1234", 18);

      const scooter1 = new Scooter("Peru");
      scooter1.charge = 10;
      scooter1.isBroken = true;

      const scooter2 = new Scooter("Milan");
      scooter2.charge = 10;
      scooter2.isBroken = false;

      const scooter3 = new Scooter("London");
      scooter3.charge = 90;
      scooter3.isBroken = true;

      expect(() => scooter1.rent(user)).toThrow(
        "Scooter needs to charge or scooter needs repair"
      );
      expect(() => scooter2.rent(user)).toThrow(
        "Scooter needs to charge or scooter needs repair"
      );
      expect(() => scooter3.rent(user)).toThrow(
        "Scooter needs to charge or scooter needs repair"
      );
    });

    it("Rent method should rent the scooter and update the scooter properly", () => {
      const scooter = new Scooter("Peru");
      const user = new User("Dash", "1234", 18);
      scooter.rent(user);
      expect(scooter.user).toEqual(user);
    });
  });

  //dock method
  describe("Dock method", () => {
    it("Dock method should update the scooter properly", () => {
      const scooter = new Scooter("Peru");
      const user = new User("Dash", "1234", 18);
      scooter.rent(user);
      scooter.dock("Milan");
      expect(scooter).toEqual({
        station: "Milan",
        user: null,
        charge: 100,
        isBroken: false,
        serial: 10,
      });
    });
  });

  //charge method
  describe("Recharge method", () => {
    it("should repair the scooter and update the scooter", async () => {
      const scooter = new Scooter("Peru");
      scooter.charge = 90;
      await scooter.recharge();
      expect(scooter.charge).toBe(100);
    });
  });

  //requestRepair method
  describe("Request repair method", () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });

    it("should repair the scooter and update the scooter", async () => {
      const scooter = new Scooter("Peru");
      scooter.isBroken = true;
      await scooter.requestRepair();
      jest.advanceTimersByTime(5000);
      expect(scooter.isBroken).toBeFalsy();
    });

    it("should throw an error if the scooter is not broken", async () => {
      const scooter = new Scooter("Peru");
      try {
        await scooter.requestRepair();
      } catch (e) {
        expect(e.message).toBe("Scooter is not broken.");
      }
    });
  });
});
