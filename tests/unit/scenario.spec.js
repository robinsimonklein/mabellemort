import scenario from '../../src/datas.json'


// Vérifie qu'il n'y a pas plusieurs fois la même valeur dans un tableau
function hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}
// Tableau de tous les IDs des noeuds du scénario
const keysArray = [];
for(let [key] of Object.entries(scenario)){
  keysArray.push(key);
}

// Test que les éléments du scénario ne contiennent pas plusieurs fois le même ID
describe('Duplication d\'IDs dans le scénario', () => {
  it('ne doit pas avoir de doubles', () => {
    expect (hasDuplicates(keysArray)).toBe(false);
  });
});
/*
// Test que tous les atributs next des noeuds du scénario mènent à un noeud existant
describe('Duplication d\'IDs dans le scénario', () => {
  it('ne doit pas avoir de doubles', () => {
    const keysArray = [];
    for(let [key] of Object.entries(scenario)){
      keysArray.push(key);
    }
    expect (hasDuplicates(keysArray)).toBe(false);
  });
});

 */