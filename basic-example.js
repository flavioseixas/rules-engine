"use strict";
exports.__esModule = true;
var json_rules_engine_1 = require("json-rules-engine");
/**
 * Setup a new engine
 */
var engine = new json_rules_engine_1.Engine();
// define a rule for detecting the player has exceeded foul limits.  Foul out any player who:
// (has committed 5 fouls AND game is 40 minutes) OR (has committed 6 fouls AND game is 48 minutes)
engine.addRule({
    conditions: {
        any: [{
            all: [{
                fact: 'gameDuration',
                operator: 'equal',
                value: 40
            }, {
                fact: 'personalFoulCount',
                operator: 'greaterThanInclusive',
                value: 5
            }]
        }, {
            all: [{
                fact: 'gameDuration',
                operator: 'equal',
                value: 48
            }, {
                fact: 'personalFoulCount',
                operator: 'greaterThanInclusive',
                value: 6
            }]
        }]
    },
    event: {
        type: 'fouledOut',
        params: {
            message: 'Player has fouled out!'
        }
    }
});
/**
 * Define facts the engine will use to evaluate the conditions above.
 * Facts may also be loaded asynchronously at runtime; see the advanced example below
 */
var facts = {
    personalFoulCount: 6,
    gameDuration: 40
};
// Run the engine to evaluate
engine
    .run(facts)
    .then(function (events) {
        events.map(function (event) { return console.log(event.params.message); });
    });
/*
 * Output:
 *
 * Player has fouled out!
 */
