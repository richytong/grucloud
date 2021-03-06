---
title: KeyPair
---

Provide a reference to an SSH key pair, used to connect to EC2 instances.

See the [AWS documentation for ec2 key pair](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html) to create a new one.

```js
const keyPair = await provider.useKeyPair({
  name: "kp",
});
```

### Examples

- [simple example](https://github.com/grucloud/grucloud/blob/master/examples/aws/iac.js#L10)

### Used By

- [EC2](./EC2)

### Aws cli

List the available key pairs:

```bash
aws ec2 describe-key-pairs
```
