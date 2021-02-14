var obj = [
    {
        id: "BM",
        price: "25.50",
        count: 1
    },
    {
        id: "CN",
        price: "10.00",
        count: 1
    },
]
var cart = []

function add(param, id) {

    let found = obj.find(element => element.id == id);
    if (param) {
        found.count++;
        document.getElementById('qnt' + id).value = found.count;
        document.getElementById('price' + id).value = (found.price * found.count).toFixed(2);
    } else {
        if (found.count > 1) {
            found.count--;
            document.getElementById('qnt' + id).value = found.count;
            document.getElementById('price' + id).value = ((document.getElementById('price' + id).value) - Number(found.price)).toFixed(2);
        }
    }
}

function addCart(id) {
    window.alert('adicionado ao carrinho!')
    let found = obj.find(element => element.id == id);
    cart.push(found)
    var novaArr = cart.filter(function (este, i) {
        return cart.indexOf(este) === i;
    });
    console.log(novaArr);

}