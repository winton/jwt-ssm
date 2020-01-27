import expect from "./expect"
import JwtSsm from "../src"

describe("jwtSsm", () => {
  it("should instantiate", () => {
    new JwtSsm()
  })

  it("should assert", () => {
    expect(true).toBe(true)
  })
})
