import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        if (!Array.isArray(source)) {
            throw new Error("Constructor expects an array of components");
        }

        // Validate that all components are strings
        for (const comp of source) {
            if (typeof comp !== "string") {
                throw new Error("All components must be strings");
            }
        }

        // Set delimiter (must be a single character)
        if (delimiter !== undefined) {
            if (delimiter.length !== 1) {
                throw new Error("Delimiter must be a single character");
            }
            this.delimiter = delimiter;
        }

        // Copy components 
        this.components = [...source];
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    public asDataString(): string {
        let res: string = '';
                for (let i = 0; i < this.components.length;  i++){
                    if (i != 0){
                        res += this.delimiter;
                    }
                    for (let j = 0; j < this.components[i].length; j++){
                        if ((this.components[i][j] == DEFAULT_DELIMITER) || (this.components[i][j] == ESCAPE_CHARACTER)){
                            res += '\\' + this.components[i][j];
                        }
                        else res += this.components[i][j];
                    }
                }
        return res;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.components.length === 0;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        this.components[i] = c;
    }

    public insert(i: number, c: string): void {
        if (i < 0 || i > this.components.length) {
            throw new Error("Index out of bounds");
        }
        this.components.splice(i, 0, c);
    }

    public append(c: string): void {
        this.components.push(c);
    }

    public remove(i: number): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        this.components.splice(i, 1);
    }

    public concat(other: Name): void {
        const count = other.getNoComponents();
        for (let i = 0; i < count; i++) {
            this.components.push(other.getComponent(i));
        };
    }

}