# jwt-ssm

## Install

```bash
npm install jwt-ssm
```

## CLI

### Rotate private key

```bash
jwt-ssm rotate my-ssm-key
```

### Generate token

```bash
jwt-ssm token my-ssm-key my-jwt-subject
```

### Verify token

```bash
jwt-ssm verify my-ssm-key my-token
```

## Library

```typescript
import { rotate, token, verify } from "jwt-ssm"

rotate("my-ssm-key")

const myToken = token("my-ssm-key", "my-jwt-subject")

if (verify("my-ssm-key", myToken)) {
  console.log("verified!")
}
```
