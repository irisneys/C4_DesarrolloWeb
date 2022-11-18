import React, { useState, useEffect } from 'react';
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import swal from 'sweetalert';
import APIInvoke from '../../utils/APIInvoke';
import { useNavigate, useParams } from 'react-router-dom';

const ProyectosEditar = () => {

    const navigate = useNavigate();

    const { idproyecto } = useParams();
    let arr = idproyecto.split('@');
    const nombreProyecto = arr[1];


    const [proyectos, setProyectos] = useState({
        nombre: nombreProyecto
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

    const editarProyecto = async () => {
        let arr = idproyecto.split('@');
        const idProyecto = arr[0];

        const data = {
            nombre: proyectos.nombre
        }

        const response = await APIInvoke.invokePUT(`/api/proyectos/${idProyecto}`, data);
        const idProyectoEditado = response.proyecto._id;

        if (idProyectoEditado !== idProyecto) {
            const mensaje = "El proyecto no fue editado correctamente.";
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
            const mensaje = "El proyecto fue editado correctamente.";
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
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        editarProyecto();
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
                                    <button type="submit" className="btn btn-primary">Editar</button>
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

export default ProyectosEditar;