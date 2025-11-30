import { Name } from "../names/Name";
import { StringName } from "../names/StringName";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class RootNode extends Directory {

    protected static ROOT_NODE: RootNode = new RootNode();

    public static getRootNode() {
        return this.ROOT_NODE;
    }

    constructor() {
        // Root node has no parent and empty base name
        super("", new Object() as Directory);

        // Precondition: base name must be empty string
        IllegalArgumentException.assert(this.baseName === "", "Root node base name must be empty");
    }

    protected initialize(pn: Directory): void {
        // Root node parent is itself, precondition ensures correct type
        IllegalArgumentException.assert(pn instanceof Directory, "Parent must be a Directory");
        this.parentNode = this;
    }

    public getFullName(): Name {
        // No preconditions needed; always returns a valid root name
        return new StringName("", '/');
    }

    public move(to: Directory): void {
        // No-op for root node, but we can check argument type
        IllegalArgumentException.assert(to !== null && to !== undefined && to instanceof Directory, "Target directory must be valid");
    }

    protected doSetBaseName(bn: string): void {
        // No-op for root node, but precondition: base name must be a string
        IllegalArgumentException.assert(typeof bn === "string", "Base name must be a string");
    }

}
