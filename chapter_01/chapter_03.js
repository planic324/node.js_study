function helloWorld(){
    console.log('hellow world');
    helloNode();
}

function helloNode(){
    console.log('hellow node');
    helloNode();
}

helloWorld();