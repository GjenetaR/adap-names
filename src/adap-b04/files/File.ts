import { Node } from "./Node";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);

        // Preconditions
        IllegalArgumentException.assert(typeof baseName === "string" && baseName.length > 0, "Base name must be a non-empty string");
        IllegalArgumentException.assert(parent !== null && parent !== undefined && parent instanceof Directory, "Parent must be a valid Directory");
    }

    public open(): void {
        // Precondition: file must not be deleted
        IllegalArgumentException.assert(this.state !== FileState.DELETED, "Cannot open a deleted file");

        // Optionally, file must be closed before opening
        IllegalArgumentException.assert(this.state === FileState.CLOSED, "File is already open");

        //DO STUFF HERE
    }
    public read(noBytes: number): Int8Array {
        // Preconditions
        IllegalArgumentException.assert(typeof noBytes === "number" && noBytes >= 0, "Number of bytes must be a non-negative number");
        IllegalArgumentException.assert(this.state === FileState.OPEN, "Cannot read from a file that is not open");

        // Implementation placeholder
        return new Int8Array();
    }

    public close(): void {
        // Precondition: file must be open to close it
        IllegalArgumentException.assert(this.state === FileState.OPEN, "Cannot close a file that is not open");

        //DO STUFF HERE
    }

    protected doGetFileState(): FileState {
        // No parameters, so no preconditions needed
        return this.state;
    }

}
