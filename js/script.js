// creating a local storagegroupssave
if (!localStorage.getItem("groupssave")) {
	localStorage.setItem('groupssave','[]')
}
if (!localStorage.getItem("tasksave")) {
	localStorage.setItem('tasksave','[]')
}

// downloading groups from a local storage
const download = element =>{
	let groupsave = JSON.parse(localStorage.getItem("groupssave"));
	document.querySelector('.main').innerHTML = "";
	groupsave.forEach(function(item){
		let div = `
		<div text='${item.text}'  id="${item.timeCreate}" class="option ${item.important}">
		<div class='name_and_arrow'onclick="acordion(this)">
		<div class='arrow__ul'>
		<i class='material-icons'>keyboard_arrow_down</i>
		</div>
		<div class='text__ul'>${item.text}</div>
		</div>
		<div class='edit_group importance_star ${item.important}' id='imortant_group'  onmouseout="effectcl(this)" onmouseover="effect(this)" onclick="important_group(this)">
		<i class='material-icons'>star</i>
		</div>
		<div class='edit_group'  onmouseout="effectcl(this)" onmouseover="effect(this)" onclick="deleter(this)">
		<i class='material-icons'>delete</i>	
		</div>
		</div>
		<div class="option_absolute"></div>
		`;
		document.querySelector('.main').innerHTML += div;
	})
}




// downloading tasks from a local storage
const tasks_on = element => {
	let Tasks = JSON.parse(localStorage.getItem("tasksave"));
	Tasks.forEach(function(obj){
		let today = new Date(obj.timeCreate);
		let div = `
		<div class='full_task'  id="${obj.id}">
		<div  where="${obj.where}" text='${obj.text}' timecr='${obj.timeCreate}' class="task_options" done='${obj.done}'>
		<div class="ready_task" onclick='done_option(this)'>
		<div class="block_task ${obj.done}"></div>
		</div>
		<div class="task_original">
		<p class="p__original ${obj.done}">${obj.text}</p>
		<p class="p__date">${today.getDate()}.${checkTime(today.getMonth()+1)}.${today.getFullYear()}</p>
		</div>
		<div class="edit_original" onclick="open_options_task(this)" onmouseout="mouse_out_effect_vertical_lines(this)" onmouseover="mouse_on_effect_vertical_lines(this)">
		<p class="edit_p_original"><i class='material-icons'>settings</i></p>
		</div>
		</div>
		<div class="options_task">
		<div class="info_tools" onclick='close_options(this)' onmouseout="mouse_out_effect_vertical_lines(this)" onmouseover="mouse_on_effect_vertical_lines(this)">
		<i class="material-icons">close</i>
		</div>
		<div class="tools_original">
		<div class="tools_editor" onmouseout="mouse_out_effect_vertical_lines(this)" onmouseover="mouse_on_effect_vertical_lines(this)" onclick="open_modal(this)">
		<i class="material-icons">edit</i>
		</div>
		<div class="tools_deletor" onclick='del_task(this)'onmouseout="mouse_out_effect_vertical_lines(this)" onmouseover="mouse_on_effect_vertical_lines(this)">
		<i class="material-icons">delete</i>
		</div>
		</div>
		<p class="p__date" id="p_date_tools">${today.getDate()}.${checkTime(today.getMonth()+1)}.${today.getFullYear()} at ${checkTime(today.getHours())}:${checkTime(today.getMinutes())}, in ${obj.where}</p>
		</div>
		</div>
		`
		if (obj.GroupId != null){
			document.getElementById(obj.GroupId).nextElementSibling.innerHTML += div;
		}
		else{
			document.querySelector('.main').innerHTML += div;
			document.getElementById(obj.id).setAttribute('class',"full_task task_no_group");
		}
	})
}


// cleare all local storage
const localfree = element => {
	localStorage.removeItem("groupssave");
	localStorage.setItem('groupssave','[]')
	localStorage.removeItem("tasksave");
	localStorage.setItem('tasksave','[]')
	document.querySelector('.main').innerHTML = "";
	notification('Everything was successfully deleted');
}



// opening a input for creating a group
const add_group = element =>{
	document.querySelector('.form_add_gr').classList.add('anikamation');
	setTimeout(function (){
		document.querySelector('.form_add_gr').classList.add('anikamation_go');
	},100)
}




// creting a group
document.querySelector(".form_add_gr").addEventListener("submit",function(el){
	el.preventDefault();
	let field = el.target.elements.add_group.value;
	document.querySelector(".form_add_gr input").value = "";
	if (field.trim().length == 0) {
		document.querySelector('.form_add_gr').classList.remove('anikamation_go');
		setTimeout(function (){
			document.querySelector('.form_add_gr').classList.remove('anikamation');
		},100)
	}
	else{
		let theSame = JSON.parse(localStorage.getItem("groupssave")).filter(obj => field == obj.text);
		if (theSame.length) {
			notification('The same group already exists');
		}
		else{
			let obj = {
				timeCreate: Date.now(),
				text: field,
				important: ''
			};
			let addOne = JSON.parse(localStorage.getItem("groupssave"));
			addOne.push(obj);
			localStorage.setItem("groupssave", JSON.stringify(addOne));
			let group = `
			<div class='option'  text='${obj.text}'  id="${obj.timeCreate}">
			<div class='name_and_arrow'onclick="acordion(this)">
			<div class='arrow__ul'>
			<i class='material-icons'>keyboard_arrow_down</i>
			</div>
			<div class='text__ul'>${obj.text}</div>
			</div>
			<div class='edit_group importance_star' id='imortant_group'  onmouseout="effectcl(this)" onmouseover="effect(this)" onclick="important_group(this)">
			<i class='material-icons'>star</i>
			</div>
			<div class='edit_group'  onmouseout="effectcl(this)" onmouseover="effect(this)" onclick="deleter(this)">
			<i class='material-icons'>delete</i>	
			</div>
			</div>
			<div class="option_absolute"></div>`;
			document.querySelector('.main').innerHTML += group;
			notification('New Group was created');
		}
	}
})



//closing form for creating a group by blur
document.querySelector(".form_add_gr").addEventListener("blur", function( closet ) {
	document.querySelector('.form_add_gr').classList.remove('anikamation_go');
	setTimeout(function (){
		document.querySelector('.form_add_gr').classList.remove('anikamation');
		document.querySelector(".form_add_gr input").value = "";
	},100)
}, true);



// Click clock
const startTime = element =>{
	const WhichDay = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	let today = new Date();
	document.querySelector('.time_date_s1').innerHTML = WhichDay[today.getDay()];
	document.querySelector('.day_date_s1').innerHTML = checkTime(today.getDate()) + "." + checkTime(today.getMonth()+1) + "." + today.getFullYear();
}
const checkTime = element =>{
	if (element < 10) {element = "0" + element};
	return element;
}



// Cool Hover Effects
const effect = element => {
	element.classList.add('effect_on');
}
const effectcl = element => {
	element.classList.remove('effect_on');
}



// acordion for a group
const acordion = element => {
	let arrow_group = element.firstElementChild;
	let tasks_container = element.parentElement.nextElementSibling;
	let childs = Array.from(tasks_container.children);
	let numbers = [];
	childs.forEach(function(item){
		numbers.push(item.offsetHeight);
	});
	if (tasks_container.childElementCount == 0) {
		notification('No Tasks Found');
		arrow_group.classList.remove('done_arrow');
	}
	else{
		if(tasks_container.style.maxHeight) {
			tasks_container.style.maxHeight = null;
			arrow_group.classList.remove('done_arrow');
		}
		else{
			tasks_container.style.maxHeight = `${numbers.reduce(function(acc, val) { return acc + val; }, 0)}px`;
			tasks_container.classList.toggle('option_absolute_go');
			arrow_group.classList.add('done_arrow');
		}
	}
}




// opening a task creator
const open_task_creator = element =>{
	document.querySelector('body').classList.add('body_over');
	setTimeout(function (){
		document.getElementById('video_background').pause();
	},100)
	document.querySelector('.header').classList.add('headerd');
	document.querySelector('.main').classList.add('mainrd');
	document.querySelector('.add_task_menu').classList.add('go_vid');
	document.querySelector('.button_pick_add').classList.add('clope_g');
	document.querySelector('.button_pick_add__task').classList.add('clope_d');
	document.querySelector('.footer_menu').classList.add('footer_plus');
	document.querySelector('.clear_local_storage').classList.add('trash_hide');
	let text_div = "";
	document.querySelector('.selector_for_options').innerHTML = '';
	text_div += `<div class="select" onclick="select_option_selector(this)">No group</div>`
	JSON.parse(localStorage.getItem("groupssave")).forEach(function(item){
		return text_div += `<div class="select" onclick="select_option_selector(this)">`+item.text+`</div>`
	})
	document.querySelector('.selector_for_options').innerHTML += text_div;
	if (document.querySelector('.selector_for_options').childElementCount == 0) {
		console.log('no groups found')
	}
}



// closing a task creator
const close_task_creator = element => {
	document.querySelector('body').classList.remove('body_over');
	document.querySelector('.header').classList.remove('headerd');
	document.querySelector('.main').classList.remove('mainrd');
	document.querySelector('.add_task_menu').classList.remove('go_vid');
	document.querySelector('.button_pick_add').classList.remove('clope_g');
	document.querySelector('.button_pick_add__task').classList.remove('clope_d');
	document.querySelector('.footer_menu').classList.remove('footer_plus');
	document.querySelector('.clear_local_storage').classList.remove('trash_hide');
	setTimeout(function (){
		document.getElementById('video_background').play();
	},100)
}



// Deleting all task that are connected to the deleted group
const delete_all_related_task = argument => {
	let filtered = JSON.parse(localStorage.getItem("tasksave")).filter(obj => +obj.GroupId !== +argument);
	localStorage.setItem("tasksave", JSON.stringify(filtered));
}
// Deleting a group
const deleter = argument => {
	let check_for_importance = JSON.parse(localStorage.getItem("groupssave")).filter(obj => +obj.timeCreate == +argument.parentElement.getAttribute("id"));
	if (check_for_importance[0].important.length == 0) {
		argument.parentElement.nextElementSibling.remove();
		argument.parentElement.remove();
		let filtered = JSON.parse(localStorage.getItem("groupssave")).filter(obj => +obj.timeCreate !== +argument.parentElement.getAttribute("id"));
		localStorage.setItem("groupssave", JSON.stringify(filtered));
		document.querySelector(".input_for_task__in").value = "";
		delete_all_related_task(argument.parentElement.getAttribute("id"));
		notification('A group was successfully deleted');
	} else {
		open_modal_question({text: "Delete Important Group",fun: "delete_in_all("+argument.parentElement.getAttribute("id")+")"});
	}
}



// deleting a group despite an importance
const delete_in_all = element_id => {
	let result =[];
	document.querySelectorAll('.option').forEach(function(item){
		if (+item.getAttribute("id") === +element_id) {
			result.push(item);
		}
	})
	result[0].nextElementSibling.remove();
	result[0].remove();
	let filtered = JSON.parse(localStorage.getItem("groupssave")).filter(obj => +obj.timeCreate !== +element_id);
	localStorage.setItem("groupssave", JSON.stringify(filtered));
	delete_all_related_task(element_id);
	document.querySelector(".input_for_task__in").value = "";
	notification("Important Group Deleted");
	answer_no_question();
	notification('A group was successfully deleted');
}



// weather
const apikey = 'dc679c4958e56033bfd7eeccd743acda';
let request = new XMLHttpRequest();
request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=Lviv,ua&appid='+apikey+'', true);
request.onload = function() {
	// Begin accessing JSON data here
	let data = JSON.parse(this.response)
	let temperature = data.main.temp;
	document.querySelector('.temperature').innerText += Math.round(temperature-273.15) + "°";
	let icon_weather = 'http://openweathermap.org/img/w/'+data.weather[0].icon+'.png';
	document.querySelector('.img_weather').setAttribute('src',icon_weather);
}
request.send();



// opening and closing selection
const open_selector_groups_input = element => {
	console.log("dfdfdfdf")
	let childs = Array.from(document.querySelector('.selector_for_options').children);
	let numbers = [];
	childs.forEach(function(item){numbers.push(item.offsetHeight);});
	let height_of_childs = numbers.reduce(function(acc, val) { return acc + val; }, 0);
	if (document.querySelector('.selector_for_options').childElementCount != 0) {
		if(!document.querySelector('.selector_for_options').style.maxHeight) {
			if (height_of_childs > 105) {
				document.querySelector('.selector_for_options').style.maxHeight = '105px';
			} else {
				document.querySelector('.selector_for_options').style.maxHeight = `${numbers.reduce(function(acc, val) { return acc + val; }, 0)}px`;
			}
			document.querySelector('.selector_for_options').classList.add('selector_for_options_on');
			document.querySelector('.arrow_down_t').classList.add('opened');
		}
		else{
			document.querySelector('.selector_for_options').classList.remove('selector_for_options_on');
			document.querySelector('.selector_for_options').style.maxHeight = null;
			document.querySelector('.arrow_down_t').classList.remove('opened');
		}
	}
	else{
		notification('No Groups Found');
	}
}


// select an option
const select_option_selector = element => {
	document.querySelector('.input_for_task__in').value = element.innerText;
}



// creating a task
document.querySelector(".form__add_task_menu").addEventListener("submit",function(eli){
	eli.preventDefault();
	if (eli.target.elements.add_task.value.trim().length == 0 || eli.target.elements.add_task__in.value.trim().length == 0) {
		notification('Please enter task or group');
	}
	else{
		unique_id_group = null
		where_ = null
		if (eli.target.elements.add_task__in.value != "No group"){
			let filtered = JSON.parse(localStorage.getItem("groupssave")).filter(obj => obj.text == eli.target.elements.add_task__in.value);
			unique_id_group = filtered[0].timeCreate
			where_ = eli.target.elements.add_task__in.value
		}
		let obj = {
			timeCreate: new Date(),
			id: Date.now(),
			GroupId: unique_id_group,
			text: eli.target.elements.add_task.value,
			where: eli.target.elements.add_task__in.value,
			done: ""
		};
		let arr = JSON.parse(localStorage.getItem("tasksave"));
		arr.push(obj);
		localStorage.setItem("tasksave", JSON.stringify(arr));
		document.querySelector(".input_for_task").value = "";
		let div = `
		<div class='full_task'  id="${obj.id}">
		<div  where="${obj.where}" text='${obj.text}' timecr='${obj.timeCreate}' class="task_options" done='${obj.done}'>
		<div class="ready_task" onclick='done_option(this)'>
		<div class="block_task ${obj.done}"></div>
		</div>
		<div class="task_original">
		<p class="p__original ${obj.done}">${obj.text}</p>
		<p class="p__date">${obj.timeCreate.getDate()}.${checkTime(obj.timeCreate.getMonth()+1)}.${obj.timeCreate.getFullYear()}</p>
		</div>
		<div class="edit_original" onclick="open_options_task(this)" onmouseout="mouse_out_effect_vertical_lines(this)" onmouseover="mouse_on_effect_vertical_lines(this)">
		<p class="edit_p_original"><i class='material-icons'>settings</i></p>
		</div>
		</div>
		<div class="options_task">
		<div class="info_tools" onclick='close_options(this)' onmouseout="mouse_out_effect_vertical_lines(this)" onmouseover="mouse_on_effect_vertical_lines(this)">
		<i class="material-icons">close</i>
		</div>
		<div class="tools_original">
		<div class="tools_editor" onmouseout="mouse_out_effect_vertical_lines(this)" onmouseover="mouse_on_effect_vertical_lines(this)" onclick="open_modal(this)">
		<i class="material-icons">edit</i>
		</div>
		<div class="tools_deletor" onclick='del_task(this)'onmouseout="mouse_out_effect_vertical_lines(this)" onmouseover="mouse_on_effect_vertical_lines(this)">
		<i class="material-icons">delete</i>
		</div>
		</div>
		<p class="p__date" id="p_date_tools">${obj.timeCreate.getDate()}.${checkTime(obj.timeCreate.getMonth()+1)}.${obj.timeCreate.getFullYear()} at ${checkTime(obj.timeCreate.getHours())}:${checkTime(obj.timeCreate.getMinutes())}, in ${obj.where}</p>
		</div>
		</div>
		`
		if (obj.GroupId != null){
			document.getElementById(obj.GroupId).nextElementSibling.innerHTML += div;
		}
		else{
			document.querySelector('.main').innerHTML += div;
			document.getElementById(obj.id).setAttribute('class',"full_task task_no_group");
		}
		notification('New Task Was Created');
	}
})



// efect on icon 'settings'
const mouse_on_effect_vertical_lines = element =>{
	element.classList.add('effect_on__task');
}
const mouse_out_effect_vertical_lines = element =>{
	element.classList.remove('effect_on__task');
}



// opening and closing tools for task
const open_options_task = element =>{
	element.parentElement.classList.add('margin_task');
	element.parentElement.nextElementSibling.classList.add('margin_task_task_options');
}
const close_options = element =>{
	element.parentElement.classList.remove('margin_task_task_options');
	element.parentElement.previousElementSibling.classList.remove('margin_task');
}


// deleting a task
const del_task = element =>{
	let dad = element.parentElement.parentElement.parentElement;
	dad.classList.add('width_0');
	setTimeout(function (){
		dad.remove();
		let filtered = JSON.parse(localStorage.getItem("tasksave")).filter(obj => +obj.id !== +dad.getAttribute("id"));
		localStorage.setItem("tasksave", JSON.stringify(filtered));
	},205)
}
// deleting a task by id from argument
const del_task_id = argument =>{
	document.getElementById(argument).classList.add('width_0');
	setTimeout(function (){
		document.getElementById(argument).remove();
		let filtered = JSON.parse(localStorage.getItem("tasksave")).filter(obj => +obj.id !== +argument);
		localStorage.setItem("tasksave", JSON.stringify(filtered));
	},205)
}



//making important a group
const important_group = argument =>{
	let main_contact = argument.parentElement;
	let main_contact_id = main_contact.getAttribute("id");
	let groups = JSON.parse(localStorage.getItem("groupssave"));
	let arr = [];
	groups.forEach(function(item){
		arr.push(item.timeCreate);
	})
	let current = arr.indexOf(+main_contact_id);
	if (groups[current].important.trim().length == 0) {
		groups[current].important = 'true';
		main_contact.classList.add('true');
		argument.classList.add('true');
	} else {
		groups[current].important = '';
		main_contact.classList.remove('true');
		argument.classList.remove('true');
		console.log("BAD");
	};
	localStorage.setItem("groupssave", JSON.stringify(groups))
}




// task done
const done_option = argument =>{
	let main_contact = argument.parentElement.parentElement;
	let main_contact_id = main_contact.getAttribute("id");
	let tasksave = JSON.parse(localStorage.getItem("tasksave"));
	let arr = [];
	tasksave.forEach(function(item){arr.push(item.id);})
	let current = arr.indexOf(+main_contact_id);
	if (tasksave[current].done.trim().length == 0) {
		tasksave[current].done = 'true';
		main_contact.firstElementChild.firstElementChild.firstElementChild.classList.add('true');
		main_contact.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.classList.add('true');
	} else {
		tasksave[current].done = '';
		argument.classList.remove('true');
		main_contact.firstElementChild.firstElementChild.firstElementChild.classList.remove('true');
		main_contact.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.classList.remove('true');
	}
	localStorage.setItem("tasksave", JSON.stringify(tasksave));
}



// closing and opening modal window
const open_modal = argument =>{
	let OurTask = JSON.parse(localStorage.getItem("tasksave")).filter(obj => +obj.id == +argument.parentElement.parentElement.parentElement.getAttribute("id"));
	if (!OurTask.length) {
		notification("We can't find this task in Local Storage");
	}
	else{
		let today = new Date(OurTask[0].timeCreate);
		document.querySelector('#time_modal').innerText = `Created in `+today.getDate()+`.`+checkTime(today.getMonth()+1)+`.`+today.getFullYear(today.getHours())+` at `+checkTime(today.getHours())+`:`+checkTime(today.getMinutes())+``;
		document.querySelector('.task_editor_modal').value = OurTask[0].text;
		document.querySelector("#task_editor_modal_id__taskID").value = OurTask[0].id;
		document.querySelector('.editor_modal_window').classList.add("modal_window_done");
	}
}
const close_modal = argument => {
	document.querySelector('.editor_modal_window').classList.remove("modal_window_done");
}



// Are u sure about it (Question modal)question_answer_yes
const open_modal_question = argument =>{
	document.querySelector('.task_question_modal').innerText = `Are u sure about '${argument.text}'?`;
	document.querySelector('.question_answer_yes').setAttribute('onclick',argument.fun);
	document.querySelector('.modal_window_question').classList.add("modal_window_done");
}
const answer_no_question = argument =>{
	document.querySelector('.task_question_modal').innerText = `If u can see it then smth went wrong`;
	document.querySelector('.question_answer_yes').setAttribute('onclick','');
	document.querySelector('.modal_window_question').classList.remove("modal_window_done");
}


//editing a task
document.querySelector(".form_modal").addEventListener("submit",function(argument){
	argument.preventDefault();
	let tasks = JSON.parse(localStorage.getItem("tasksave"));
	let arr = [];
	tasks.forEach(function(item){
		arr.push(item.id);
	});
	if (!argument.target.elements.edit_task.value.trim().length == 0) {
		document.getElementById(argument.target.elements.id.value).classList.add('width_0');
		close_modal();
		close_options(document.getElementById(argument.target.elements.id.value).firstElementChild.nextElementSibling.firstElementChild);
		setTimeout(function (){
			document.getElementById(argument.target.elements.id.value).firstElementChild.firstElementChild.nextElementSibling.firstElementChild.innerText = argument.target.elements.edit_task.value;
			document.getElementById(argument.target.elements.id.value).classList.remove('width_0');
		},300)
		let current = arr.indexOf(+argument.target.elements.id.value);
		tasks[current].text = argument.target.elements.edit_task.value;
		localStorage.setItem("tasksave", JSON.stringify(tasks));
		notification('Task was successfully edited');
	}
	else {
		close_modal();
		open_modal_question({text: "Delete this task",fun: "del_task_id("+argument.target.elements.edit_task.value+")"});
	}
})

//  minor animations on start (onload)
const minor_animations_start = argument =>{
	setTimeout(function (){
		document.querySelector('.header').classList.remove('hidden');
	},100)
	setTimeout(function (){
		document.querySelector('.main').classList.remove('minor_animation');
	},200)
}
minor_animations_start();

//notifications
const notification = argument =>{
	document.querySelector('.p_notification_main').innerText = argument;
	setTimeout(function (){
		document.querySelector('.notification_main').classList.add('notification_on');
	},10);
	setTimeout(function (){
		document.querySelector('.notification_main').classList.remove('notification_on');
	},2300);
}


// 3d rotation because of mouse position
const modal_original = document.querySelector('#modal_original_1');
const modal_original2 = document.querySelector('#modal_original_2');
const editor_modal_window = document.querySelector('.editor_modal_window');

modal_original.addEventListener('mousemove', handleMove);
modal_original2.addEventListener('mousemove', handleMove);

// Mouse rotate function
function handleMove(argument){
	const height = 230;
	const width = 440;

	const xVal = argument.layerX;
	const yVal= argument.layerY;
  
	// 20 is the answer why the rotion is so slow or fast
	const yRotation = 20 * ((xVal - width / 2) / width);
	const xRotation = -20 * ((yVal - height / 2) / height);

	const string = 'perspective(520px) scale(1.1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)';
	console.log(yVal)
	if(editor_modal_window.classList.contains('modal_window_done')) {
		modal_original.style.transform = string;
	}
	else{
		modal_original2.style.transform = string;
	}
}


// We take out our mouse from element
modal_original.addEventListener('mouseout', function() {
	modal_original.style.transform = 'perspective(520px) scale(1) rotateX(0) rotateY(0)';
});
modal_original2.addEventListener('mouseout', function() {
	modal_original2.style.transform = 'perspective(520px) scale(1) rotateX(0) rotateY(0)';
});



class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  static displayName = "Точка";
  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(5, 10);
p1.displayName; //undefined
p1.distance;    //undefined
p2.displayName; //undefined
p2.distance;    //undefined


console.log(Point.displayName);      // "Точка"
console.log(Point.distance(p1, p2)); // 7.0710678118654755