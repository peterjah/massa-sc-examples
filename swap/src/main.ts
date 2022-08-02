import { Amount } from "mscl-type";
import { Address } from "massa-sc-std";
import { TokenWrapper } from "../node_modules/mscl-token/assembly/std/wrapper";

export function swap(_args: string): string {
  const wallet1 = new Address();
  let offset = wallet1.fromStringSegment(_args);
  const token1Addr = new Address();
  offset = token1Addr.fromStringSegment(_args, offset);
  const amount1 = new Amount();
  offset = amount1.fromStringSegment(_args, offset);

  const wallet2 = new Address();
  offset = wallet2.fromStringSegment(_args, offset);
  const token2Addr = new Address();
  offset = token2Addr.fromStringSegment(_args, offset);
  const amount2 = new Amount();
  amount2.fromStringSegment(_args, offset);

  if (wallet1 == wallet2) {
    return "0";
  }

  const token1 = new TokenWrapper(token1Addr);
  const transfer1 = token1.transferFrom(wallet1, wallet2, amount1);
  if (!transfer1) {
    return "0";
  }
  const token2 = new TokenWrapper(token1Addr);
  const transfer2 = token2.transferFrom(wallet2, wallet1, amount2);
  if (!transfer2) {
    return "0";
  }
  return "1";
}
