import store from '../../src/store.js'


// Vérifie qu'il n'y a pas plusieurs fois la même valeur dans un tableau
function hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}
// Tableau de tous les IDs des noeuds du scénario
const keysArray = [];
for(let [key] of Object.entries(store.state.scenario)){
  keysArray.push(key);
}

// Test que les éléments du scénario ne contiennent pas plusieurs fois le même ID
describe('Duplication d\'IDs dans le scénario', () => {
  it('ne doit pas avoir de doubles', () => {
    expect (hasDuplicates(keysArray)).toBe(false);
  });
});


// Test que tous les atributs next des noeuds du scénario mènent à un noeud existant
describe('Tous les noeuds peuvent s\'enchaîner', () => {
  it('leur ID suivant doit exister', () => {
    const unreachables = [];

    for(let [key, value] of Object.entries(store.state.scenario)){
      switch(value.component.toLowerCase()) {
        case 'end':
          break;
        case 'usercardscontainer':
        case 'user-cards-container':
        case 'popup':
        case 'colorpalette':
        case 'color-palette':
          if(value.data.choices){
            value.data.choices.forEach((choice) => {
              if (!keysArray.includes(choice.next)) {
                unreachables.push([key, choice.next]);
              }
            });
          }else{
            unreachables.push(key);
          }
          break;
        case 'canvasdraw':
        case 'canvas-draw':
          if(value.data.next){
            for(let [nextKey, nextValue] of Object.entries(value.data.next)){
              if(!keysArray.includes(nextValue)){
                unreachables.push([key, nextKey, nextValue])
              }
            }
          }else{
            unreachables.push(key);
          }
          break;
        default:
          if(value.next){
            if(value.next.priority){
              if (!keysArray.includes(value.next.priority)) {
                unreachables.push([key, value.next.priority]);
              }
              if (!keysArray.includes(value.next.default)) {
                unreachables.push([key, value.next.default]);
              }
            }else {
              if (!keysArray.includes(value.next)) {
                unreachables.push(key);
                break;
              }
            }
          }else{
            unreachables.push(key);
            break;
          }
          break;
      }
    }
    expect(unreachables).toEqual([]);
  });
});
