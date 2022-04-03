export class Miscela{
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

