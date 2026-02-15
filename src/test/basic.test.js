import { describe, it, expect } from "vitest";

describe("Basic tests", () => {

  it("addition test", () => {
    expect(2 + 2).toBe(4);
  });

  it("string contains test", () => {
    expect("taskboard").toContain("task");
  });

  it("boolean test", () => {
    expect(true).toBe(true);
  });

});
