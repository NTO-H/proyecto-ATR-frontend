import { ElementSelectorType } from "../enums/element-selector-type";

export interface Script {
    loaded?: boolean;
    name: string;
    src: string;
    id?: string;
    async?: boolean;
    defer?: boolean;
}

export interface ElementSelector {
    name: string;
    type: ElementSelectorType;
}
