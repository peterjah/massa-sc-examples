import { call, Address } from "massa-sc-std";
import { ByteArray } from "mscl-type";

export function swap(_args: string): string {
  const addrA = new Address();
  let offset = addrA.fromStringSegment(_args);
  const tokenA = new Address();
  offset = addrA.fromStringSegment(_args, offset);
  const amountA = ByteArray.fromByteString(
    _args.substring(offset, offset + 8)
  ).toU64();
  offset += 8;

  const addrB = new Address();
  offset = addrA.fromStringSegment(_args, offset);
  const tokenB = new Address();
  offset = addrA.fromStringSegment(_args, offset);
  const amountB = ByteArray.fromByteString(
    _args.substring(offset, offset + 8)
  ).toU64();

  if (addrA == addrB) {
    return "0";
  }

  call(
    tokenA,
    "transferFrom",
    addrA
      .toStringSegment()
      .concat(addrB.toStringSegment())
      .concat(ByteArray.fromU64(amountA).toByteString()),
    0
  );
  call(
    tokenB,
    "transferFrom",
    addrB
      .toStringSegment()
      .concat(addrA.toStringSegment())
      .concat(ByteArray.fromU64(amountB).toByteString()),
    0
  );
  return "1";
}
