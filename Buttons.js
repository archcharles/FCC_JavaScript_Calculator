import React from 'react';
import './Buttons.css';

const Buttons = () => {
    const [inputExpression, setInputExpression] = React.useState("");
    const [outputValue, setOutputValue] = React.useState("0");

    const clickAllClearHandler = () => {
        setInputExpression("");
        setOutputValue("0");
    }

    const clickPadHandler = (input) => {
        // Replace initial "0" state of output-value
        if (outputValue === "0") {
            setOutputValue(input);
            setInputExpression(input);
        }
        // Disallow repeated zeros in input-expression
        else if (input === "0" & outputValue === "0") {
            setOutputValue("0");
            setInputExpression((previousInput) => 
                previousInput
                .split("")
                .slice(0, previousInput.length - 2)
                .join("")
                + input
            );
        }
        // WHEN INPUT IS A NON-OPERATOR
        else if (!/[\/\*\+\-]/.test(input)) {
            // Remove sign in output-value
            if (outputValue === "/" | outputValue === "*" | outputValue === "+" |  outputValue === "-") {
                setOutputValue(input);
                setInputExpression((previousInput) => previousInput + input);
            }
            // Max dot (decimal) in input MUST be one
            else if (/\./.test(input) && /\./.test(outputValue)) {
                input = "";
            }
            // Join input to previous input.
            else {
                setOutputValue((previousOutput) => previousOutput + input);
                setInputExpression((previousInput) => previousInput + input);
            }
        }
        // WHEN INPUT IS AN OPERATOR: Do further validations
        else if (/[\/\*\+\-]/.test(input)) {
            if (inputExpression[inputExpression.length - 1] === "=") {
                setInputExpression(outputValue + input);
                setOutputValue(input);
            }
            else {
                // On single operator entry:
                if (/[\/\*\+\-]/.test(input) & !/[\/\*\+\-]/.test(outputValue[outputValue.length - 1])) {
                    setOutputValue(input);
                    setInputExpression((previousInput) => previousInput + input);
                }
                // On double [\/\*\+] operator entries
                else if (/[\/\*\+]/.test(input) & /[\/\*\+]/.test(outputValue[outputValue.length - 1])) {
                    setOutputValue(input);
                    setInputExpression((previousInput) => 
                        previousInput
                        .split("")
                        .slice(0, previousInput.length - 1)
                        .join("")
                        + input
                    );
                }
                else if (/[\/\*\+]/.test(input) & /\-/.test(outputValue[outputValue.length - 1])) {
                    // Check triple operator entries
                    if (/[\/\*\+]/.test(inputExpression[inputExpression.length - 2])) {
                        setOutputValue(input);
                        setInputExpression((previousInput) => 
                            previousInput
                            .split("")
                            .slice(0, previousInput.length - 2)
                            .join("")
                            + input
                        );
                    }
                    else {
                        setOutputValue(input);
                        setInputExpression((previousInput) => 
                            previousInput
                            .split("")
                            .slice(0, previousInput.length - 1)
                            .join("")
                            + input
                        );
                    }
                }
                else if (/\-/.test(input) & /[\/\*\+]/.test(outputValue[outputValue.length - 1])) {
                    setOutputValue(input);
                    setInputExpression((previousInput) => previousInput + input);
                }
                else if (/\-/.test(input) & /\-/.test(outputValue[outputValue.length - 1])) {
                    setOutputValue(input);
                    setInputExpression((previousInput) => 
                        previousInput
                        .split("")
                        .slice(0, previousInput.length - 1)
                        .join("")
                        + input
                    );
                }
            }
        }
    }

    // Evaluate (calculate) input-expression
    const clickEqualToHandler = () => {        
        setOutputValue(eval(inputExpression));
        setInputExpression((previousInput) => previousInput + "=");
    }

    return (
        <div className="container">
            <div className="calculator-container">
                <div className='display-container'>
                    <div className="input-display" bg-color="black">{inputExpression}</div>
                    <div className="output-display" id="display" bg-color="black">{outputValue}</div>
                </div>
                <div className="pad-container">
                    <div className="pad clr tomato" id="clear" onClick={clickAllClearHandler}>AC</div>
                    <div className="pad div" id="divide" value={"/"} onClick={() => clickPadHandler("/")}>/</div>
                    <div className="pad mult" id="multiply" value={"*"} onClick={() => clickPadHandler("*")}>x</div>
                    <div className="pad sevev dark-gray" id="seven" value={"7"} onClick={() => clickPadHandler("7")}>7</div>
                    <div className="pad eight dark-gray" id="eight" value={"8"} onClick={() => clickPadHandler("8")}>8</div>
                    <div className="pad nine dark-gray" id="nine" value={"9"} onClick={() => clickPadHandler("9")}>9</div>
                    <div className="pad sub" id="subtract" value={"-"} onClick={() => clickPadHandler("-")}>-</div>
                    <div className="pad four dark-gray" id="four" value={"4"} onClick={() => clickPadHandler("4")}>4</div>
                    <div className="pad five dark-gray" id="five" value={"5"} onClick={() => clickPadHandler("5")}>5</div>
                    <div className="pad six dark-gray" id="six" value={"6"} onClick={() => clickPadHandler("6")}>6</div>
                    <div className="pad add" id="add" value={"+"} onClick={() => clickPadHandler("+")}>+</div>
                    <div className="pad one dark-gray" id="one" value={"1"} onClick={() => clickPadHandler("1")}>1</div>
                    <div className="pad two dark-gray" id="two" value={"2"} onClick={() => clickPadHandler("2")}>2</div>
                    <div className="pad three dark-gray" id="three" value={"3"} onClick={() => clickPadHandler("3")}>3</div>
                    <div className="pad equals blue" id="equals" value={"="} onClick={clickEqualToHandler}>=</div>
                    <div className="pad zero dark-gray" id="zero" value={"0"} onClick={() => clickPadHandler("0")}>0</div>
                    <div className="pad point dark-gray" id="decimal" value={"."} onClick={() => clickPadHandler(".")}>.</div>
                </div>
            </div>
        </div>
    );
}

export default Buttons;
