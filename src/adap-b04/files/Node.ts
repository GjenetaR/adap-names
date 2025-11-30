import { Name } from "../names/Name";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        // Preconditions
        IllegalArgumentException.assert(typeof bn === "string" && bn.length > 0, "Base name must be a non-empty string");
        IllegalArgumentException.assert(pn !== null && pn !== undefined && pn instanceof Directory, "Parent must be a valid Directory");

        this.doSetBaseName(bn);
        this.parentNode = pn;
        this.initialize(pn);
    }

    protected initialize(pn: Directory): void {
        // Precondition
        IllegalArgumentException.assert(pn !== null && pn !== undefined && pn instanceof Directory, "Parent must be a valid Directory");

        this.parentNode = pn;
        this.parentNode.addChildNode(this);
    }

    public move(to: Directory): void {
        // Preconditions
        IllegalArgumentException.assert(to !== null && to !== undefined && to instanceof Directory, "Target directory must be valid");
        IllegalArgumentException.assert(this.parentNode !== to, "Cannot move node to the same directory");

        const oldParent = this.parentNode;
        oldParent.removeChildNode(this);
        to.addChildNode(this);
        this.parentNode = to;
    }

    public getFullName(): Name {
        // Precondition
        IllegalArgumentException.assert(this.parentNode !== null && this.parentNode !== undefined, "Parent node must exist");

        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());
        return result;
    }

    public getBaseName(): string {
        return this.doGetBaseName();
    }

    protected doGetBaseName(): string {
        return this.baseName;
    }

    public rename(bn: string): void {
        // Precondition
        IllegalArgumentException.assert(typeof bn === "string" && bn.length > 0, "New base name must be a non-empty string");

        this.doSetBaseName(bn);
    }

    protected doSetBaseName(bn: string): void {
        this.baseName = bn;
    }

    public getParentNode(): Directory {
        return this.parentNode;
    }
}
