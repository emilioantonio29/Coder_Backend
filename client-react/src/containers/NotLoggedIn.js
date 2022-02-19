import * as React from 'react';
import {Link} from 'react-router-dom';
import { UserGlobalContext } from '../context/UserGlobalContext';
import ItemListMermelada from '../components/ItemList/ItemListMermelada';
import { Helmet } from 'react-helmet';
import axios from "axios";
import swal from 'sweetalert'


const NotLoggedIn = () =>{
    const {load2, setLoad2, userLoggedIn, setUserLoggedIn, verifyUser, setVerifyUser} = React.useContext(UserGlobalContext);
 

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
                        <p style={{paddingLeft:"10px"}}> Inicio de sesión</p>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="d-flex justify-content-center" >

                    <form className='col-md-4' autocomplete="off" id='myform'>
                        <br/>
                        <div className="form-group">
                            <label for="email">Email <strong style={{color: "#d67ad6"}}>{usernameS}</strong></label>
                            <input value={username} onChange={usernameF} required type="email" className="form-control" id="email" placeholder="emilio@test.com"/>
                        </div>
                        <div className="form-group">
                            <label for="inputPassword1">Contraseña <strong style={{color: "#d67ad6"}}>{passwordS}</strong></label>
                            <input value={password} onChange={passwordF} required type="password" className="form-control" id="inputPassword1" placeholder="********"/>
                        </div>
                        <br/>


                        {/* <button enabled  onClick={handleSubmit} type="submit" className="botonNow botonNow6 btnNoStyle">Completar Registro</button> */}
                        <input disabled={botonDisabled} onClick={handleSubmit} type="submit" className="botonNow botonNow6 btnNoStyle" value="Iniciar sesion"></input> 
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
                <br></br>
                <br></br>
                <br></br>
                <div className="d-flex justify-content-center" >
                    <div className='col-md-4'>
                        <div>
                            <p style={{color: "#d67ad6"}}>* Te invitamos a registrarte:</p>
                        </div>
                        <div className=''>
                            <Link to={`/registro`}>
                                <button className="  btnNoStyle">Registro</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )

}

export default NotLoggedIn;