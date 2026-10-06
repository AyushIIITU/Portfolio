// Libsodium sealed box for the refreshed Codex auth.json. Artifacts are readable by
// anyone with repo read access, so the token travels sealed to SDOS's public key.
//   node seal.cjs keygen                -> {"publicKey","privateKey"} (base64)
//   node seal.cjs seal <in> <out>       needs SDOS_SEAL_PUBKEY
//   node seal.cjs open <in>             needs SDOS_SEAL_PUBKEY + SDOS_SEAL_PRIVKEY
const fs = require("node:fs");
const sodium = require("libsodium-wrappers");

(async () => {
  await sodium.ready;
  const B64 = sodium.base64_variants.ORIGINAL;
  const key = (name) => sodium.from_base64(process.env[name], B64);
  const [cmd, input, output] = process.argv.slice(2);

  if (cmd === "keygen") {
    const k = sodium.crypto_box_keypair();
    console.log(
      JSON.stringify({
        publicKey: sodium.to_base64(k.publicKey, B64),
        privateKey: sodium.to_base64(k.privateKey, B64),
      }),
    );
  } else if (cmd === "seal") {
    const sealed = sodium.crypto_box_seal(fs.readFileSync(input), key("SDOS_SEAL_PUBKEY"));
    fs.writeFileSync(output, sodium.to_base64(sealed, B64));
  } else if (cmd === "open") {
    const sealed = sodium.from_base64(fs.readFileSync(input, "utf8").trim(), B64);
    const plain = sodium.crypto_box_seal_open(
      sealed,
      key("SDOS_SEAL_PUBKEY"),
      key("SDOS_SEAL_PRIVKEY"),
    );
    process.stdout.write(Buffer.from(plain));
  } else {
    console.error("usage: seal.cjs keygen | seal <in> <out> | open <in>");
    process.exit(2);
  }
})();
