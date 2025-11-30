import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        
        // Preconditions
        IllegalArgumentException.assert(typeof source === "string", "Source must be a string");

        super(delimiter);

        this.name = source;
        this.noComponents = this.getNoComponents();

        // Postconditions
        MethodFailedException.assert(
            typeof this.name === "string",
            "Constructor failed: name is not a string"
        );
        MethodFailedException.assert(
            this.noComponents === this.parseComponentsFromDataString(this.name).length,
            "Constructor failed: component count mismatch"
        );
    }

    public checkInvariant(): void {

        // delimiter must be a single character
        InvalidStateException.assert(
            typeof this.delimiter === "string" && this.delimiter.length === 1,
            "Delimiter must be a single character"
        );

        // name must always be a string
        InvalidStateException.assert(
            typeof this.name === "string",
            "Name must be a string"
        );

        // noComponents must always be non-negative
        InvalidStateException.assert(
            typeof this.noComponents === "number" && this.noComponents >= 0,
            "Number of components must be non-negative"
        );

        // noComponents must match the parsed number of components
        InvalidStateException.assert(
            this.noComponents === this.parseComponentsFromDataString(this.name).length,
            "noComponents does not match the actual number of parsed components"
        );

        // each parsed component must be a string
        for (const c of this.parseComponentsFromDataString(this.name)) {
            InvalidStateException.assert(
                typeof c === "string",
                "All parsed components must be strings"
            );
        }
    }


    private parseComponentsFromDataString(data: string): string[] {
        const comps: string[] = [];
        let current = "";
        let escape = false;

        if (data === "") return [];

        for (let i = 0; i < data.length; i++) {
            const ch = data[i];

            if (escape) {
                current += ch;
                escape = false;
            } 
            else if (ch === ESCAPE_CHARACTER) {
                current += ESCAPE_CHARACTER;
                escape = true;
            } 
            else if (ch === this.delimiter) {
                comps.push(current);
                current = "";
            } 
            else {
                current += ch;
            }
        }

        comps.push(current);
        return comps;
    }

    public clone(): Name {

        const copy = new StringName(this.name, this.delimiter);

        // Postconditions
        MethodFailedException.assert(copy.getNoComponents() === this.getNoComponents(), "Cloned object must have the same number of components");
        MethodFailedException.assert(copy.asDataString() === this.asDataString(), "Cloned object must have the same data string");

        return copy;
    }

   public asString(delimiter: string = this.delimiter): string {
        // Preconditions
        IllegalArgumentException.assert(typeof delimiter === "string" && delimiter.length === 1, "Delimiter must be a single character");

        const components = this.parseComponentsFromDataString(this.name);
        const result = components.join(delimiter).replaceAll(ESCAPE_CHARACTER + this.delimiter, this.delimiter)
                                             .replaceAll(ESCAPE_CHARACTER + ESCAPE_CHARACTER, ESCAPE_CHARACTER);

        // Postconditions
        MethodFailedException.assert(typeof result === "string", "Result must be a string");

        return result;
     }
 
    public asDataString(): string {
        if (this.delimiter === DEFAULT_DELIMITER) {
            return this.name;
        }
        const components = this.parseComponentsFromDataString(this.name);
        for (let i = 0; i < components.length; i++) {
            // We guarantee that every delimiter in component is escaped
            components[i] = components[i].replaceAll(ESCAPE_CHARACTER + this.delimiter,  this.delimiter);
        }
        const result = components.join(DEFAULT_DELIMITER);

        // Postconditions
        MethodFailedException.assert(typeof result === "string", "Result must be a string");

        return result;
    }
 


    public getNoComponents(): number {
        const components = this.parseComponentsFromDataString(this.name);
        const count = components.length;

        // Postconditions
        MethodFailedException.assert(count >= 0, "Number of components must be non-negative");

        return count;
    }
   
    public getComponent(i: number): string {
        // Preconditions
        IllegalArgumentException.assert(typeof i === "number", "Index must be a number");
        IllegalArgumentException.assert(i >= 0 && i < this.getNoComponents(), "Index out of bounds");

        const result = this.parseComponentsFromDataString(this.name)[i];

        // Postconditions
        MethodFailedException.assert(typeof result === "string", "Result must be a string");

        return result;
    }

    public setComponent(i: number, c: string): void {
        // Preconditions
        IllegalArgumentException.assert(typeof i === "number", "Index must be a number");
        IllegalArgumentException.assert(typeof c === "string", "Component must be a string");
        IllegalArgumentException.assert(i >= 0 && i < this.getNoComponents(), "Index out of bounds");

        const components = this.parseComponentsFromDataString(this.name);
        components[i] = c;
        this.name = components.join(this.delimiter);

        // Postconditions
        MethodFailedException.assert(this.getNoComponents() === components.length, "Number of components must match");
    }

    public insert(i: number, c: string): void {
        // Preconditions
        IllegalArgumentException.assert(typeof i === "number", "Index must be a number");
        IllegalArgumentException.assert(typeof c === "string", "Component must be a string");
        IllegalArgumentException.assert(i >= 0 && i <= this.getNoComponents(), "Index out of bounds");

        const components = this.parseComponentsFromDataString(this.name);
        components.splice(i, 0, c);
        this.name = components.join(this.delimiter);
        this.noComponents = components.length;

        // Postconditions
        MethodFailedException.assert(this.getNoComponents() === components.length, "Number of components must match after insert");
  }

    public append(c: string): void {
        // Preconditions
        IllegalArgumentException.assert(typeof c === "string", "Component must be a string");

        const components = this.parseComponentsFromDataString(this.name);
        components.push(c);
        this.name = components.join(this.delimiter);
        this.noComponents += 1;

        // Postconditions
        MethodFailedException.assert(this.getNoComponents() === components.length, "Number of components must match after append");
    
    }

    public remove(i: number): void {
        // Preconditions
        IllegalArgumentException.assert(typeof i === "number", "Index must be a number");
        IllegalArgumentException.assert(i >= 0 && i < this.getNoComponents(), "Index out of bounds");

        const components = this.parseComponentsFromDataString(this.name);
        components.splice(i, 1);
        this.name = components.join(this.delimiter);
        this.noComponents -= 1;

        // Postconditions
        MethodFailedException.assert(this.getNoComponents() === components.length, "Number of components must match after remove");
    }

    public concat(other: Name): void {
        // Preconditions
        IllegalArgumentException.assert(other != null, "Other name cannot be null");
        IllegalArgumentException.assert(typeof other.getNoComponents === "function", "Other must implement Name interface");

        const components = this.parseComponentsFromDataString(this.name);
        const count = other.getNoComponents();
        for (let i = 0; i < count; i++) {
            components.push(other.getComponent(i));
        }
        this.name = components.join(this.delimiter);
        this.noComponents = this.getNoComponents();

        // Postconditions
        MethodFailedException.assert(this.getNoComponents() === components.length, "Number of components must match after concat");
    }
}