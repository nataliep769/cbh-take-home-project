const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = encrypt(data);
    }

    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }

    const MAX_PARTITION_KEY_LENGTH = 256;
    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = encrypt(candidate);
    }
  } else {
    const TRIVIAL_PARTITION_KEY = "0";
    candidate = TRIVIAL_PARTITION_KEY;
  }

  return candidate;
};

function encrypt(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
} 