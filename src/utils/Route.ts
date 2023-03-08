import { Nullable } from "../typings/Nullable";
import Block from "./Block";

export interface BlockConstructable<P extends Record<string, any> = any> {
    new(props: P): Block<P>;
}

function isEqual(lhs: string, rhs: string): boolean {
    return lhs === rhs;
}

const RenderDom = (query: string, block: Block) => { 
    const root: Nullable<HTMLDivElement> = document.querySelector(query) as HTMLDivElement;

    if (root === null) {
        throw new Error(`root not found by selector "${query}"`);
    }

    root.innerHTML = '';
    root.append(block.getContent()!);
    block.dispatchComponentDidMount();
} 

export default class Route {
    private block: Block | null = null;

    constructor(
        private pathname: string, 
        private readonly blockClass: BlockConstructable, 
        private readonly props: string
    ) {}

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this.pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this.blockClass) {
            this.block = null;
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this.pathname);
    }

    render() {
        if (!this.block) {
            this.block = new this.blockClass({});
            RenderDom(this.props, this.block);
            return;
        }
    }
}
