import { IPaginaHTML } from "../shared/pagina.interface";
import { IPaginaListagem } from "../shared/pagina.listagem.inteface";
import { IRepositorio } from "../shared/repositorio.interface";
import { Contato } from "./models/contato.model";
import { ContatoRepositoryLocalStorage } from "./repositories/contato.repository.local-storage";


class ContatoPaginaListagem implements IPaginaHTML, IPaginaListagem {
        tabela: HTMLTableElement;
        constructor(private repositorioContatos: IRepositorio<Contato>) {
                this.configurarElementos();
                this.atualizarTabela();
        }

        atualizarTabela(): void {
                const contatos = this.repositorioContatos.selecionarTodos();

                let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];
                contatos.forEach(contato => {
                        const novaLinha = corpoTabela.insertRow();
                        Object.values(contato).forEach((valor: any) => {
                                const novaCelula = novaLinha.insertCell();
                                novaCelula.innerText = valor;
                        })
                        const celulaBotoes = novaLinha.insertCell();
                        const btnEditar = document.createElement("button")
                        btnEditar.innerText = "Editar";
                        btnEditar.className = "btnEditar me-2";
                        btnEditar.addEventListener("click", () => {
                                const idSelecionado = contato.id;
                                window.location.href = `contato.create.html?id=${idSelecionado}`;
                        });
                        const btnExcluir = document.createElement("button")
                        btnExcluir.innerText = "Excluir";
                        btnExcluir.className = "btnExcluir";
                        btnExcluir.addEventListener("click", () => {
                                const idSelecionado = contato.id;
                                this.repositorioContatos.excluir(idSelecionado);
                                window.location.reload();
                        })

                        celulaBotoes.appendChild(btnEditar);
                        celulaBotoes.appendChild(btnExcluir);
                })
        }
        configurarElementos(): void {
                this.tabela = document.getElementById("tabelaContatos") as HTMLTableElement
        }

}
new ContatoPaginaListagem(new ContatoRepositoryLocalStorage());
