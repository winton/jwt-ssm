import { config, SSM } from "aws-sdk"
import { PromiseResult } from "aws-sdk/lib/request"

if (!config.region) {
  config.update({ region: "us-east-1" })
}

const ssm = new SSM()

const AWS =
  process.env.AWS_ACCESS_KEY_ID ||
  process.env.AWS_LAMBDA_FUNCTION_NAME

export async function getAwsSecret(
  name: string
): Promise<string> {
  if (!AWS) {
    return
  }

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
  if (!AWS) {
    return
  }

  return await ssm
    .putParameter({
      Name: name,
      Type: "String",
      Value: value,
      Overwrite: true,
    })
    .promise()
}
