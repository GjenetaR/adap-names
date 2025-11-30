import { Node } from "./Node";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Link extends Node {

    protected targetNode: Node | null = null;

    constructor(bn: string, pn: Directory, tn?: Node) {
        super(bn, pn);

        // Preconditions
        IllegalArgumentException.assert(typeof bn === "string" && bn.length > 0, "Base name must be a non-empty string");
        IllegalArgumentException.assert(pn !== null && pn !== undefined && pn instanceof Directory, "Parent must be a valid Directory");
        if (tn !== undefined) {
            IllegalArgumentException.assert(tn instanceof Node, "Target node must be a Node instance");
            this.targetNode = tn;
        }
    }

    public getTargetNode(): Node | null {
        return this.targetNode;
    }

    public setTargetNode(target: Node): void {
        // Precondition
        IllegalArgumentException.assert(target !== null && target !== undefined && target instanceof Node, "Target node must be a valid Node");

        this.targetNode = target;
    }

    public getBaseName(): string {
        // Precondition: target node must exist
        const target = this.ensureTargetNode(this.targetNode);
        IllegalArgumentException.assert(target !== null, "Target node is not set");

        return target.getBaseName();
    }

    public rename(bn: string): void {
        // Precondition: target node must exist
        const target = this.ensureTargetNode(this.targetNode);
        IllegalArgumentException.assert(target !== null, "Target node is not set");

        // Precondition: base name must be a non-empty string
        IllegalArgumentException.assert(typeof bn === "string" && bn.length > 0, "Base name must be a non-empty string");

        target.rename(bn);
    }

    protected ensureTargetNode(target: Node | null): Node {
        // Precondition: target cannot be null
        IllegalArgumentException.assert(target !== null, "Target node must not be null");

        return target as Node;
    }
}
