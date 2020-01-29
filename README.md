# jwt-ssm

Generate and verify JWT tokens with [AWS SSM Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) and [GCP Secret Manager](https://cloud.google.com/secret-manager)

## Install

```bash
npm install jwt-ssm
```

Make sure your environment is [configured for AWS](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html) and [GCP](https://cloud.google.com/docs/authentication/getting-started).

## CLI usage

### Rotate private key

```bash
jwt-ssm rotate /myNamespace/myKey
```

### Generate token

```bash
jwt-ssm token /myNamespace/myKey myJwtSubject
```

### Verify token

```bash
jwt-ssm verify /myNamespace/myKey eyJhbGciOiJIUz...
```

### Decode token (without verification)

```bash
jwt-ssm decode eyJhbGciOiJIUz...
```

## Library usage

```typescript
import JwtSsm from "jwt-ssm"
;(async (): Promise<void> => {
  await JwtSsm.rotate("/myNamespace/myKey")

  const myToken = await JwtSsm.token(
    "/myNamespace/myKey",
    "myJwtSubject"
  )

  if (JwtSsm.decode(myToken)) {
    console.log("decoded!")
  }

  if (await JwtSsm.verify("/myNamespace/myKey", myToken)) {
    console.log("verified!")
  }
})()
```
