export {};

declare global {
    interface Window {
        goToPage: (name: string) => void;
        onShowModal: (param: string) => void;
        modalClose: () => void;
        selectChat: (id: string) => void;
        openBox: (context: Event, boxId:string | null = null) => void ;
        onDelete: (e: Event) => void;
        onAdd: (e: Event) => void;
        showEditBlocks: (str: string) => boolean;
    }
}
