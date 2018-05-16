let RuleEngine = require('json-rules-engine');
let readlineSync = require('readline-sync');

let engine = new RuleEngine.Engine();

//------------------------------------------------------------------
// Question rules
//------------------------------------------------------------------
engine.addRule( new RuleEngine.Rule({
    conditions: { 
        all: [
            { fact: 'q1', operator: 'equal', value: 'null' }
        ]
    },
    event: {
        type: 'question', params: { value: 'q1' }
    },
    priority: 3
}));
//------------------------------------------------------------------
engine.addRule( new RuleEngine.Rule({
    conditions: { 
        all: [
            { fact: 'q1', operator: 'equal', value: 'n' },
            { fact: 'q2', operator: 'equal', value: 'null' }
        ]
    },
    event: {
        type: 'question', params: { value: 'q2' }
    },
    priority: 2
}));
//------------------------------------------------------------------
// Decision rules
//------------------------------------------------------------------
engine.addRule( new RuleEngine.Rule({
    conditions: { 
        all: [
            { fact: 'q1', operator: 'equal', value: 's' }
        ]
    },
    event: {
        type: 'decision', params: { value: 'd1' }
    },
    priority: 1
}));
//------------------------------------------------------------------
engine.addRule( new RuleEngine.Rule({
    conditions: { 
        all: [
            { fact: 'q1', operator: 'equal', value: 'n' },
            { fact: 'q2', operator: 'equal', value: 'n' }
        ]
    },
    event: {
        type: 'decision', params: { value: 'd2' }
    },
    priority: 1
}));
//------------------------------------------------------------------
engine.addRule( new RuleEngine.Rule({
    conditions: { 
        all: [
            { fact: 'q1', operator: 'equal', value: 'n' },
            { fact: 'q2', operator: 'equal', value: 's' }
        ]
    },
    event: {
        type: 'decision', params: { value: 'd3' }
    },
    priority: 1
}));
//------------------------------------------------------------------

engine.on('success', function (event, almanac) {

    if (event.type === 'question') {
        var answer = '';
        while (questions[event.params.value].valid_values.indexOf(answer) === -1) {
            answer = readlineSync.question(questions[event.params.value].text);
        }
        almanac.addRuntimeFact(event.params.value, answer);
    }

    if (event.type === 'decision') {
        console.log('Decisão: ' + decisions[event.params.value].text);
    }
});

var facts = {
    q1: 'null',
    q2: 'null'
};

engine
    .run(facts)
    .then(function (events) {
        events.map(function (event) {
            //return console.log(event);
        });
    });
    


var questions = {
    q1: { text: 'vai chover (s/n)?', valid_values: [ 's', 'n' ] },
    q2: { text: 'vai fazer frio (s/n)?', valid_values: [ 's', 'n' ] }
};

var decisions = {
    d1: { text: 'não sair de casa' },
    d2: { text: 'sair tranquilo' },
    d3: { text: 'levar um casaco' }
};

console.log('---------------------------------------------------------');
console.log('Bem vindo ao sistema de apoio a decisão baseado em regras');
console.log('---------------------------------------------------------');
