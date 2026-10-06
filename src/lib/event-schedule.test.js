import { expect, test } from "bun:test";
import { PRESALE_DATE } from "./event-schedule";

test("pré-venda começa em 07/10/2026 às 12h de Brasília", () => {
  expect(PRESALE_DATE.toISOString()).toBe("2026-10-07T15:00:00.000Z");
});