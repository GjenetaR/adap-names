// included components tests here in order to be availbe in the src order that is used for grading

import { describe, it, expect } from "vitest";

import { IllegalArgumentException } from "../../common/IllegalArgumentException";
import { MethodFailedException } from "../../common/MethodFailedException";
import { InvalidStateException } from "../../common/InvalidStateException";

import { Name } from "../Name";
import { StringName } from "../StringName";
import { StringArrayName } from "../StringArrayName";

describe("Asserting not null or undefined", () => {
  it("test asserIsNotNullOrUndefined", async () => {
    const m: string = "null or undefined";

    IllegalArgumentException.assert("hurray!" != null);
    expect(() => IllegalArgumentException.assert(false, m)).toThrow(new IllegalArgumentException(m));

    MethodFailedException.assert("hurray!" != null);
    expect(() => MethodFailedException.assert(false, m)).toThrow(new MethodFailedException(m));

    InvalidStateException.assert("hurray!" != null);
    expect(() => InvalidStateException.assert(false, m)).toThrow(new InvalidStateException(m));
  });
});


// componentt tests for the contract

describe("StringName Contract Tests", () => {

  it("constructor should throw on invalid input", () => {
    expect(() => new StringName(null as any)).toThrow(IllegalArgumentException);
    expect(() => new StringName("valid", "!!" as any)).toThrow(IllegalArgumentException);
  });

  it("setComponent preconditions", () => {
    const name = new StringName("a:b");
    expect(() => name.setComponent(-1, "x")).toThrow(IllegalArgumentException);
    expect(() => name.setComponent(0, 123 as any)).toThrow(IllegalArgumentException);
  });

  it("append preconditions", () => {
    const name = new StringName("a:b");
    expect(() => name.append(123 as any)).toThrow(IllegalArgumentException);
  });

  it("insert preconditions", () => {
    const name = new StringName("a:b");
    expect(() => name.insert(-1, "x")).toThrow(IllegalArgumentException);
    expect(() => name.insert(3, "x")).toThrow(IllegalArgumentException);
    expect(() => name.insert(0, 123 as any)).toThrow(IllegalArgumentException);
  });

  it("remove preconditions", () => {
    const name = new StringName("a:b");
    expect(() => name.remove(-1)).toThrow(IllegalArgumentException);
    expect(() => name.remove(2)).toThrow(IllegalArgumentException);
  });

  it("concat preconditions", () => {
    const name = new StringName("a:b");
    expect(() => name.concat(null as any)).toThrow(IllegalArgumentException);
    expect(() => name.concat({} as any)).toThrow(IllegalArgumentException);
  });

  it("checkInvariant detects broken state", () => {
    const name = new StringName("a:b");
    (name as any).name = null;
    expect(() => name.checkInvariant()).toThrow(InvalidStateException);

    (name as any).name = "valid";
    (name as any).noComponents = -1;
    expect(() => name.checkInvariant()).toThrow(InvalidStateException);
  });

  it("clone should preserve components and data string", () => {
    const name = new StringName("a:b:c");
    const copy = name.clone();
    expect(copy.getNoComponents()).toBe(name.getNoComponents());
    expect(copy.asDataString()).toBe(name.asDataString());
  });

});


describe("StringArrayName Contract Tests", () => {

  it("constructor should throw on invalid input", () => {
    expect(() => new StringArrayName(null as any)).toThrow(IllegalArgumentException);
    expect(() => new StringArrayName([1, 2, 3] as any)).toThrow(IllegalArgumentException);
    expect(() => new StringArrayName(["a", "b"], "!!" as any)).toThrow(IllegalArgumentException);
  });

  it("getComponent preconditions", () => {
    const arr = new StringArrayName(["a","b","c"]);
    expect(() => arr.getComponent(-1)).toThrow(IllegalArgumentException);
    expect(() => arr.getComponent(3)).toThrow(IllegalArgumentException);
  });

  it("setComponent preconditions", () => {
    const arr = new StringArrayName(["a","b","c"]);
    expect(() => arr.setComponent(-1, "x")).toThrow(IllegalArgumentException);
    expect(() => arr.setComponent(0, 123 as any)).toThrow(IllegalArgumentException);
  });

  it("insert preconditions", () => {
    const arr = new StringArrayName(["a","b","c"]);
    expect(() => arr.insert(-1, "x")).toThrow(IllegalArgumentException);
    expect(() => arr.insert(4, "x")).toThrow(IllegalArgumentException);
    expect(() => arr.insert(0, 123 as any)).toThrow(IllegalArgumentException);
  });

  it("append preconditions", () => {
    const arr = new StringArrayName(["a","b","c"]);
    expect(() => arr.append(123 as any)).toThrow(IllegalArgumentException);
  });

  it("remove preconditions", () => {
    const arr = new StringArrayName(["a","b","c"]);
    expect(() => arr.remove(-1)).toThrow(IllegalArgumentException);
    expect(() => arr.remove(3)).toThrow(IllegalArgumentException);
  });

  it("concat preconditions", () => {
    const arr = new StringArrayName(["a","b"]);
    expect(() => arr.concat(null as any)).toThrow(IllegalArgumentException);
    expect(() => arr.concat({} as any)).toThrow(IllegalArgumentException);
  });

  it("checkInvariant detects broken state", () => {
    const arr = new StringArrayName(["a","b","c"]);
    (arr as any).components = null;
    expect(() => arr.checkInvariant()).toThrow(InvalidStateException);
    (arr as any).components = ["a","b"];
    (arr as any).delimiter = "!!";
    expect(() => arr.checkInvariant()).toThrow(InvalidStateException);
  });

  it("clone should preserve components", () => {
    const arr = new StringArrayName(["a","b","c"]);
    const copy = arr.clone();
    expect(copy.getNoComponents()).toBe(arr.getNoComponents());
    expect(copy.asDataString()).toBe(arr.asDataString());
  });

});



