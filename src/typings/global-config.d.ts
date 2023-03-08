export {};

declare global {
    interface window {
        goToPage: (name: string) => void;
        onShowModal: (param: string) => void;
        modalClose: () => void;
        selectChat: (id: string) => void;
        openBox: (context: event, boxid:string | null = null) => void ;
        onDelete: (e: event) => void;
        onAdd: (e: event) => void;
        showEditBlocks: (str: string) => boolean;
        history: () => any;
    }
}
