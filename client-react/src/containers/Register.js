import * as React from 'react';
import {Link} from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import ItemListMermelada from '../components/ItemList/ItemListMermelada';
import { Helmet } from 'react-helmet';
import axios from "axios";
import swal from 'sweetalert'


const Register = () =>{


    const [nombre, setNombre] = React.useState("");
    const [apellido, setApellido] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [provincia, setProvincia] = React.useState("");
    const [localidad, setLocalidad] = React.useState("");
    const [calle, setCalle] = React.useState("");
    const [altura, setAltura] = React.useState("");
    const [zip, setZip] = React.useState("");
    const [telefono, setTelefono] = React.useState("");
    const [tyc, setTYC] = React.useState("checked");
    const [loader, setLoader] = React.useState(false);

    const [render, setRender] = React.useState(1)
    
    const [nombreS, setNombreS] = React.useState("");
    const [apellidoS, setApellidoS] = React.useState("");
    const [usernameS, setUsernameS] = React.useState("");
    const [passwordS, setPasswordS] = React.useState("");
    const [password2S, setPassword2S] = React.useState("");
    const [provinciaS, setProvinciaS] = React.useState("");
    const [localidadS, setLocalidadS] = React.useState("");
    const [calleS, setCalleS] = React.useState("");
    const [alturaS, setAlturaS] = React.useState("");
    const [zipS, setZipS] = React.useState("");
    const [telefonoS, setTelefonoS] = React.useState("");
    const [tycS, setTYCS] = React.useState(false);

    const [botonDisabled, setBotonDisabled] = React.useState("");
    const [faltanDatos, setFaltanDatos] = React.useState("")
    const [mostrarLogin, setMostrarlogin] = React.useState(false)

    const nombreF = (e) =>{
        setNombre(e.nativeEvent.target.value)
    }
    const apellidoF = (e) =>{
        setApellido(e.nativeEvent.target.value)
    }
    const usernameF = (e) =>{
        setUsername(e.nativeEvent.target.value)
    }
    const passwordF = (e) =>{
        setPassword(e.nativeEvent.target.value)
    }
    const password2F = (e) =>{
        setPassword2(e.nativeEvent.target.value)
    }
    const provinciaF = (e) =>{
        setProvincia(e.nativeEvent.target.value)
    }
    const localidadF = (e) =>{
        setLocalidad(e.nativeEvent.target.value)
    }
    const calleF = (e) =>{
        setCalle(e.nativeEvent.target.value)
    }
    const alturaF = (e) =>{
        setAltura(e.nativeEvent.target.value)
    }
    const zipF = (e) =>{
        setZip(e.nativeEvent.target.value)
    }
    const telefonoF = (e) =>{
        setTelefono(e.nativeEvent.target.value)
    }
    const tycF = () =>{
        
        if(tyc==false){
            setTYC(true)
        }else{
            setTYC(false)
        }

    }
    const cleanAll = () =>{
        setNombre("") 
        setApellido("") 
        setUsername("") 
        setPassword("") 
        setPassword2("") 
        setProvincia("")
        setLocalidad("") 
        setCalle("") 
        setAltura("") 
        setZip("") 
        setTelefono("") 
        setTYC("") 
        document.getElementById("gridCheck").checked = false;
    }
    const cleanV = () =>{
        setNombreS("") 
        setApellidoS("") 
        setUsernameS("") 
        setPasswordS("") 
        setPassword2S("") 
        setProvinciaS("")
        setLocalidadS("") 
        setCalleS("") 
        setAlturaS("") 
        setZipS("") 
        setTelefonoS("") 
        setTYCS("") 
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log(nombre + " " + apellido + username + " " + password + " " + password2 + " " + provincia
        //+ " " + localidad+ " " + calle+ " " + altura+ " " + zip+ " " + telefono+" "+tyc);
        // ... submit to API or something
        if(nombre &&  apellido &&  username &&  password &&  password2 &&  provincia
            &&  localidad &&   calle &&  altura &&  zip &&  telefono &&  document.getElementById('gridCheck').checked){
            if(password !== password2){
                e.preventDefault()
                cleanV()
                setPasswordS("*")
                setPassword2S("*")
                setFaltanDatos("* Las contraseñas no coinciden")

            }else{
                cleanV()
                setFaltanDatos("")
                setBotonDisabled("disabled")
                setLoader(true);
                const fecha = new Date()
                axios.post('/apiMongo/registro', 
                  {
                    nombre: nombre,
                    apellido: apellido,
                    username: username,
                    password: password,
                    provincia: provincia,
                    localidad: localidad,
                    calle: calle,
                    altura: altura,
                    zip: zip,
                    telefono: telefono,
                    tyc: true, 
                    fecha: fecha
                  })
                  .then(function (response) {
                    setLoader(false)
                    //console.log(response)
                    if(response.data !== ""){
                        // cleanAll();
                        registroOk();
                        cleanAll()
                        setMostrarlogin(true)
                        //e.target.reset();
                    }else if(response.data === ""){
                        registroFail();
                    }
                  })
                  .catch(function (error) {
                    setLoader(false)
                    registroError()
                    console.log(error);
                  })
                  .finally(()=>{
                        axios.get('/apiMongo/logout').then((response) => {

                            //console.log(response.data)
                            if(response.data !== ""){
                                console.log("logout")
                            }else if(response.data === ""){
                                console.log("no estaba logeado")
                            }

                        }).catch((err)=>{
                            console.log(err)
                        })
                    })
            }
        }else{
            nombre ? setNombreS("") : setNombreS("*")
            apellido ? setApellidoS("") : setApellidoS("*")
            username ? setUsernameS("") : setUsernameS("*")
            password ? setPasswordS("") : setPasswordS("*")
            password2 ? setPassword2S("") : setPassword2S("*")
            provincia ? setProvinciaS("") : setProvinciaS("*")
            localidad ? setLocalidadS("") : setLocalidadS("*")
            calle ? setCalleS("") : setCalleS("*")
            altura ? setAlturaS("") : setAlturaS("*")
            zip ? setZipS("") : setZipS("*")
            telefono ? setTelefonoS("") : setTelefonoS("*")
            document.getElementById('gridCheck').checked ? setTYCS("") : setTYCS("*")
            setFaltanDatos("* Faltan datos en el formulario")
        }
      };
    
    const consoles = () =>{
        // if(tyc){
        //     alert("oik")
        // }
        // console.log(document.getElementById('gridCheck').checked)
        // const fecha = new Date()
        // console.log(fecha.getDay())
        cleanAll()
    }
    
    const checkForm = () =>{
        if(nombre &&  apellido &&  username &&  password &&  password2 &&  provincia
            &&  localidad &&   calle &&  altura &&  zip &&  telefono &&  tyc){
            setBotonDisabled("")
        }else{
            setBotonDisabled("disabled")
        }
    }
    const registroOk= () =>{
        swal({
            title: `¡Registro realizado con exito!`,
            text: `Muchas gracias por registrarte en nuestro sitio, ya puedes iniciar sesión y disfrutar de nuestras compras online.`,
            icon: "success",
            buttons: {
                confirm : {text:'Cerrar',className:'msgStyle'}
               
            },
        });
        //document.getElementById("myForm").reset(); 
    }
    const registroFail= () =>{
        setBotonDisabled("")
        swal({
            title: "El mail ingresado ya se encuentra registrado",
            text: `Por favor ingresa otra direccion de correo electronico antes de avanzar con el registro`,
            icon: "warning",
            buttons: {
                confirm : {text:'Cerrar',className:'msgStyle'}
               
            },
        });
    }
    const registroError= () =>{
        swal({
            title: `¡Opps!`,
            text: `Detectamos un error en el proceso de registro, por favor intenta nuevamente unos minutos.`,
            icon: "error",
            buttons: {
                confirm : {text:'Cerrar',className:'msgStyle'}
               
            },
        });
    }


 
    React.useEffect(() => {
        //cleanAll()
        /*axios.post('/apiMongo/registroMock', {
            firstName: 'jhon',
            lastName: 'doe'
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
        });*/

        console.log("MOUNTED")
     
        return () => {

        }
    },[]);     


    // console.log(products)
    // console.log(products)
    return(
        <>
            <div className="d-flex flex-column">
                {/* <button onClick={consoles}>test</button> */}
                {/* <button onClick={cleanAll}>test</button> */}

                <div className="d-flex justify-content-center" >
                    <div className="col-md-8 d-flex justify-content-left align-items-center noPad">
                        <p >
                            <Link to={`/`}>
                            <button className="btn">Home</button>
                            </Link>
                        </p>
                        <p><i className="fa fa-angle-right"></i></p>
                        <p style={{paddingLeft:"10px"}}> Registro</p>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="d-flex justify-content-center" >

                    <form className='col-md-4' autocomplete="off" id='myform'>
                        <div className='fondo shoC d-flex align-items-center justify-content-center' style={{height: "30px"}}>
                            <h6 style={{margin: 0}}>Datos personales:</h6>
                        </div>
                        <br/>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                            <label for="name">Nombre <strong style={{color: "#d67ad6"}}>{nombreS}</strong></label>
                            <input value={nombre} required type="text" className="form-control" id="name" placeholder="Emilio" 
                            onChange={nombreF}/>
                            </div>
                            <div className="form-group col-md-6">
                            <label for="lastname">Apellido <strong style={{color: "#d67ad6"}}>{apellidoS}</strong></label>
                            <input value={apellido} onChange={apellidoF} required type="text" className="form-control" id="lastname" placeholder="Martinez"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="email">Email <strong style={{color: "#d67ad6"}}>{usernameS}</strong></label>
                            <input value={username} onChange={usernameF} required type="email" className="form-control" id="email" placeholder="emilio@test.com"/>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                            <label for="inputPassword1">Contraseña <strong style={{color: "#d67ad6"}}>{passwordS}</strong></label>
                            <input value={password} onChange={passwordF} required type="password" className="form-control" id="inputPassword1" placeholder="********"/>
                            </div>
                            <div className="form-group col-md-6">
                            <label for="inputPassword2">Valida tu contraseña <strong style={{color: "#d67ad6"}}>{password2S}</strong></label>
                            <input value={password2} onChange={password2F} required type="password" className="form-control" id="inputPassword2" placeholder="********"/>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <div className='fondo shoC d-flex align-items-center justify-content-center' style={{height: "30px"}}>
                            <h6 style={{margin: 0}}>Direccion de envíos:</h6>
                        </div>
                        <br/>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                            <label for="provincia">Pronvicia <strong style={{color: "#d67ad6"}}>{provinciaS}</strong></label>
                            <select value={provincia} onChange={provinciaF} id="provincia" className="form-control">
                                <option selected>Seleccione una provincia...</option>
                                <option>Capital Federal</option>
                            </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label for="localidad">Localidad <strong style={{color: "#d67ad6"}}>{localidadS}</strong></label>
                                <select value={localidad} onChange={localidadF} id="localidad" className="form-control">
                                    <option selected>Seleccione una localidad...</option>
                                    <option>Caballito</option>
                                    <option>Almagro</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                            <label for="calle">Calle <strong style={{color: "#d67ad6"}}>{calleS}</strong></label>
                            <input value={calle} onChange={calleF} type="text" className="form-control" id="calle" placeholder="Av Rivadavia"/>
                            </div>
                            <div className="form-group col-md-6">
                            <label for="altura">Altura <strong style={{color: "#d67ad6"}}>{alturaS}</strong></label>
                            <input value={altura} onChange={alturaF} type="text" className="form-control" id="altura" placeholder="5549"/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                            <label for="zip">Codigo postal <strong style={{color: "#d67ad6"}}>{zipS}</strong></label>
                            <input value={zip} onChange={zipF} type="text" className="form-control" id="zip" placeholder="1151"/>
                            </div>
                            <div className="form-group col-md-6">
                            <label for="phone">Telefono <strong style={{color: "#d67ad6"}}>{telefonoS}</strong></label>
                            <input value={telefono} onChange={telefonoF} type="text" className="form-control" id="phone" placeholder="11-11123331"/>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <div className="form-group">
                            <div className="form-check">
                            <input   onChange={tycF} required className="form-check-input" type="checkbox" id="gridCheck"/>
                            <label className="form-check-label" for="gridCheck">
                                Acepto los Terminos y Condiciones <strong style={{color: "#d67ad6"}}>{tycS}</strong>
                            </label>
                            </div>
                        </div>
                        {/* <button enabled  onClick={handleSubmit} type="submit" className="botonNow botonNow6 btnNoStyle">Completar Registro</button> */}
                        <input disabled={botonDisabled} onClick={handleSubmit} type="submit" className="botonNow botonNow6 btnNoStyle" value="Registrarse"></input> 
                        {loader ? (
                            <div style={{padding: "10px"}} className='d-flex justify-content-center'>
                                <div  class="spinner-grow text-muted"></div>
                                <div style={{marginLeft: "5px"}} class="spinner-grow text-muted"></div>
                                <div style={{marginLeft: "5px"}} class="spinner-grow text-muted"></div>
                            </div>
                        )
                        :
                        <></>
                        }

                        <br/>
                        <p style={{color: "#d67ad6"}}>{faltanDatos}</p>
                    </form>
                </div>
                {mostrarLogin ? 
                    <>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div className="d-flex justify-content-center" >
                            <div className='col-md-4'>
                                <div>
                                    <p style={{color: "#d67ad6"}}>* ¿Ya te registraste? inicia tu sesión:</p>
                                </div>
                                <div className=''>
                                    <Link to={`/inicio-de-sesion`}>
                                        <button className="  btnNoStyle">Login</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                :
                    <>
                    </>
                }
                
            </div>


        </>
    )

}

export default Register;