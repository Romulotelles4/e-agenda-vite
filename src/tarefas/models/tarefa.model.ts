import { EntidadeBase } from "../../shared/entidade.model";
import { Prioridade } from "./prioridade.enum";


export class Tarefa extends EntidadeBase {
        public titulo: string;
        public descricao: string;
        public dataCriacao: Date;
        public prioridade: Prioridade;

        constructor(titulo: string, descricao: string, prioridade: Prioridade, id?: string) {
                super();
                if (id)
                        this.id = id;
                this.titulo = titulo;
                this.descricao = descricao;
                this.dataCriacao = new Date();
                this.prioridade = prioridade;
        }

}
