import { SecretManagerServiceClient } from "@google-cloud/secret-manager"

export const client = new SecretManagerServiceClient()

export const GCP =
  process.env.GOOGLE_CLOUD_PROJECT ||
  process.env.GOOGLE_APPLICATION_CREDENTIALS

export async function getGcloudSecret(
  name: string
): Promise<string> {
  if (!GCP) {
    return
  }

  const [secret] = await client.accessSecretVersion({
    name:
      "projects/inverse-staging/secrets/" +
      name.slice(1).replace("/", "-") +
      "/versions/latest",
  })

  return secret.payload.data.toString()
}

export async function setGcloudSecret(
  name: string,
  value: string
): Promise<void> {
  if (!GCP) {
    return
  }

  const parent = "projects/inverse-staging"
  const secretId = name.slice(1).replace("/", "-")

  try {
    await client.createSecret({
      parent,
      secretId,
      secret: {
        replication: {
          automatic: {},
        },
      },
    })
  } catch (e) {}

  await client.addSecretVersion({
    parent: `${parent}/secrets/${secretId}`,
    payload: {
      data: Buffer.from(value),
    },
  })
}
