export class Miscela{
    static focusNextElement(doc:Document) {
        //add all elements we want to include in our selection
        var focussableElements = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
        if (doc.activeElement && (doc.activeElement as any).form) {
          var focussable = Array.prototype.filter.call((doc.activeElement as any).form.querySelectorAll(focussableElements),
            function (element) {
              //check for visibility while always include the current activeElement
              return element.offsetWidth > 0 || element.offsetHeight > 0 || element === doc.activeElement
            });
          var index = focussable.indexOf(doc.activeElement);
          if (index > -1) {
            var nextElement = focussable[index + 1] || focussable[0];
            nextElement.focus();
          }
        }
    }//fin-focusNextElement()

    static next(evt: any) {
        evt.preventDefault()
        
        Miscela.focusNextElement(document)
    }

    static objectToUpper<T>(obj:T){       
        const keys = Object.keys(obj)

        /* for(let i=0; keys.length; i++){
            if(typeof obj[keys[i] as keyof T]==='string'){
                obj[keys[i] as keyof T]
            }
        } */


        return Object.keys(obj).reduce((ac,k) => 
             ({...ac,[k]:obj[k as keyof T]}),{}
        )        

        //return Object.keys(obj).reduce((ac,k) => ({...ac,[k]:obj[k as keyof T]}),{})        
    }

    private static Upper(lima:any){
        if (typeof lima ==='string')
            return lima.toUpperCase()
        else
            return lima  
    }//fin-Upper()
}

