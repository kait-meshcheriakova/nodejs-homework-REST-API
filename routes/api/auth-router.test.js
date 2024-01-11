import mongoose from "mongoose";
import "dotenv/config";
import request from "supertest";
import app from "../../app.js";

import User from "../../models/User.js";

const { TEST_DB_HOST, PORT = 3000 } = process.env;

describe("test/api/auth/signup", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });
  beforeEach(() => {});

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("test signup with correctData", async () => {
    const signupData = {
      email: "daniel@utquamvel.com",
      password: "789456",
    };
    const { statusCode, body } = await request(app)
      .post("/api/auth/signup")
      .send(signupData);
    expect(statusCode).toBe(201);
    expect(body.email).toBe(signupData.email);

    const user = await User.findOne({ email: signupData.email });
    expect(user.email).toBe(signupData.email);
  });
});
// describe("test/api/auth/signup", () => {
//   let server = null;
//   beforeAll(async () => {
//     await mongoose.connect(TEST_DB_HOST);
//     server = app.listen(PORT);
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//     server.close();
//   });
//   beforeEach(() => {});

//   afterEach(async () => {
//     await User.deleteMany({});
//   });
//   test("test signin with correctData", async () => {
//     const signinData = {
//       email: "daniel@utquamvel.com",
//       subscription: " ",
//     };
//     const { statusCode, body } = await request(app)
//       .post("/api/auth/signup")
//       .send(signinData);
//     expect(statusCode).toBe(200);
//     expect(body.email).toBe(signinData.email);
//   });
// });
