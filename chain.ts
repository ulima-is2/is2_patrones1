interface Reclamo
{
    monto : number
}

abstract class Empleado
{
    sucesor : Empleado

    abstract analizarReclamo(reclamo : Reclamo)

    addSucesor(sucesor : Empleado)
    {
        this.sucesor = sucesor
    }
}

class Cajero extends Empleado
{
    analizarReclamo(reclamo : Reclamo)
    {
        if (reclamo.monto >= 300)
        {
            // No lo puede resolver y tiene que derivarlo
            this.sucesor.analizarReclamo(reclamo)
        }else{
            console.log("El cajero resolvio el reclamo")
        }
    }
}

class Administrador extends Empleado
{
    analizarReclamo(reclamo : Reclamo)
    {
        if (reclamo.monto >= 1000)
        {
            // No lo puede resolver y tiene que derivarlo
            this.sucesor.analizarReclamo(reclamo)
        }else{
            console.log("El administrador resolvio el reclamo")
        }
    }
}

class Gerente extends Empleado
{
    analizarReclamo(reclamo : Reclamo)
    {
        console.log("El gerente resolvio el reclamo")
    }

}

let mainChain = () => {
    //1. Definir la estructura de mi cadema de responsabilidad
    let cajero : Empleado = new Cajero()
    let administrador : Empleado = new Administrador()
    let gerente : Empleado = new Gerente()

    cajero.addSucesor(administrador)
    administrador.addSucesor(gerente)

    //2. Ejecutar la peticion
    let rec1 : Reclamo = {
        monto : 150
    }
    cajero.analizarReclamo(rec1)

    let rec2 : Reclamo = {
        monto : 500
    }
    cajero.analizarReclamo(rec2)
}

mainChain()