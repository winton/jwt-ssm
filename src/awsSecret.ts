import AWS, { SSM } from "aws-sdk"
import { PromiseResult } from "aws-sdk/lib/request"

if (!AWS.config.region) {
  AWS.config.update({ region: "us-east-1" })
}

const ssm = new SSM()

export async function getAwsSecret(
  name: string
): Promise<string> {
  const request = await ssm
    .getParameter({ Name: name })
    .promise()

  return request.Parameter.Value
}

export async function setAwsSecret(
  name: string,
  value: string
): Promise<
  PromiseResult<SSM.PutParameterResult, AWS.AWSError>
> {
  return await ssm
    .putParameter({
      Name: name,
      Type: "String",
      Value: value,
      Overwrite: true,
    })
    .promise()
}
