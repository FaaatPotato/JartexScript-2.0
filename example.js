/// api_version=2
var script = registerScript({
    name: "AutoUpdateExample",
    version: "1.0",
    authors: ["FaaatPotato"]
});

var URL = Java.type("java.net.URL");
var BufferedReader = Java.type("java.io.BufferedReader");
var InputStreamReader = Java.type("java.io.InputStreamReader");
var FileOutputStream = Java.type("java.io.FileOutputStream");
var File = Java.type("java.io.File");
var FileReader = Java.type("java.io.FileReader");


function updateReq(scriptName, rawLink) {
	var a = getLocalData(scriptName);
	var b = getOnlineData(rawLink);
	
	return a.localeCompare(b);
}

function getLocalData(scriptName) {

    var a = new File(mc.mcDataDir, "LiquidBounce-1.8.9");
    var b = new File(a, "scripts");
    var reader = new BufferedReader(new FileReader(new File(b, scriptName)));
    var fileData = "";
    var data;
        
    while ((data = reader.readLine()) != null)
    fileData += "\n" + data;
    
    reader.close();
        	
    return fileData;
}

function getOnlineData(rawLink) {
	
    var data = "";
    var c = new URL(rawLink);
    var http = c.openConnection();
    http.setRequestMethod("GET");
    http.setRequestProperty("User-Agent", "Mozilla/5.0");
    var stream = http.getInputStream();
    var input = new InputStreamReader(stream, "utf-8");
    var reader = new BufferedReader(input);
    var inputLine;
    
    while ((inputLine = reader.readLine()) != null)
    data += "\n" + inputLine;
    	
    input.close();
    reader.close();
    
    return data;
}

function installUpdate(scriptName, rawLink) {
	if (updateReq(scriptName, rawLink) != 0) {
	var a = new File(mc.mcDataDir, "LiquidBounce-1.8.9");
	var b = new File(a, "scripts");
	(new File(b, scriptName)).createNewFile();
	
	try {
		var updateContent = getOnlineData(rawLink);
		var a = new File(mc.mcDataDir, "LiquidBounce-1.8.9");
		var b = new File(a, "scripts");
		var f = new File(b, scriptName);
		var out = new FileOutputStream(f);
		out.write(updateContent.getBytes());
		out.close();
	} catch (err) {
		Chat.print("Error: " + err);
	}
  } else {
  return Chat.print("Latest already installed!");	  
  }
}

script.registerModule({
    name: "AutoUpdate",
    description: "Nutting in cats is illegal",
    category: "Fun",
    tag: "Example",
    settings: {}

}, function (module) {
    module.on("enable", function () {
    installUpdate("AutoUpdate.js", "https://raw.githubusercontent.com/FaaatPotato/JartexScript-2.0/main/example.js");
    });
    module.on("disable", function () {

    });
    module.on("update", function () {

    });
});
