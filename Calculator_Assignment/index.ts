#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { sum } from "./add.js";
import { subtract } from "./subtract.js";
import { divide } from "./divide.js";
import { multiply } from "./multiply.js";

const sleep = ()=>{
    return new Promise((res)=>{
        setTimeout(res, 2000);
    })
}

async function welcome(){
    let rainbowTitle = chalkAnimation.radar('Lets Start Calculation');
    await sleep();
    rainbowTitle.stop();
    startLoop();
}

async function askQuestion(){

    let answer = await inquirer.prompt([
    {
        type:"list",
        name:"operator",
        message: chalk.cyanBright("Please select which operation you want to perform? \n"),
        choices:["+ Addition","- Subtraction","* Multiplication","/ Division"]
    },
    {
        type:"number",
        name:"num1",
        message: chalk.blueBright("Enter first number: ")
    },
    {
        type:"number",
        name:"num2",
        message: chalk.blueBright("Enter second number: ")
    }
  ])
    switch(answer.operator){
        case "+ Addition": {
            console.log(chalk.blue(`${answer.num1} + ${answer.num2} = ${sum(answer.num1, answer.num2)}`));
            break;
        }
        case "- Subtraction": {
            console.log(chalk.blue(`${answer.num1} - ${answer.num2} = ${subtract(answer.num1, answer.num2)}`));
            break;
        }
        case "* Multiplication": {
            console.log(chalk.blue(`${answer.num1} x ${answer.num2} = ${multiply(answer.num1, answer.num2)}`));
            break;
        }
        case "/ Division": {
            console.log(chalk.blue(`${answer.num1} / ${answer.num2} = ${divide(answer.num1, answer.num2)}`));
            break;
        }
        default: {
            console.log("Default code.");
            break;
        }
    }
}

async function startLoop(){
    do{
        await askQuestion();
        var again = await inquirer.prompt([
          {
            type:"list",
            name:"restart",
            choices:['Yes', 'No'],
            message: chalk.yellowBright("Do you want to continue: ")
          }
        ])
    }while(again.restart == 'Yes');
}

welcome();
