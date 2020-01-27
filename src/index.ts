import crypto from "crypto"

import { SSM, AWSError } from "aws-sdk"
import { PromiseResult } from "aws-sdk/lib/request"
import jwt from "jsonwebtoken"

import { getSsm, setSsm } from "./ssm"

export class JwtSsm {
  static decode(
    token: string
  ): Record<string, any> | boolean {
    try {
      const decoded = jwt.decode(token)
      return decoded["sub"]
    } catch (err) {
      return false
    }
  }

  static async rotate(
    ssmName: string,
    privateKey: string
  ): Promise<
    PromiseResult<SSM.PutParameterResult, AWSError>
  > {
    const date = new Date().valueOf().toString()
    const random = Math.random().toString()

    const key =
      privateKey ||
      crypto
        .createHash("sha256")
        .update(date + random)
        .digest("hex")

    return await setSsm(ssmName, key)
  }

  static async token(
    ssmName: string,
    subject: string
  ): Promise<string> {
    return jwt.sign({ sub: subject }, await getSsm(ssmName))
  }

  static async verify(
    ssmName: string,
    token: string
  ): Promise<string | boolean> {
    const privateKey = await getSsm(ssmName)

    try {
      const decoded = jwt.verify(token, privateKey)
      return decoded["sub"]
    } catch (err) {
      return false
    }
  }
}
