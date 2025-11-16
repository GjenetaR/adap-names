import { describe, it, expect } from "vitest";

import { Name } from "../../../src/adap-b02/names/Name";
import { StringName } from "../../../src/adap-b02/names/StringName";
import { StringArrayName } from "../../../src/adap-b02/names/StringArrayName";

describe("Basic StringName function tests", () => {
  it("test insert", () => {
    let n: Name = new StringName("oss.fau.de");
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test append", () => {
    let n: Name = new StringName("oss.cs.fau");
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test remove", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    n.remove(0);
    expect(n.asString()).toBe("cs.fau.de");
  });
});

describe("Basic StringArrayName function tests", () => {
  it("test insert", () => {
    let n: Name = new StringArrayName(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test append", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau"]);
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test remove", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    n.remove(0);
    expect(n.asString()).toBe("cs.fau.de");
  });
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: Name = new StringName("oss#fau#de", '#');
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    let n: Name = new StringName("oss.cs.fau.de", '#');
    expect(n.getNoComponents()).toBe(1);
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
});






// new tests

describe("Edge cases and interoperability tests", () => {
  it("empty name handling", () => {
    let n: Name = new StringName("");
    expect(n.isEmpty()).toBe(true);
    expect(n.getNoComponents()).toBe(1); // one empty component
    n.append("first");
    expect(n.asString()).toBe(".first");
  });

  it("single component name", () => {
    let n: Name = new StringName("alone");
    expect(n.getNoComponents()).toBe(1);
    expect(n.getComponent(0)).toBe("alone");
    n.setComponent(0, "solo");
    expect(n.asString()).toBe("solo");
  });

  it("delimiters at start/end", () => {
    let n: Name = new StringName(".start.end.");
    expect(n.getNoComponents()).toBe(4); // ['', 'start', 'end', '']
    n.remove(0);
    expect(n.asString()).toBe("start.end.");
    n.remove(n.getNoComponents() - 1);
    expect(n.asString()).toBe("start.end");
  });

  it("interchangeability: concat StringName into StringArrayName", () => {
    const sArray: Name = new StringArrayName(["a", "b"]);
    const sName: Name = new StringName("c.d");
    sArray.concat(sName);
    expect(sArray.asString()).toBe("a.b.c.d");
  });

  it("interchangeability: concat StringArrayName into StringName", () => {
    const sName: Name = new StringName("x.y");
    const sArray: Name = new StringArrayName(["z", "w"]);
    sName.concat(sArray);
    expect(sName.asString()).toBe("x.y.z.w");
  });

  it("escape characters in components", () => {
    let n: Name = new StringName("a\\.b.c");
    expect(n.getNoComponents()).toBe(2); // ['a.b', 'c']
    n.append("d.e");
    expect(n.asDataString()).toBe("a\\.b.c.d\\.e"); // check escaping
    expect(n.asString()).toBe("a.b.c.d.e"); // human-readable
  });

  it("insert and remove at boundaries", () => {
    let n: Name = new StringName("first.middle.last");
    n.insert(0, "zero");
    n.insert(n.getNoComponents(), "end");
    expect(n.asString()).toBe("zero.first.middle.last.end");
    n.remove(0);
    n.remove(n.getNoComponents() - 1);
    expect(n.asString()).toBe("first.middle.last");
  });
});
