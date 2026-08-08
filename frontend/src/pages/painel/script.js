let dataAtual = new Date();
let diaSelecionado = null;
let tarefasDoMes = {};

const monthLabel = document.getElementById("monthLabel");
const grid = document.getElementById("grid");
const overlay = document.getElementById("overlay");
const panelDate = document.getElementById("panelDate");
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

function chave(data) {
    return data.toISOString().split("T")[0];
}

async function buscarTarefasDoMes() {
    const mes = dataAtual.getMonth() + 1;
    const ano = dataAtual.getFullYear();

    const resposta = await fetch(`/tarefas?mes=${mes}&ano=${ano}`);
    const lista = await resposta.json();

    tarefasDoMes = {};
    lista.forEach(t => {
        if (!tarefasDoMes[t.data]) tarefasDoMes[t.data] = [];
        tarefasDoMes[t.data].push(t);
    });
}

function renderListaMes() {
    const lista = document.getElementById("monthTaskList");
    lista.innerHTML = "";

    const todasTarefas = [];
    Object.keys(tarefasDoMes).forEach(data => {
        tarefasDoMes[data].forEach(t => todasTarefas.push({ ...t, data }));
    });

    todasTarefas.sort((a, b) => a.data.localeCompare(b.data));

    if (todasTarefas.length === 0) {
        lista.innerHTML = '<li class="empty-msg">Nenhuma tarefa cadastrada esse mês.</li>';
        return;
    }

    todasTarefas.forEach(t => {
        const li = document.createElement("li");
        li.className = t.tipo;

        const dataFormatada = new Date(t.data + "T00:00:00").toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit"
        });

        const dataSpan = document.createElement("span");
        dataSpan.className = "task-date";
        dataSpan.textContent = dataFormatada;
        li.appendChild(dataSpan);

        const tituloSpan = document.createElement("span");
        tituloSpan.className = "task-title";
        tituloSpan.textContent = t.titulo;
        li.appendChild(tituloSpan);

        lista.appendChild(li);
    });
}

async function renderCalendario() {
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();

    monthLabel.textContent = dataAtual.toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric"
    });

    await buscarTarefasDoMes();
    renderListaMes();

    grid.innerHTML = "";

    const primeiroDia = new Date(ano, mes, 1).getDay();
    const totalDias = new Date(ano, mes + 1, 0).getDate();
    const hoje = chave(new Date());

    for (let i = 0; i < primeiroDia; i++) {
        const vazio = document.createElement("div");
        vazio.className = "day empty";
        grid.appendChild(vazio);
    }

    for (let dia = 1; dia <= totalDias; dia++) {
        const data = new Date(ano, mes, dia);
        const key = chave(data);

        const celula = document.createElement("div");
        celula.className = "day" + (key === hoje ? " today" : "");

        const numero = document.createElement("div");
        numero.className = "day-number";
        numero.textContent = dia;
        celula.appendChild(numero);

        const tagsContainer = document.createElement("div");
        tagsContainer.className = "day-tags";

        const tarefasDoDia = tarefasDoMes[key] || [];
        tarefasDoDia.forEach(t => {
            const tag = document.createElement("span");
            tag.className = "tag " + t.tipo;
            tagsContainer.appendChild(tag);
        });
        celula.appendChild(tagsContainer);

        celula.addEventListener("click", () => abrirPainel(data));
        grid.appendChild(celula);
    }
}

function abrirPainel(data) {
    diaSelecionado = data;
    const key = chave(data);

    panelDate.textContent = data.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long"
    });

    renderTarefas(key);
    overlay.classList.remove("hidden");
    document.getElementById("taskTitle").focus();
}

function renderTarefas(key) {
    taskList.innerHTML = "";
    const lista = tarefasDoMes[key] || [];

    lista.forEach(t => {
        const li = document.createElement("li");
        li.className = t.tipo;

        const texto = document.createElement("span");
        texto.textContent = t.titulo;
        li.appendChild(texto);

        const remover = document.createElement("button");
        remover.textContent = "Remover";
        remover.addEventListener("click", async () => {
            await fetch(`/tarefas/${t.id}`, { method: "DELETE" });
            await renderCalendario();
            renderTarefas(key);
        });
        li.appendChild(remover);

        taskList.appendChild(li);
    });
}

taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const titulo = document.getElementById("taskTitle").value.trim();
    const tipo = document.getElementById("taskType").value;
    const repetir = document.getElementById("taskRepeat").checked;

    if (!titulo || !diaSelecionado) return;

    const datasParaCriar = [];

    if (repetir) {
        const diaSemana = diaSelecionado.getDay();
        const ano = dataAtual.getFullYear();
        const mes = dataAtual.getMonth();
        const totalDias = new Date(ano, mes + 1, 0).getDate();

        for (let dia = 1; dia <= totalDias; dia++) {
            const data = new Date(ano, mes, dia);
            if (data.getDay() === diaSemana) {
                datasParaCriar.push(chave(data));
            }
        }
    } else {
        datasParaCriar.push(chave(diaSelecionado));
    }

    for (const data of datasParaCriar) {
        await fetch("/tarefas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data, titulo, tipo })
        });
    }

    taskForm.reset();
    await renderCalendario();
    renderTarefas(chave(diaSelecionado));
});

document.getElementById("closePanel").addEventListener("click", () => {
    overlay.classList.add("hidden");
});

overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.add("hidden");
});

document.getElementById("prevMonth").addEventListener("click", () => {
    dataAtual.setMonth(dataAtual.getMonth() - 1);
    renderCalendario();
});

document.getElementById("nextMonth").addEventListener("click", () => {
    dataAtual.setMonth(dataAtual.getMonth() + 1);
    renderCalendario();
});

renderCalendario();