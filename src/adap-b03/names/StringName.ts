import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        if (typeof source !== "string") {
            throw new Error("Not a string");
        };

        this.name = source;
        this.noComponents = this.getNoComponents();
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
        return new StringName(this.name, this.delimiter);
    }

   public asString(delimiter: string = this.delimiter): string {
         const components = this.parseComponentsFromDataString(this.name);
         console.log(components);
         return components.join(delimiter).replaceAll(ESCAPE_CHARACTER + this.delimiter, this.delimiter).replaceAll(ESCAPE_CHARACTER + ESCAPE_CHARACTER, ESCAPE_CHARACTER);
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
        return components.join(DEFAULT_DELIMITER);
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
        this.name = components.join(this.delimiter); 
    }

    public insert(n: number, c: string): void {
        const components = this.parseComponentsFromDataString(this.name);
        if (n < 0 || n > components.length) {
            throw new Error("Index out of bounds");
        }
        components.splice(n, 0, c);
        this.name = components.join(this.delimiter);
        this.noComponents += 1;
    }

    public append(c: string): void {
        const components = this.parseComponentsFromDataString(this.name);
        components.push(c);
        this.name = components.join(this.delimiter);
        this.noComponents += 1;
    }

    public remove(n: number): void {
        const components = this.parseComponentsFromDataString(this.name);
        if (n < 0 || n >= components.length) {
            throw new Error("Index out of bounds");
        }
        components.splice(n, 1);
        this.name = components.join(this.delimiter);
        this.noComponents -= 1;

    }

    public concat(other: Name): void {
        const components = this.parseComponentsFromDataString(this.name);
        const count = other.getNoComponents();
        for (let i = 0; i < count; i++) {
            components.push(other.getComponent(i));
        };
        this.name = components.join(this.delimiter);
        this.noComponents = this.getNoComponents();
    }


}