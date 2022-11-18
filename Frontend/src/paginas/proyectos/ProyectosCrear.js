import React, { useState, useEffect } from 'react';
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import swal from 'sweetalert';
import APIInvoke from '../../utils/APIInvoke';
import { useNavigate } from 'react-router-dom';

const ProyectosCrear = () => {

    //poder redireccionar de un componente a otro
    const navigate = useNavigate();

    const [proyectos, setProyectos] = useState({
        nombre: ''
    });

    const { nombre } = proyectos;

    useEffect(() => {
        document.getElementById("nombre").focus();
    }, [])

    const onChange = (e) => {
        setProyectos({
            ...proyectos,
            [e.target.name]: e.target.value
        })
    }

    const crearProyecto = async () => {
        const data = {
            nombre: proyectos.nombre
        }

        const response = await APIInvoke.invokePOST(`/api/proyectos`, data);
        const idProyecto = response._id;

        if (idProyecto === '') {
            const mensaje = "El proyecto no fue creado correctamente.";
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
            const mensaje = "El proyecto fue creado correctamente.";
            navigate("/proyectos-admin");
            swal({
                title: 'Información',
                text: mensaje,
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-primary',
                        closeModal: true
                    }
                }
            });

            setProyectos({
                nombre: ''
            })
        }

    }

    const onSubmit = (e) => {
        e.preventDefault();
        crearProyecto();
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>

            <div className="content-wrapper">

                <ContentHeader
                    Titulo={"Creación de Proyectos"}
                    breadCrumb1={"Listado de Proyectos"}
                    breadCrumb2={"Creación"}
                    ruta1={"/proyectos-admin"}
                />

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">

                            <form onSubmit={onSubmit}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="nombre">Nombre</label>
                                        <input type="text"
                                            className="form-control"
                                            id="nombre"
                                            name="nombre"
                                            placeholder="Nombre Proyecto"
                                            value={nombre}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>

                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Crear</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default ProyectosCrear;