/*
<div id="display">
	<div class="img_slot">
		<img class="edit"/>
		<img class="delete">
		<div class="img">
			<img/>
		</div>
	</div>

	<div class="img_slot">
		<img class="edit"/>
		<img class="delete">
		<div class="img">
			<img/>
		</div>
	</div>
	.
	.
	.
</div>
*/
//mouse is moved on the image slot
function img_slot_mouse_on(e)
{
	e.preventDefault();
	e.stopPropagation();

	console.log(e.type +": "+ e.target);
	e.target.children[0].style.display = "inline";
	e.target.children[1].style.display = "inline";
	return null;
}

//mouse is move out the image slot
function img_slot_mouse_off(e)
{
	e.preventDefault();
	e.stopPropagation();

	console.log(e.type +": "+ e.target);
	e.target.children[0].style.display = "none";
	e.target.children[1].style.display = "none";
	return null;
}

//mouse click on the edit
function edit_click(e)
{
	e.preventDefault();
	e.stopPropagation();


}

//mouse click on the edit
function delete_click(e)
{
	e.preventDefault();
	e.stopPropagation();

	
}

//mouse click then show the image
function img_click(e)
{
	e.preventDefault();
	e.stopPropagation();
}