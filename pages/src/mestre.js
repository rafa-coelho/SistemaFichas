// ------------- Abrir Alterar Atributo
$("body").on("click", ".parametro p", async (e) => {
    const btnParametro = $(e.target);

    const nome = btnParametro.attr("nome");
    const parametro = btnParametro.attr("id");
    const personagem = btnParametro.attr("personagem");
    const valor = btnParametro.attr("valor");

    $("#parametroModal .titulo-parametro").text(nome);
    $("#parametroModal .valor").attr("name", parametro);
    $("#parametroModal .personagem").val(personagem);
    $("#parametroModal .anterior").val(valor);

    $("#parametroModal").modal("show");

    await timeout(500);
    $("#parametroForm .valor").focus();
});

// ------------- Atualizar Parâmetro
$("body").on("submit", "#parametroForm", async (e) => {
    e.preventDefault();

    const personagem = $("#parametroForm .personagem").val();
    const valor = Number($("#parametroForm .anterior").val());


    const parametro = $("#parametroForm .valor").attr("name");
    const novoValor = Number($("#parametroForm .valor").val()) + valor;

    $(`#${parametro}`).attr("valor", novoValor);
    await updatePers({ [parametro]: novoValor }, personagem);
    listPersonagens();

    $("#parametroModal").modal('hide');
    $("#parametroForm .valor").val("");

});

// ------------- Lista Atributos NPC
$("body").on("click", "#npcAtributo", (e) => {
    const btn = $(e.target);
    const personagem = btn.attr("personagem");

    $("#atributoModal .personagem").val(personagem);
    $("#atributoModal").modal("show");
});

// ------------- Rolar Teste Atributo NPC
$("body").on("click", "#atributoModal .atributo", (eAtributo) => {
    const btnAtributo = $(eAtributo.target);

    const nomeAtributo = btnAtributo.attr("nome");
    const personagem = $("#atributoModal .personagem").val();

    $("#atributoModal").modal("hide");


    $.ajax({
        url: `/teste-atributo/${nomeAtributo}?personagem=${personagem}`,
        method: 'GET',
        complete: (res) => {
            const response = res.responseJSON;
            if (response.status === 1) {

                $("#rolagemModal #tituloRolagem").html(`Teste de ${response.data.titulo} <small class="text-muted">(${response.data.modificador})</small> `);
                $("#rolagemModal #valorRolagem").text(response.data.valor);
                $("#rolagemModal #resultadoRolagem").text(response.data.tipo);
                $("#rolagemModal").modal('show');
            }
        }
    });
    $("#rolagemModal").modal('show');
});

// ------------- Lista Atributos NPC
$("body").on("click", "#npcPericia", (e) => {
    const btn = $(e.target);
    const personagem = btn.attr("personagem");

    $("#periciaModal .personagem").val(personagem);
    $("#periciaModal").modal("show");
});

// ------------- Rolar Teste Perícia NPC
$("body").on("click", "#periciaModal .pericia", (eAtributo) => {
    const btn = $(eAtributo.target);
    $("#periciaModal").modal("hide");

    const personagem = $("#periciaModal .personagem").val();
    const nomePericia = btn.attr("nome");

    $.ajax({
        url: `/teste-pericia/${nomePericia}?personagem=${personagem}`,
        method: 'GET',
        complete: (res) => {
            const response = res.responseJSON;
            if (response.status === 1) {
                $("#rolagemModal #tituloRolagem").html(`Teste de ${response.data.titulo} <small class="text-muted">(${response.data.modificador})</small> `);
                $("#rolagemModal #valorRolagem").text(response.data.valor);
                $("#rolagemModal #resultadoRolagem").text(response.data.tipo);
                $("#rolagemModal").modal('show');
            }
        }
    });


    $("#rolagemModal").modal('show');
});

// ------------- Rolar Iniciativa NPC
$("body").on("click", "#periciaModal .iniciativa", (eAtributo) => {
    const btn = $(eAtributo.target);
    $("#periciaModal").modal("hide");

    const personagem = $("#periciaModal .personagem").val();
    const nomePericia = btn.attr("nome");

    $.ajax({
        url: `/iniciativa/${personagem}`,
        method: 'POST',
        complete: (res) => {
            const response = res.responseJSON;
            if (response.status === 1) {

                $("#rolagemModal #tituloRolagem").html(`Iniciativa`);
                $("#rolagemModal #valorRolagem").text(response.data.valor);
                $("#rolagemModal #resultadoRolagem").text("");
                $("#rolagemModal").modal('show');
            }
        }
    });


    $("#rolagemModal").modal('show');
});

// ------------- Lista de Ataques
$("body").on("click", "#npcAtaque", async (e) => {
    const btn = $(e.target);
    const id = btn.attr("personagem");

    $("#ataqueModal .personagem").val(id);
    $("#ataqueModal .adicionar-ataque").attr("personagem", id);

    const index = NPCs.map(x => x.id).indexOf(id);

    if (!Array.isArray(NPCs.find(x => x.id === id).inventario)) {
        NPCs[index] = await getPersonagem(id);
    }

    let html = '';
    for (const ataque of NPCs[index].inventario.ataques) {
        html += `<tr>`;
        html += `    <td>${ataque.nome}</td>`;
        html += `    <td class="pull-right">`;
        html += `        <button personagem="${id}" class="ataque btn btn-xs" formula="${ataque.dano}">Dano</button>`;
        html += `        <button personagem="${id}" ataqueTipo="${ataque.tipo}" ataqueNome="${ataque.nome}" ataqueId="${ataque.id}" ataqueDano="${ataque.dano}" ataquePeso="${ataque.peso}" class="editar-ataque btn btn-xs">`;
        html += `            <i personagem="${id}" ataqueTipo="${ataque.tipo}" ataqueNome="${ataque.nome}" ataqueId="${ataque.id}" ataqueDano="${ataque.dano}" ataquePeso="${ataque.peso}" class="fa fa-pencil"></i>`;
        html += `        </button>`;
        html += `    </td>`;
        html += `</tr>`;
    }

    $("#ataqueModal .ataques").html(html);
    $("#ataqueModal").modal("show");


    // Preencher ataques/magias
});

// ------------- Rolar Ataque
$("body").on("click", "#ataqueModal .ataque", (e) => {

    $.ajax({
        url: `/rolagem/rolar/${$(e.target).attr("formula")}?personagem=${$(e.target).attr("personagem")}&titulo=Dano`,
        method: 'GET',
        complete: (res) => {
            const response = res.responseJSON;
            if (response.status === 1) {
                //`Dano de Ataque`
                $("#rolagemModal #tituloRolagem").html($(e.target).text());
                $("#rolagemModal #valorRolagem").text(response.data.valor);
                $("#rolagemModal #resultadoRolagem").text(response.data.tipo);
                $("#rolagemModal #resultadoRolagem").text("");
                $("#rolagemModal").modal('show');
            }
        }
    });

    $("#ataqueModal").modal("hide");;
});

// ------------- Editar Ataque
$("body").on("click", "#ataqueModal .editar-ataque", async (e) => {

    const ataqueBtn = $(e.target);

    $("#editarAtaqueModal #nomeAtaque").text(ataqueBtn.attr("ataqueNome"));
    $("#editarAtaqueModal .nomeAtaque").val(ataqueBtn.attr("ataqueNome"));
    $("#editarAtaqueModal .pesoAtaque").val(ataqueBtn.attr("ataquePeso"));
    $("#editarAtaqueModal .tipoAtaque").val(ataqueBtn.attr("ataqueTipo"));
    $("#editarAtaqueModal .danoAtaque").val(ataqueBtn.attr("ataqueDano"));
    $("#editarAtaqueModal .idAtaque").val(ataqueBtn.attr("ataqueId"));


    $("#ataqueModal").modal("hide");
    $("#editarAtaqueModal").modal('show');

    await timeout(500);
    $("#editarAtaqueModal .nomeAtaque").focus();
});

// ------------- Excluir Ataque
$("body").on("click", "#editarAtaqueModal .excluir", (e) => {

    if (confirm("Deseja mesmo excluir?")) {
        $.ajax({
            url: `/item/${$("#editarAtaqueModal .idAtaque").val()}`,
            method: "DELETE",
            complete: (res) => {
                if (res.responseJSON.status === 1) {
                    listPersonagens();
                    $("#editarAtaqueModal").modal('hide');
                }
            }
        });
    }
});

// ------------- Editar Ataque - Formulário
$("body").on("submit", "#editarAtaqueForm", (e) => {
    e.preventDefault();

    const data = {
        nome: $("#editarAtaqueModal .nomeAtaque").val(),
        peso: $("#editarAtaqueModal .pesoAtaque").val(),
        tipo: $("#editarAtaqueModal .tipoAtaque").val(),
        dano: $("#editarAtaqueModal .danoAtaque").val()
    };

    $.ajax({
        url: `/item/${$("#editarAtaqueForm .idAtaque").val()}`,
        method: 'PUT',
        dataType: "JSON",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data),
        complete: (res) => {
            if (res.responseJSON.status === 1) {
                listPersonagens();
                $("#editarAtaqueModal").modal('hide');
            }
        }
    });
});

// ------------- CLose Modal
$("body").on("click", ".close-modal", (e) => {
    $(`#${$(e.target).attr("modal")}`).modal('hide');
});

// ------------- Adicionar Ataque
$("body").on("click", "#ataqueModal .adicionar-ataque", async (e) => {
    const personagem = $(e.target).attr("personagem");
    $("#adicionarAtaqueModal .personagem").val(personagem);
    $("#ataqueModal").modal("hide");


    $("#adicionarAtaqueModal").modal('show');
    await timeout(500);
    $("#adicionarAtaqueModal .nome").focus();
});

// ------------- Adicionar Ataque - Formulário
$("body").on("submit", "#adicionarAtaqueModal", (e) => {
    e.preventDefault();

    const personagem = $("#adicionarAtaqueModal .personagem").val();
    const data = {
        nome: $("#adicionarAtaqueModal .nome").val(),
        peso: $("#adicionarAtaqueModal .peso").val(),
        tipo: $("#adicionarAtaqueModal .tipo").val(),
        dano: $("#adicionarAtaqueModal .dano").val(),
        personagem: personagem,
    };

    $.ajax({
        url: `/item`,
        method: 'POST',
        dataType: "JSON",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data),
        complete: (res) => {
            if (res.responseJSON.status === 1) {
                listPersonagens();
                $("#adicionarAtaqueModal").modal('hide');
            }
        }
    });






    $("#adicionarAtaqueModal").modal('hide');
});


// ------------- Adicionar NPC
$("body").on('click', ".adicionar-npc", (e) => {
    const btnNovoNpc = $(e.target);
    $("#adicionarNpcModal").modal("show");
});

// ------------- Adicionar NPC - Formulário 
$("body").on("submit", "#adicionarNpcForm", (e) => {
    e.preventDefault();

    const data = {
        nome: $("#adicionarNpcModal .nome").val(),
        hp: $("#adicionarNpcModal .hp").val(),
        hp_maximo: $("#adicionarNpcModal .hp").val(),
        sanidade: $("#adicionarNpcModal .sanidade").val(),
        sanidade_maxima: $("#adicionarNpcModal .sanidade").val(),
        forca: $("#adicionarNpcModal .forca").val(),
        destreza: $("#adicionarNpcModal .destreza").val(),
        constituicao: $("#adicionarNpcModal .constituicao").val(),
        inteligencia: $("#adicionarNpcModal .inteligencia").val(),
        sabedoria: $("#adicionarNpcModal .sabedoria").val(),
        carisma: $("#adicionarNpcModal .carisma").val(),
        npc: 1
    };

    $.ajax({
        url: "/personagem",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data),
        complete: (request) => {
            const response = request.responseJSON;

            if(response.status == 1){
                listPersonagens();
                $("#adicionarNpcModal").modal("hide");
            }else{
                alert(response.errors[0].msg);
            }

        }
    });

    // Envia NPC
    
});

// ------------- Rolar Dado
$("body").on("click", ".btn-dado.formula", async (e) => {
    const btnDado = $(e.target);
    const dado = await rolarDadoFormula(btnDado.attr("formula"));
    
    $("#rolagemModal #tituloRolagem").html(btnDado.text());
    $("#rolagemModal #valorRolagem").text(dado.valor);
    $("#rolagemModal #resultadoRolagem").text('');
    $("#rolagemModal #resultadoRolagem").text('');
    $("#rolagemModal").modal('show');
});

// ------------- Rolar Dado - Loucura
$("body").on("click", ".btn-loucura", (e) => {
    const btnLoucura = $(e.target);

    $.ajax({
        url: `/rolagem/loucura/${btnLoucura.attr("tipo")}`,
        method: 'GET',
        complete: (request) => {
            const response = request.responseJSON;

            if(response.status === 1){
                $("#loucuraModal #tituloLoucura").html(`Insanidade ${response.data.titulo}`);
                $("#loucuraModal #valorRolagem").text(response.data.valor);
                $("#loucuraModal #descricaoLoucura").text(response.data.loucura);
                $("#loucuraModal").modal('show');
            }
        }
    });

});

// ------------- Limpar Iniciativa
$("body").on("click", ".limpar-iniciativa", (e) => {
    $.ajax({
        url: '/iniciativa',
        method: 'DELETE',
        complete: () => {
            $(".lista-iniciativa").html("");
        }
    });
});

// ------------- Limpar Rolagens
$("body").on("click", "#limparRolagens", (e) => {
    $.ajax({
        url: '/rolagem',
        method: 'DELETE',
        complete: () => {
            $("#listaRolagens").html("");
        }
    });
});

// ------------- Excluir NPC
$("body").on("click", ".excluir-npc", (e) => {
    const btn = $(e.target);

    if(confirm(`Deseja realmente excluir "${btn.attr("personagemNome")}"?`)){
        $.ajax({
            url: `/personagem/${btn.attr("personagem")}`,
            method: "DELETE",
            complete: () => {
                listPersonagens();
            }
        });
    }
});