const objetoNumero = []
  
process.on('message', (msg) => {
  if(msg > 0){
      for(i=0;i<msg;i++){
          const test = Math.floor(Math.random() * msg)
          console.log(test)
          const resultado = objetoNumero.find( data => data.numero === test );
          if(resultado !== undefined){
              resultado.repeticiones = resultado.repeticiones+1
          }else{
              objetoNumero.push({numero: test, repeticiones: 1})
          }
      }
      //const sum = msg;
      console.log(objetoNumero)
      process.send(objetoNumero);
  }else{
      process.send("no se realizo ningun calculo");
  }
  
});