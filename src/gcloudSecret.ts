import { SecretManagerServiceClient } from "@google-cloud/secret-manager"

export const client = new SecretManagerServiceClient()

export const GCP_PROJECT =
  process.env.GOOGLE_CLOUD_PROJECT ||
  process.env.GCLOUD_PROJECT

export async function getGcloudSecret(
  name: string
): Promise<string> {
  if (!GCP_PROJECT) {
    return
  }

  const [secret] = await client.accessSecretVersion({
    name:
      `projects/${GCP_PROJECT}/secrets/` +
      name.slice(1).replace("/", "-") +
      "/versions/latest",
  })

  return secret.payload.data.toString()
}

export async function setGcloudSecret(
  name: string,
  value: string
): Promise<void> {
  if (!GCP_PROJECT) {
    return
  }

  const parent = `projects/${GCP_PROJECT}`
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
