export interface Deprecation {
    id: number;
    code: string;
    description: string;
    recommendation: string;
}


export interface Data {
    items: Deprecation[];
}

export interface DeprecatedItem {
    code: string;
    description: string;
    recommendation: string;
    startChar: number;
    endChar: number;
    line: number;
}