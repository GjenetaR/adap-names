import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {

        // Precondition: delimiter must be a single character
        IllegalArgumentException.assert(
            typeof delimiter === "string" && delimiter.length === 1,
            "Delimiter must be a single character"
        );
        this.delimiter = delimiter;

        // POSTCONDITION
        MethodFailedException.assert(
            this.delimiter === delimiter,
            "Constructor failed to assign delimiter"
        );
    }

    abstract checkInvariant(): void;

    abstract clone(): Name;

    abstract asString(delimiter: string): string;


    abstract asDataString(): string;

    public isEqual(other: Name): boolean {
        // Precondition: other must be non-null
        IllegalArgumentException.assert(other !== null, "Other Name must not be null");
        IllegalArgumentException.assert(
            typeof other.asDataString === "function",
            "Other must implement Name"
        );

        const result = this.asDataString() === other.asDataString();

        // POSTCONDITION
        MethodFailedException.assert(
            typeof result === "boolean",
            "isEqual must return a boolean"
        );

        return result;
    }

    public getHashCode(): number {
        let string = this.asDataString();
        let hash = 0;

        if (string.length == 0) return hash;

        for (let i = 0; i < string.length; i++) {
            let char = string.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }

        // POSTCONDITION
        MethodFailedException.assert(
            typeof hash === "number",
            "getHashCode must return a number"
        );

        return hash;
    }

    public isEmpty(): boolean {
        const result = this.getNoComponents() === 0;

        // POSTCONDITION
        MethodFailedException.assert(
            typeof result === "boolean",
            "isEmpty must return a boolean"
        );
        return result;
    }

    public getDelimiterCharacter(): string {
        const result = this.delimiter;
        // POSTCONDITION
        MethodFailedException.assert(
            typeof result === "string" && result.length === 1,
            "Delimiter must be a single character"
        );

        return result;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    abstract concat(other: Name): void;

}