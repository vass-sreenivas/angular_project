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

     function f2(one:string,two:string) {

      return one+two;
     }

     //let fun:FuncationlInterface = name;
     let f:FuncationlInterface = f2;

     //fun("HI")
     f("Hello","Hi")

   }
}
