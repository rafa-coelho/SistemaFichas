window.NPCs = [];
window.IniciativaLength = 0;

const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const formatedData = (data) => {
    if (Number(data)) {

        if (data <= 0) {
            return false;
        }

        const date = new Date(Number(data * 1000));
        return `${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
    }

    const date = new Date(data);
    return `${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
};

const SecondsAgo = (num) => {
    var date = new Date();
    date.setHours(date.getHours(), date.getMinutes(), date.getSeconds() - num, date.getMilliseconds());
    return (date.getTime() / 1000) | 0;
};

const listPersonagens = () => {

    $.ajax({
        url: `/personagem?where=npc=1`,
        method: 'GET',
        complete: (request) => {
            const response = request.responseJSON;

            if (response.status === 1) {
                const personagens = response.data;

                let html = '';

                for (const personagem of personagens) {
                    html += `<div class="card">`;
                    html += `    <div class="card-body">`;
                    html += `        <h3 class="card-title text-center">${personagem.nome}</h3>`;
                    html += `        <div class="row">`;
                    html += `            <div class="col-6 text-center parametro">`;
                    html += `                <h5>HP</h5>`;
                    html += `                <p id="hp" parametro="hp" nome="HP" valor="${personagem.hp}" personagem="${personagem.id}">${personagem.hp}/${personagem.hp_maximo}</p>`;
                    html += `            </div>`;
                    html += `            <div class="col-6 text-center parametro">`;
                    html += `                <h5>Sanidade</h5>`;
                    html += `                <p id="sanidade" parametro="sanidade" nome="Sanidade" valor="${personagem.sanidade}" personagem="${personagem.id}">${personagem.sanidade}/${personagem.sanidade_maxima}</p>`;
                    html += `            </div>`;
                    html += `        </div>`;
                    html += `        <div class="row acoes">`;
                    html += `            <div class="col-4">`;
                    html += `                <button personagem="${personagem.id}" id="npcAtributo" class="btn">Atributo</button>`;
                    html += `            </div>`;
                    html += `            <div class="col-4">`;
                    html += `                <button personagem="${personagem.id}" id="npcPericia" class="btn">Perícia</button>`;
                    html += `            </div>`;
                    html += `            <div class="col-4">`;
                    html += `                <button personagem="${personagem.id}" id="npcAtaque" class="btn">Ataque</button>`;
                    html += `            </div>`;
                    html += `        </div>`;
                    html += `    </div>`;
                    html += `</div>`;
                }


                $(".personagens").html(html);
                NPCs = personagens;
            }


        }
    });

};

const getPersonagem = (id) => {
    return new Promise(resolve => {
        $.ajax({
            url: `/personagem/${id}?completo=true`,
            method: 'GET',
            complete: (res) => {
                const response = res.responseJSON;
                if (response.status === 1) {
                    const pers = response.data;
                    resolve(pers)
                }
            }
        });
    });
};

const updatePers = (data, personagem) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/personagem/${personagem}`,
            method: 'PUT',
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(data),
            complete: (res) => {
                if (res.responseJSON.status === 1) {
                    resolve(true);
                }
            }
        });
    })
};

const rolarDadoFormula = (formula, personagem = '') => {
    return new Promise(resolve => {
        $.ajax({
            url: `/rolagem/rolar/${formula}?personagem=${personagem}`,
            method: 'GET',
            complete: (res) => {
                const response = res.responseJSON;
                if (response.status === 1) {
                    resolve(response.data);
                }
            }
        });
    });
}

const listarIniciativa = async () => {
    $.ajax({
        url: `/iniciativa`,
        method: 'GET',
        complete: async (request) => {
            const response = request.responseJSON;

            if(response.status === 1){
                
                let htmlIniciativa = '';

                for (const iniciativa of response.data) {
                    htmlIniciativa += `<li class="list-group-item d-flex align-items-center iniciativa-personagem">`;
                    htmlIniciativa += `    <div class="row w-100">`;
                    htmlIniciativa += `        <div class="col-6">`;
                    htmlIniciativa += `            <span class="nome">${iniciativa.personagem.nome}</span>`;
                    htmlIniciativa += `        </div>`;
                    htmlIniciativa += `        <div class="col-6" style="text-align: right;">`;
                    htmlIniciativa += `            <span class="valor">${iniciativa.valor}</span>`;
                    htmlIniciativa += `        </div>`;
                    htmlIniciativa += `    </div>`;
                    htmlIniciativa += `</li>`;
                }
                
                $(".lista-iniciativa").html(htmlIniciativa);
                
                
                await timeout(3000);
                listarIniciativa();
            }
        }
    });
};

const listarRolagens = async (timestamp = '') => {
    $.ajax({
        url: `/rolagem?timestamp=${timestamp}`,
        method: 'GET',
        complete: async (request) => {
            timestamp = SecondsAgo(2);
            const response = request.responseJSON;

            if(response.status === 1){

                if(response.data.length > 0){
                    for (const rolagem of response.data) {
                        let htmlRolagem = '';                   
                        htmlRolagem += `<li class="list-group-item d-flex align-items-center rolagem">`;
                        htmlRolagem += `    <div class="container-fluid pt-2 w-100" style="padding-right: 0px;padding-left: 0px;">`;
                        htmlRolagem += `        <div class="row w-100 text-center">`;
                        htmlRolagem += `            <h5 class="nome-personagem">${rolagem.personagem.nome}</h5>`;
                        htmlRolagem += `        </div>`;
                        htmlRolagem += `        <div class="row w-100 text-center">`;
                        htmlRolagem += `            <div class="col-12">`;
                        htmlRolagem += `                <img src="/media/d20.png" alt="D20" class="img-responsive" style="width: 50px">`;
                        htmlRolagem += `                <h2 class="valor-rolagem">${rolagem.valor}</h2>`;
                        htmlRolagem += `                <h5 class="resultado-rolagem gold">${rolagem.tipo ? rolagem.tipo : ''}</h5>`;
                        htmlRolagem += `            </div>                                        `;
                        htmlRolagem += `        </div>`;
                        htmlRolagem += `        <div class="row w-100 text-center" style="min-height: 20px">`;
                        htmlRolagem += `            <label class="atributo"> ${rolagem.titulo || ""} ${rolagem.modificador ? `<small class="text-muted"> (${rolagem.modificador}) </small>` : '' }</label>`;
                        htmlRolagem += `        </div>`;
                        htmlRolagem += `        <div class="row w-100" style="min-height: 20px; text-align: right">`;
                        htmlRolagem += `            <small class="pull-right">${formatedData(rolagem.data)} </small>`;
                        htmlRolagem += `        </div>`;
                        htmlRolagem += `    </div>`;
                        htmlRolagem += `</li>`;
                        $("#listaRolagens").append(htmlRolagem);
                    }
                    
                    await timeout(500);
                    var element = document.getElementById("listaRolagens");
                    element.scrollTop = element.scrollHeight;
                }

            }
            
            await timeout(3000);
            listarRolagens(timestamp);
        }
    });
};

$(() => {
    listPersonagens();
    listarIniciativa();
    listarRolagens();
});