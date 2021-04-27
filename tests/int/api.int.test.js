// const { save } = require("./save_json");
// jest.mock("./save_json", () => ({
//   save: jest.fn(),
// }));

const supertest = require("supertest");
const server = require("../../app");

const app = () => supertest(server);

describe("the register process", () => {
  it("should register anew user", async () => {
    let stateObj = {
      name: "heba",
      email: "hebaayman777717@gmail.com",
      password: "123456789",
      confirmPassword: "123456789",
    };
    const body = await app()
      .post(`http://localhost:3000/api/v1/users/sign-up`)
      .send(stateObj)
      .expect(200);
    // console.log(body);
    // expect(body.data).toEqual({
    //   user: {
    //     name: "heba",
    //     email: "hebaayman777717@gmail.com",
    //   },
    // });
    // expect(body.token).toBeDefined();
    // expect(save).toHaveBeenCalledWith([
    //   {
    //     state: "MI",
    //     capital: "Lansing",
    //     governor: "Gretchen Whitmer",
    //   },
    //   {
    //     state: "GA",
    //     capital: "Atlanta",
    //     governor: "Brian Kemp",
    //   },
    //   {
    //     state: "AL",
    //     capital: "Montgomery",
    //     governor: "Kay Ivey",
    //   },
    // ]);
  });
});
