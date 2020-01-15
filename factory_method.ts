abstract class Empleado
{
    abstract calcularSueldo() : number
}

class Mesero extends Empleado
{
    calcularSueldo(): number {
        return 1200
    }
}

class Cocinero extends Empleado
{
    calcularSueldo(): number {
        return 2000
    }
}

class EmpleadoFactory
{
    obtenerEmpleado(tipo : string) : Empleado
    {
        if (tipo == "cocinero")
        {
            return new Cocinero()
        }else if (tipo == "mesero")
        {
            return new Mesero()
        }else{
            return null
        }

    }
} 
let mainFactory = () => {
    let factory : EmpleadoFactory = new EmpleadoFactory()
    //let tipo : string = process.argv[2]
    let tipo : string = process.env["TIPO_EMPLEADO"]
    let e1 : Empleado = factory.obtenerEmpleado(tipo)

    console.log(`Sueldo: ${e1.calcularSueldo()}`)
}
mainFactory()