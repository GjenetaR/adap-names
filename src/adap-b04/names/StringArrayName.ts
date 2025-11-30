import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {

        // Preconditions
        IllegalArgumentException.assert(Array.isArray(source), "Constructor expects an array of components");
        for (const comp of source) {
            IllegalArgumentException.assert(typeof comp === "string", "All components must be strings");
        }

        super(delimiter);
        // Copy components 
        this.components = [...source];

        // POSTCONDITION
        MethodFailedException.assert(
            this.components.length === source.length,
            "Constructor failed to copy components"
        );
    }

    public checkInvariant(): void {
        InvalidStateException.assert(
            typeof this.delimiter === "string" && this.delimiter.length === 1,
            "Delimiter must be a single character"
        );

        InvalidStateException.assert(
            Array.isArray(this.components),
            "Components must be an array"
        );

        for (const c of this.components) {
            InvalidStateException.assert(typeof c === "string",
                "Components must be strings"
            );
        }

        InvalidStateException.assert(
            this.getNoComponents() >= 0,
            "Number of components must be non-negative"
        );
    }


    public clone(): Name {
        const clone = new StringArrayName([...this.components], this.delimiter);

        // Postcondition: cloned object must have the same number of components
        MethodFailedException.assert(clone.getNoComponents() === this.getNoComponents(), "Clone failed: component count mismatch");

        return clone;
    }

    public asString(delimiter: string = this.delimiter): string {

        // PRECONDITION
        IllegalArgumentException.assert(
            typeof delimiter === "string" && delimiter.length === 1,
            "Delimiter must be a single character"
        );

        const result = this.components.join(delimiter);

        // Postcondition: result must be a string
        MethodFailedException.assert(typeof result === "string", "asString failed: result is not a string");

        return result;
    }

    public asDataString(): string {
            let res: string = '';
                    for (let i = 0; i < this.components.length;  i++){
                        if (i != 0){
                            res += DEFAULT_DELIMITER;
                        }
                        for (let j = 0; j < this.components[i].length; j++){
                            if ((this.components[i][j] == DEFAULT_DELIMITER) || (this.components[i][j] == ESCAPE_CHARACTER)){
                                res += ESCAPE_CHARACTER + this.components[i][j];
                            }
                            else res += this.components[i][j];
                        }
                    }
            MethodFailedException.assert(typeof res === "string", "asDataString failed: result is not a string");
        
            return res;
        }


    public getNoComponents(): number {
            const count = this.components.length;

            // Postcondition: must be >= 0
            MethodFailedException.assert(count >= 0, "getNoComponents failed: negative value");

            return count;
        }
    
    public getComponent(i: number): string {
        // Precondition
        IllegalArgumentException.assert(typeof i === "number", "Index must be a number");
        IllegalArgumentException.assert(i >= 0 && i < this.getNoComponents(), "Index out of bounds");

        const comp = this.components[i];

        // Postcondition
        MethodFailedException.assert(typeof comp === "string", "getComponent failed: not a string");

        return comp;
    }

    public setComponent(i: number, c: string): void {
        // Preconditions
        IllegalArgumentException.assert(typeof i === "number", "Index must be a number");
        IllegalArgumentException.assert(i >= 0 && i < this.getNoComponents(), "Index out of bounds");
        IllegalArgumentException.assert(typeof c === "string", "Component must be a string");

        this.components[i] = c;

        // Postcondition
        MethodFailedException.assert(this.components[i] === c, "setComponent failed to assign value");
    
    }

    public insert(i: number, c: string): void {
        // Preconditions
        IllegalArgumentException.assert(typeof i === "number", "Index must be a number");
        IllegalArgumentException.assert(i >= 0 && i <= this.getNoComponents(), "Index out of bounds");
        IllegalArgumentException.assert(typeof c === "string", "Component must be a string");

        const oldCount = this.getNoComponents();
        this.components.splice(i, 0, c);

        // Postconditions
        MethodFailedException.assert(this.getNoComponents() === oldCount + 1, "Insert failed: count mismatch");
        MethodFailedException.assert(this.components[i] === c, "Insert failed: component not inserted");
    
    }

    public append(c: string): void {
        // Precondition
        IllegalArgumentException.assert(typeof c === "string", "Component must be a string");

        const oldCount = this.getNoComponents();
        this.components.push(c);

        // Postconditions
        MethodFailedException.assert(this.getNoComponents() === oldCount + 1, "Append failed: count mismatch");
        MethodFailedException.assert(this.components[this.getNoComponents() - 1] === c, "Append failed: component not added");

    }

    public remove(i: number): void {
        // Preconditions
        IllegalArgumentException.assert(typeof i === "number", "Index must be a number");
        IllegalArgumentException.assert(i >= 0 && i < this.getNoComponents(), "Index out of bounds");

        const oldCount = this.getNoComponents();
        this.components.splice(i, 1);

        // Postcondition
        MethodFailedException.assert(this.getNoComponents() === oldCount - 1, "Remove failed: count mismatch");
    }

    public concat(other: Name): void {
        // Precondition
        IllegalArgumentException.assert(other !== null, "Other Name must not be null");
        IllegalArgumentException.assert(typeof other.getComponent === "function", "Other must be a Name");
        IllegalArgumentException.assert(typeof other.getNoComponents === "function", "Other must be a Name");

        const oldCount = this.getNoComponents();
        const count = other.getNoComponents();

        for (let i = 0; i < count; i++) {
            this.components.push(other.getComponent(i));
        }

        // Postcondition
        MethodFailedException.assert(this.getNoComponents() === oldCount + count, "Concat failed: count mismatch");

    }
}