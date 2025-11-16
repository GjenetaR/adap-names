import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        if (typeof source !== "string") {
            throw new Error("Not a string");
        };

        // Set delimiter (must be a single character)
        if (delimiter !== undefined) {
            if (delimiter.length !== 1) {
                throw new Error("Delimiter must be a single character");
            }
            this.delimiter = delimiter;
        }

        this.name = source;

        // todo
        // set noComponents
        this.noComponents = this.getNoComponents();
        
    }

    private parseComponentsFromDataString(data: string): string[] {
        const comps: string[] = [];
        let current = "";
        let escape = false;

        for (let i = 0; i < data.length; i++) {
            const ch = data[i];

            if (escape) {
                current += ch;
                escape = false;
            } 
            else if (ch === ESCAPE_CHARACTER) {
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

    private getComponents(): string[] {
        return this.parseComponentsFromDataString(this.name);
    }

    private parseStringFromComponents(components: string[]): string {
        let res: string = '';
                for (let i = 0; i < components.length;  i++){
                    if (i != 0){
                        res += this.delimiter;
                    }
                    for (let j = 0; j < components[i].length; j++){
                        if ((components[i][j] == DEFAULT_DELIMITER) || (components[i][j] == ESCAPE_CHARACTER)){
                            res += '\\' + components[i][j];
                        }
                        else res += components[i][j];
                    }
                }
        return res;        
    }


    public asString(delimiter: string = this.delimiter): string {
        const components = this.parseComponentsFromDataString(this.name);
        return components.join(delimiter);
    }

    public asDataString(): string {
        return this.name;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.name.length === 0; //todo
    }

    public getNoComponents(): number {
        const components = this.parseComponentsFromDataString(this.name);
        return components.length;
    }

    public getComponent(x: number): string {
        const components = this.parseComponentsFromDataString(this.name);
        if (x < 0 || x >= components.length) {
            throw new Error("Index out of bounds");
        }
        return components[x];
    }

    public setComponent(n: number, c: string): void {
        const components = this.parseComponentsFromDataString(this.name);
        if (n < 0 || n >= components.length) {
            throw new Error("Index out of bounds");
        }
        components[n] = c;
        this.name = this.parseStringFromComponents(components); 
    }

    public insert(n: number, c: string): void {
        const components = this.parseComponentsFromDataString(this.name);
        if (n < 0 || n > components.length) {
            throw new Error("Index out of bounds");
        }
        components.splice(n, 0, c);
        this.name = this.parseStringFromComponents(components);
        this.noComponents = this.getNoComponents()
    }

    public append(c: string): void {
        const components = this.parseComponentsFromDataString(this.name);
        components.push(c);
        this.name = this.parseStringFromComponents(components);
        this.noComponents = this.getNoComponents();
    }

    public remove(n: number): void {
        const components = this.parseComponentsFromDataString(this.name);
        if (n < 0 || n >= components.length) {
            throw new Error("Index out of bounds");
        }
        components.splice(n, 1);
        this.name = this.parseStringFromComponents(components);
        this.noComponents = this.getNoComponents();

    }

    public concat(other: Name): void {
        const components = this.parseComponentsFromDataString(this.name);
        const count = other.getNoComponents();
        for (let i = 0; i < count; i++) {
            components.push(other.getComponent(i));
        };
        this.name = this.parseStringFromComponents(components);
        this.noComponents = this.getNoComponents();
    }

}