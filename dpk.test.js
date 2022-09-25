const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("should return the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("should create a candidate with the expected data when supplied a string", () => {
    const event = {
      partitionKey: "hello"
    }

    const result = deterministicPartitionKey(event);

    expect(result).toBe("hello");
  });

  it("should convert the partion key to a string when supplied a number", () => {
    const event = {
      partitionKey: 55
    }

    const result = deterministicPartitionKey(event);

    expect(result).toBe("55");
  });

  it("should autogenerate a key if none is supplied", () => {
    const event = {}

    const result = deterministicPartitionKey(event);

    expect(result).not.toBe(undefined);
  });

  it("should autogenerate a key if the one supplied is greater than 256 characters", () => {
    const tooLongKey = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec."
    const event = {
      partitionKey: tooLongKey
    }

    const result = deterministicPartitionKey(event);

    expect(result).not.toBe(tooLongKey);
    expect(result).not.toBe(undefined);
  });
});
