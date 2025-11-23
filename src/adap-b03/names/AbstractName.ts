import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        // Set delimiter (must be a single character)
        if (delimiter !== undefined) {
            if (delimiter.length !== 1) {
                throw new Error("Delimiter must be a single character");
            }
            this.delimiter = delimiter;
        }
    }

    abstract clone(): Name;

    abstract asString(delimiter: string): string;


    abstract asDataString(): string;

    public isEqual(other: Name): boolean {
        return this.asDataString() === other.asDataString();
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

        return hash;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    abstract concat(other: Name): void;

}