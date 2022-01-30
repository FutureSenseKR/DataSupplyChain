const fs = require('fs');

fs.watch('C:\\Users\\nk129\\Desktop\\Test', {persistent: true}, function(event, fileName){
    console.log("Event : ", event);
    console.log(fileName + "\n");
});

