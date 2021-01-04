class Personagem extends Classes
{

    static table = 'personagem';
    static fields = [ 'id', 'nome', 'raca', 'classe', 'nivel', 'hp', 'hp_maximo', 'sanidade', 'sanidade_maxima', 'forca', 'destreza', 'constituicao', 'inteligencia', 'sabedoria', 'carisma', 'dado_vida' ];

    static calcularModificador = (valor) => {
        let repeat = [ ];
        let modificador = -5;
        for(let i = 1; i < valor; i++){
            repeat.push(modificador)
            
            if(repeat.filter(x => x === modificador).length == 2 || modificador === -5){

                modificador = modificador + 1;
            }
        }
        
        return modificador;
    }
    
    static calcularProficiencia = (valor) => {
        let repeat = [ ];
        let proficiencia = 2;
        for(let i = 1; i <= valor; i++){
            repeat.push(proficiencia)
            
            if(repeat.filter(x => x === proficiencia).length == 4 || proficiencia === -5){
                proficiencia = proficiencia + 1;
            }
        }
        
        return proficiencia;
    }

}

module.exports = Personagem;