var _ = require('lodash');

//String functions.

const myString = "you don't know things you should. And know more things you shouldn't know";
console.log(_.snakeCase("sony bravia 51 inch tv"));
console.log(_.kebabCase("sonyBravia51InchTv")); 
console.log(_.truncate(myString, {length: 20}));
console.log(_.truncate(myString, {length: 30, separator: ' '}));
console.log(_.truncate(myString, {length: 30, separator: ' ', omission:'[Mais]'}));
console.log(_.startCase("foo-fighters"));
console.log(_.escape("<b>some text</b>"));

//Array Functions.

var list = [
    { year: 2022, month: 3 },
    { year: 2020, month: 5 },
    { year: 2018, month: 12},
    { year: 2016, month: 1 },
    { year: 2014, month: 9 },
    { year: 2012, month: 11},
    { year: 2010, month: 4 }
]

var WOL = [
    { name: "Cloud Strife",         job: "Mystic Knight",   active: true,  age: 21  },
    { name: "Barret Wallace",       job: "Gunner",          active: true,  age: 35  },
    { name: "Tifa Lockheart",       job: "Monk",            active: true,  age: 20  },
    { name: "Aerith Gainsborough",  job: "White Mage",      active: false, age: 22  },
    { name: "Red XIII",             job: "Beast",           active: true,  age: 48  },
    { name: "Yuffie Kisaragi",      job: "Ninja",           active: true,  age: 16  },
    { name: "Cait Sith",            job: "Gambler",         active: true,  age: 0   },
    { name: "Vincent Valentine",    job: "Horror-Terror",   active: true,  age: 57  },
    { name: "Cid Highwind",         job: "Dragoon",         active: true,  age: 32  }
]

//#1 Separa arrays por grupos
console.log(_.chunk(['a', 'b', 'c', 'd'], 2));

//#2 Mostra em que index está o item passado pelo parâmetro.
console.log(_.findIndex(list, function (o) { return o.year === 2012 }));
console.log(_.findIndex(list, ['year', 2014]));
console.log(_.findIndex(list, o => o.year < 2016));

//#3 Descobre, pela lógica, onde o parâmetro passado deveria estar dentro do array.
console.log(_.sortedIndex([10, 20, 30], 15));
console.log(_.sortedIndex(['a', 'b', 'c'], 'd'));

//#4 Separar os itens de um array, começando de cima, e parando no primeiro item indicado no parâmetro.
console.log(_.takeWhile(WOL, i => i.active)); 
console.log(_.takeWhile(WOL, ['active'], false));

//#5 Receber apenas 1 de cada item no caso de repetição.
console.log(_.uniq([1,2,2,2,2,3,3,3,4,4,5]));
console.log(_.uniq(['a','a','b','c','c','c','d','d']));

//Useful Functions
console.log("\n")
var movie = {name: "Shutter Island"}
function number(){
    return Math.random() * 100;
}

//_.assign - adiciona propriedades a um objeto.
var assign = _.assign({year: 2010, rating: "R"}, movie) 
console.log(assign)

var times = _.times(3, number);
console.log(times);

//_.debounce() - executa uma função após um determinado tempo desde que ela foi executada.

// function search() {
//     // chamada ajax
//     console.log('Searching ...');
// }
// var inputSearch = document.getElementById('search');
// inputSearch.addEventListener('keyup', _.debounce(search, 800));


//_.find - retorna o objeto em um array com o mesmo parâmetro passado.
var find = _.find(WOL, o => o.name === 'Vincent Valentine');
console.log(find);

//_.filter - retorna um array de objetos que batem com a condição passada.
var filter = _.filter(WOL, o => o.age > 22);
console.log(filter);

//_.forEach - semelhante á forma nativa, porém serve tanto pra arrays quanto pra objetos
var Cloud = { name: "Cloud Strife",         job: "Mystic Knight",   active: true,  age: 21  } 
_.forEach(Cloud, o => {
    console.log(o)
})

//_.map - facilita muito na hora de mapear variváveis específicas em Arrays
var map = _.map(WOL, 'name');
console.log(map)

//_.first() - pega o primeiro item de um Array
var first = _.first(WOL);
console.log(first);

//_.last() - pega o último item de um Array
var last = _.last(WOL);
console.log(last);





