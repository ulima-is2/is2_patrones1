
import { BDAdapter, AdapterFactory, Alumno } from "./adapter"

// Fachada
class BDManager
{
    bdAdapter : BDAdapter
    constructor(tipo : string)
    {
        let factory = new AdapterFactory()
        this.bdAdapter = factory.obtenerAdapter(tipo)
    }
    crearEstructura()
    {
        this.bdAdapter.conectar()
        this.crearEstructura()
        this.bdAdapter.cerrar()
    }
    insertar(alumno : Alumno)
    {
        this.bdAdapter.conectar()        
        this.bdAdapter.insertarAlumno(alumno)
        this.bdAdapter.cerrar()
    }
}

let mainFachada = () => {
    let bdManager : BDManager = new BDManager(process.argv[2])
    bdManager.crearEstructura()
    bdManager.insertar({
        codigo : "20202323",
        nombre : "Pepito",
        carrera : "Ing. Industrial"
    })
}
mainFachada()