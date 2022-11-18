import React, { useState, useEffect } from 'react';
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import swal from 'sweetalert';
import APIInvoke from '../../utils/APIInvoke';
import { useNavigate, useParams } from 'react-router-dom';

const TareasCrear = () => {

    //poder redireccionar de un componente a otro
    const navigate = useNavigate();

    const { idproyecto } = useParams();
    let arr = idproyecto.split('@');
    const nombreProyecto = arr[1];
    const tituloPagina = `Creación de Tareas: ${nombreProyecto}`;

    const [tareas, setTareas] = useState({
        nombre: ''
    });

    const { nombre } = tareas;

    useEffect(() => {
        document.getElementById("nombre").focus();
    }, [])

    const onChange = (e) => {
        setTareas({
            ...tareas,
            [e.target.name]: e.target.value
        })
    }

    const crearTarea = async () => {
        let arr = idproyecto.split('@');
        const idProyecto = arr[0];
        const data = {
            proyecto: idProyecto,
            nombre: tareas.nombre
        }

        const response = await APIInvoke.invokePOST(`/api/tareas`, data);
        const idTarea = response.tarea._id;

        if (idTarea === '') {
            const mensaje = "La tarea no fue creada correctamente.";
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
            const mensaje = "La tarea fue creada correctamente.";
            navigate(`/tareas-admin/${idproyecto}`);
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
        crearTarea();
    }


    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>

            <div className="content-wrapper">

                <ContentHeader
                    Titulo={tituloPagina}
                    breadCrumb1={"Listado de Tareas"}
                    breadCrumb2={"Creación"}
                    ruta1={`/tareas-admin/${idproyecto}`}
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
                                            placeholder="Nombre Tarea"
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

export default TareasCrear;
