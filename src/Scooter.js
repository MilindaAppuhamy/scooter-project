const User = require("./User");

class Scooter {
  static nextSerial = 1;
  constructor(station) {
    this.station = station;
    this.user = null;
    this.charge = 100;
    this.isBroken = false;
    this.serial = Scooter.nextSerial;
    Scooter.nextSerial++;
  }

  rent(user) {
    if (user instanceof User) {
      if (this.charge > 20 && !this.isBroken) {
        this.station = null;
        this.user = user;
      } else {
        throw new Error("Scooter needs to charge or scooter needs repair");
      }
    } else {
      throw new Error("User is not accepted.");
    }
  }

  dock(station) {
    this.station = station;
    this.user = null;
  }

  async recharge() {
    while (this.charge < 100) {
      await new Promise((resolve) => {
        setTimeout(() => {
          this.charge += 10;
          console.log(this.charge);
          resolve();
        }, 1000);
      });
    }
  }

  async requestRepair() {
    if (!this.isBroken) {
      throw new Error("Scooter is not broken.");
    } else {
      const repair = setInterval(async () => {
        await new Promise((resolve) => {
          this.isBroken = false;
          console.log("Repair completed");
          resolve();
        });
        clearInterval(repair);
      }, 5000);
    }
  }
}

module.exports = Scooter;
