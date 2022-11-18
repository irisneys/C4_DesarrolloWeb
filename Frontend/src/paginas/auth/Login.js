import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const Login = () => {

    //poder redireccionar de un componente a otro
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    const { email, password } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        document.getElementById("email").focus();
    }, [])


    const iniciarSesion = async () => {
        const data = {
            email: usuario.email,
            password: usuario.password
        }

        const response = await APIInvoke.invokePOST(`/api/auth`, data);
        const mensaje = response.msg;

        if (mensaje === 'El usuario no existe' || mensaje === 'Contraseña incorrecta') {

            //redireccionamos nuevamente a la pagina de login
            navigate("/");

            const mensaje = "No fue posible iniciar la sesión.";
            swal({
                title: 'Error',
                text: mensaje,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        } else {
			//obtenemos el token de acceso
            const jwt = response.token;

            //guardamos la informacion en el localStorage
            localStorage.setItem('token', jwt);

            //redireccionamos al home la pagina principal
            navigate("/home");
		}

    }

    const onSubmit = (e) => {
        e.preventDefault();
        iniciarSesion();
    }

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <a href="../../index2.html" className="h1"><b>Iniciar</b> Sesión</a>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Bienvenido, ingrese sus credenciales.</p>
                        <form onSubmit={onSubmit}>
                            <div className="input-group mb-3">
                                <input type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={email}
                                    onChange={onChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password"
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={onChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="social-auth-links text-center mt-2 mb-3">
                                <button type="submit" className="btn btn-block btn-primary">Ingresar</button>
                                <Link to={"/crear-cuenta"} className="btn btn-block btn-danger">Crear Cuenta</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;