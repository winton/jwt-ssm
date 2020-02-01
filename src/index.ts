import crypto from "crypto"
import jwt from "jsonwebtoken"

import { getAwsSecret, setAwsSecret } from "./awsSecret"
import {
  GCP,
  getGcloudSecret,
  setGcloudSecret,
} from "./gcloudSecret"

export default class JwtSsm {
  static decode(
    token: string
  ): string | Record<string, any> | boolean {
    try {
      const decoded = jwt.decode(token)
      return decoded
    } catch (err) {
      return false
    }
  }

  static async getPrivateKey(
    ssmName: string
  ): Promise<string> {
    if (GCP) {
      return await getGcloudSecret(ssmName)
    } else {
      return await getAwsSecret(ssmName)
    }
  }

  static async rotate(
    ssmName: string,
    privateKey?: string
  ): Promise<string> {
    const date = new Date().valueOf().toString()
    const random = Math.random().toString()

    const key =
      privateKey ||
      crypto
        .createHash("sha256")
        .update(date + random)
        .digest("hex")

    await Promise.all([
      setAwsSecret(ssmName, key),
      setGcloudSecret(ssmName, key),
    ])

    return key
  }

  static sign(user: string, privateKey: string): string {
    return jwt.sign({ sub: user }, privateKey)
  }

  static async token(ssmName: string): Promise<string> {
    const sub = ssmName.split("/")[2]
    return this.sign(sub, await this.getPrivateKey(ssmName))
  }

  static async verify(
    ssmName: string,
    token: string
  ): Promise<string | Record<string, any> | boolean> {
    try {
      const decoded = jwt.verify(
        token,
        await this.getPrivateKey(ssmName)
      )
      return decoded
    } catch (err) {
      return false
    }
  }
}
