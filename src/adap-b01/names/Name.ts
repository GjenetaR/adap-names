export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

/**
 * A name is a sequence of string components separated by a delimiter character.
 * Special characters within the string may need masking, if they are to appear verbatim.
 * There are only two special characters, the delimiter character and the escape character.
 * The escape character can't be set, the delimiter character can.
 * 
 * Homogenous name examples
 * 
 * "oss.cs.fau.de" is a name with four name components and the delimiter character '.'.
 * "///" is a name with four empty components and the delimiter character '/'.
 * "Oh\.\.\." is a name with one component, if the delimiter character is '.'.
 */
export class Name {

    private delimiter: string = DEFAULT_DELIMITER;
    private components: string[] = [];

    /** Expects that all Name components are properly masked */
    // @methodtype initialization-method
    constructor(other: string[], delimiter?: string) {
        if (!Array.isArray(other)) {
            throw new Error("Constructor expects an array of components");
        }

        // Validate that all components are strings
        for (const comp of other) {
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
        this.components = [...other];
    }


    /**
     * Returns a human-readable representation of the Name instance using user-set special characters
     * Special characters are not escaped (creating a human-readable string)
     * Users can vary the delimiter character to be used
     */
    // @methodtype conversion-method
    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    /** 
     * Returns a machine-readable representation of Name instance using default special characters
     * Machine-readable means that from a data string, a Name can be parsed back in
     * The special characters in the data string are the default characters
     */
    // @methodtype conversion-method
    public asDataString(): string {
        let res: string = '';
        for (let i = 0; i < this.components.length;  i++){
            if (i != 0){
                res += DEFAULT_DELIMITER;
            }
            for (let j = 0; j < this.components[i].length; j++){
                if ((this.components[i][j] === DEFAULT_DELIMITER) || (this.components[i][j] === ESCAPE_CHARACTER)){
                    res += ESCAPE_CHARACTER + this.components[i][j];
                }
                else res += this.components[i][j];
            }
        }
        return res;
    }

    /** Returns properly masked component string */
    // @methodtype get-method
    public getComponent(i: number): string {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        return this.components[i];
    }

    /** Expects that new Name component c is properly masked */
    // @methodtype set-method
    public setComponent(i: number, c: string): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        this.components[i] = c;
    }

     /** Returns number of components in Name instance */
     // @methodtype get-method
     public getNoComponents(): number {
        return this.components.length;
    }

    /** Expects that new Name component c is properly masked */
    // @methodtype command-method
    public insert(i: number, c: string): void {
        if (i < 0 || i > this.components.length) {
            throw new Error("Index out of bounds");
        }
        this.components.splice(i, 0, c);
    }

    /** Expects that new Name component c is properly masked */
    // @methodtype command-method
    public append(c: string): void {
        this.components.push(c);
    }
    // @methodtype command-method
    public remove(i: number): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        this.components.splice(i, 1);
    }

}
