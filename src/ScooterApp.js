const User = require("./User");
const Scooter = require("./Scooter");

class ScooterApp {
  constructor() {
    this.stations = {
      London: [],
      Manchester: [],
      Hertford: [],
      Borehamwood: [],
    };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    if (Object.keys(this.registeredUsers).includes(username)) {
      throw new Error("already registered.");
    } else if (age < 18) {
      throw new Error("too young to register.");
    } else {
      const user = new User(username, password, age);
      this.registeredUsers[username] = user;
      console.log("user has been registered.");
      return user;
    }
  }

  loginUser(username, password) {
    try {
      const user = this.registeredUsers[username];
      user.login(password);
      console.log("user has been logged in.");
    } catch (e) {
      throw new Error("Username or password is incorrect.");
    }
  }

  logoutUser(username) {
    try {
      const user = this.registeredUsers[username];
      user.logout();
      console.log("user is logged out.");
    } catch (e) {
      throw new Error("No such user is logged in.");
    }
  }

  createScooter(station) {
    if (!Object.keys(this.stations).includes(station)) {
      throw new Error("no such station.");
    } else {
      const scooter = new Scooter(station);
      this.stations[station].push(scooter);
      console.log("created new scooter.");
      return scooter;
    }
  }

  dockScooter(scooter, station) {
    if (scooter.station) {
      throw new Error("scooter already at station.");
    } else if (!Object.keys(this.stations).includes(station)) {
      throw new Error("no such station.");
    } else {
      scooter.dock(station);
      console.log("scooter is docked.");
    }
  }

  rentScooter(scooter, user) {
    if (scooter.user) {
      throw new Error("scooter already rented.");
    } else {
      scooter.rent(user);
      console.log("scooter is rented.");
    }
  }

  print() {
    console.log(this.stations);
    console.log(this.registeredUsers);
  }
}

module.exports = ScooterApp;
