const urlParams = new URLSearchParams(window.location.search);
    const personagemId = urlParams.get('personagem');
    const personagem = {};

    const pericias = [
        { nome: "Acrobacia", label: "acrobacia", atributo: "destreza" },
        { nome: "Arcanismo", label: "arcanismo", atributo: "inteligencia" },
        { nome: "Atletismo", label: "atletismo", atributo: "forca" },
        { nome: "Atuação", label: "atuacao", atributo: "carisma" },
        { nome: "Blefar", label: "blefar", atributo: "carisma" },
        { nome: "Furtividade", label: "furtividade", atributo: "destreza" },
        { nome: "História", label: "historia", atributo: "inteligencia" },
        { nome: "Intimidação", label: "intimidacao", atributo: "carisma" },
        { nome: "Intuição", label: "intuicao", atributo: "sabedoria" },
        { nome: "Investigação", label: "investigacao", atributo: "inteligencia" },
        { nome: "Lidar com Animais", label: "lidar-com-animais", atributo: "sabedoria" },
        { nome: "Medicina", label: "medicina", atributo: "sabedoria" },
        { nome: "Natureza", label: "natureza", atributo: "inteligencia" },
        { nome: "Percepção", label: "percepcao", atributo: "sabedoria" },
        { nome: "Persuasão", label: "persuasao", atributo: "carisma" },
        { nome: "Prestidigitação", label: "prestidigitacao", atributo: "destreza" },
        { nome: "Religião", label: "religiao", atributo: "inteligencia" },
        { nome: "Sobrevivência", label: "sobrevivencia", atributo: "sabedoria" },
    ];

    const getPers = () => {

        $.ajax({
            url: `/personagem/${personagemId}?completo=true`,
            method: 'GET',
            complete: (res) => {
                const response = res.responseJSON;
                if (response.status === 1) {
                    const pers = response.data;

                    $("#nomePers").text(pers.nome);

                    $("#hp_bar").attr("style", `width: ${(pers.hp / pers.hp_maximo) * 100}%`);
                    $("#hp_bar").attr("aria-valuemax", pers.hp_maximo);
                    $("#hp_bar").attr("aria-valuenow", pers.hp);
                    $("#hp_bar").text(`${pers.hp}/${pers.hp_maximo}`);

                    $("#sanidade_bar").attr("style", `width: ${(pers.sanidade / pers.sanidade_maxima) * 100}%`);
                    $("#sanidade_bar").attr("aria-valuemax", pers.sanidade_maxima);
                    $("#sanidade_bar").attr("aria-valuenow", pers.sanidade);
                    $("#sanidade_bar").text(`${pers.sanidade}/${pers.sanidade_maxima}`);

                    $("#hp").text(`${pers.hp}/${pers.hp_maximo}`);
                    $("#hp").attr("valor", pers.hp);
                    $("#hp").attr("max", pers.hp_maximo);

                    $("#editarPersonagemForm .nome").val(pers.nome);
                    $("#editarPersonagemForm .nivel").val(pers.nivel);
                    $("#editarPersonagemForm .hp").val(pers.hp_maximo);
                    $("#editarPersonagemForm .sanidade").val(pers.sanidade_maxima);
                    $("#editarPersonagemForm .forca").val(pers.forca);
                    $("#editarPersonagemForm .destreza").val(pers.destreza);
                    $("#editarPersonagemForm .constituicao").val(pers.constituicao);
                    $("#editarPersonagemForm .inteligencia").val(pers.inteligencia);
                    $("#editarPersonagemForm .sabedoria").val(pers.sabedoria);
                    $("#editarPersonagemForm .carisma").val(pers.carisma);


                    $("#sanidade").text(`${pers.sanidade}/${pers.sanidade_maxima}`);
                    $("#sanidade").attr("valor", pers.sanidade);
                    $("#sanidade").attr("max", pers.sanidade_maxima);

                    $("#pc").text(pers.pc);
                    $("#pc").attr("valor", pers.pc);
                    $("#pp").text(pers.pp);
                    $("#pp").attr("valor", pers.pp);
                    $("#pe").text(pers.pe);
                    $("#pe").attr("valor", pers.pe);
                    $("#po").text(pers.po);
                    $("#po").attr("valor", pers.po);
                    $("#pl").text(pers.pl);
                    $("#pl").attr("valor", pers.pl);



                    $(`.atributo .forca p`).text(pers.forca);
                    $(`.atributo .forca p`).attr("valor", pers.forca);
                    $(`.atributo .forca p`).attr("atributo", 'forca');

                    $(`.atributo .destreza p`).text(pers.destreza);
                    $(`.atributo .destreza p`).attr("valor", pers.destreza);
                    $(`.atributo .destreza p`).attr("atributo", 'destreza');

                    $(`.atributo .constituicao p`).text(pers.constituicao);
                    $(`.atributo .constituicao p`).attr("valor", pers.constituicao);
                    $(`.atributo .constituicao p`).attr("atributo", 'constituicao');

                    $(`.atributo .inteligencia p`).text(pers.inteligencia);
                    $(`.atributo .inteligencia p`).attr("valor", pers.inteligencia);
                    $(`.atributo .inteligencia p`).attr("atributo", 'inteligencia');

                    $(`.atributo .sabedoria p`).text(pers.sabedoria);
                    $(`.atributo .sabedoria p`).attr("valor", pers.sabedoria);
                    $(`.atributo .sabedoria p`).attr("atributo", 'sabedoria');

                    $(`.atributo .carisma p`).text(pers.carisma);
                    $(`.atributo .carisma p`).attr("valor", pers.carisma);
                    $(`.atributo .carisma p`).attr("atributo", 'carisma');

                    $(`.atributo .sanidade p`).text(pers.sanidade);
                    $(`.atributo .sanidade p`).attr("valor", pers.sanidade);
                    $(`.atributo .sanidade p`).attr("atributo", 'sanidade');

                    let htmlAtaque = '';
                    for (const ataque of pers.inventario.ataques) {

                        htmlAtaque += `<tr>`;
                        htmlAtaque += `    <td>${ataque.nome}</td>`;
                        htmlAtaque += `    <td>${ataque.dano}</td>`;
                        htmlAtaque += `    <td class="pull-right">`;
                        htmlAtaque += `        <button formula="${ataque.dano}" class="ataque btn" style="background-color: #BD3424;color: #FEECC8">Dano</button>`;
                        htmlAtaque += `        <button ataqueTipo="${ataque.tipo}" ataqueNome="${ataque.nome}" ataqueId="${ataque.id}" ataqueDano="${ataque.dano}" ataquePeso="${ataque.peso}" class="editar-ataque btn" style="background-color: #BD3424;color: #FEECC8">`;
                        htmlAtaque += `            <i ataqueTipo="${ataque.tipo}" ataqueNome="${ataque.nome}" ataqueId="${ataque.id}" ataqueDano="${ataque.dano}" ataquePeso="${ataque.peso}" class="fa fa-pencil"></i>`;
                        htmlAtaque += `        </button>`;
                        htmlAtaque += `    </td>`;
                        htmlAtaque += `</tr>`;
                    }

                    $(".ataques").html(htmlAtaque);


                    let htmlInventario = '';
                    for (const item of pers.inventario.itens) {
                        htmlInventario += `<tr>`;
                        htmlInventario += `    <td>${item.quantidade}</td>`;
                        htmlInventario += `    <td>${item.nome}</td>`;
                        htmlInventario += `    <td>${item.peso}kg</td>`;
                        htmlInventario += `    <td>`;
                        htmlInventario += `        <button itemNome="${item.nome}" itemId="${item.id}" itemQuantidade="${item.quantidade}" itemPeso="${item.peso}" class="btn btn-small btn-round editar-item" style="background-color: #BD3424; color: #FEECC8;">`;
                        htmlInventario += `            <i itemNome="${item.nome}" itemId="${item.id}" itemQuantidade="${item.quantidade}" itemPeso="${item.peso}" class="fa fa-pencil"></i>`;
                        htmlInventario += `        </button>`;
                        htmlInventario += `    </td>`;
                        htmlInventario += `</tr>`;

                    }
                    $(".lista-inventario").html(htmlInventario);

                    $("#peso").text(` (${pers.inventario.peso} kg)`);

                    let htmlPericia = '';

                    for (const pericia of pericias) {
                        htmlPericia += `<li class="list-group-item">`;
                        htmlPericia += `     <div class="row">`;
                        htmlPericia += `         <div class="col-8 d-flex justify-content-center align-items-center">`;
                        htmlPericia += `             <span style="color: #BD3424;font-weight: bold;font-size: 20px;">${pericia.nome}</h4>`;
                        htmlPericia += `         </div>`;
                        htmlPericia += `         <div class="col-4 pull-right">`;
                        htmlPericia += `             <button nome="${pericia.label}" class="pericia btn col-12" style="background-color: #BD3424;color: #FEECC8">Rolar</button>`;
                        htmlPericia += `         </div>`;
                        htmlPericia += `     </div>`;
                        htmlPericia += `</li>`;

                    }
                    $(".lista-pericias").html(htmlPericia);



                } else {
                    document.location.href = '/';
                }

            }
        });
    };

    const updatePers = (data) => {
        $.ajax({
            url: `/personagem/${personagemId}`,
            method: 'PUT',
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(data),
            complete: (res) => {
                if (res.responseJSON.status === 1) {
                    getPers();
                }
            }
        });
    };


    $(() => {

        getPers();

        $(".parametro").on("click", (e) => {
            const nomeParametro = $(e.target).attr("id");
            const tituloParametro = $(e.target).attr("name");
            const minParametro = $(e.target).attr("valor");
            const maxParametro = $(e.target).attr("max");

            $("#parametroModal #tituloParametro").text(tituloParametro);
            $("#parametroModal #valor").attr("name", nomeParametro);

            $("#parametroModal").modal('show');
            setTimeout(() => {
                $("#parametroModal #valor").focus();
            }, 500);

        });

        $("#parametroForm").on("submit", (e) => {
            e.preventDefault();

            const param = $("#parametroForm #valor").attr('name');
            let valor = Number($(`#${param}`).attr("valor"));
            let novoValor = Number($("#parametroForm #valor").val()) + valor;

            $(`#${param}`).attr("valor", novoValor);
            updatePers({ [param]: novoValor });

            $("#parametroModal").modal('hide');
            $("#parametroForm #valor").val("");
        });

        $(".atributo p").on("click", (e) => {
            const nomeAtributo = $(e.target).attr("atributo");
            const valorAtributo = $(e.target).attr("valor");

            $.ajax({
                url: `/teste-atributo/${nomeAtributo}?personagem=${personagemId}`,
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

        });

        $("body").on("click", ".pericia", (e) => {
            const nomePericia = $(e.target).attr("nome");

            $.ajax({
                url: `/teste-pericia/${nomePericia}?personagem=${personagemId}`,
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
        });

        $("body").on("click", ".ataque, .dado", (e) => {

            $.ajax({
                url: `/rolagem/rolar/${$(e.target).attr("formula")}?personagem=${personagemId}&titulo=${$(e.target).text()}`,
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
        });

        $("body").on("click", "button.editar-item", (e) => {
            const itemBtn = $(e.target);

            $("#nomeItem").text(itemBtn.attr("itemNome"));
            $("#itemNome").val(itemBtn.attr("itemNome"));
            $("#itemPeso").val(itemBtn.attr("itemPeso").replace(/\D+/g, ''));
            $("#itemQuantidade").val(itemBtn.attr("itemQuantidade").replace(/\D+/g, ''));
            $("#itemModal").modal('show');
            $("#itemNome").focus();

            $("#itemForm").on("submit", (e) => {
                e.preventDefault();

                const data = {
                    nome: $("#itemNome").val(),
                    peso: $("#itemPeso").val(),
                    quantidade: $("#itemQuantidade").val()
                };

                $.ajax({
                    url: `/item/${itemBtn.attr("itemId")}`,
                    method: 'PUT',
                    dataType: "JSON",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify(data),
                    complete: (res) => {
                        if (res.responseJSON.status === 1) {
                            getPers();
                            $("#itemModal").modal('hide');
                        }
                    }
                });
            });

            $("#itemForm .excluir").on("click", (e) => {
                if (confirm("Deseja mesmo excluir?")) {
                    $.ajax({
                        url: `/item/${itemBtn.attr("itemId")}`,
                        method: "DELETE",
                        complete: (res) => {
                            if (res.responseJSON.status === 1) {
                                getPers();
                                $("#itemModal").modal('hide');
                            }
                        }
                    });
                }
            });

        });

        $("body").on("click", "button.adicionar-ataque", (e) => {
            $("#novoAtaqueModal").modal('show');
            $("#novoAtaqueModal .nome").focus();

            $("#novoAtaqueForm").on("submit", (eForm) => {
                eForm.preventDefault();

                const data = {
                    nome: $("#novoAtaqueModal .nome").val(),
                    peso: $("#novoAtaqueModal .peso").val(),
                    tipo: $("#novoAtaqueModal .tipo").val(),
                    dano: $("#novoAtaqueModal .dano").val(),
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
                            getPers();
                            $("#novoAtaqueModal").modal('hide');
                        }
                    }
                });

            });
        });

        $("body").on("click", "button.editar-ataque", (e) => {
            const itemBtn = $(e.target);

            $("#editarAtaqueModal .nome").val(itemBtn.attr("ataqueNome"));
            $("#editarAtaqueModal .peso").val(itemBtn.attr("ataquePeso").replace(/\D+/g, ''));
            $("#editarAtaqueModal .dano").val(itemBtn.attr("ataqueDano"));
            $("#editarAtaqueModal .tipo").val(itemBtn.attr("ataqueTipo"));
            $("#editarAtaqueModal").modal('show');
            $("#editarAtaqueModal .nome").focus();

            $("#editarAtaqueForm").on("submit", (e) => {
                e.preventDefault();

                const data = {
                    nome: $("#editarAtaqueModal .nome").val(),
                    peso: $("#editarAtaqueModal .peso").val(),
                    tipo: $("#editarAtaqueModal .tipo").val(),
                    dano: $("#editarAtaqueModal .dano").val()
                };

                $.ajax({
                    url: `/item/${itemBtn.attr("ataqueId")}`,
                    method: 'PUT',
                    dataType: "JSON",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify(data),
                    complete: (res) => {
                        if (res.responseJSON.status === 1) {
                            getPers();
                            $("#editarAtaqueModal").modal('hide');
                        }
                    }
                });
            });

            $("#editarAtaqueModal .excluir").on("click", (e) => {
                if (confirm("Deseja mesmo excluir?")) {
                    $.ajax({
                        url: `/item/${itemBtn.attr("ataqueId")}`,
                        method: "DELETE",
                        complete: (res) => {
                            if (res.responseJSON.status === 1) {
                                getPers();
                                $("#editarAtaqueModal").modal('hide');
                            }
                        }
                    });
                }
            });


        });

        $("body").on("click", "button.adicionar-item", (e) => {
            $("#adicionarItemModal").modal('show');
            $("#adicionarItemModal .nome").focus();

            $("#adicionarItemForm").on("submit", (eForm) => {
                eForm.preventDefault();

                const data = {
                    nome: $("#adicionarItemModal .nome").val(),
                    peso: $("#adicionarItemModal .peso").val(),
                    tipo: 1,
                    quantidade: $("#adicionarItemModal .quantidade").val(),
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
                            getPers();
                            $("#adicionarItemModal").modal('hide');
                        }
                    }
                });

            });
        });

        $(".iniciativa").on("click", (e) => {
            $.ajax({
                url: `/iniciativa/${personagemId}`,
                method: 'POST',
                complete: (res) => {
                    if (res.responseJSON.status === 1) {
                        const response = res.responseJSON;
                        $("#rolagemModal #tituloRolagem").html(`Iniciativa`);
                        $("#rolagemModal #valorRolagem").text(response.data.valor);
                        $("#rolagemModal #resultadoRolagem").text(response.data.tipo);
                        $("#rolagemModal").modal('show');
                    }
                }
            });
        });

        $("#editarPersonagem").on("click", (e) => {
            $("#editarPersonagemModal").modal('show');
        });

        $("body").on("click", "#editarPersonagemModal .close-modal", (e) => {
            $("#editarPersonagemModal").modal('hide');
        });

        $("#editarPersonagemForm").on("submit", (e) => {
            e.preventDefault();
            const data = {
                nome: $("#editarPersonagemForm .nome").val(),
                nivel: $("#editarPersonagemForm .nivel").val(),
                hp_maximo: $("#editarPersonagemForm .hp").val(),
                sanidade_maxima: $("#editarPersonagemForm .sanidade").val(),
                forca: $("#editarPersonagemForm .forca").val(),
                destreza: $("#editarPersonagemForm .destreza").val(),
                constituicao: $("#editarPersonagemForm .constituicao").val(),
                inteligencia: $("#editarPersonagemForm .inteligencia").val(),
                sabedoria: $("#editarPersonagemForm .sabedoria").val(),
                carisma: $("#editarPersonagemForm .carisma").val(),
            };

            $.ajax({
                url: `/personagem/${personagemId}`,
                method: 'PUT',
                dataType: 'JSON',
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify(data),
                complete: (request) => {
                    const response = request.responseJSON;

                    if(response.status == 1){
                        getPers();
                    }

                    $("#editarPersonagemModal").modal('hide');
                }
            });
        });

    });