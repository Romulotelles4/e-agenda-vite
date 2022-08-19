import { IPaginaFormulario } from "../shared/pagina.create.interface";
import { IPaginaHTML } from "../shared/pagina.interface";
import { IRepositorio } from "../shared/repositorio.interface";
import { Contato } from "./models/contato.model";
import { ContatoRepositoryLocalStorage } from "./repositories/contato.repository.local-storage";



class ContatoPaginaCadastro implements IPaginaFormulario, IPaginaHTML {
        private txtNome: HTMLInputElement;
        private txtTelefone: HTMLInputElement;
        private txtEmail: HTMLInputElement;
        private txtEmpresa: HTMLInputElement;
        private txtCargo: HTMLInputElement;
        private btnInserir: HTMLButtonElement;
        private idSelecionado: string;

        constructor(private repositorioContatos: IRepositorio<Contato>, id?: string) {
                this.configurarElementos();

                if (id) {
                        this.idSelecionado = id;
                        const contatoSelecionado = this.repositorioContatos.selecionarPorId(id);
                        if (contatoSelecionado)
                                this.preencherFormulario(contatoSelecionado);
                }
        }
        private preencherFormulario(contatoSelecionado: Contato) {
                this.txtNome.value = contatoSelecionado.nome;
                this.txtTelefone.value = contatoSelecionado.telefone;
                this.txtEmail.value = contatoSelecionado.email;
                this.txtEmpresa.value = contatoSelecionado.empresa;
                this.txtCargo.value = contatoSelecionado.cargo;
        }

        configurarElementos(): void {
                this.txtNome = document.getElementById("txtNome") as HTMLInputElement;
                this.txtTelefone = document.getElementById("txtTelefone") as HTMLInputElement;
                this.txtEmail = document.getElementById("txtEmail") as HTMLInputElement;
                this.txtEmpresa = document.getElementById("txtEmpresa") as HTMLInputElement;
                this.txtCargo = document.getElementById("txtCargo") as HTMLInputElement;
                this.btnInserir = document.getElementById("btnInserirContato") as HTMLButtonElement;

                this.btnInserir.addEventListener("click", (_evt) => this.gravarRegistros());
        }

        gravarRegistros(): void {
                const contato = this.obterDadosFormulario();
                if (!this.idSelecionado)
                        this.repositorioContatos.inserir(contato);
                else
                        this.repositorioContatos.editar(contato.id, contato)
                window.location.href = "contato.list.html"
        }

        private obterDadosFormulario(): Contato {
                const nome = this.txtNome.value;
                const telefone = this.txtTelefone.value;
                const email = this.txtEmail.value;
                const empresa = this.txtEmpresa.value;
                const cargo = this.txtCargo.value;

                let contato = null;

                if (!this.idSelecionado)
                        contato = new Contato(nome, telefone, email, empresa, cargo);

                else
                        contato = new Contato(nome, telefone, email, empresa, cargo, this.idSelecionado)

                return contato;
        }

}
const params = new URLSearchParams(window.location.search);
const id = params.get("id") as string;
new ContatoPaginaCadastro(new ContatoRepositoryLocalStorage(), id);

