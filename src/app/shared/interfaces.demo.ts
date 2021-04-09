interface KeyValue{

  key:number
  value:string

  getValue(param:string):string;
}

interface FuncationlInterface{

  //(param:string):string
  (one:string,two:string):string
}

export class Demo{

   demo(){

     let demo:KeyValue={key:10,value:"Ten",getValue:(str:string)=> str };
     console.log(demo.getValue(demo.key+""));

     function name(params:string) {

      return params+" Hello"
     }



     function f3(one:string,...multi:number[]) {

     }

     //let fun:FuncationlInterface = name;
     //let f:FuncationlInterface = f2;

     //fun("HI")
     f("Hello","Hi")

     let tupple:[string,number]=["sgsdg",100]
     tupple.push(1);

   }
}
