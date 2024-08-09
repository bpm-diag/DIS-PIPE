function queryDbListener() {
    console.log("queryDb listener")
}

function queryDbRequest() {

	$("#loadingMessage").css("visibility", "visible");

	

	setTimeout(() => {
   
		var oReq = new XMLHttpRequest();
		oReq.addEventListener("load", queryDbListener);
		oReq.open("GET", frontend+"queryDb", false);
		oReq.send();

		$("#loadingMessage").css("visibility", "hidden");

	}, 10);
    
}

function initializeDBListener(){
	// console.log(this.responseText)
	document.getElementById("resultQuery").innerHTML=""
	//document.getElementById("resultQuery").innerHTML=this.responseText
	var ciao=this.responseText.split("\n")
	// console.log(ciao.length)
	for(var i=0; i<ciao.length;i++){
		document.getElementById("resultQuery").innerHTML=document.getElementById("resultQuery").innerHTML+ciao[i]+"<br>"
	}

}

function initializeDBRequest(){

	var percentageFilter=document.getElementById("queryPercentage").value
	// console.log(percentageFilter)

	$("#loadingMessage").css("visibility", "visible");

	

	setTimeout(() => {

		var oReq = new XMLHttpRequest();
		oReq.addEventListener("load", initializeDBListener);
		oReq.open("GET", frontend+"initializeQuery?queryPercentage="+percentageFilter, false);
		oReq.send();

		$("#loadingMessage").css("visibility", "hidden");

	}, 10);


}

function databasePresenceListener(){
	
	var db_response =JSON.parse(this.responseText)["presence"]
	if(db_response==="yes"){
		// console.log("databse presence")
		$("#response_database").text('A database with the name of this log is already present, do you want to redo translation? it may takes some time');
		
			var YesButton = document.createElement("button");
			YesButton.innerHTML = "Yes";
			YesButton.style = "font-size: 16px; width: 20%;"
			YesButton.id = "yesbuttonPresence";
			var div = document.getElementById('querydivfacose');
			if(document.getElementById("yesbuttonPresence") == null) {
				div.appendChild(YesButton);
			}
			
			
			YesButton.addEventListener ("click", function() {
				//chiama la funzione per la traduzione e metti un login page
				//alert("Button was clicked");
				translationRequest();
				document.getElementById("formQuery").style.display = "none";
				document.getElementById("formQuery2").style.display = "block";


				//if(CheckTranslationRequest()=="false"){
				//	takeListRequest();
				//}
				//var listBrand =['LEXUS','AUDI','MAYBACK','FERRARI','TOYOTA'];   
                //the array
                
				//printBtn(listBrand);
			});

			var NoButton = document.createElement("button");
			NoButton.innerHTML = "No";
			NoButton.style = "font-size: 16px; width: 20%;"
			var div = document.getElementById('querydivfacose');
			NoButton.id="nobuttonPresence"
			
			if(document.getElementById("nobuttonPresence") == null) {
				div.appendChild(NoButton);
			}

			NoButton.addEventListener ("click", function() {
				//alert("Button was clicked");
				//chiama la next funzione e usa il db presente
				document.getElementById("formQuery").style.display = "none";
				document.getElementById("formQuery2").style.display = "block";

				if(CheckTranslationRequest()=="false"){
					takeListRequest();
				}
				fetchFileContent();
				var listBrand =['LEXUS','AUDI','MAYBACK','FERRARI','TOYOTA'];   
				loadQueriesAndDescriptions();
                //the array
				
                
				//printBtn(listBrand);

			});

	
	}else{
		// console.log("databse not presence")
		$("#response_database").text("You have to translate the log, Do you want to continue? It may take some times");
		var YesButton = document.createElement("button");
			YesButton.innerHTML = "Yes";
			YesButton.style = "font-size: 16px; width: 20%;"
			var div = document.getElementById('querydivfacose');

			YesButton.id="yesbuttonTranslate"
			
			if(document.getElementById("yesbuttonTranslate") == null) {
				div.appendChild(YesButton);
			}

			YesButton.addEventListener ("click", function() {
				//chiama la funzione per la traduzione e metti un login page
				//alert("Button was clicked");
				translationRequest2();
				document.getElementById("formQuery").style.display = "none";
				document.getElementById("formQuery2").style.display = "block";

				//if(CheckTranslationRequest()=="false"){
				//	takeListRequest();
				//}
				//var listBrand =['LEXUS','AUDI','MAYBACK','FERRARI','TOYOTA'];   
                //the array
                
				//printBtn(listBrand);

			});

			var NoButton = document.createElement("button");
			NoButton.innerHTML = "No";
			NoButton.style = "font-size: 16px; width: 20%;"
			var div = document.getElementById('querydivfacose');
			div.appendChild(NoButton);

			NoButton.id="nobuttonTranslate"
			
			if(document.getElementById("nobuttonTranslate") == null) {
				div.appendChild(NoButton);
			}

			NoButton.addEventListener ("click", function() {
				alert("You have to click yes, to perform query");
				//ritorna to map
				//document.getElementById("formQuery").style.display = "none";
				//document.getElementById("formQuery2").style.display = "block";

				//if(CheckTranslationRequest()=="false"){
					//takeListRequest();
				//}
				//var listBrand =['LEXUS','AUDI','MAYBACK','FERRARI','TOYOTA'];   
                //the array
                
				//printBtn(listBrand);
			});
	}
}
var log_numer=1
var element_list_select=[]
var from_list=[]
var where_list=[]


function printBtn_iniziale(listBrand) {
	

	
	if(document.getElementById("log1") == null) {
		
	

	var myDiv = document.getElementById("query_filter_div");
	var iDiv = document.createElement('div');
	iDiv.id = 'log'+log_numer;
	iDiv.style = "padding-bottom: 20px;"
	
	myDiv.appendChild(iDiv);
	

	from_list.push('log'+log_numer)
	// console.log(from_list)

	for (var i = 0; i < listBrand.length; i++) {
		var checkBox = document.createElement("input");
		var label = document.createElement("label");
		checkBox.type = "checkbox";
		checkBox.id = 'log'+log_numer+"."+listBrand[i];
		checkBox.value = 'log'+log_numer+"."+listBrand[i];
		checkBox.class = "sel_check"

		checkBox.style = "font-size: 16px;"
		label.style = "font-size: 16px; padding-right: 10px;"

		checkBox.onclick = function(e) {
			//alert(e.target.id); 
			
			
			if (e.target.checked) {
				element_list_select.push(e.target.id)
				// console.log(element_list_select)
			}else{
				index = element_list_select.indexOf(e.target.id);
				x= element_list_select.splice(index, 1);
				// console.log(element_list_select)
			}
		};
		
		iDiv.appendChild(checkBox);
		iDiv.appendChild(label);
		label.appendChild(document.createTextNode('log'+log_numer+"."+listBrand[i]));
	}

	var PlusButton = document.createElement("button");
	PlusButton.innerHTML = "Add log";
	PlusButton.style = "font-size: 13px; width: 13%;"

	var div = document.getElementById('query_filter_div');
	iDiv.appendChild(PlusButton);
	PlusButton.addEventListener ("click", function() {
		printBtn(listBrand)
	})

	var LessButton = document.createElement("button");
	LessButton.style = "font-size: 13px; width: 13%;"
	LessButton.innerHTML = "Remove log";
	LessButton.class = 'log'+log_numer;
	
	iDiv.appendChild(LessButton);
	LessButton.addEventListener ("click", function(e) {

		const queryFilterDiv = document.getElementById('query_filter_div');
		const divCount = queryFilterDiv.getElementsByTagName('div').length;
		if(divCount>1){
			// console.log(e.target.class)
			index = from_list.indexOf(e.target.class);
			x= from_list.splice(index, 1);
			//log_numer=log_numer-1
			// console.log(from_list)
			e.target.closest('div').remove()
		}else{
			alert("It is not possible to remove this log")
		}


	})

	var select1 = document.getElementById("select_first_element");
	for(var i = 0; i < listBrand.length; i++) {
		var opt = 'log'+log_numer+"."+listBrand[i];
		var el = document.createElement("option");
		el.textContent = opt;
		el.value = opt;
		select1.appendChild(el);
	}

	var select2 = document.getElementById("select_second_element");
	for(var i = 0; i < listBrand.length; i++) {
		var opt = 'log'+log_numer+"."+listBrand[i];
		var el = document.createElement("option");
		el.textContent = opt;
		el.value = opt;
		select2.appendChild(el);
	}
	log_numer=log_numer+1;

	if (document.getElementsByClassName('remember').checked) {
		// console.log("checked");
	} else {
		console.log("You didn't check it! Let me check it for you.");
	}

	}

}



function printBtn(listBrand) {
	

	var myDiv = document.getElementById("query_filter_div");
	var iDiv = document.createElement('div');
	iDiv.id = 'log'+log_numer;
	iDiv.style = "padding-bottom: 20px;"
	
	myDiv.appendChild(iDiv);
	

	from_list.push('log'+log_numer)
	// console.log(from_list)

	for (var i = 0; i < listBrand.length; i++) {
		var checkBox = document.createElement("input");
		var label = document.createElement("label");
		checkBox.type = "checkbox";
		checkBox.id = 'log'+log_numer+"."+listBrand[i];
		checkBox.value = 'log'+log_numer+"."+listBrand[i];
		checkBox.class = "sel_check"

		checkBox.style = "font-size: 16px;"
		label.style = "font-size: 16px; padding-right: 10px;"

		checkBox.onclick = function(e) {
			//alert(e.target.id); 
			
			
			if (e.target.checked) {
				element_list_select.push(e.target.id)
				// console.log(element_list_select)
			}else{
				index = element_list_select.indexOf(e.target.id);
				x= element_list_select.splice(index, 1);
				// console.log(element_list_select)
			}
		};
		
		iDiv.appendChild(checkBox);
		iDiv.appendChild(label);
		label.appendChild(document.createTextNode('log'+log_numer+"."+listBrand[i]));
	}

	var PlusButton = document.createElement("button");
	PlusButton.innerHTML = "Add log";
	PlusButton.style = "font-size: 13px; width: 13%;"

	var div = document.getElementById('query_filter_div');
	iDiv.appendChild(PlusButton);
	PlusButton.addEventListener ("click", function() {
		printBtn(listBrand)
	})

	var LessButton = document.createElement("button");
	LessButton.style = "font-size: 13px; width: 13%;"
	LessButton.innerHTML = "Remove log";
	LessButton.class = 'log'+log_numer;
	
	iDiv.appendChild(LessButton);
	LessButton.addEventListener ("click", function(e) {

		const queryFilterDiv = document.getElementById('query_filter_div');
		const divCount = queryFilterDiv.getElementsByTagName('div').length;
		if(divCount>1){
			// console.log(e.target.class)
			index = from_list.indexOf(e.target.class);
			x= from_list.splice(index, 1);
			//log_numer=log_numer-1
			// console.log(from_list)
			e.target.closest('div').remove()
		}else{
			alert("It is not possible to remove this log")
		}

	})

	var select1 = document.getElementById("select_first_element");
	for(var i = 0; i < listBrand.length; i++) {
		var opt = 'log'+log_numer+"."+listBrand[i];
		var el = document.createElement("option");
		el.textContent = opt;
		el.value = opt;
		select1.appendChild(el);
	}

	var select2 = document.getElementById("select_second_element");
	for(var i = 0; i < listBrand.length; i++) {
		var opt = 'log'+log_numer+"."+listBrand[i];
		var el = document.createElement("option");
		el.textContent = opt;
		el.value = opt;
		select2.appendChild(el);
	}
	log_numer=log_numer+1;

	if (document.getElementsByClassName('remember').checked) {
		//alert("checked");
		console.log("checked")
	} else {
		//alert("You didn't check it! Let me check it for you.");
		console.log("You didn't check it! Let me check it for you.");
	}


}

function removeBtn(){
	e.target.closest('div.image').remove();
}





function databasePresenceRequest(){

	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", databasePresenceListener);
	oReq.open("GET", frontend+"checkDatabasePresence", false);
	oReq.send();

}


function translationListener(){
	// console.log(this.responseText)
	if(CheckTranslationRequest()=="false"){
		takeListRequest();
	}

}
function translationRequest(){

	$("#loadingMessage").css("visibility", "visible");
	setTimeout(() => {

		var oReq = new XMLHttpRequest();
		oReq.addEventListener("load", translationListener);
		oReq.open("GET", frontend+"translation1", false);
		oReq.send();

		$("#loadingMessage").css("visibility", "hidden");

	}, 10);

}

function translationListener2(){
	// console.log(this.responseText)
	if(CheckTranslationRequest()=="false"){
		takeListRequest();
		console.log("bode")
	}
}
function translationRequest2(){

	$("#loadingMessage").css("visibility", "visible");

	

	setTimeout(() => {
   
		var oReq = new XMLHttpRequest();
		oReq.addEventListener("load", translationListener2);
		oReq.open("GET", frontend+"translation2", false);
		oReq.send();


		$("#loadingMessage").css("visibility", "hidden");

	}, 10);
    

}




function CheckTranslationListener(){
	// console.log(this.responseText)
	if(this.responseText=="false"){
		takeListRequest();
	}
		
}


function CheckTranslationRequest(){

	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", CheckTranslationListener);
	oReq.open("GET", frontend+"checkTranslationEnd", false);
	oReq.send();

}

function takeListListener(){
	var lista_campi=JSON.parse(this.responseText)["campi"]
	// console.log(lista_campi)
	// console.log(lista_campi[1])
	printBtn_iniziale(lista_campi);
	fetchFileContent();
	loadQueriesAndDescriptions();
}


function takeListRequest(){

	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", takeListListener);
	oReq.open("GET", frontend+"createEventLog", false);
	oReq.send();

}


function updatesaveQuery(){
	const description = document.getElementById('descriptionSaveQuery1').value;
    const query = document.getElementById('all_query_textarea').value;
	closesaveQuery();
    // Perform an API call to the Flask backend
    fetch('/saveQuery', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            description: description,
            query: query
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Query saved successfully!');

            // Add a new row to the table with the ID from the response
            const table = document.getElementById('tabellaQuery').getElementsByTagName('tbody')[0];
            const newRow = table.insertRow();
            newRow.style.backgroundColor = '#e9deeb';

            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            const cell3 = newRow.insertCell(2);

            const queryId = `Query ${data.id}`;
            cell1.style.border = '1px solid #cfa8d5';
            cell1.style.padding = '8px';
            cell1.textContent = queryId;

            cell2.style.border = '1px solid #cfa8d5';
            cell2.style.padding = '8px';
            cell2.textContent = description;
			cell2.id= `description_query_personalized_${data.id}`

            cell3.style.border = '1px solid #cfa8d5';
            cell3.style.padding = '8px';
            cell3.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <button class="conf_check_button" onclick="doPersonalizedQuery(${data.id})" type="button" style="font-size: 16px; width: 120px; height: 30px;">Run ${queryId}</button>
                    <button class="conf_check_button" onclick="editPersonalizedQuery(${data.id})" type="button" style="font-size: 16px; width: 120px; height: 30px; margin-top: 10px;">Edit ${queryId}</button>
                </div>
            `;
        } else {
            alert('Failed to save the query.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while saving the query.');
    });
}


function saveQuery(){
	document.getElementById("blocker_saveQuery").style.display = "block";
    document.getElementById("saveQuery").style.display = "block";
}

function closesaveQuery(){
    //console.log("Function: closePopupDslName()")

    document.getElementById("blocker_saveQuery").style.display = "none";
    document.getElementById("saveQuery").style.display = "none";
}


async function fetchFileContent() {
	try {
		const response = await fetch(frontend+"readDescriptionQuery1");
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		if (data.error) {
			throw new Error(data.error);
		}
		document.getElementById('query1des').innerText = data.content;
	} catch (error) {
		console.error('There has been a problem with your fetch operation:', error);
	}
}

async function fetchEditContent() {
    try {
        const response = await fetch(frontend + "readEditQuery1");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
		var contenuto1=((data.content1).split("\n")).join('&#13;&#10;')
		var contenuto2=((data.content2).split("\n")).join('&#13;&#10;')
        document.getElementById('descriptionQuery1').innerHTML = contenuto1;
        document.getElementById('scriptQuery1').innerHTML = contenuto2;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}


async function makeEdittQuery1() {
    const description = document.getElementById('descriptionQuery1').value;
    const query = document.getElementById('scriptQuery1').value;

	if (!description.trim() || !query.trim()) {
        alert('Description and Query cannot be empty!');
        return;
    }

    // Check for forbidden SQL keywords
    const forbiddenKeywords = ["delete", "drop", "insert"];
    const queryLowerCase = query.toLowerCase();
    for (let keyword of forbiddenKeywords) {
        if (queryLowerCase.includes(keyword)) {
            alert('Error: SQL query contains forbidden keywords (delete, drop, insert)');
            return;
        }
    }

    try {
        const response = await fetch(frontend + "updateQuery1", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: description,
                query: query
            })
        });

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }

        alert('Query updated successfully!');
		fetchFileContent();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        alert('Error updating query: ' + error.message);
    }
}

/*
function closeEditQuery1() {
    document.getElementById('editQuery1').style.display = 'none';
}
*/


function updateEditQuery1(){
	closeEditQuery1();
	makeEdittQuery1();
}


function changeSecondTerm(variabile){
	if(variabile=="select"){
		document.getElementById("select_first_element").style.display="block"
		document.getElementById("first_element_textarea").style.display="none"

		document.getElementById("select_operator").style.display="block"
		
		document.getElementById("select_second_element").style.display="block"
		document.getElementById("second_element_textarea").style.display="none"

		document.getElementById("addCondition").disabled = false;

	

	}else if (variabile=="textarea"){
		document.getElementById("select_first_element").style.display="none"
		document.getElementById("first_element_textarea").style.display="block"
		
		document.getElementById("select_operator").style.display="block"
		
		document.getElementById("select_second_element").style.display="none"
		document.getElementById("second_element_textarea").style.display="block"

		document.getElementById("addCondition").disabled = false;

	}else if (variabile=="none"){
		document.getElementById("select_first_element").style.display="none"
		document.getElementById("first_element_textarea").style.display="none"
		
		document.getElementById("select_operator").style.display="none"
		
		document.getElementById("second_element_textarea").style.display="none"
		document.getElementById("select_second_element").style.display="none"

		document.getElementById("addCondition").disabled = true;
	}

}
var number_condition=1

var condition_query="#"

function addCondition(){

	document.getElementById("addCondition").disabled = true;
	document.getElementById("addAnd").disabled = false;
	document.getElementById("addOr").disabled = false;

	let select_first = document.getElementById("select_first_element")
	//let select_first_prime = select_first.cloneNode(true)
	//select_first_prime.id="select_first_element_"+number_condition

	let select_operator = document.getElementById("select_operator")
	//let select_operator_prime = select_operator.cloneNode(true)
	//select_operator_prime.id="select_operator_element_"+number_condition

	let select_second= document.getElementById("select_second_element")
	//let select_second_prime = select_second.cloneNode(true)
	//select_second_prime.id="select_second_element_"+number_condition


	let textarea_second = document.getElementById("second_element_textarea")
	let textarea_first = document.getElementById("first_element_textarea")
	//let textarea_second_prime = textarea_second.cloneNode(true)
	//textarea_second_prime.id="second_element_textarea"+number_condition
	
	var myDiv = document.getElementById("qc2");

	//var generalDiv=document.createElement('div');

	var condSpan = document.createElement('span');

	if(document.getElementById("select_second_element").style.display == "block"){
		stringCond = select_first.value+" "+select_operator.value+" "+select_second.value;
	}else if(document.getElementById("second_element_textarea").style.display == "block"){
		stringCond = textarea_first.value.trim()+" "+select_operator.value+" "+textarea_second.value.trim();
	}
	

	condition_query=condition_query+" "+stringCond

	condSpan.innerHTML=stringCond;
	var removeCondButt = document.createElement('button');
	removeCondButt.innerHTML="Remove"
	removeCondButt.class=stringCond
	
	removeCondButt.addEventListener ("click", function(e,stringCond) {
		console.log(e.target.closest('div').textContent.slice(0, -6))
		console.log(condition_query)

		if(condition_query.split("#").length == 3){

			// console.log("lunghezza 3")
			// console.log(condition_query.split("#"))

			condition_query=condition_query.replace("# "+e.target.closest('div').textContent.slice(0, -6),"")

			condition_query=condition_query.trim()

			//condition_query=condition_query.replace("or ","")
			//condition_query=condition_query.replace("and ","")
			
			// console.log(condition_query.length)
			if(condition_query.length==0){
				condition_query="#"
			}
		}else if(condition_query.split("#").length == 2){
			condition_query=condition_query.replace("# "+e.target.closest('div').textContent.slice(0, -6),"")
			document.getElementById("addCondition").disabled = false;
			document.getElementById("addAnd").disabled = true;
			document.getElementById("addOr").disabled = true;
			condition_query=condition_query.trim()
			// console.log(condition_query.length)
			if(condition_query.length==0){
				condition_query="#"
			}
		}else{
			condition_query=condition_query.replace("# "+e.target.closest('div').textContent.slice(0, -6),"")
			condition_query=condition_query.trim()
			// console.log(condition_query.length)
			if(condition_query.length==0){
				condition_query="#"
			}
		}
		
		// console.log(condition_query)
		e.target.closest('div').remove()
		// console.log(e.target.class)
		// console.log(condition_query.split("#"))

		if(condition_query.split("#").length == 2){
			condition_query=condition_query.replace("# "+e.target.closest('div').textContent.slice(0, -6),"")

			condition_query=condition_query.trim()
			// console.log(condition_query.length)
			if(condition_query.length==0){
				condition_query="#"
			}
		}

	})
	
	
	if($("#" + "Condition"+number_condition).length == 0) {
		//it doesn't exist
		var generalDiv=document.createElement('div');
		generalDiv.id="Condition"+number_condition
	}else{
		var generalDiv = document.getElementById("Condition"+number_condition);
	}

	condSpan.style = "font-size: 16px; padding-right:14px;"
	removeCondButt.style = "font-size: 16px; width=25%"

	generalDiv.appendChild(condSpan)
	generalDiv.appendChild(removeCondButt)

	another_div=document.getElementById("where_condition")
	
	another_div.appendChild(generalDiv)
	//myDiv.appendChild(select_operator_prime)
	//myDiv.appendChild(select_second_prime)
	//myDiv.appendChild(textarea_second_prime)
	
	
	number_condition=number_condition+1
	// console.log(condition_query)
}

function addAnd(){
	document.getElementById("addCondition").disabled = false;
	document.getElementById("addAnd").disabled = true;
	document.getElementById("addOr").disabled = true;
	condition_query=condition_query+" # "+"and";

	var operatorSpan = document.createElement('span');
	operatorSpan.innerHTML="and ";
	operatorSpan.style = "font-size: 16px;"

	var generalDiv=document.createElement('div');
	generalDiv.id = "Condition"+number_condition
	
	//var myDiv = document.getElementById("qc2");
	//myDiv.appendChild(generalDiv)
	another_div=document.getElementById("where_condition")
	another_div.appendChild(generalDiv)

	var div_div = document.getElementById("Condition"+number_condition);
	div_div.appendChild(operatorSpan)

	// console.log(condition_query)
}

function addOr(){
	document.getElementById("addCondition").disabled = false;
	document.getElementById("addAnd").disabled = true;
	document.getElementById("addOr").disabled = true;	
	condition_query=condition_query+" # "+"or";

	var operatorSpan = document.createElement('span');
	operatorSpan.innerHTML="or "
	operatorSpan.style = "font-size: 16px;"

	var generalDiv=document.createElement('div');
	generalDiv.id = "Condition"+number_condition
	
	//var myDiv = document.getElementById("qc2");
	//myDiv.appendChild(generalDiv)
	another_div=document.getElementById("where_condition")
	another_div.appendChild(generalDiv)

	var div_div = document.getElementById("Condition"+number_condition);
	div_div.appendChild(operatorSpan)

	// console.log(condition_query)
}

function backMakeQuery(){
	document.getElementById("formQuery3").style.display = "none"
	document.getElementById("formQuery2").style.display = "block"

}

function applicaFiltro(){

	document.getElementById("formQuery3").style.display = "block"
	document.getElementById("formQuery2").style.display = "none"

	// console.log(condition_query)
	// console.log(from_list)
	// console.log(element_list_select)
	var querySelectString="select distinct "
	var queryFromString="from "
	var queryWhereString="where "

	//const array1 = ['a', 'b', 'c'];

	for (const element of element_list_select) {
		// console.log(element);
		querySelectString=querySelectString+" "+element
		querySelectString=querySelectString+","
	}
	querySelectString=querySelectString.slice(0, -1)
	// console.log(querySelectString)


	for (const element of from_list) {
		// console.log(element);
		queryFromString=queryFromString+" log_db "+element
		queryFromString=queryFromString+","
	}
	queryFromString=queryFromString.slice(0, -1)
	// console.log(queryFromString)

	var cond_q_filt=condition_query;
	if(cond_q_filt.split("#").length == 2){
		cond_q_filt=cond_q_filt.replace(" or","")
		cond_q_filt=cond_q_filt.replace(" and","")
	}

	for (const element of cond_q_filt.split("#")) {
		console.log(element);
		queryWhereString=queryWhereString+" "+element.trim()
	}
		
	// console.log(queryWhereString)
	cond_q_filt_where=queryWhereString.replace("where","")
	if(!cond_q_filt_where.replace(/\s/g, '').length){
		var totalQuery=querySelectString+" "+queryFromString
	}else{
		var totalQuery=querySelectString+" "+queryFromString+" "+queryWhereString
	}


	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", makeQueryListener);
	oReq.open("GET", frontend+"makeQuery?query="+totalQuery+"&selectpart="+querySelectString, false);
	oReq.send();

}

function editQuery1(){
	document.getElementById("blocker_editQuery1").style.display = "block";
    document.getElementById("editQuery1").style.display = "block";
	fetchEditContent();
}

function closeEditQuery1(){
    //console.log("Function: closePopupDslName()")

    document.getElementById("blocker_editQuery1").style.display = "none";
    document.getElementById("editQuery1").style.display = "none";
}


function addSpaceToEndOfEachLine(contenuto) {
	// Get the textarea element
	
	// Get the content of the textarea
	const content = contenuto
	
	// Split the content into lines
	const lines = content.split('\n');
	
	// Add a space at the end of each line
	const modifiedLines = lines.map(line => line + ' ');
	
	// Join the lines back together
	const modifiedContent = modifiedLines.join('\n');
	
	// Set the modified content back to the textarea
	return modifiedContent;
}

function extractSelectPart(sqlQuery) {
	/*
	// Define a regex pattern to match the SELECT part of the query
	const pattern = /(SELECT\s+(DISTINCT)\s+[\s\S]*?)\s+(FROM|SELECT|WHERE)/i;

	// Search for the pattern in the SQL query
	const match = pattern.exec(sqlQuery);

	// If a match is found, return it; otherwise, return null
	if (match) {
		return match[1].trim();
	} else {
		return null;
	}
		*/

	const pattern = /(SELECT\s+[\s\S]*?)\s+(FROM|WHERE|GROUP BY|ORDER BY|HAVING|LIMIT|;)/i;

	// Search for the pattern in the SQL query
	const match = pattern.exec(sqlQuery);

	// If a match is found, return it; otherwise, return null
	if (match) {
		return match[1].trim();
	} else {
		return null;
	}
}


function applicaFiltroLibero(){



	document.getElementById("formQuery3").style.display = "block"
	document.getElementById("formQuery2").style.display = "none"

	// console.log(condition_query)
	// console.log(from_list)
	// console.log(element_list_select)
	var querySelectString="select distinct "
	var queryFromString="from "
	var queryWhereString="where "

	//const array1 = ['a', 'b', 'c'];

	var textQuery = (document.getElementById('all_query_textarea').value).trim();

	var select_part = extractSelectPart(textQuery).trim();
	
	console.log(textQuery)
	console.log(select_part)
	var totalQuery=addSpaceToEndOfEachLine(textQuery)
	querySelectString=select_part

	$("#loadingMessage").css("visibility", "visible");
	setTimeout(() => {
	
		var oReq = new XMLHttpRequest();
		oReq.addEventListener("load", makeQueryListener);
		oReq.open("GET", frontend+"makeQueryLibera?query="+totalQuery+"&selectpart="+querySelectString, false);
		oReq.send();

		$("#loadingMessage").css("visibility", "hidden");

	}, 7);

}

function makeQueryListener(){
	
	// console.log(this.responseText)
	var risposta=this.responseText.split("£");

	document.getElementById("result_div").innerHTML = ""
	// console.log("gfr")
	
	var array_query= risposta[0].split("\n")
	// console.log(array_query.length)

	//var headers = ["Title", "Author", "Read?"];
    var table = document.createElement("TABLE");  //makes a table element for the page

	table.setAttribute('class', 'styled-table');
        
	
    for(var i = 0; i < array_query.length; i++) {
        var row = table.insertRow(i);
		//console.log()
		elementi_row=array_query[i].split(",")
		
		for (var j = 0; j < elementi_row.length; j++) {
			
			//d = date_time.strftime("%m/%d/%Y, %H:%M:%S")
			// console.log(typeof elementi_row[j]);
			row.insertCell(j).innerHTML = elementi_row[j];
		}
    }

	
    var header = table.createTHead();
    var headerRow = header.insertRow(0);
	var hed = risposta[1].split(",")
    for(var i = 0; i < hed.length; i++) {
        headerRow.insertCell(i).innerHTML = hed[i];
    }
	
	

    document.getElementById("result_div").append(table);
	/*
	var risposta = this.responseText.split("£");

	document.getElementById("result_div").innerHTML = "";

	// Split the response into rows
	var array_query = risposta[0].split("\n");

	// Create the table element
	var table = document.createElement("TABLE");
	table.setAttribute('class', 'styled-table');

	// Create the tbody element
	var tbody = document.createElement("TBODY");

	// Apply the desired CSS styles to tbody
	tbody.style.maxHeight = "200px";
	tbody.style.overflowY = "auto";
	tbody.style.display = "block"; // Ensure it behaves correctly with the applied styles


	for(var i = 0; i < array_query.length; i++) {
        var row = tbody.insertRow(i);
		//console.log()
		elementi_row=array_query[i].split(",")
		
		for (var j = 0; j < elementi_row.length; j++) {
			
			//d = date_time.strftime("%m/%d/%Y, %H:%M:%S")
			// console.log(typeof elementi_row[j]);
			row.insertCell(j).innerHTML = elementi_row[j];
		}
    }


	// Append the tbody to the table

	// Create the thead element and populate it with header cells
	var header = table.createTHead();
	var headerRow = header.insertRow(0);
	var hed = risposta[1].split(",");
	for (var i = 0; i < hed.length; i++) {
		headerRow.insertCell(i).innerHTML = hed[i];
	}

	table.appendChild(tbody);

	// Append the table to the result_div
	document.getElementById("result_div").append(table);
	*/
}

function goback(){
	// console.log("work? or not")
	document.getElementById("formQuery").style.display = "block"
	document.getElementById("formQuery2").style.display = "none"
}


function doQuery1(){
	document.getElementById("formQuery3").style.display = "block"
	document.getElementById("formQuery2").style.display = "none"


	$("#loadingMessage").css("visibility", "visible");
	setTimeout(() => {
		var oReq = new XMLHttpRequest();
		oReq.addEventListener("load", makeQueryListener);
		oReq.open("GET", frontend+"doQuery1", false);
		oReq.send();

		$("#loadingMessage").css("visibility", "hidden");

	}, 7);
}



function doQuery2(){
	document.getElementById("formQuery3").style.display = "block"
	document.getElementById("formQuery2").style.display = "none"

	$("#loadingMessage").css("visibility", "visible");
	setTimeout(() => {
		var oReq = new XMLHttpRequest();
		oReq.addEventListener("load", makeQueryListener);
		oReq.open("GET", frontend+"doQuery2", false);
		oReq.send();
		
		$("#loadingMessage").css("visibility", "hidden");

	}, 7);
}

function doPersonalizedQuery(id){
	document.getElementById("formQuery3").style.display = "block"
	document.getElementById("formQuery2").style.display = "none"

	$("#loadingMessage").css("visibility", "visible");
	setTimeout(() => {
		var oReq = new XMLHttpRequest();
		oReq.addEventListener("load", makeQueryListener);
		oReq.open("GET", `${frontend}doPersonalizedQuery/${id}`, false);
		oReq.send();

		$("#loadingMessage").css("visibility", "hidden");

	}, 7);
}

function modifyOnClickFunction(buttonId, onClickFunction) {
    // Get the button element by its ID
    const button = document.getElementById(buttonId);
    
    if (button) {
        // Assign the onclick function to the button
        button.onclick = onClickFunction;
    } else {
        console.error(`Button with ID ${buttonId} not found.`);
    }
}

async function fetchEditContentPersonalized(id) {
    try {
        const response = await fetch(`${frontend}readEditPersonalizedQuery/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        var contenuto1 = ((data.content1).split("\n")).join('&#13;&#10;');
        var contenuto2 = ((data.content2).split("\n")).join('&#13;&#10;');
        document.getElementById('descriptionPersonalizedQuery').innerHTML = contenuto1;
        document.getElementById('scriptPersonalizedQuery').innerHTML = contenuto2;
		//modifyOnClickFunction(updateQueryButtonId,updateEditPersonalizedQuery(id));
		document.getElementById( "updateQueryButtonId" ).setAttribute( "onClick", "javascript: updateEditPersonalizedQuery("+id+");" );
		document.getElementById( "deleteQueryButtonId" ).setAttribute( "onClick", "javascript: deletePersonalizedQuery("+id+");" );
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

async function fetchFileContentPersonalized(id) {
    try {
        const response = await fetch(`${frontend}readDescriptionPersonalizedQuery/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        document.getElementById(`description_query_personalized_${id}`).innerText = data.content;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function editPersonalizedQuery(id){
	document.getElementById("blocker_editPersonalizedQuery").style.display = "block";
    document.getElementById("editPersonalizedQuery").style.display = "block";
	fetchEditContentPersonalized(id)
}


function closeEditPersonalizedQuery(){
    document.getElementById("blocker_editPersonalizedQuery").style.display = "none";
    document.getElementById("editPersonalizedQuery").style.display = "none";
}


function updateEditPersonalizedQuery(id){
	console.log("perche")
	console.log(id)
	closeEditPersonalizedQuery();
	makeEditPersonalizedQuery(id);
	console.log(id)
	console.log("bo")
}

async function makeEditPersonalizedQuery(id) {
	console.log(id)
    const description = document.getElementById('descriptionPersonalizedQuery').value;
    const query = document.getElementById('scriptPersonalizedQuery').value;

    if (!description.trim() || !query.trim()) {
        alert('Description and Query cannot be empty!');
        return;
    }

    // Check for forbidden SQL keywords
    const forbiddenKeywords = ["delete", "drop", "insert"];
    const queryLowerCase = query.toLowerCase();
    for (let keyword of forbiddenKeywords) {
        if (queryLowerCase.includes(keyword)) {
            alert('Error: SQL query contains forbidden keywords (delete, drop, insert)');
            return;
        }
    }

	var url=frontend+"updatePersonalizedQuery/"+id
	console.log(url)

    try {fetch(frontend+"readDescriptionQuery1");
        const response = await fetch(frontend+"updatePersonalizedQuery/"+id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: description,
                query: query
            })
        });

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }

        alert('Query updated successfully!');
        fetchFileContentPersonalized(id); // Refresh content after update
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        alert('Error updating query: ' + error.message);
    }
}


function deletePersonalizedQuery(id){
	const userConfirmed = confirm(`Are you sure you want to delete Query ${id}?`);

    if (!userConfirmed) {
        return;  // Exit the function if the user clicks "Cancel"
    }
	closeEditPersonalizedQuery();
	makeDeletePersonalizedQuery(id);

}

async function makeDeletePersonalizedQuery(id){
	try {
        // Call the API to delete the files
        const response = await fetch(`${frontend}deleteQueries/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }

        alert(data.message);  // Show success message

        // Remove rows from the table that have the cell with the specific id
        const rows = document.querySelectorAll(`#tabellaQuery tbody tr`);
        rows.forEach(row => {
            const cell = row.querySelector(`#description_query_personalized_${id}`);
            if (cell) {
                row.remove();  // Remove the entire row if the cell with the matching id is found
            }
        });

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        alert('Error deleting files or removing rows: ' + error.message);
    }
}

async function loadQueriesAndDescriptions() {

	const existingRows = document.querySelectorAll('#tabellaQuery .newrows');
    existingRows.forEach(row => row.remove());


    try {
        const response = await fetch(`${frontend}getQueriesAndDescriptions`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        const table = document.getElementById('tabellaQuery').getElementsByTagName('tbody')[0];

        data.forEach(item => {
            const newRow = table.insertRow();
            newRow.style.backgroundColor = '#e9deeb';
			newRow.className = 'newrows';

            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            const cell3 = newRow.insertCell(2);

            const queryId = `Query ${item.id}`;
            cell1.style.border = '1px solid #cfa8d5';
            cell1.style.padding = '8px';
            cell1.textContent = queryId;

            cell2.style.border = '1px solid #cfa8d5';
            cell2.style.padding = '8px';
            cell2.textContent = item.description;
            cell2.id = `description_query_personalized_${item.id}`;

            cell3.style.border = '1px solid #cfa8d5';
            cell3.style.padding = '8px';
            cell3.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <button class="conf_check_button" onclick="doPersonalizedQuery(${item.id})" type="button" style="font-size: 16px; width: 120px; height: 30px;">Run ${queryId}</button>
                    <button class="conf_check_button" onclick="editPersonalizedQuery(${item.id})" type="button" style="font-size: 16px; width: 120px; height: 30px; margin-top: 10px;">Edit ${queryId}</button>
                </div>
            `;
        });
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        alert('Error loading queries and descriptions: ' + error.message);
    }
}

