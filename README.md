# jwt-ssm

## Install

```bash
npm install jwt-ssm
```

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

## Library usage

```typescript
import { rotate, token, verify } from "jwt-ssm"
;(async (): Promise<void> => {
  await rotate("my-ssm-key")

  const myToken = await token(
    "my-ssm-key",
    "my-jwt-subject"
  )

  if (await verify("my-ssm-key", myToken)) {
    console.log("verified!")
  }
})()
```
