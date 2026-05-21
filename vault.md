# HashiCorp Vault Complete Setup & Troubleshooting Guide

---

# 1. Install Vault

Run:

```bash
brew tap hashicorp/tap
brew install hashicorp/tap/vault
```

---

# 2. Verify Installation

```bash
vault version
```

Expected:

```bash
Vault v1.x.x
```

---

# 3. Start Vault in Dev Mode

For local learning/testing:

```bash
vault server -dev
```

You’ll see output like:

```bash
Root Token: hvs.xxxxxx
```

Keep this terminal running.

---

# 4. Open New Terminal

Set environment variables:

```bash
export VAULT_ADDR='http://127.0.0.1:8200'
export VAULT_TOKEN='hvs.xxxxxx'
```

Use your actual root token.

---

# 5. Test Vault

Check status:

```bash
vault status
```

---

# 6. Store Your First Secret

```bash
vault kv put secret/myapp \
    username=admin \
    password=pass123
```

---

# 7. Read Secret

```bash
vault kv get secret/myapp
```

Expected:

```bash
====== Data ======
Key         Value
---         -----
username    admin
password    pass123
```

---

# 8. Use Vault with Node.js

Install client:

```bash
npm install node-vault
```

Example:

```js
const vault = require("node-vault")({
  endpoint: "http://127.0.0.1:8200",
  token: process.env.VAULT_TOKEN
});

async function main() {
  const result = await vault.read("secret/data/myapp");

  console.log(result.data.data);
}

main();
```

---

# 9. Persist Environment Variables

Add to your `~/.zshrc`:

```bash
export VAULT_ADDR='http://127.0.0.1:8200'
export VAULT_TOKEN='hvs.xxxxxx'
```

Then reload:

```bash
source ~/.zshrc
```

---

# 10. Useful Commands

## List Secrets

```bash
vault secrets list
```

## Enable KV v2

```bash
vault secrets enable -path=secret kv-v2
```

## Delete Secret

```bash
vault kv delete secret/myapp
```

---

# Important Note About Dev Mode

`vault server -dev` is:

- insecure
- in-memory
- resets after restart

Good for learning only.

Production Vault requires:

- storage backend
- TLS
- auth methods
- policies
- unseal keys

---

# Optional UI

Vault also has a web UI.

Open:

```txt
http://127.0.0.1:8200
```

Login with:

- Token auth
- Root token

---

# Vault Policy & Permission Troubleshooting

# 1. Check Current Token

```bash
vault token lookup
```

See:

- policies
- ttl
- token_accessor

Especially look for:

```txt
policies ["default" ...]
```

---

# 2. Check Which Policies Are Attached

```bash
vault token capabilities secrets/zm-dev
```

or

```bash
vault token capabilities secrets/data/zm-dev
```

Depending on KV version.

If you get:

```txt
deny
```

then your token policy is missing access.

---

# 3. Add Policy Access

If you have admin/root access, create a policy.

Example for KV v2:

```hcl
path "secrets/data/zm-dev" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

path "secrets/metadata/zm-dev" {
  capabilities = ["list", "read"]
}
```

Save as:

```bash
zm-dev-policy.hcl
```

Apply it:

```bash
vault policy write zm-dev-policy zm-dev-policy.hcl
```

Attach to token/user:

```bash
vault token create -policy=zm-dev-policy
```

OR for AppRole/Userpass/etc attach appropriately.

---

# 4. Export New Token

```bash
export VAULT_TOKEN=<new-token>
```

Then retry:

```bash
vault kv get secrets/zm-dev
```

---

# Important: KV v1 vs KV v2

You may also be using wrong path syntax.

Check mounts:

```bash
vault secrets list -detailed
```

If `secrets/` is KV v2, then internally paths become:

```txt
secrets/data/...
```

But CLI command should still usually be:

```bash
vault kv get secrets/zm-dev
```

unless custom mount config exists.

---

# Quick Admin Bypass (Testing Only)

If you have root token:

```bash
export VAULT_TOKEN=<root-token>
vault kv get secrets/zm-dev
```

If this works, then definitely it is a policy issue.

---

# Verify Authentication Source

Sometimes developers accidentally use:

- expired token
- different namespace
- wrong `VAULT_ADDR`
- stale shell env

Check:

```bash
echo $VAULT_ADDR
echo $VAULT_TOKEN
```

And:

```bash
vault status
```

