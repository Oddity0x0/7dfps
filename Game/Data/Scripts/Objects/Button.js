script.attachEvent(DIM3_EVENT_CONSTRUCT,'OnConstruct');
script.attachEvent(DIM3_EVENT_SPAWN, "OnSpawn");
script.attachEvent(DIM3_EVENT_CLICK,'OnClick');

function OnConstruct(object, subevent, id, tick)
{
	object.model.on=true;
	object.model.name = "Button "+object.setting.getParameter(0);
	if(object.model.name == "Button ") 
	{
		iface.console.write("Fix yer button, bro");
		object.model.name = "Button Blue";
	}
	
	object.setting.suspend=true;
	object.model.shadow.on=false;
	object.setting.damage=false;
	object.setting.invincible=true;
	object.setting.clickable=true;
	object.size.clickDistance=3000;

	object.size.x=200;
	object.size.z=200;
	object.size.y=200;
}

var IsEnabled = undefined;

function OnSpawn(object, subevent, id, tick)
{
	IsEnabled = false;
}

function OnClick(object, subevent, id, tick)
{
	//var objectId = map.object.nearestSkipObjectId(object.position, object.setting.name, DIM3_OBJECT_TYPE_OBJECT, 360, null, 1, 1000000000000, object.setting.id);
	var objectCount = map.spot.count;
	//iface.console.write("map.spot.count == " + objectCount);
	//for (var i=0; i<objectCount; i++)
	var objectId = 0;
	//Super hack for greater justice
	var nothing = undefined;
	try
	{
		while(true)
		{
			if(objectId != object.setting.id && map.object.getName(objectId) == object.setting.name) object.event.callObjectById(objectId, "OnSwitchToggle", IsEnabled);
			objectId++;
		}
	}
	catch(nothing)
	{
	}
	/*if(objects.count == 0)
	{
		iface.console.write("Could not find toggleable objects in range named " + object.setting.name);
		return;
	}*/

	//if(IsEnabled) object.model.fill.change(0, int.parseInt(object.setting.getParameter(1)));//Second state
	//else object.model.fill.change(0, int.parseInt(object.setting.getParameter(0)));//First state

	IsEnabled = ! IsEnabled;
	//object.setting.clickable=false;
}