window.NPCs = [];
window.IniciativaLength = 0;
const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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

const listarIniciativa = () => {
    $.ajax({
        url: `/iniciativa`,
        method: 'GET',
        complete: (request) => {
            const response = request.responseJSON;

            if(response.status === 1){
                
                if(response.data.length !== IniciativaLength){
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
                }
                
                timeout(3000);
                listarIniciativa();
            }
        }
    });
};



$(() => {
    listPersonagens();
    listarIniciativa();
});