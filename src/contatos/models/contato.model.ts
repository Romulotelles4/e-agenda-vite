import { EntidadeBase } from "../../shared/entidade.model";


export class Contato extends EntidadeBase {
        public nome: string;
        public telefone: string;
        public email: string;
        public empresa: string;
        public cargo: string;

        constructor(nome: string, telefone: string, email: string, empresa: string, cargo: string, id?: string) {
                super();
                if (id)
                        this.id = id;
                this.nome = nome;
                this.telefone = telefone;
                this.email = email;
                this.empresa = empresa;
                this.cargo = cargo;

        }


}