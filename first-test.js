let RuleEngine = require('json-rules-engine');
let engine = new RuleEngine.Engine();
/*
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else {
    console.log(`You pressed the "${str}" key`);
    console.log();
    console.log(key);
    console.log();
  }
});
console.log('Press any key...');
*/

//---------------------------
// Question rules
//---------------------------
engine.addRule( new RuleEngine.Rule({
    conditions: { 
        all: [
            { fact: 'q1', operator: 'equal', value: 'null' }
        ]
    },
    event: {
        type: 'question', params: { value: 'q1' }
    }
}));
/*
engine.addRule( new RuleEngine.Rule({
    conditions: { 
        all: [
            { fact: 'q1', operator: 'equal', value: 's' },
            { fact: 'q2', operator: 'equal', value: 'null' }
        ]
    },
    event: {
        type: 'question', params: { value: 'q2' }
    }
}));
*/
engine.on('success', function (event, engine) {

    if (event.type === 'question') {
        console.log('vou fazer uma pergunta aqui.');
        doQuestion(event.params.value);
    }

    console.log('Success event:\n', event);
});

var facts = {
    q1: 'null'
};

engine
    .run(facts)
    .then(function (events) {
        events.map(function (event) { return console.log(event.params.message); });
    });


    
function doQuestion(question) {


}






var questions = {
    q1: 'pergunta 1 (s/n)?',
    q2: 'pergunta 2 (s/n)?',
};

console.log('sucesso!');