import { Node } from "./Node";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);

        // Precondition: bn must be a non-empty string
        IllegalArgumentException.assert(typeof bn === "string" && bn.length > 0, "Base name must be a non-empty string");

        // Precondition: pn must be a Directory or null (for root)
        IllegalArgumentException.assert(pn === null || pn instanceof Directory, "Parent must be a Directory or null");
    }

    public hasChildNode(cn: Node): boolean {
        // Precondition: cn must be non-null
        IllegalArgumentException.assert(cn !== null && cn !== undefined, "Child node cannot be null or undefined");

        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        // Precondition: cn must be non-null
        IllegalArgumentException.assert(cn !== null && cn !== undefined, "Child node cannot be null or undefined");

        // Optional: prevent adding duplicate nodes
        IllegalArgumentException.assert(!this.childNodes.has(cn), "Child node already exists");

        this.childNodes.add(cn);
    }

    public removeChildNode(cn: Node): void {
        // Precondition: cn must be non-null
        IllegalArgumentException.assert(cn !== null && cn !== undefined, "Child node cannot be null or undefined");

        // Optional: ensure node exists before removing
        IllegalArgumentException.assert(this.childNodes.has(cn), "Child node does not exist");

        this.childNodes.delete(cn);
    }

}
