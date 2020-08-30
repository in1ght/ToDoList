var bgdel = document.querySelector('.bg_delete');
var no_task_m = document.querySelector('.option_no');
var trash_all = document.querySelector('.clear_local_storage');
var no_text = document.querySelector('.no_text');



// creating a local storage
var main = document.querySelector('.main');
if (!localStorage.getItem("groupssave")) {
	localStorage.setItem('groupssave','[]')
}
if (!localStorage.getItem("tasksave")) {
	localStorage.setItem('tasksave','[]')
}

// downloading groups from a local storage
function download(){
	var groupsave = JSON.parse(localStorage.getItem("groupssave"));
	main.innerHTML = "";
	var div = " ";
	var creators = groupsave.forEach(function(item){
		if (item.important === 'false') {
		return div += `
			<div id='option' text="` +item.text+`" timecr="` +item.timeCreate+`"  important="`+item.important+`">
				<div class='name_and_arrow'onclick="acordion(this)">
					<div class='arrow__ul'>
						<i class='material-icons'>keyboard_arrow_down</i>
					</div>
					<div class='text__ul'>` +item.text+`</div>
				</div>
				<div class='edit_group' id='imortant_group'  onmouseout="effectcl(this)" onmouseover="effect(this)" onclick="important_group(this)">
					<i class='material-icons'>star</i>
				</div>
				<div class='edit_group'  onmouseout="effectcl(this)" onmouseover="effect(this)" onclick="deleter(this)">
					<i class='material-icons'>delete</i>	
				</div>
			</div>
			<div class="option_absolute"></div>`
		}
		else{
			return div += `
			<div id='option' text="` +item.text+`" timecr="` +item.timeCreate+`"  important="`+item.important+`" class="important_true">
				<div class='name_and_arrow'onclick="acordion(this)">
					<div class='arrow__ul'>
						<i class='material-icons'>keyboard_arrow_down</i>
					</div>
					<div class='text__ul'>` +item.text+`</div>
				</div>
				<div class='edit_group important_true_edit' id='imortant_group'  onmouseout="effectcl(this)" onmouseover="effect(this)" onclick="important_group(this)">
					<i class='material-icons'>star</i>
				</div>
				<div class='edit_group'  onmouseout="effectcl(this)" onmouseover="effect(this)" onclick="deleter(this)">
					<i class='material-icons'>delete</i>	
				</div>
			</div>
			<div class="option_absolute"></div>`
		}
	})
	document.querySelector('.main').innerHTML += div;
}




// downloading tasks from a local storage
function tasks_on(){
	var tasksave = JSON.parse(localStorage.getItem("tasksave"));
	var checking_var = [];



	var checplus = tasksave.forEach(function(item){
			var checker = item.where;
			var obj = item;
			var groups = document.querySelectorAll('#option');
			var start_check = groups.forEach(function(item){
				var groups_text = item.getAttribute('text');
				if (groups_text == checker) {
					checking_var.push(obj);

					var eli = item.nextElementSibling;
					var check_if_done =[];
					if (obj.done === 'true') {
						var yes = 'block_task_on';
						check_if_done.push(yes);
						var text12 = 'p__original_on';
						check_if_done.push(text12);
					}
					else{
						var yes = '';
						check_if_done.push(yes);
						var text12 = '';
						check_if_done.push(text12);
					}
					var done_tr = check_if_done[0];
					var done_p_on = check_if_done[1];



					var today = new Date(obj.timeCreate);
					var date = today.getDate();
					var month1 = today.getMonth();
					var month = month1 + 1;
					var hour = today.getHours();
					var minute = today.getMinutes();
					var hour = checkTime(hour);
					var minute = checkTime(minute);
					month = checkTime(month);
					var year = today.getFullYear();

					var div = `
						<div where="`+groups_text+`" text='`+obj.text+`' timecr='`+obj.timeCreate+`' class="task_options" done='`+obj.done+`'>
						<div class="ready_task" onclick='done_option(this)'>
							<div class="block_task `+done_tr+`"></div>
						</div>
							<div class="task_original">
								<p class="p__original `+done_p_on+`">`+obj.text+`</p>
								<p class="p__date">`+date+`.`+month+`.`+year+`</p>
							</div>
							<div class="edit_original" onclick="open_options_task(this)" onmouseout="efect_task(this)" onmouseover="efect_task_on(this)">
								<p class="edit_p_original"><i class='material-icons'>settings</i></p>
							</div>
						</div>
						<div class="options_task">
							<div class="info_tools" onclick='close_options(this)' onmouseout="efect_task(this)" onmouseover="efect_task_on(this)">
								<i class="material-icons">close</i>
							</div>
							<div class="tools_original">
								<div class="tools_editor" onmouseout="efect_task(this)" onmouseover="efect_task_on(this)" onclick="open_modal(this)">
									<i class="material-icons">edit</i>
								</div>
								<div class="tools_deletor" onclick='del_task(this)'onmouseout="efect_task(this)" onmouseover="efect_task_on(this)">
									<i class="material-icons">delete</i>
								</div>
							</div>
							<p class="p__date" id="p_date_tools">`+date+`.`+month+`.`+year+` at `+hour+`:`+minute+`, in `+groups_text+`</p>
						</div>`
					eli.innerHTML += div;
				}
			})
	})
	localStorage.setItem("tasksave", JSON.stringify(checking_var))
}



// cleare all local storage
function localfree(e){
	localStorage.removeItem("groupssave");
	localStorage.setItem('groupssave','[]')
	localStorage.removeItem("tasksave");
	localStorage.setItem('tasksave','[]')
	document.querySelector('.main').innerHTML = "";

	no_text.innerText = "Everything is successfully DELETED";
	setTimeout(function (){
		no_task_m.classList.add('done__no_task_m');
	},10)
	setTimeout(function (){
		no_task_m.classList.remove('done__no_task_m');
	},1900)
	setTimeout(function (){
		no_text.innerText = "No tasks";
	},2100)	
}






// opening a input for creting a group
var anikamation = document.querySelector('.form_add_gr');
function add_group(e){
	anikamation.classList.add('anikamation');
	setTimeout(function (){
		anikamation.classList.add('anikamation_go');
	},100)
}











// creting a group
var groups=[];
var options=[];
document.querySelector(".form_add_gr").addEventListener("submit",function(el){
	el.preventDefault();
	var field = el.target.elements.add_group.value;
	document.querySelector(".form_add_gr input").value = "";
	if (field === '') {
		anikamation.classList.remove('anikamation_go');
		setTimeout(function (){
			anikamation.classList.remove('anikamation');
		},100)
	}
	else{


		var groups__all = document.querySelectorAll('#option');
		var bool_check = [];
		var start_check = groups__all.forEach(function(item){
			var groups_text = item.getAttribute('text');
			if (groups_text === field) {
				var bool_false = false;
				bool_check.push(bool_false);
			}
			else{
			}
		})
		var bool_re = bool_check[0];
		if (bool_re === false) {
			no_text.innerText = "The same group is already created";
			setTimeout(function (){
				no_task_m.classList.add('done__no_task_m');
			},10)
			setTimeout(function (){
			no_task_m.classList.remove('done__no_task_m');
			},1900)
			setTimeout(function (){
				no_text.innerText = "No tasks";
			},2100)		
		}
		else{
			options.push(field);
			groups.push(field);
			var obj = {
				timeCreate: Date.now(),
				text: field,
				important: 'false'
			};
			var arr = JSON.parse(localStorage.getItem("groupssave"));
			arr.push(obj);
			localStorage.setItem("groupssave", JSON.stringify(arr))
			var div = " ";
			var creator = groups.forEach(function(item){
			return div += `
			<div id='option'  text="` +item+`"  timecr="` +obj.timeCreate+`" important="`+obj.important+`">
			<div class='name_and_arrow'onclick="acordion(this)">
			<div class='arrow__ul'>
			<i class='material-icons'>keyboard_arrow_down</i>
			</div>
			<div class='text__ul'>` +item+`</div>
			</div>
			<div class='edit_group' id='imortant_group'  onmouseout="effectcl(this)" onmouseover="effect(this)"  onclick="important_group(this)">
			<i class='material-icons'>star</i>
			</div>
			<div class='edit_group'  onmouseout="effectcl(this)" onmouseover="effect(this)" onclick="deleter(this)">
			<i class='material-icons'>delete</i>	
			</div>
			</div>
			<div class="option_absolute"></div>`})
			document.querySelector('.main').innerHTML += div;
			groups.length = 0;
			document.querySelector(".form_add_gr input").value = "";
		}
	}
})





// closing a input for creating a group
// function closet(e) {
// 	anikamation.classList.remove('anikamation_go');
// 	setTimeout(function (){
// 		anikamation.classList.remove('anikamation');
// 		document.querySelector(".form_add_gr input").value = "";
// 	},100)
// }

var closet1 = document.querySelector(".form_add_gr");
closet1.addEventListener("blur", function( closet ) {
	anikamation.classList.remove('anikamation_go');
	setTimeout(function (){
		anikamation.classList.remove('anikamation');
		document.querySelector(".form_add_gr input").value = "";
	},100)
	console.log('hellooooo')
}, true);







// creting a clock
function startTime() {
	var realday = [];
	var today = new Date();
	var date = today.getDate();
	var month1 = today.getMonth();
	var year = today.getFullYear();
	var day = today.getDay();
	if (day == 1) {
		var dayplus = ['Monday']
		realday.push(dayplus);
	}
	else if (day == 2) {
		var dayplus = ['Tuesday']
		realday.push(dayplus);
	}
	else if (day == 3) {
		var dayplus = ['Wednesday']
		realday.push(dayplus);
	}
	else if (day == 4) {
		var dayplus = ['Thursday']
		realday.push(dayplus);
	}
	else if (day == 5) {
		var dayplus = ['Friday']
		realday.push(dayplus);
	}
	else if (day == 6) {
		var dayplus = ['Saturday']
		realday.push(dayplus);
	}
	else {
		var dayplus = ['Sunday']
		realday.push(dayplus);
	}
	var month = month1 + 1;
	date = checkTime(date);
	month = checkTime(month);
	document.querySelector('.time_date_s1').innerHTML =
	realday;
	document.querySelector('.day_date_s1').innerHTML =
	date + "." + month + "." + year;
	// var test = setTimeout(startTime, 600000);
}
function checkTime(idf) {
	if (idf < 10) {idf = "0" + idf};
	return idf;
}







// cool efects with hover on trash
function effect(e){
	those = e;
	those.classList.add('effect_on');
}
function effectcl(e){
	those = e;
	those.classList.remove('effect_on');
}









// creting a acordion for a group
function acordion(el){
		var elii = el.firstElementChild;
		var cava = [33.5]
		var eli = el.parentElement;
		elkds = eli.nextElementSibling;
		var fffg2 = cava * elkds.childElementCount;
		if (elkds.childElementCount == 0) {
			no_task_m.classList.add('done__no_task_m');
			elii.classList.remove('done_arrow');
			setTimeout(function (){
				no_task_m.classList.remove('done__no_task_m');
			},1900)
		}
		else{
			if(elkds.style.maxHeight) {
				elkds.style.maxHeight = null;
				elii.classList.remove('done_arrow');
			}
			else{
				elkds.style.maxHeight = ""+fffg2+"px";
				elkds.classList.toggle('option_absolute_go');
				elii.classList.add('done_arrow');
			}
		}
}











// opening a task creator
var header = document.querySelector('.header');
var myVideo = document.getElementById('video_background');
var pause_play = document.querySelector('.pause_play');
var add_task_menu = document.querySelector('.add_task_menu');
var clope = document.querySelector('.button_pick_add');
var cloped = document.querySelector('.button_pick_add__task');
var footer = document.querySelector('.footer_menu');
function add_task(e){
	document.querySelector('body').classList.add('body_over');
	setTimeout(function (){
		myVideo.pause();
	},100)
	header.classList.add('headerd');
	main.classList.add('mainrd');
	add_task_menu.classList.add('go_vid');
	clope.classList.add('clope_g');
	cloped.classList.add('clope_d');
	footer.classList.add('footer_plus');
	trash_all.classList.add('trash_hide');

	var allgroups = document.querySelectorAll('.text__ul');
	var divplus = " ";
	var text_all_groups = [];



	var divplus = " ";
	var text_create = allgroups.forEach(function(item){
		var bluem = item.innerText;
		text_all_groups.push(bluem);
	})


	document.querySelector('.selector_for_options').innerHTML = '';


	var selector_create = text_all_groups.forEach(function(item){
		return divplus += `<div class="select" onclick="select_option(this)">`+item+`</div>`
	})
	document.querySelector('.selector_for_options').innerHTML += divplus;

	if (selector.childElementCount == 0) {
		console.log('no groups finded')
	}
}
function delete_task(e) {
	document.querySelector('body').classList.remove('body_over');
	header.classList.remove('headerd');
	main.classList.remove('mainrd');
	add_task_menu.classList.remove('go_vid');
	clope.classList.remove('clope_g');
	cloped.classList.remove('clope_d');
	footer.classList.remove('footer_plus');
	trash_all.classList.remove('trash_hide');
	setTimeout(function (){
		myVideo.play();
	},100)
}






// remove one element from local storage and site
function deleter(e){
	var dadt  = e.parentElement;
	var absoluteplus = dadt.nextElementSibling;
	if (dadt.getAttribute("important") == 'false') {
		absoluteplus.remove();
		dadt.remove();
		localStorage.removeItem("groupssave");
		localStorage.setItem('groupssave','[]');
		var everyone = document.querySelectorAll('#option');
		var arryt = JSON.parse(localStorage.getItem("groupssave"));
		var unistall = everyone.forEach(function(item){
			var text_delete_item = item.getAttribute("text");
			var time_delete_item = item.getAttribute("timecr");
			var important_delete_item = item.getAttribute("important");
			var obj = {
				timeCreate: time_delete_item,
				text: text_delete_item,
				important: important_delete_item
			};
			arryt.push(obj);
		})
		localStorage.setItem("groupssave", JSON.stringify(arryt))
		document.querySelector(".input_for_task__in").value = "";
	} else {
		no_text.innerText = "You Can't Delete Important Group";
		setTimeout(function (){
			no_task_m.classList.add('done__no_task_m');
		},10)
		setTimeout(function (){
			no_task_m.classList.remove('done__no_task_m');
		},1900)
		setTimeout(function (){
			no_text.innerText = "No tasks";
		},2100)	
	}
}




// weather
var apikey = 'dc679c4958e56033bfd7eeccd743acda'
var request = new XMLHttpRequest()
request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=Lviv,ua&appid='+apikey+'', true)
request.onload = function() {
	// Begin accessing JSON data here
	var data = JSON.parse(this.response)
	var tempr = data.main.temp;
	var temprone1 = tempr - 273.15;
	var temprone = Math.round(temprone1)
	document.querySelector('.temperature').innerText += temprone + "°";
	var icon = data.weather[0].icon;
	var icon_weather = 'http://openweathermap.org/img/w/'+icon+'.png';
	document.querySelector('.img_weather').setAttribute('src',icon_weather);
}
request.send()







// opening and closing a  selection
var selector = document.querySelector('.selector_for_options');
var input_select_a_groupall = document.querySelector('.input_for_task__in');
function openc_select(e){
	if (selector.childElementCount != 0) {
		if(selector.classList.contains('selector_for_options_on')) {
			selector.classList.remove('selector_for_options_on');
		}
		else{
			selector.classList.add('selector_for_options_on');
		}
	}
	else{
		no_text.innerText = "No Groups Finded";
		setTimeout(function (){
			no_task_m.classList.add('done__no_task_m');
		},10)
		setTimeout(function (){
			no_task_m.classList.remove('done__no_task_m');
		},1900)
		setTimeout(function (){
			no_text.innerText = "No tasks";
		},2100)	
	}
}







// select a option
var input_select_a_group = document.querySelector('.input_for_task__in');
function select_option(el){
	those = el;
	input_select_a_group.value = those.innerText;
}







// creating a task
document.querySelector(".form__add_task_menu").addEventListener("submit",function(eli){
	eli.preventDefault();
	var field = eli.target.elements.add_task.value;
	var group_ch = eli.target.elements.add_task__in.value;
	if (field === '' || group_ch === '') {
		no_text.innerText = "Please enter task or group";
		setTimeout(function (){
			no_task_m.classList.add('done__no_task_m');
		},10)
		setTimeout(function (){
			no_task_m.classList.remove('done__no_task_m');
		},1900)
		setTimeout(function (){
			no_text.innerText = "No tasks";
		},2100)
	}
	else{
		var timing = new Date();
		var obj = {
			timeCreate: timing,
			text: field,
			where: group_ch,
			done: "false"
		};
		var arr = JSON.parse(localStorage.getItem("tasksave"));
		arr.push(obj);
		localStorage.setItem("tasksave", JSON.stringify(arr))
		var creatorplus = document.querySelectorAll("#option").forEach(function(item){
			var choppy = item.getAttribute("text");
			if (choppy == group_ch) {
				var eli = item.nextElementSibling;

				var today = new Date();
				var date = today.getDate();
				var month1 = today.getMonth();
				var hour = today.getHours();
				var minute = today.getMinutes();
				var month = month1 + 1;
				var hour = checkTime(hour);
				var minute = checkTime(minute);
				month = checkTime(month);
				var year = today.getFullYear();
				var div = `
				<div where="`+group_ch+`" text='`+field+`' timecr='`+obj.timeCreate+`' class="task_options" done="`+obj.done+`">
					<div class="ready_task" onclick='done_option(this)'>
						<div class="block_task"></div>
					</div>
					<div class="task_original">
						<p class="p__original">`+field+`</p>
						<p class="p__date">`+date+`.`+month+`.`+year+`</p>
					</div>
					<div class="edit_original" onclick="open_options_task(this)" onmouseout="efect_task(this)" onmouseover="efect_task_on(this)" >
						<p class="edit_p_original"><i class='material-icons'>settings</i></p>
					</div>
				</div>
				<div class="options_task">
					<div class="info_tools" onclick='close_options(this)'  onmouseout="efect_task(this)" onmouseover="efect_task_on(this)">
						<i class="material-icons">close</i>
					</div>
					<div class="tools_original">
						<div class="tools_editor" onmouseout="efect_task(this)" onmouseover="efect_task_on(this)" onclick="open_modal(this)">
							<i class="material-icons">edit</i>
						</div>
						<div class="tools_deletor" onclick='del_task(this)'onmouseout="efect_task(this)" onmouseover="efect_task_on(this)">
							<i class="material-icons">delete</i>
						</div>
					</div>
					<p class="p__date" id="p_date_tools">`+date+`.`+month+`.`+year+` at `+hour+`:`+minute+`, in `+group_ch+`</p>
				</div>`
				eli.innerHTML += div;
			}
		})
		document.querySelector(".input_for_task").value = "";
	}
})






// efect on icon 'settings'
function efect_task_on(e){
	those = e;
	those.classList.add('effect_on__task');
}
function efect_task(e){
	those = e;
	those.classList.remove('effect_on__task');
}





// opening and closing tools for task
function open_options_task(el){
	var dad  = el.parentElement;
	var sibling = dad.nextElementSibling;
	dad.classList.add('margin_task');
	sibling.classList.add('margin_task_task_options');
}
function close_options(el){
	var dadt  = el.parentElement;
	var sibling = dadt.previousElementSibling;
	dadt.classList.remove('margin_task_task_options');
	sibling.classList.remove('margin_task');
}


// deleting a task
function del_task(el){
	var dadt = el.parentElement;
	var dad = dadt.parentElement;
	var sibling = dad.previousElementSibling;
	sibling.classList.add('width_0');
	dad.classList.add('width_0');
	setTimeout(function (){
		sibling.remove();
		dad.remove();
		localStorage.removeItem("tasksave");
		localStorage.setItem('tasksave','[]');
		var tasksall = document.querySelectorAll('.task_options');
		var arryt = JSON.parse(localStorage.getItem("tasksave"));
		var unistall = tasksall.forEach(function(item){
			var text_del_item = item.getAttribute("text");
			var time_del_item = item.getAttribute("timecr");
			var where_del_item = item.getAttribute("where");
			var done_del_item = item.getAttribute("done");
			var obj = {
				timeCreate: time_del_item,
				text: text_del_item,
				where: where_del_item,
				done: done_del_item
			};
			arryt.push(obj);
		})
		localStorage.setItem("tasksave", JSON.stringify(arryt))
	},205)
}






// make group important
function important_group(el) {
	var option = el.parentElement;
	var rtoption = el.parentElement.getAttribute("important");
	if (rtoption === 'true') {
		option.setAttribute('important',false);
		option.classList.remove('important_true');
		el.classList.remove('important_true_edit');
		localStorage.removeItem("groupssave");
		localStorage.setItem('groupssave','[]');
		var everyone = document.querySelectorAll('#option');
		var arryt = JSON.parse(localStorage.getItem("groupssave"));
		var unistall = everyone.forEach(function(item){
			var text_delete_item = item.getAttribute("text");
			var time_delete_item = item.getAttribute("timecr");
			var important_delete_item = item.getAttribute("important");
			var obj = {
				timeCreate: time_delete_item,
				text: text_delete_item,
				important: important_delete_item
			};
			arryt.push(obj);
		})
		localStorage.setItem("groupssave", JSON.stringify(arryt))
	}
	else{
		option.setAttribute('important',true);
		option.classList.add('important_true');
		el.classList.add('important_true_edit');
		localStorage.removeItem("groupssave");
		localStorage.setItem('groupssave','[]');
		var everyone = document.querySelectorAll('#option');
		var arryt = JSON.parse(localStorage.getItem("groupssave"));
		var unistall = everyone.forEach(function(item){
			var text_delete_item = item.getAttribute("text");
			var time_delete_item = item.getAttribute("timecr");
			var important_delete_item = item.getAttribute("important");
			var obj = {
				timeCreate: time_delete_item,
				text: text_delete_item,
				important: important_delete_item
			};
			arryt.push(obj);
		})
		localStorage.setItem("groupssave", JSON.stringify(arryt))
	}
}



// make task ready
function done_option(el) {
	var task = el.parentElement;
	var child = el.firstElementChild;
	var rtask = el.parentElement.getAttribute("done");
	var sibling = el.nextElementSibling;
	var p_origin = sibling.firstElementChild;
	if (rtask === 'true') {
		task.setAttribute('done',false);
		child.classList.remove('block_task_on');
		p_origin.classList.remove('p__original_on');
		localStorage.removeItem("tasksave");
		localStorage.setItem('tasksave','[]');
		var tasksall = document.querySelectorAll('.task_options');
		var arryt = JSON.parse(localStorage.getItem("tasksave"));
		var unistall = tasksall.forEach(function(item){
			var text_del_item = item.getAttribute("text");
			var time_del_item = item.getAttribute("timecr");
			var where_del_item = item.getAttribute("where");
			var done_del_item = item.getAttribute("done");
			var obj = {
				timeCreate: time_del_item,
				text: text_del_item,
				where: where_del_item,
				done: done_del_item
			};
			arryt.push(obj);
		})
		localStorage.setItem("tasksave", JSON.stringify(arryt))
	}
	else{
		task.setAttribute('done',true);
		child.classList.add('block_task_on');
		p_origin.classList.add('p__original_on');
		localStorage.removeItem("tasksave");
		localStorage.setItem('tasksave','[]');
		var tasksall = document.querySelectorAll('.task_options');
		var arryt = JSON.parse(localStorage.getItem("tasksave"));
		var unistall = tasksall.forEach(function(item){
			var text_del_item = item.getAttribute("text");
			var time_del_item = item.getAttribute("timecr");
			var where_del_item = item.getAttribute("where");
			var done_del_item = item.getAttribute("done");
			var obj = {
				timeCreate: time_del_item,
				text: text_del_item,
				where: where_del_item,
				done: done_del_item
			};
			arryt.push(obj);
		})
		localStorage.setItem("tasksave", JSON.stringify(arryt))
	}
}



// closing and opening modal window
var this_target = [];
var modal_window = document.querySelector('.modal_window');
var modal_original = document.querySelector('.modal_original');
var time_modal = document.querySelector('#time_modal');
var input_modal = document.querySelector('.task_editor_modal');
function open_modal(el) {
	var dadt = el.parentElement;
	var dad = dadt.parentElement;
	var sibling = dad.previousElementSibling;

	var task_text = sibling.getAttribute("text");
	var task_time = sibling.getAttribute("timecr");
	var task_where = sibling.getAttribute("where");
	var task_done = sibling.getAttribute("done");


	console.log(this_target);
	this_target.length = 0;
	console.log(sibling);
	console.log(task_text);

	this_target.push(sibling);

	modal_original.setAttribute('text',task_text);
	modal_original.setAttribute('timecr',task_time);
	modal_original.setAttribute('where',task_where);
	modal_original.setAttribute('done',task_done);

	var today = new Date(task_time);
	var date = today.getDate();
	var month1 = today.getMonth();
	var hour = today.getHours();
	var minute = today.getMinutes();
	var month = month1 + 1;
	var hour = checkTime(hour);
	var minute = checkTime(minute);
	month = checkTime(month);
	var year = today.getFullYear();

	time_modal.innerText = ``+date+`.`+month+`.`+year+` at `+hour+`:`+minute+``;
	input_modal.value = ``+task_text+``;
		modal_window.classList.add("modal_window_done");
}
function close_modal(el) {
	modal_window.classList.remove("modal_window_done");
}













// editing a task
document.querySelector(".form_modal").addEventListener("submit",function(eli){
	eli.preventDefault();
	var field = eli.target.elements.edit_task.value;
	if (field === '') {
		no_text.innerText = "Please enter edited task";
		setTimeout(function (){
			no_task_m.classList.add('done__no_task_m');
		},10)
		setTimeout(function (){
			no_task_m.classList.remove('done__no_task_m');
		},1900)
		setTimeout(function (){
			no_text.innerText = "No tasks";
		},2100)
	}
	else{
		var dad = document.querySelector(".modal_original");
		var date_for_editor = dad.getAttribute("timecr");
		var where_for_editor = dad.getAttribute('where');
		var done_for_editor = dad.getAttribute('done');
		var timing = new Date(date_for_editor);
		var obj = {
			timeCreate: timing,
			text: field,
			where: where_for_editor,
			done: done_for_editor
		};
		var arr = JSON.parse(localStorage.getItem("tasksave"));
		arr.push(obj);
		localStorage.setItem("tasksave", JSON.stringify(arr))
		var this_target1 = this_target[0];
		console.log(this_target);
		console.log(this_target1);
		var next_target = this_target1.nextElementSibling;
		this_target1.classList.add('width_0');
		next_target.classList.add('width_0');
		setTimeout(function (){
		this_target1.remove();
		next_target.remove();
		var creatorplus = document.querySelectorAll("#option").forEach(function(item){
			var choppy = item.getAttribute("text");
			if (choppy == where_for_editor) {
				var elic = item.nextElementSibling;
				var today = new Date(date_for_editor);
				var date = today.getDate();
				var month1 = today.getMonth();
				var hour = today.getHours();
				var minute = today.getMinutes();
				var month = month1 + 1;
				var hour = checkTime(hour);
				var minute = checkTime(minute);
				month = checkTime(month);
				var year = today.getFullYear();
				var check_if_done =[];
				if (obj.done === 'true') {
					var yes = 'block_task_on';
					check_if_done.push(yes);
					var text12 = 'p__original_on';
					check_if_done.push(text12);
				}
				else{
					var yes = '';
					check_if_done.push(yes);
					var text12 = '';
					check_if_done.push(text12);
				}
				var done_tr = check_if_done[0];
				var done_p_on = check_if_done[1];
				var div = `
				<div where="`+where_for_editor+`" text='`+field+`' timecr='`+obj.timeCreate+`' class="task_options animaton_onedited" done="`+obj.done+`">
					<div class="ready_task" onclick='done_option(this)'>
						<div class="block_task `+done_tr+`"></div>
					</div>
					<div class="task_original">
						<p class="p__original `+done_p_on+`">`+field+`</p>
						<p class="p__date">`+date+`.`+month+`.`+year+`</p>
					</div>
					<div class="edit_original" onclick="open_options_task(this)" onmouseout="efect_task(this)" onmouseover="efect_task_on(this)" >
						<p class="edit_p_original"><i class='material-icons'>settings</i></p>
					</div>
				</div>
				<div class="options_task">
					<div class="info_tools" onclick='close_options(this)'  onmouseout="efect_task(this)" onmouseover="efect_task_on(this)">
						<i class="material-icons">close</i>
					</div>
					<div class="tools_original">
						<div class="tools_editor" onmouseout="efect_task(this)" onmouseover="efect_task_on(this)" onclick="open_modal(this)">
							<i class="material-icons">edit</i>
						</div>
						<div class="tools_deletor" onclick='del_task(this)'onmouseout="efect_task(this)" onmouseover="efect_task_on(this)">
							<i class="material-icons">delete</i>
						</div>
					</div>
					<p class="p__date" id="p_date_tools">`+date+`.`+month+`.`+year+` at `+hour+`:`+minute+`, in `+where_for_editor+`</p>
				</div>`
				elic.innerHTML += div;
			}
		})
		localStorage.removeItem("tasksave");
		localStorage.setItem('tasksave','[]');
		var tasksall = document.querySelectorAll('.task_options');
		var arryt = JSON.parse(localStorage.getItem("tasksave"));
		var unistall = tasksall.forEach(function(item){
			var text_del_item = item.getAttribute("text");
			var time_del_item = item.getAttribute("timecr");
			var where_del_item = item.getAttribute("where");
			var done_del_item = item.getAttribute("done");
			var obj = {
				timeCreate: time_del_item,
				text: text_del_item,
				where: where_del_item,
				done: done_del_item
			};
			arryt.push(obj);
		})
		localStorage.setItem("tasksave", JSON.stringify(arryt))
		modal_window.classList.remove("modal_window_done");
		},205)
		setTimeout(function (){
			var deletetorplus = document.querySelectorAll(".task_options").forEach(function(item){
				item.classList.remove('animaton_onedited');
			})
		},406)
	}
})