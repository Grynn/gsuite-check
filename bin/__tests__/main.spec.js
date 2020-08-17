const path = require("path");
const cmd = require("../../src/test/cmd");

describe("gsuite-check-cli", () => {
  const cliPath = path.join(__dirname, "../main.js");
  const cliProcess = cmd.create(cliPath, "."); // this will return a new object { execute }

  it("should throw if missing arguments", () => {
    expect(cliProcess.execute).rejects.toMatch(/error:/);
  });

  it("should work for example.com", async () => {
    let response = await cliProcess.execute("example.com");
    expect(response).toMatch(/Yup/);
  });
});
