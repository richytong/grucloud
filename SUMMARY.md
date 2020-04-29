# TL;DR

Let's create a simple infrastructure with a server running ubuntu attached to a 20GB disk, connected to a public ip address.

Clone one of the example and install the dependencies and _gc_, the grucloud command line utility:

```
git clone git@github.com:FredericHeem/grucloud.git && cd grucloud/examples/scaleway && npm install
```

Edit the environment file and set the relevant account and keys

    vi .env

Query the status of the current resources on the given cloud account:

    gc status

Now it is time to edit the infrastructure file that describes the architecture:

    <your favorite editor> iac.js

Find out which resources are going to be allocated:

    gc plan

Happy with the expected plan ? Deploy it now:

    gc deploy

Time to destroy the resouces allocated:

    gc destroy

Well done. Infrastrucure as code in a few commands.

# Starting Point

- [Requirements](docs/Requirements.md)

# Cloud providers

## Google Cloud Platform - GCP

- [Quick Start](src/providers/google/README.md)

## Scaleway

- [Quick Start](src/providers/scaleway/README.md)

# Contribute

- [Developer Guide](docs/DeveloperGuide.md)

```

```