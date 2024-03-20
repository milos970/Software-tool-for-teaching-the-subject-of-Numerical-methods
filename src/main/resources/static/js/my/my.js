
function getById(id)
{
    let el = document.getElementById(id);
    if (!el)
    {
        throw new ReferenceError(id + " is not defined");
    }
    return el;
}

let fun = "";






let selectedCategory = 0;
let selectedMethod = 0;
function selectNumericCategory(category)
{
    document.getElementById("methods-calculation-div").style.display = "block";
    document.getElementById("graph-calculation-div").style.display = "block";
    selectedCategory = category;
    setUpElements(category, 1);
}

function setUpElements(category, method)
{

    switch(category)
    {
        case 1:
            selectNonLinearMethod(method);
            break;

        case 2:
            selectIntegrationMethod(method);
            break;

        case 3:

            selectApproximationAndInterpolationMethod(method);
            break;

    }
}

function hideAllNonLinearElements()
{
    document.getElementById("lower-bound-div").style.display="none";
    document.getElementById("upper-bound-div").style.display="none";
    document.getElementById("initial-value-div").style.display="none";
    document.getElementById("equation-div").style.display="none";
    document.getElementById("tolerance-div").style.display="none";
    document.getElementById("non-linear-dropdown-div").style.display="none";
}

function hideAllIntegrationElements()
{
    document.getElementById("lower-bound-div").style.display="none";
    document.getElementById("upper-bound-div").style.display="none";
    document.getElementById("subintervals-div").style.display="none";
    document.getElementById("function-div").style.display="none";

    document.getElementById("integration-dropdown-div").style.display="none";
}

function hideAllApproximationElements()
{
    document.getElementById("nodes-string-div").style.display="none";
    document.getElementById("nodes-csv-div").style.display="none";
    document.getElementById("functions-dropdown-div").style.display="none";

    document.getElementById("approximation-dropdown-div").style.display="none";
}





function selectNonLinearMethod(value)
{
    hideAllIntegrationElements();
    hideAllApproximationElements();

    const dropDownButton = document.getElementById("dropdownMenuButton1");

    document.getElementById("lower-bound-input").value = "";
    document.getElementById("upper-bound-input").value = "";

    document.getElementById("result-input").value = "";

    const nonLinearDropdownDiv = document.getElementById("non-linear-dropdown-div");
    nonLinearDropdownDiv.style.display="block";

    const lowerBoundDivElement = document.getElementById("lower-bound-div");
    const upperBoundDivElement = document.getElementById("upper-bound-div");

    const initialValueDivElement = document.getElementById("initial-value-div");
    const equationDiv = document.getElementById("equation-div");
    equationDiv.style.display="block";

    const toleranceDiv = document.getElementById("tolerance-div");

    $("#table tr").remove();


    switch (value)
    {
        case 1:
            dropDownButton.innerHTML = "Newtonová metóda";

            lowerBoundDivElement.style.display = "none";
            upperBoundDivElement.style.display = "none";

            initialValueDivElement.style.display = "block";
            toleranceDiv.style.display="block";
            selectedMethod = 1;
            break;
        case 2:
            dropDownButton.innerHTML = "Regula falsi";

            initialValueDivElement.style.display = "none";

            lowerBoundDivElement.style.display = "block";
            upperBoundDivElement.style.display = "block";
            selectedMethod = 2;
            break;
        case 3:
            dropDownButton.innerHTML = "Bisekcia";


            initialValueDivElement.style.display = "none";

            lowerBoundDivElement.style.display = "block";
            upperBoundDivElement.style.display = "block";

            selectedMethod = 3;
            break;
    }



}





function selectApproximationAndInterpolationMethod(value)
{
    hideAllNonLinearElements();
    hideAllIntegrationElements();

    const approximationDropdownDiv = document.getElementById("approximation-dropdown-div");
    approximationDropdownDiv.style.display="block";

    const nodesStringDiv = document.getElementById("nodes-string-div");
    const nodesCsvDiv = document.getElementById("nodes-csv-div");

    document.getElementById("result-input").value = "";
    const functionsDropdownDiv = document.getElementById("functions-dropdown-div");

    $("#table tr").remove();
    switch (value)
    {
        case 1:
            document.getElementById("dropdownMenuButton3").innerHTML = "Lagrangeov polynóm";
            nodesStringDiv.style.display = "block";
            nodesCsvDiv.style.display = "block";

            functionsDropdownDiv.style.display="none";

            selectedMethod = 1;
            break;
        case 2:
            document.getElementById("dropdownMenuButton3").innerHTML = "Newtonov polynóm";
            nodesStringDiv.style.display = "block";
            nodesCsvDiv.style.display = "block";

            functionsDropdownDiv.style.display="none";

            selectedMethod = 2;
            break;
        case 3:
            document.getElementById("dropdownMenuButton3").innerHTML = "Metóda najmenších štvorcov";
            nodesStringDiv.style.display = "block";
            nodesCsvDiv.style.display = "block";

            functionsDropdownDiv.style.display="block";


            selectedMethod = 3;
            break;
    }

}





function selectIntegrationMethod(value)
{
    hideAllNonLinearElements();
    hideAllApproximationElements();

    const integrationDropdownDiv = document.getElementById("integration-dropdown-div");
    integrationDropdownDiv.style.display="block";

    const lowerBoundDivElement = document.getElementById("lower-bound-div");
    const upperBoundDivElement = document.getElementById("upper-bound-div");

    const functionDiv = document.getElementById("function-div");
    functionDiv.style.display="block";

    lowerBoundDivElement.style.display = "block";
    upperBoundDivElement.style.display = "block";
    $("#table tr").remove();
    const subintervalsDiv = document.getElementById("subintervals-div");

    document.getElementById("initial-value-input").value = "";
    document.getElementById("lower-bound-input").value = "";
    document.getElementById("upper-bound-input").value = "";

    document.getElementById("result-input").value = "";

    switch (value)
    {
        case 1:
            document.getElementById("dropdownMenuButton2").innerHTML = "Lichobežníková metóda";

            subintervalsDiv.style.display = "block";
            selectedMethod = 1;
            break;
        case 2:
            document.getElementById("dropdownMenuButton2").innerHTML = "Simpsonová metóda";


            subintervalsDiv.style.display = "block";
            selectedMethod = 2;
            break;
    }

}

















function calculate()
{
    switch(selectedCategory) {
        case 1:
            calculateNonLinearMethod();
            break;
        case 2:
            calculateIntegrationMethod();
            break;
        case 3:
            calculateApproximationMethod();

            break;
    }
}

function calculateNonLinearMethod()
{

    switch(selectedMethod) {
        case 1:
            newtonMethod();
            break;
        case 2:
            regulaFalsiMethod();
            break;
        case 3:
            bisectionMethod();
            break;
    }
}


let toleranceValue = -1;
let round = -1;
function selectedTolerance(value)
{
    const dropDownButton = getById("dropdownMenuOutlineButton1");

    switch (value)
    {
        case 1:
            dropDownButton.innerHTML = "0.001";
            toleranceValue = 0.001;
            round = 3;
            break;
        case 2:
            dropDownButton.innerHTML = "0.0001";
            toleranceValue = 0.0001;
            round = 4;
            break;
        case 3:
            dropDownButton.innerHTML = "0.00001";
            toleranceValue = 0.00001;
            round = 5;
            break;
        case 4:
            dropDownButton.innerHTML = "0.000001";
            toleranceValue = 0.000001;
            round = 6;
            break;
        default:
    }



}

function validateInitialValue()
{
    const initialValueInput = document.getElementById("initial-value-input");
    const initalValueHintError = document.getElementById("initial-value-hint-error");

    if (initialValueInput.value < -100 || initialValueInput.value > 100)
    {
        initalValueHintError.innerHTML = "Hodnota mimo intervalu!";
    } else {
        initalValueHintError.innerHTML = "";
    }
}




function initializeTable(data)
{

    const graphDiv = document.getElementById("graph-div");
    graphDiv.style.display="none";

    const tableDiv = document.getElementById("table-div");
    tableDiv.classList.remove("hidden-div");

    const tableElement = document.getElementById("table");

    let header = tableElement.createTHead();
    let row = header.insertRow(0);
    for (let i = 0; i < data[0].length; ++i) {
        let cell = row.insertCell(i);
        cell.innerHTML = data[0][i];
    }

    let from = 1;

    if (data.length > 8) {
        from = data.length - 8;
    }


    for (let i = from; i < data.length; ++i) {
        let row = tableElement.insertRow(-1);
        for (let j = 0; j < data[0].length; ++j) {
            let c = row.insertCell(j);


            if (j == 0) {
                c.innerText = data[i][j];
                continue;
            }

            if (j === data[0].length - 2 && i === data.length - 1) {
                c.style.backgroundColor = "green";
            }

            if (Number.isInteger(1 * data[i][j]))
            {
                c.innerText = data[i][j];
            } else
            {
                c.innerText = data[i][j];
            }


        }
    }

}


////////Non-linear methods//////////////////////////////////////////////////////////////////////////////////////////////

function validateInitialValue()
{
    const initialValueInput = getById("initial-value-input");
    const initialValueErrorHint = getById("initial-value-hint-error");

    if (initialValueInput.value.length !== 0)
    {
        initialValueErrorHint.innerHTML = "";
    } else
    {
        initialValueErrorHint.innerHTML = "Prázdne pole!";
        return false;
    }

    if (initialValueInput.value >= -100 && initialValueInput.value <= 100)
    {
        initialValueErrorHint.innerHTML = "";
        return true;
    } else
    {
        initialValueErrorHint.innerHTML = "Hodnota mimo intervalu!";
        return false;
    }
}


function validateToleranceValue()
{

    const toleranceValueErrorHint = getById("tolerance-value-hint-error");

    if (toleranceValue === 0.001 || toleranceValue === 0.0001 || toleranceValue === 0.00001 || toleranceValue === 0.000001)
    {
        toleranceValueErrorHint.innerHTML = "";
        return true;
    } else
    {
        toleranceValueErrorHint.innerHTML = "Nezvolená hodnota!";
        return false;
    }

}


function validateBounds()
{
    const lowerBoundInput = getById("lower-bound-input");
    const upperBoundInput = getById("upper-bound-input");
    const lowerBoundInputErrorHint = getById("lower-bound-value-hint-error");
    const upperBoundInputErrorHint = getById("upper-bound-value-hint-error");


    if (lowerBoundInput.value.length === 0)
    {
        lowerBoundInputErrorHint.innerHTML = "Prázdne pole!";

        return false;
    } else {

        lowerBoundInputErrorHint.innerHTML = "";
    }

    if (lowerBoundInput.value < -100 || lowerBoundInput.value > 99)
    {

        lowerBoundInputErrorHint.innerHTML = "Hodnota mimo intervalu!";
        return false;
    } else {
        lowerBoundInputErrorHint.innerHTML = "";
    }




    if (upperBoundInput.value.length === 0)
    {
        upperBoundInputErrorHint.innerHTML = "Prázdne pole!";
        return false;
    } else {
        upperBoundInputErrorHint.innerHTML = "";
    }




    if (upperBoundInput.value < -99 || upperBoundInput.value > 100)
    {
        upperBoundInputErrorHint.innerHTML = "Hodnota mimo intervalu!";
        return false;
    } else {
        upperBoundInputErrorHint.innerHTML = "";
    }


    const upperValue = parseFloat(upperBoundInput.value);
    const lowerValue = parseFloat(lowerBoundInput.value);

    if (upperValue <= lowerValue)
    {
        upperBoundInputErrorHint.innerHTML = "Horná hranica je menšia/väčšia než dolná!";
        return false;
    } else {
        upperBoundInputErrorHint.innerHTML = "";
    }


    return true;

}


function validateFunction()
{
    const functionInput = getById("function-input");
    const functionErrorHint = getById("function-hint-error");


    if (functionInput.value.length === 0)
    {
        functionErrorHint.innerHTML = "Prázdne pole!";
        return false;
    } else {
        functionErrorHint.innerHTML = "";
    }



    try
    {
        let expression = math.parse(functionInput.value);
        math.evaluate(expression.toString(), { x: 0 });
    } catch (error)
    {
        functionErrorHint.innerHTML = "Nevalidný výraz!";
        return false;
    }



    fun = functionInput.value;


    return true;
}


function validateEquation()
{
    const equationInput = getById("equation-input");
    let modifiedEquation = equationInput.value;
    const equationErrorHint = getById("equation-hint-error");


    if (modifiedEquation === null || modifiedEquation === "")
    {
        equationErrorHint.innerHTML = "Prázdne pole!";
        return false;
    }

    modifiedEquation = modifiedEquation.trim();
    modifiedEquation = modifiedEquation.toLowerCase();


    if (modifiedEquation.indexOf("x") === -1)
    {
        equationErrorHint.innerHTML = "Nevalidný výraz!";
        return false;
    }



    if (modifiedEquation.charAt(modifiedEquation.length - 1) !== "0")
    {
        equationErrorHint.innerHTML = "Nevalidný výraz!";
        return false;
    }

    if (!modifiedEquation.includes("="))
    {
        equationErrorHint.innerHTML = "Nevalidný výraz!";
        return false;
    }


    modifiedEquation = modifiedEquation.slice(0, -1);
    modifiedEquation = modifiedEquation.replace("=","");


    try
    {
        let expression = math.parse(modifiedEquation);
        math.evaluate(expression.toString(), { x: 0 });
    } catch (error)
    {
        equationErrorHint.innerHTML = "Nevalidný výraz!";
        return false;
    }

    equationErrorHint.innerHTML = "";

    fun = modifiedEquation;


    return true;
}

function newtonMethod()
{
    if (!validateEquation() || !validateToleranceValue() || !validateInitialValue())
    {
        return false;
    }




    const tolerance = toleranceValue;
    const resultElementErrorHint = getById("result-hint-error");
    const iterations = 1000;
    let current = parseFloat(getById("initial-value-input").value);


    const data = [];

    data[0] = [3];
    data[0][0] = "k";
    data[0][1] = "x";
    data[0][2] = "Chyba";

    const parsedEquation = math.parse(fun);
    const derivative = math.derivative(parsedEquation, 'x');

    for (let i = 0; i < iterations; ++i)
    {

        data[i + 1] = [3];
        data[i + 1][0] = i;
        data[i + 1][1] = current.toFixed(round);

        let fx = math.evaluate(parsedEquation.toString(), { x: current });
        let derFx = 0;


        try
        {
            derFx = math.evaluate(derivative.toString(), { x: current });
        } catch (error) {

        }

        if (derFx === 0)
        {

            return;
        }

        let next = current - (fx / derFx);
        let error = Math.abs(next - current);
        data[i + 1][2] = error.toFixed(round);



        if (error <= tolerance)
        {
            break;
        }

        current = next;
    }

    $("#table tr").remove();


    const resultInput = getById("result-input");
    resultInput.value = "Vypočítaný koreň rovnice: " + current.toFixed(round);

    initializeTable(data);

}





function bisectionMethod()
{

    if (!validateEquation() || !validateToleranceValue() || !validateBounds())
    {
        return false;
    }

    const resultInputHintError = getById("result-hint-error");
    resultInputHintError.innerHTML = "";

    const iterations = 1000;
    const tolerance =  toleranceValue;

    const lowerBound = getById("lower-bound-input").value;
    const upperBound = getById("upper-bound-input").value;


    const data = []
    data[0] = [5];

    data[0][0] = "k";
    data[0][1] = "dolná hranica";
    data[0][2] = "horná hranica";
    data[0][3] = "x";
    data[0][4] = "chyba";


    let a = parseFloat(lowerBound);
    let b = parseFloat(upperBound);

    let parsedEquation = math.parse(fun);

    let xk = 0;
    for (let k = 1; k < iterations; ++k)
    {


        xk = (a + b)/2;
        const fxk = math.evaluate(parsedEquation.toString(), { x: xk });

        const fak = math.evaluate(parsedEquation.toString(), { x: a });

        const fbk = math.evaluate(parsedEquation.toString(), { x: b });

        if (fak * fbk > 0)
        {
            resultInputHintError.innerHTML = "Funkcia nieje spojitá na danom intervale!";
            return;
        }

        data[k] = [5];

        data[k][0] = k - 1;
        data[k][1] = a.toFixed(round);
        data[k][2] = b.toFixed(round);
        data[k][3] = xk.toFixed(round);
        data[k][4] = ((b - a) / 2).toFixed(round);

        if ((b - a) / 2 <= tolerance)
        {
            break;
        }

        if (fxk === 0) {
            break;
        }

        if (fak * fxk < 0) {
            b = xk;
        }

        if (fbk * fxk < 0) {
            a = xk;
        }

    }

    const resultInput = getById("result-input");
    resultInput.value = "Vypočítaný koreň rovnice: " + xk.toFixed(round);

    $("#table tr").remove();
    initializeTable(data);


}


function regulaFalsiMethod()
{
    if (!validateEquation() || !validateToleranceValue() || !validateBounds())
    {
        return false;
    }

    const resultInputHintError = getById("result-hint-error");
    resultInputHintError.innerHTML = "";

    const iterations = 1000;
    const tolerance =  toleranceValue;
    const lowerBound = getById("lower-bound-input").value;
    const upperBound = getById("upper-bound-input").value;

    let a = parseFloat(lowerBound);
    let b = parseFloat(upperBound);
    let prev = a;



    let parsedEquation = math.parse(fun);

    const data = [];

    data[0] = [5];
    data[0][0] = "k";
    data[0][1] = "dolná hranica";
    data[0][2] = "horná hranica";
    data[0][3] = "x";
    data[0][4] = "chyba";

    let xk = 0;
    for (let k = 1; k < iterations; ++k) {


        const fak = math.evaluate(parsedEquation.toString(), { x: a });
        const fbk = math.evaluate(parsedEquation.toString(), { x: b });

        if (fak * fbk > 0)
        {
            resultInputHintError.innerHTML = "Funkcia nieje spojitá na danom intervale!";
            return;
        }


         xk = a - (b - a) / (fbk - fak) * fak;

        const fxk = math.evaluate(parsedEquation.toString(), { x: xk });

        data[k] = [5];
        data[k][0] = k - 1;
        data[k][1] = a.toFixed(round);
        data[k][2] = b.toFixed(round);
        data[k][3] = xk.toFixed(round);
        data[k][4] = (Math.abs(xk - prev)).toFixed(round);

        if (fxk === 0)
        {
            break;
        }

        if (fak * fxk < 0)
        {
            b = xk;
        }

        if (fbk * fxk < 0)
        {
            a = xk;
        }

        if (Math.abs(xk - prev) <= tolerance)
        {
            break;
        }

        prev = xk;
    }

    const resultInput = getById("result-input");
    resultInput.value = "Vypočítaný koreň rovnice: " + xk.toFixed(round);

    $("#table tr").remove();
    initializeTable(data);



}




function simpleIterationMethod()
{

}




function hideGraphTable() {
    document.getElementById("lineChart").style.display="none";
    document.getElementById("table-div").style.display="none";
}









////////Non-linear methods//////////////////////////////////////////////////////////////////////////////////////////////





function graph()
{
    let xValues = [];
    let yValues = [];

    for (let i = -10; i <= 10; ++i)
    {
        xValues.push(i);
        let expression = math.parse(fun);
        yValues.push(math.evaluate(expression.toString(), { x: i }));


    }

    $("#table tr").remove();

    const graphDiv = document.getElementById("graph-div");
    graphDiv.style.display="block";



    var data = {
        labels: xValues,
        datasets: [{
            label: '# of Votes',
            data: yValues,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            fill: false
        }],
        lineAtIndex: 2
    };

    const backgroundColorPlugin = {
        id: 'customCanvasBackgroundColor',
        beforeDraw: (chart) => {
            const ctx = chart.ctx;
            ctx.fillStyle = 'rgb(255,255,255)';
            ctx.fillRect(0, 0, chart.width, chart.height);
        }
    };

    var options = {
        scales: {
            yAxes: [{
                ticks: {
                   beginAtZero: true,
                    fontColor: "#000000",
                },
                gridLines: {
                    zeroLineWidth: 3,
                    zeroLineColor: "#2C292E",

                }
            }],
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontColor: "#000000",

                },
                gridLines: {
                    
                    zeroLineColor: "#2C292E",
                }
            }]
        },
        legend: {
            display: false
        },
        elements: {
            point: {
                radius: 0
            }
        }
    };




    const pl = {
        afterDraw: function(chart) {
            var ctx = chart.ctx;
            var xAxis = chart.scales['x-axis-0'];
            var yAxis = chart.scales['y-axis-0'];
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = '#000000'; // Red color for the vertical line
            ctx.lineWidth = 3;
            ctx.moveTo(xAxis.getPixelForValue(0), yAxis.top);
            ctx.lineTo(xAxis.getPixelForValue(0), yAxis.bottom);
            ctx.stroke();
            ctx.restore();
        }
    }


    if ($("#lineChart").length) {
        var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
        var lineChart = new Chart(lineChartCanvas, {
            type: 'line',
            data: data,
            options: options,
            plugins:
                [backgroundColorPlugin,pl]

        });
    }



}



function clickOnInput() {
    const element = document.getElementById("file-input");

    element.click();
}


/////////////////////////////////////////Aproximation & interpolation///////////////////////////////////////////////////////////////


let selectedFunction = 0;
function selectFunction(whichOne)
{
    if (whichOne === 1) {
        document.getElementById("dropdownMenuOutlineButton3").innerHTML = "Lineárna funkcia";
    } else {
        document.getElementById("dropdownMenuOutlineButton3").innerHTML = "Logaritmická funkcia";
    }

    selectedFunction = whichOne;
}


function calculateApproximationMethod()
{

    switch(selectedMethod) {
        case 1:
            lagrangeInterpolating();
            break;
        case 2:
            newtonInterpolating();
            break;
        case 3:
            leastSquares();
            break;
    }
}

function lagrangeInterpolating()
{



   // let arr = document.getElementById("nodes-string-input").value.match(/-?\d+(\.\d+)?/g);

    let arr = coor;
    let equation = "";
    let first = true;

    for (let i = 0; i < arr.length; i+=2)
    {
        let part = "";
        let menovatel = 1;
        for (let k = 0; k < arr.length; k+=2)
        {

            if (i === k)
            {
                continue;
            }


            if (arr[k] > 0)
            {
                part += "(x - " + (Number.isInteger(1 * arr[k]) ? (1 * arr[k]): ((1 * arr[k]).toFixed(3))) + ")";
            } else
            {
                part += "(x + " + (Number.isInteger(-1 * arr[k]) ? (-1 * arr[k]): ((-1 * arr[k]).toFixed(3))) + ")";
            }


            menovatel *= (arr[i] - arr[k]);

        }

        menovatel = 1/ menovatel;



        if (first)
        {
            part = (Number.isInteger(arr[i + 1] * menovatel) ? (arr[i + 1] * menovatel): ((arr[i + 1] * menovatel).toFixed(3))) + part;
            equation += part;
            first = false;
        } else
        {
            if (arr[i + 1] * menovatel > 0)
            {
                part = "+" + (Number.isInteger(arr[i + 1] * menovatel) ? (arr[i + 1] * menovatel): ((arr[i + 1] * menovatel).toFixed(3))) + part;
            } else
            {
                part = (Number.isInteger(arr[i + 1] * menovatel) ? (arr[i + 1] * menovatel): ((arr[i + 1] * menovatel).toFixed(3))) + part;
            }

            equation += part;
        }


    }


    fun = equation;

    document.getElementById("result-input").value = "f(x) = " + fun;

    graph();



}





function newtonInterpolating()
{

    let arr = document.getElementById("nodes-string-input").value.match(/-?\d+(\.\d+)?/g);
    let data =[];

    let j = 0;
    for (let i = 0; i < arr.length; i+=2)
    {
        data[j] = [2];
        data[j][0] = arr[i];
        data[j][1] = arr[i + 1];
        console.log(data[j][0] + " " + data[j][1]);
        ++j;

    }



    let equation = "";


    for (let i = 0; i < data.length; ++i)
    {
        let cislo = dividedDifference(0,i);

        if (i == 0)
        {
            if (cislo < 0)
            {
                equation += "- " + (Number.isInteger(1 * cislo) ? ((-1) * cislo): ((-1) * cislo.toFixed(3)));
            } else {
                equation += (Number.isInteger(1 * cislo) ? ( 1 * cislo): (1 * cislo).toFixed(3));

            }
            continue;
        }

        if (cislo > 0)
        {
            equation += "+";
        }
        equation += (Number.isInteger(1 * cislo) ? (1 * cislo): (1 * cislo).toFixed(3));

        for (let j = 0; j < i; ++j)
        {
            if (data[j][0] < 0)
            {
                equation += "(x + " + (Number.isInteger((-1) * data[j][0]) ? ((-1) * data[j][0]): ((-1) * data[j][0]).toFixed(3))+ ")";
            } else {
                equation += "(x - " + (Number.isInteger(1 * data[j][0]) ? (1 * data[j][0]): (1 * data[j][0]).toFixed(3)) + ")";
            }
        }
    }



    fun = equation;

    document.getElementById("result-input").value = "f(x) = " + fun;

    graph();


    function dividedDifference(i, j)
    {

        if (j === 0) {
            return data[i][1];
        } else {
            return (dividedDifference(i + 1, j - 1) - dividedDifference(i, j - 1)) / (data[i + j][0] - data[i][0]);
        }
    }
}


function leastSquares() {


    if (selectedFunction === 1) {

        linear();
    }

    if (selectedFunction === 2) {
        logaritmic();
    }


}






function parseCsvToArrays() {

    var csvString = "";
    function csvToString(file, callback) {
        let reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = function(event) {
             csvString = event.target.result;

            callback(csvString);
        };

        // Read in the file as a text
        reader.readAsText(file);
    }


    const file = getById("file-input").files[0];


    csvToString(file, function(csvString) {
        validateStudentsCsv($.csv.toArrays(csvString));

    });





}

function parseStringCoordintatesToArrays()
{
    const stringCoordinatesInputElement = getById("nodes-string-input");

    const array = stringCoordinatesInputElement.value.match(/-?\d+(\.\d+)?/g);


    const coordinates = [];
    let j = 0;
    for (let i = 0; i < array.length; i += 2)
    {
        coordinates[j] = [2];
        coordinates[j][0] = array[i];
        coordinates[j][1] = array[i + 1];
        ++j;
    }

    return coordinates;
}


function validateStringCoordinates()
{
    const regex = /^\[\((?:-?\d*\.?\d+),(-?\d*\.?\d+)\)(?:,\((?:-?\d*\.?\d+),(-?\d*\.?\d+)\))*]$/;

    const coordinatesStringElement = getById("nodes-string-input");
    const coordinatesStringErrorHint = getById("coordinates-string-error-hint");

    if (coordinatesStringElement.value.length === 0)
    {
        coordinatesStringErrorHint.innerHTML = "Prázdne pole!";
        return false;
    }


    if (regex.test(coordinatesStringElement.value))
    {
        coordinatesStringErrorHint.innerHTML = "";
    } else {
        coordinatesStringErrorHint.innerHTML = "Nevalidný výraz!";
        return false;
    }

    return validateCoordinates(parseStringCoordintatesToArrays(), 1);
}




function validateCoordinates(coordinatesArrays, type)
{

    const coordinatesCsvErrorHint = getById("coordinates-csv-error-hint");
    const coordinatesStringErrorHint = getById("coordinates-string-error-hint");




    if (type === 1)
    {
        if (coordinatesArrays.length > 10)
        {
            coordinatesStringErrorHint.innerHTML = "Uzlov je viac než 10!";
            return false;
        } else {
            coordinatesStringErrorHint.innerHTML = "";
        }

    }


    if (type === 2)
    {
        if (coordinatesArrays.length > 1000)
        {
            coordinatesCsvErrorHint.innerHTML = "Uzlov je viac než 1000!";
            return false;
        } else {
            coordinatesCsvErrorHint.innerHTML = "";
        }

    }



    let uniques = new Set();



    for (let i = 0; i < coordinatesArrays.length; ++i)
    {
        const valueX = coordinatesArrays[i][0];
        const valueY = coordinatesArrays[i][1];



        if (isNaN(valueX) === true || isNaN(valueY) === true || valueX.length === 0 || valueY.length === 0)
        {
            uniques.clear();
            uniques = null;

            if (type === 1)
            {
                coordinatesStringErrorHint.innerHTML = "Nevalidná hodnota vo výraze!";
                return false;
            }

            const char = String.fromCharCode(65);
            coordinatesCsvErrorHint.innerHTML = "Nevalidná hodnota na súradnici: " + char + (i+1);

            return false;
        }

        uniques.add(valueX);

    }


    if (coordinatesArrays.length !== uniques.size)
    {
        if (type === 1) {
            coordinatesStringErrorHint.innerHTML = "Duplikát X!";
        }

        if (type === 2) {
            coordinatesCsvErrorHint.innerHTML = "Duplikát X!";
        }

        return false;
    }
    else
    {
        coordinatesStringErrorHint.innerHTML = "";
        coordinatesCsvErrorHint.innerHTML = "";
    }


    return true;

}



function logaritmic()
{

    if (!validateCoordinates(parseStringCoordintatesToArrays()))
    {
       return false;
    }


    let arr = document.getElementById("nodes-string-input").value.match(/-?\d+(\.\d+)?/g);
    let data =[];

    let j = 0;
    for (let i = 0; i < arr.length; i+=2)
    {
        data[j] = [2];
        data[j][0] = arr[i];
        data[j][1] = arr[i + 1];

        ++j;

    }

    let coeficients = [];


    coeficients.push(data.length);


    let sum_x = 0;
    for(let i = 0; i < data.length; ++i)
    {

        sum_x += Math.log(parseFloat(data[i][0]));
    }

    coeficients.push(sum_x);



    let sum_y = 0;
    for(let i = 0; i < data.length; ++i)
    {
        sum_y += parseFloat(data[i][1]);
    }

    coeficients.push(sum_y);

    let sum_x_2 = 0;
    for(let i = 0; i < data.length; ++i)
    {
        sum_x_2 += (Math.log(parseFloat(data[i][0])) * Math.log(parseFloat(data[i][0])));
    }

    coeficients.push(sum_x_2);

    let sum_x_y = 0;
    for(let i = 0; i < data.length; ++i)
    {
        sum_x_y += (Math.log(parseFloat(data[i][0])) * data[i][1]);
    }

    coeficients.push(sum_x_y);

    let equation = cramer(2,coeficients);

    fun = equation;

    document.getElementById("result-input").value = "f(x) = " + fun;

    display();



}


function linear()
{

    let arr = document.getElementById("nodes-string-input").value.match(/-?\d+(\.\d+)?/g);
    let data =[];

    let j = 0;
    for (let i = 0; i < arr.length; i+=2)
    {
        data[j] = [2];
        data[j][0] = arr[i];
        data[j][1] = arr[i + 1];

        ++j;

    }

    let coeficients = [];


    coeficients.push(data.length);

    let sum_x = 0;
    for(let i = 0; i < data.length; ++i)
    {
        sum_x += (1 *data[i][0]);
    }

    coeficients.push(sum_x);


    let sum_y = 0;
    for(let i = 0; i < data.length; ++i)
    {
        sum_y += (1 *data[i][1]);
    }

    coeficients.push(sum_y);

    let sum_x_2 = 0;
    for(let i = 0; i < data.length; ++i)
    {
        sum_x_2 += (data[i][0] * data[i][0]);

    }

    coeficients.push(sum_x_2);

    let sum_x_y = 0;
    for(let i = 0; i < data.length; ++i)
    {
        sum_x_y += (data[i][0] * data[i][1]);
    }

    coeficients.push(sum_x_y);


    let equation = cramer(1,coeficients);



    fun = equation;

    document.getElementById("result-input").value = "f(x) = " + fun;
    display();


}


function cramer(option, coeficients) {

    let A = coeficients[0] * coeficients[3] -  coeficients[1] * coeficients[1];



    let A1 = coeficients[2] * coeficients[3] -  coeficients[4] * coeficients[1];


    let A2 = coeficients[0] * coeficients[4] -  coeficients[2] * coeficients[1];

    switch (option)
    {
        case 1:
            return "" + (A1 / A).toFixed(3) + " +" + (A2 / A).toFixed(3) + "x";

        case 2:
            return "" +(A1 / A).toFixed(3) + " +" + (A2 / A).toFixed(3) + "log(x)";

    }



}


function spline()
{
    if ( !isValid())
    {
        return;
    }

    let dk = [];

    for (let i = 0; i < data.length - 1; ++i)
    {
        dk[i] = (data[i + 1][1] - data[i][1]) / (data[i + 1][0] - data[i][0]);
    }



    let Sx = [data.length - 1];

    for (let i = 0; i < data.length - 1; ++i)
    {
        Sx[i] = "";
        Sx[i] += data[i][1];
        if (dk[i] > 0)
        {
            Sx[i] += "+";
        }
        Sx[i] += dk[i];

        if (data[i][0] > 0)
        {
            Sx[i] += "(x-" + data[i][0]+ ")";
        } else
        {
            Sx[i] += "(x+" + ((-1) * data[i][0]) + ")";
        }
    }

    for(var i = 0; i < Sx.length; i++)
    {
        console.log(Sx[i]);
    }


}



/////////////////////////////////////////Aproximation & interpolation///////////////////////////////////////////////////////////////






/////////////////////////////Integration//////////////////////////////////////////////////////////////////////////////



function validateSubintervals()
{
    const subIntervalsInputElement = getById("subintervals-input");
    const subIntervalsInputErrorHint = getById("subintervals-value-hint-error");


    if (subIntervalsInputElement.value.length === 0)
    {
        subIntervalsInputErrorHint.innerHTML = "Prázdne pole!"
        return false;
    }else
    {
        subIntervalsInputErrorHint.innerHTML = "";
    }


    function isPositiveInteger(n)
    {
        return n >>> 0 === parseFloat(n);
    }


    if (!isPositiveInteger(subIntervalsInputElement.value))
    {
        subIntervalsInputErrorHint.innerHTML = "Nevalidná hodnota!"
        return false;
    }else {
        subIntervalsInputErrorHint.innerHTML = "";
    }

    if (subIntervalsInputElement.value  <= 0 || subIntervalsInputElement.value > 100)
    {
        subIntervalsInputErrorHint.innerHTML = "Hodnota mimo intervalu!"
        return false;
    } else {
        subIntervalsInputErrorHint.innerHTML = "";
    }

    return true;


}
function trapezoid()
{
    if (!validateFunction() || !validateBounds() || !validateSubintervals() )
    {

        return false;
    }

    const resultInputHintError = getById("result-hint-error");
    resultInputHintError.innerHTML = "";

    const iterations = 1000;
    const lowerBound = getById("lower-bound-input").value;
    const upperBound = getById("upper-bound-input").value;

    let a = parseFloat(lowerBound);
    let b = parseFloat(upperBound);

    const subIntervals = getById("subintervals-input").value;
    const n = parseFloat(subIntervals);

    const h = (b - a) / n;

    const parsedEquation = math.parse(fun);


    let sum = 0;
    let part = 1 * a;

    for (let i = 0; i <= n; ++i)
    {

        if (i == 0)
        {
            let fx = math.evaluate(parsedEquation.toString(), { x: a});
            sum += fx;
            continue;
        }

        if (i == n)
        {
            let fx = math.evaluate(parsedEquation.toString(), { x: b});
            sum += fx;
            continue;
        }

        part += 1 * h;

        let fx = 2 * math.evaluate(parsedEquation.toString(), { x: part })
        sum = sum + fx;


    }


    const result = sum * h/2;

    document.getElementById("result-input").value = "Hodnota aproximačného integrálu: " + result.toFixed(6);


}

function simpson()
{

    if (!validateFunction() || !validateSubintervals() || !validateBounds())
    {
        return false;
    }

    const resultInputHintError = getById("result-hint-error");
    resultInputHintError.innerHTML = "";

    const iterations = 1000;
    const lowerBound = getById("lower-bound-input").value;
    const upperBound = getById("upper-bound-input").value;

    let a = parseFloat(lowerBound);
    let b = parseFloat(upperBound);

    const subIntervals = getById("subintervals-input").value;
    const n = parseFloat(subIntervals);

    const h = (b - a) / n;

    const parsedEquation = math.parse(fun);


    let sum = 0;
    let part = 1 * a;

    for (let i = 0; i <= n; ++i)
    {

        if (i == 0)
        {
            sum += math.evaluate(parsedEquation.toString(), { x: a});
            continue;
        }

        if (i == n)
        {
            sum += math.evaluate(parsedEquation.toString(), { x: b});
            continue;
        }

        part += 1 * h;

        if (i % 2 !== 0)
        {
            sum = sum + (4 * math.evaluate(parsedEquation.toString(), { x: part }));
        }

        if (i % 2 === 0)
        {
            sum = sum + (2 * math.evaluate(parsedEquation.toString(), { x: part }));
        }



    }


    const result = sum * h/3;

    document.getElementById("result-input").value = "Hodnota aproximačného integrálu: " + result.toFixed(6);



}


function calculateIntegrationMethod()
{

    switch(selectedMethod) {
        case 1:
            trapezoid();
            break;
        case 2:
            simpson();
            break;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////

function checkUsername(userName)
{
    const errorHint = getById("username-hint-error");

    if (userName.length === 0)
    {
        getById("username-check-button").disabled = true;
        errorHint.innerHTML = "";
        return;
    }

    const xhttp = new XMLHttpRequest();


    xhttp.onload = function()
    {
        if (xhttp.status === 404)
        {
            getById("username-check-button").disabled = true;
            errorHint.innerHTML ="Nenájdený!";
        }


        if (xhttp.status === 400)
        {
            getById("username-check-button").disabled = true;
            errorHint.innerHTML ="Nieje aktívny!";
        }


        if (xhttp.status === 200)
        {
            getById("username-check-button").disabled = false;
            errorHint.innerHTML ="Nájdený!";
        }
    }




    let url = "/admin/employee/" + userName + "/check-username";

    xhttp.open("GET", url, true);


    xhttp.send();
}

function clic()
{
    const fileInputElement = getById("file-input");
    fileInputElement.click();
}



function validateStudentsCsv(arr) {


    let coor = arr;
    getById("text-input").value = getById("file-input").value.split(/(\\|\/)/g).pop();

    alert(coor.length);
    const studentsCsvHintError = getById("students-csv-hint-error");


    for (let i = 1; i < coor.length; ++i)
    {
        const surname = coor[i][0].trim();

        if (surname === null || surname.length === 0)
        {
            const char = String.fromCharCode(65);
            const dig = i + 1;
            studentsCsvHintError.innerHTML = "Prázdna bunka!: "  + (char + dig);
            return false;
        } else {
            studentsCsvHintError.innerHTML = "";
        }



        if (surname.length > 50)
        {
            const char = String.fromCharCode(65);
            const dig = i + 1;
            studentsCsvHintError.innerHTML = "Text je dlhší než 50 znakov!: "  + (char + dig);
        }else {
            studentsCsvHintError.innerHTML = "";
        }


        const name = coor[i][1].trim();

        if (name === null || name.length === 0)
        {
            const char = String.fromCharCode(66);
            const dig = i + 1;
            studentsCsvHintError.innerHTML = "Prázdna bunka!: " + (char + dig);
            return false;
        }else
        {
            studentsCsvHintError.innerHTML = "";
        }



        if (name.length > 50)
        {
            const char = String.fromCharCode(66);
            const dig = i + 1;
            studentsCsvHintError.innerHTML = "Text je dlhší než 50 znakov!: "  + (char + dig);
            return false;
        }else {
            studentsCsvHintError.innerHTML = "";
        }


        const pin = coor[i][2].trim();
        const pinRegex = /^\d{6}$/;

        if (pin === null || pin.length === 0)
        {
            const char = String.fromCharCode(67);
            const dig = i + 1;
            studentsCsvHintError.innerHTML = "Prázdna bunka!: "  + (char + dig);
            return false;
        }else {
            studentsCsvHintError.innerHTML = "";
        }



        if (!pinRegex.test(pin))
        {
            const char = String.fromCharCode(67);
            const dig = i + 1;
            studentsCsvHintError.innerHTML = "Nevalidná hodnota!: "  + (char + dig);
            return false;

        }else {
            studentsCsvHintError.innerHTML = "";
        }



        const email = coor[i][3].trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@stud\.uniza\.sk$/;

        if (email === null || pin.length === 0)
        {
            const char = String.fromCharCode(68);
            const dig = i + 1;
            studentsCsvHintError.innerHTML = "Prázdna bunka!: "  + (char + dig);
            return false;
        }else
        {
            studentsCsvHintError.innerHTML = "";
        }



        if (!emailRegex.test(email))
        {
            const char = String.fromCharCode(68);
            const dig = i + 1;
            studentsCsvHintError.innerHTML = "Nevalidná hodnota!: "  + (char + dig);
            return false;
        }else {
            studentsCsvHintError.innerHTML = "";
        }


    }


    return true;


}


function updateSystemAbsents()
{
    const errorHint = getById("absents-hint-error");
    const absentsInputElement = getById("absents-input");
    const absentsButton = getById("absents-button");

    if (absentsInputElement.value.length === 0)
    {

        return;
    }

    const xhttp = new XMLHttpRequest();


    xhttp.onload = function()
    {
        if (xhttp.status === 404)
        {
            absentsButton.disabled = true;
            errorHint.innerHTML ="Nenájdený!";
        }


        if (xhttp.status === 400)
        {
            absentsButton.disabled = true;
            errorHint.innerHTML ="Nieje aktívny!";
        }


        if (xhttp.status === 200)
        {
            absentsButton.disabled = false;
            errorHint.innerHTML ="Nájdený!";
        }
    }

    let data = {
        absents: absentsInputElement.value
    };




    let url = "/admin/system/update/absents";

    xhttp.open("PATCH", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(JSON.stringify(data));
}

function updateSystemDate()
{
    const errorHint = getById("date-hint-error");
    const dateInputElement = getById("date-input");
    const dateButton = getById("date-button");

    if (isDateAfterCurrent(dateInputElement.value))
    {
       //return;
    }

    const xhttp = new XMLHttpRequest();


    xhttp.onload = function()
    {
        if (xhttp.status === 404)
        {
            absentsButton.disabled = true;
            errorHint.innerHTML ="Nenájdený!";
        }


        if (xhttp.status === 400)
        {
            absentsButton.disabled = true;
            errorHint.innerHTML ="Nieje aktívny!";
        }


        if (xhttp.status === 200)
        {
            absentsButton.disabled = false;
            errorHint.innerHTML ="Nájdený!";
        }
    }

    let data = {
        date: dateInputElement.value
    };




    let url = "/admin/system/update/date";

    xhttp.open("PATCH", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(JSON.stringify(data));
}



function isDateAfterCurrent(dateString)
{
    const dateErrorHint = getById("date-hint-error");

    const regex = /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/;

    if (!regex.test(dateString)) {
        dateErrorHint.innerHTML = "Dátum v nesprávnom formáte!";
        return false;
    } else {
        dateErrorHint.innerHTML = "";
    }


    // Parse the date string into a Date object
    var parts = dateString.split(' ');
    var dateParts = parts[0].split('.');
    var timeParts = parts[1].split(':');
    var year = parseInt(dateParts[2], 10);
    var month = parseInt(dateParts[1], 10) - 1; // Months are zero-based
    var day = parseInt(dateParts[0], 10);
    var hours = parseInt(timeParts[0], 10);
    var minutes = parseInt(timeParts[1], 10);


    const date = new Date(year, month, day, hours, minutes);


    const success = date.getFullYear() === year && date.getMonth() === month && date.getDate() === day && date.getHours() === hours && date.getMinutes() === minutes && !isNaN(date.getTime())

    if (!success)
    {
        dateErrorHint.innerHTML = "Nevalidný dátum";
        return false;
    } else {
        dateErrorHint.innerHTML = "";
    }


    const currentDateTime = new Date();





    if (date <= currentDateTime)
    {
        dateErrorHint.innerHTML = "Dátum predchádza dnešný!";
        return false;
    } else {
        dateErrorHint.innerHTML = "";
    }

    return true;
}
















