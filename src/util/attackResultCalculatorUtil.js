
let RedDiceModelClass = require("../model/dice/redDiceModel.js");
let BlueDiceModelClass = require("../model/dice/blueDiceModel.js");
let GreenDiceModelClass = require("../model/dice/greenDiceModel.js");
let YellowDiceModelClass = require("../model/dice/yellowDiceModel.js");
let BlackDiceModelClass = require("../model/dice/blackDiceModel.js");
let WhiteDiceModelClass = require("../model/dice/whiteDiceModel.js");

let DeploymentCardsTypeUtilClass = require("./deploymentCardsTypesUtil.js");

module.exports = {
    rollDice: function(attackDice, defenseDice)
    {
        let defenseDiceTypes = DeploymentCardsTypeUtilClass.getDefenseDiceTypes();
        let attackDiceTypes = DeploymentCardsTypeUtilClass.getAttackDiceTypes();
        
        let dicePool = {};
        dicePool[attackDiceTypes.RED] = new RedDiceModelClass();
        dicePool[attackDiceTypes.BLUE] = new BlueDiceModelClass();
        dicePool[attackDiceTypes.GREEN] = new GreenDiceModelClass();
        dicePool[attackDiceTypes.YELLOW] = new YellowDiceModelClass();
        dicePool[defenseDiceTypes.BLACK] = new BlackDiceModelClass();
        dicePool[defenseDiceTypes.WHITE] = new WhiteDiceModelClass();

        let combinedAttackResults = {damage: 0, surge: 0, distance: 0};
        for (let i = 0; i < attackDice.length; ++i)
        {
            let rollResult = dicePool[attackDice[i]].rollDice();
            console.log("Attack roll result " + i + ":" + rollResult.damage + " " + rollResult.surge + " " + rollResult.distance);
            combinedAttackResults.damage += rollResult.damage;
            combinedAttackResults.surge += rollResult.surge;
            combinedAttackResults.distance += rollResult.distance;
        }
    
        let combinedDefenseResults = {damage: 0, surge: 0, evade: false};
        for (let i = 0; i < defenseDice.length; ++i)
        {
            let rollResult = dicePool[defenseDice[i]].rollDice();
            console.log("Defense roll result " + i + ":" + rollResult.damage + " " + rollResult.surge + " " + rollResult.distance);
            combinedDefenseResults.damage += rollResult.damage;
            combinedDefenseResults.surge += rollResult.surge;
            combinedDefenseResults.evade = rollResult.evade || combinedDefenseResults.evade;
        }

        return {
            damage: Math.max(combinedAttackResults.damage - combinedDefenseResults.damage, 0),
            surge: Math.max(combinedAttackResults.surge - combinedDefenseResults.surge, 0),
            //surge: 0,
            distance: combinedAttackResults.distance,
            evaded: combinedDefenseResults.evade
        };
    },

    evaluateRangeAttack: function(attackResults, requiredDistance, targetedModel)
    {
        // now the result
        if (attackResults.evaded)
        {
            console.log("Attack Evaded");
        }

        if (attackResults.distance < requiredDistance)
        {
            console.log("Attack out of range. Dist: " + combinedAttackResults.distance + " Required Distance: " + requiredDistance);
        }

        return attackResults.damage;
    }
};