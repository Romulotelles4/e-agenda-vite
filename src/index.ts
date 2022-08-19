import { IPaginaHTML } from "./shared/pagina.interface.js";

class index implements IPaginaHTML {
        btnTarefa: HTMLButtonElement;
        constructor() {
                this.configurarElementos();
        }

        public configurarElementos(): void {

        }
}
new index();