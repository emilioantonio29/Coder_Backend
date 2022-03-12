import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'


const FooterComponent = () => {


    return(
      <>
        <footer>
        <div className="intro"></div>
        <div className="footerC d-flex justify-content-center" style={{paddingTop:"30px"}}>
            <div className="center colorBrown2 col-md-8">
                <div className="container container2" style={{padding: "20px 0px 0px 0px"}}>
                    <div className="row">
                        <div className="col-md-4 d-flex justify-content-center align-items-end">
                            <h6>SoyGlucosaProject</h6>
                        </div>
                        <div className="col-md-4 d-flex justify-content-center align-items-end">
                            <h4>Contacto</h4>
                        </div>
                        <div className="col-md-4 d-flex justify-content-center align-items-end">
                            <h4>Sobre Nosotros</h4>
                        </div>
                    </div>  
                </div>    
            </div>
        </div>       
        <div className="d-flex justify-content-center footerC">
            <div style={{width:"100%"}} className="col-md-8">
                <div className=" container2" >
                    <hr className="" style={{backgroundColor: "rgb(221, 140, 221)"}} />
                </div>
            </div>
        </div>
        <div className="footerC d-flex justify-content-center">
            <div className="center colorBrown2 col-md-8">
                <div className="container container2" style={{padding: "20px 0px 0px 0px"}}>            
                    <div className="row">
                        <div className="col-md-4 d-flex justify-content-center">
                            <p style={{textAlign: "center"}}><a href="#"
                                    target="_blank"><i className="fa fa-github colorIcon"></i></a> GitHub</p>
                        </div>
                        <div className="col-md-4 d-flex justify-content-start flex-column ">
                            <p style={{textAlign: "center"}}><a href="#" target="_blank" className="prevent"><i
                                        className="fa fa-phone colorIcon"></i></a> 11-11123331</p>
                            <p style={{textAlign: "center"}}><a href="#" target="_blank" className="prevent"><i
                                        className="fa fa-envelope-o colorIcon"></i></a> comingSoon@example.com</p>
                        </div>
                        <div className="col-md-4 d-flex justify-content-center">
                            <p>Lorem ipsum.</p>
                        </div>
                    </div>
                </div>
                <div className="container container2" style={{padding: "0px 0px 20px 0px"}}>
                    <div className="row d-flex justify-content-center">
                        <p>Siguenos en nuestras redes</p>
                    </div>
                    <div className="redes">
                        <div className="social-menu2">
                            <div className="social-menu22"><a href="#"
                                    target="_blank"><i className="fa fa-instagram"></i></a></div>
                            <div className="social-menu22"><a href="#" target="_blank" className="prevent"><i
                                        className="fa fa-facebook"></i></a></div>
                            <div className="social-menu22"><a href="#" target="_blank" className="prevent"><i
                                        className="fa fa-twitter"></i></a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="gb  d-flex align-items-center ">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <p>© 2021 | Powered by <strong><a href="https://www.linkedin.com/in/emilio-martinez-gonzalez-0b0195165/"
                                target="_blank">Emilio Martinez</a></strong></p>
                </div>
            </div>
        </div>
        </footer>
      </>
    )
  
  }
  
  
  export default FooterComponent;