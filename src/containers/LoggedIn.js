import * as React from 'react';
import {Link} from 'react-router-dom';
import { UserGlobalContext } from '../context/UserGlobalContext';
import ItemListMermelada from '../components/ItemList/ItemListMermelada';
import { Helmet } from 'react-helmet';
import axios from "axios";
import swal from 'sweetalert'


const LoggedIn = () =>{
    const {load2, setLoad2, userLoggedIn, setUserLoggedIn, verifyUser, setVerifyUser, loadVerifyUser, 
        setLoadVerifyUser} = React.useContext(UserGlobalContext);


    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loader, setLoader] = React.useState(false);

    const [render, setRender] = React.useState(1)
    
    const [usernameS, setUsernameS] = React.useState("");
    const [passwordS, setPasswordS] = React.useState("");
    const [tycS, setTYCS] = React.useState(false);

    const [botonDisabled, setBotonDisabled] = React.useState("");
    const [faltanDatos, setFaltanDatos] = React.useState("")
    const [bienvenido, setBienvenido] = React.useState("")

    const usernameF = (e) =>{
        setUsername(e.nativeEvent.target.value)
    }
    const passwordF = (e) =>{
        setPassword(e.nativeEvent.target.value)
    }


    const cleanAll = () =>{

        
        setUsername("") 
        setPassword("") 

    }
    const cleanV = () =>{

        setUsernameS("") 
        setPasswordS("") 

    }
    const handleSubmit = (e) => {
                e.preventDefault()
                cleanV()
                setFaltanDatos("")
                setBotonDisabled("disabled")
                setLoader(true);
                const fecha = new Date()
                axios.post('/apiMongo/login', 
                  {

                    username: username,
                    password: password,

                  }
                  )
                  .then(function (response) {
                      console.log(response)
                      setLoader(false)
                      return response.data
                  })
                  .then((data)=>{
                    if(data !== ""){
                        // cleanAll();
                        setUserLoggedIn(data)
                        registroOk();
                    }else if(data === ""){
                        registroFail();
                    }
                  })
                  .catch(function (error) {
                    setLoader(false)
                    registroError()
                    console.log(error);
                });
      };

    const cerrarSesion = () =>{

        axios.get('/apiMongo/logout').then((response) => {
            swal({
                title: "Hasta Pronto",
                text: ``,
                icon: "success",
                buttons: {
                    confirm : {text:'Cerrar',className:'msgStyle'}
                   
                },
            });
            //console.log(response.data)
            if(response.data !== ""){
                console.log("logout")
                verifyUser ? setVerifyUser(false) : setVerifyUser(true)  

            }else if(response.data === ""){
                console.log("no estaba logeado")
                verifyUser ? setVerifyUser(false) : setVerifyUser(true)  

            }

            }).catch((err)=>{
                console.log(err)
            })
    }
    
    const consoles = () =>{
        // if(tyc){
        //     alert("oik")
        // }
        console.log(document.getElementById('gridCheck').checked)
        const fecha = new Date()
        console.log(fecha.getDay())
    }
    
    const checkForm = () =>{
        if(username &&  password){
            setBotonDisabled("")
        }else{
            setBotonDisabled("disabled")
        }
    }
    const registroOk= () =>{
        swal({
            title: `¡Inicio de sesion exitoso!`,
            text: `lorem Ipsum.`,
            icon: "success",
            buttons: {
                confirm : {text:'Cerrar',className:'msgStyle'}
               
            },
        });
        // document.getElementById("myForm").reset(); 
    }
    const registroFail= () =>{
        setBotonDisabled("")
        swal({
            title: "El mail ingresado o la contraseña son incorrectos.",
            text: `Por favor verifica el email y contraseña ingresados.`,
            icon: "warning",
            buttons: {
                confirm : {text:'Cerrar',className:'msgStyle'}
               
            },
        });
    }
    const registroError= () =>{
        swal({
            title: `¡Opps!`,
            text: `Detectamos un error en el proceso de login, por favor intenta nuevamente unos minutos.`,
            icon: "error",
            buttons: {
                confirm : {text:'Cerrar',className:'msgStyle'}
               
            },
        });
    }


 
    React.useEffect(() => {
        verifyUser ? setVerifyUser(false) : setVerifyUser(true)  

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
        {loadVerifyUser ? (
            <div className="d-flex flex-column" style={{minHeight:"600px"}}>
                <div className="d-flex justify-content-center" >
                    <div className="col-md-8 d-flex justify-content-left align-items-center noPad">
                        <p >
                            <Link to={`/`}>
                            <button disabled className="btn">Home</button>
                            </Link>
                        </p>
                        <p><i className="fa fa-angle-right"></i></p>
                        <p style={{paddingLeft:"10px"}}> Carrito</p>

                    </div>
                </div>
                <div className="d-flex justify-content-center" >
                    <div className="col-md-8 d-flex justify-content-center  flex-column align-items-center noPad">
                        <div className="spinner-border" role="status" style={{marginTop:"170px"}}>
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div>
                            <p>
                                Cargando ...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ):(
            

            <div className="d-flex flex-column">
                <div className="d-flex justify-content-center" >
                    <div className="col-md-8 d-flex justify-content-left align-items-center noPad">
                        <p>
                        <Link to={`/`}>
                        <button className="btn">Home</button>
                        </Link>
                        </p>
                        <p><i className="fa fa-angle-right"></i></p>
                        <p style={{paddingLeft:"10px"}}> Gestión: {userLoggedIn.nombre}</p>
                        <p style={{paddingLeft:"10px"}}> <i className="fa fa-angle-right"></i></p>
                        <p>
                        <Link to={`/`}>
                        <button onClick={cerrarSesion} className="btn"><strong>Cerrar Sesion</strong></button>
                        </Link>
                        </p>

                        {/* <button onClick={ConsoleLogCompradores} style={{marginLeft:"500px"}}> ConsoleLogCompradores</button> */}
                    </div>
                </div>
                <br></br>
                <br></br>
                <div className="d-flex justify-content-center">
                    <div className="container col-md-8" >
                        <div class="row d-flex justify-content-around">
                            <div class="card" style={{width: "18rem"}}>
                                <div class="card-body">
                                    <h5 class="card-title">Productos</h5>
                                    <p class="card-text">Lorem Ipsum.</p>
                                    <Link to={`/`}>
                                    <button style={{borderRadius: "4px"}} className="botonNow botonNow6 btnNoStyle">Compra nuestros productos</button>
                                    </Link>
                                </div>
                            </div>
                            <div class="card" style={{width: "18rem"}}>
                                <div class="card-body">
                                    <h5 class="card-title">Carrito</h5>
                                    <p class="card-text">Gestiona tus compras.</p>
                                    <Link to={`/carrito`}>
                                    <button style={{borderRadius: "4px"}} className="botonNow botonNow6 btnNoStyle">Carrito</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div class="row d-flex justify-content-around">
                            <div class="card" style={{width: "18rem"}}>
                                <div class="card-body">
                                    <h5 class="card-title">Mi Perfil</h5>
                                    <p class="card-text">Proximamente.</p>
                                    <Link to={`/`}>
                                    <button disabled style={{borderRadius: "4px"}} className="botonNow botonNow6 btnNoStyle">Visitar mi perfil</button>
                                    </Link>
                                </div>
                            </div>
                            <div class="card" style={{width: "18rem"}}>
                                <div class="card-body">
                                    <h5 class="card-title">Actualizar productos</h5>
                                    <p class="card-text">Proximamente: funcionalidad para el admin...</p>
                                    <Link to={`/`}>
                                    <button disabled style={{borderRadius: "4px"}} className="botonNow botonNow6 btnNoStyle">Carrito</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            

        )}
    </>
    )

}

export default LoggedIn;