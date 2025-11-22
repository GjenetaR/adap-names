import { describe, it, expect } from "vitest";
import { Name } from "../../../src/adap-b01/names/Name";

describe("Basic initialization tests", () => {
  it("test construction 1", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

describe("Basic function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"], '#');
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["oss.cs.fau.de"], '#');
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
});


describe("test asDataString", () => {
  it("test asDataString", () => {
    // Example 1: simple name
    let n1 = new Name(["oss", "cs", "fau", "de"]);
    expect(n1.asDataString()).toBe("oss.cs.fau.de");
    
    // Example 2: components with special characters
    let n2 = new Name(["Oh...", "test\\name"]);
    expect(n2.asDataString()).toBe("Oh\\.\\.\\..test\\\\name");
    
    // Example 3: empty components
    let n3 = new Name(["", "", ""]);
    expect(n3.asDataString()).toBe("..");
  });
});

// ===== Additional tests for other methods =====
describe("Additional Name methods tests", () => {

  it("test append", () => {
    let n = new Name(["oss", "cs"]);
    n.append("fau");
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });

  it("test remove", () => {
    let n = new Name(["oss", "cs", "fau", "de"]);
    n.remove(1); // remove "cs"
    expect(n.asString()).toBe("oss.fau.de");
    n.remove(2); // remove "de"
    expect(n.asString()).toBe("oss.fau");
  });

  it("test getComponent and setComponent", () => {
    let n = new Name(["oss", "cs", "fau", "de"]);
    expect(n.getComponent(0)).toBe("oss");
    expect(n.getComponent(2)).toBe("fau");
    
    n.setComponent(2, "faculty");
    expect(n.getComponent(2)).toBe("faculty");
    expect(n.asString()).toBe("oss.cs.faculty.de");
  });

  it("test getNoComponents", () => {
    let n = new Name(["oss", "cs", "fau", "de"]);
    expect(n.getNoComponents()).toBe(4);
    n.append("people");
    expect(n.getNoComponents()).toBe(5);
    n.remove(0);
    expect(n.getNoComponents()).toBe(4);
  });

  it("test getNoComponents empty", () => {
    let n = new Name([]);
    expect(n.getNoComponents()).toBe(0);
  });


});