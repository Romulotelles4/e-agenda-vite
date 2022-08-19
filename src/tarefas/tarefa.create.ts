import { IPaginaFormulario } from "../shared/pagina.create.interface";
import { IPaginaHTML } from "../shared/pagina.interface";
import { IRepositorio } from "../shared/repositorio.interface";
import { Prioridade } from "./models/prioridade.enum";
import { Tarefa } from "./models/tarefa.model";
import { TarefaRepositoryLocalStorage } from "./repositories/tarefas.repository.local-storage";


class TarefaPaginaCadastro implements IPaginaHTML, IPaginaFormulario {
        private txtTitulo: HTMLInputElement;
        private txtDescricao: HTMLInputElement;
        private rdbPrioridade: HTMLInputElement;
        private btnInserir: HTMLButtonElement;

        private idSelecionado: string;

        constructor(private repositorioTarefas: IRepositorio<Tarefa>, id?: string) {
                this.configurarElementos();

                if (id) {
                        this.idSelecionado = id;
                        const tarefaSelecionada = this.repositorioTarefas.selecionarPorId(id);
                        if (tarefaSelecionada)
                                this.preencherFormulario(tarefaSelecionada);
                }
        }
        private preencherFormulario(tarefaSelecionada: Tarefa) {
                this.txtTitulo.value = tarefaSelecionada.titulo;
                this.txtDescricao.value = tarefaSelecionada.descricao;

                switch (tarefaSelecionada.prioridade) {
                        case Prioridade.Baixa:
                                this.rdbPrioridade = document.querySelector("input[value='Baixa']") as HTMLInputElement;
                                break;
                        case Prioridade.Média:
                                this.rdbPrioridade = document.querySelector("input[value='Média']") as HTMLInputElement;
                                break;
                        case Prioridade.Alta:
                                this.rdbPrioridade = document.querySelector("input[value='Alta']") as HTMLInputElement;
                                break;
                }
                this.rdbPrioridade.checked = true;
        }

        configurarElementos(): void {
                this.txtTitulo = document.getElementById("txtTitulo") as HTMLInputElement;
                this.txtDescricao = document.getElementById("txtDescricao") as HTMLInputElement;
                this.btnInserir = document.getElementById("btnInserir") as HTMLButtonElement;

                this.btnInserir.addEventListener("click", (_evt) => this.gravarRegistros());
        }

        gravarRegistros(): void {
                const tarefa = this.obterDadosFormulario();
                if (!this.idSelecionado)
                        this.repositorioTarefas.inserir(tarefa);
                else
                        this.repositorioTarefas.editar(tarefa.id, tarefa)
                window.location.href = "tarefa.list.html"
        }

        private obterDadosFormulario(): Tarefa {

                const titulo = this.txtTitulo.value;
                const descricao = this.txtDescricao.value;
                const prioridade = this.obterPrioridadeSelecionada();
                let tarefa = null;

                if (!this.idSelecionado)
                        tarefa = new Tarefa(titulo, descricao, prioridade);

                else
                        tarefa = new Tarefa(titulo, descricao, prioridade, this.idSelecionado)

                return tarefa;
        }
        obterPrioridadeSelecionada(): Prioridade {
                this.rdbPrioridade = document.querySelector("input[type='radio']:checked") as HTMLInputElement;
                return this.rdbPrioridade.value as Prioridade;
        }
}
const params = new URLSearchParams(window.location.search);
const id = params.get("id") as string;
new TarefaPaginaCadastro(new TarefaRepositoryLocalStorage(), id);