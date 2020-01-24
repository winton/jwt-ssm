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
  await rotate("/myNamespace/myKey")

  const myToken = await token(
    "/myNamespace/myKey",
    "myJwtSubject"
  )

  if (await verify("/myNamespace/myKey", myToken)) {
    console.log("verified!")
  }
})()
```
