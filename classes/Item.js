class Item extends Classes
{
    static table = "item";
    static fields = [ 'id', 'personagem', 'nome', 'quantidade', 'peso', 'tipo', 'dano' ];
}

module.exports = Item;