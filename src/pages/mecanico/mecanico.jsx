/*Páginas e relacionados ao react*/
import React, { useEffect, useState } from "react";
import { useStyle } from './style';
import Header from '../../components/header/header';
import mecanicos from "../../services/mecanico_service";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ordensServico from "../../services/ordemservico_service";

/*Components*/
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import clsx from 'clsx'
import { Breadcrumb, Button , Label, Input, Row, Col} from 'reactstrap';

const Mecanico = () => {
    const location = useLocation();
    let navigate = useNavigate()

    const classes = useStyle()
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [messageError, setMessageError] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState(false);
    const [nomeOficina, setNomeOficina] = useState('');
    const [enterValid, setEnterValid] = useState();
    const [disabled, setDisabled] = useState(false);

    const [dataSubmit, setDataSubmit] = useState({ 
        mecanico:'',
        ordemServico: location.state.ordemServico.ordemServico
    })

    const handleChange = (event) =>{
        setDataSubmit({
            ...dataSubmit,
            [event.target.name]: event.target.value
        });
    }

    const handleConcludeOS = async() => {
        if (window.confirm('Tem certeja que deseja concluir a ordem de serviço?')) {
            try{
                let response = await ordensServico.postConcluirOS({id:location.state.ordemServico.horarios.id})
                if(response.data.success == true){
                    setOpenError(false);
                    setOpenSuccess(true);
                    setMessageSuccess(response.data.data) 
                    setTimeout(() => {
                        setOpenSuccess(false);
                        navigate("//")
                    }, 2500);  
                }

                if(response.data.success == false){
                    setOpenError(true);
                    setMessageError(response.data.message) 
                }    
            }catch(error){
                console.log('Error fetching data:', error);
            }
        }  
    }

    const columns = [
        { field: 'dataInicio', renderHeader: () => (<strong>{'Data Início'} </strong>), type: 'date', width: 120,headerAlign: 'center', align:'center' },
        { field: 'horaInicio', renderHeader: () => (<strong>{'Hora Início'} </strong>), type: 'date', width: 120, headerAlign: 'center', align:'center' },
        { field: 'dataFim', renderHeader: () => (<strong>{'Data Fim'} </strong>), type: 'date', width: 100, headerAlign: 'center', align:'center' },
        { field: 'horaFim', renderHeader: () => (<strong>{'Hora Fim'} </strong>), width: 100, headerAlign: 'center', align:'center'},
        { field: 'mecanico_nome', renderHeader: () => (<strong>{'Mecânico'} </strong>), type: 'text', width: 400, headerAlign: 'center',
          valueGetter: (params) => params.row.mecanico.nome },
        { field: 'mecanico_setor_descricao',renderHeader: () => (<strong>{'Setor'} </strong>), type: 'text', width: 200, headerAlign: 'center',align:'center',
          valueGetter: (params) => params.row.mecanico.setor.descricao },
    ];


    let horarios = location.state.ordemServico.horarios
    const rows = horarios.horariosAbertos
    const rows2 = horarios.horariosFechados
  
    const onSubmit = async (e) => {
        if((e.keyCode === 13) && (dataSubmit.mecanico == 0)){
            navigate("//")
        }

        if((e.keyCode === 13) && (enterValid === 1)){
            e.preventDefault();
            setOpenError(true);
            setMessageError('Não é possível salvar mais de uma vez seguida') 
            setTimeout(() => {
                setOpenError(false);
            }, 3500);
        }else{
            if (e.keyCode === 13) {
                e.preventDefault();
                try{
                    let response = await mecanicos.postMecanico(dataSubmit) 
                    if(response.data.success == true){
                        setOpenError(false);
                        setEnterValid(1)
                        setOpenSuccess(true);
                        setMessageSuccess(response.data.data) 
                        setTimeout(() => {
                            setOpenSuccess(false);
                            navigate("//")
                        }, 2500);

                        setDisabled(true)
                        
                    }
                    if(response.data.success == false){
                        setOpenError(true);
                        document.getElementById('mecanico').value = ''
                        setEnterValid(2)
                        setMessageError(response.data.message) 
                    }            
                }catch (error){
                    console.log('Error fetching data:', error);
                }
            }  
        }
    };

    useEffect(()=>{
        if(localStorage.getItem('oficina')){
            setNomeOficina(localStorage.getItem('oficina'))
        }
    })

    return (
        <div className="marginRoutes">
            <Header/>
            <Breadcrumb className='breadcrumbMargin'>
                {/* <BreadcrumbItem><Link to="//">Ínicio</Link></BreadcrumbItem>
                <BreadcrumbItem active>Mecânico</BreadcrumbItem> */}
                <div style={{display:'flex',justifyContent:'space-between', width:'100%'}}>
                    <Link to="//"><button className="buttonSuccess">Voltar</button></Link>
                    <button className="buttonSuccess" onClick={handleConcludeOS}>Concluir O.S</button>
                </div>
            </Breadcrumb>
            <div>
                <div className={classes.formCadastro}>
                    <form onSubmit={onSubmit}>
                        <h2 className={classes.sizeSubTitle} style={{fontSize:'1.5rem'}}>
                            {nomeOficina != null ? nomeOficina : null} - OS {dataSubmit.ordemServico}
                        </h2>
                        <Row style={{display:'flex', justifyContent:'center'}}>
                            <Row>
                                <Col md={12} style={{display:'flex', justifyContent:'center'}}>
                                    <b style={{fontSize:'1.5rem'}}>Escaneie o QR Code do crachá ou digite o código de identificação do mecânico.</b>
                                </Col>
                            </Row>
                            <Col md={6} style={{display:'flex', justifyContent:'center', marginTop:'20px'}}>
                                <Input type="int" id="mecanico" name="mecanico" autoFocus required="required" onChange={handleChange} onKeyDown={(e) => onSubmit(e)} disabled={disabled}/>
                            </Col>
                        </Row>
                        <Box sx={{ width: '100%' }}>
                            <Collapse in={openSuccess} style={{marginTop:'10px',alignItems:'center'}}>
                                <Alert severity="success" style={{fontSize:'1.3rem',alignItems:'center'}} action={
                                    <IconButton aria-label="close" color="inherit" size="small" onClick={() => { setOpenSuccess(false);}}>
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                    } sx={{ mb: 2 }}>
                                    {messageSuccess}
                                </Alert>
                            </Collapse>
                            <Collapse in={openError} style={{marginTop:'10px'}}>
                                <Alert severity="error" style={{fontSize:'1.3rem',alignItems:'center'}} action={
                                    <IconButton aria-label="close" color="inherit" size="small" onClick={() => { setOpenError(false);}}>
                                    <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                } sx={{ mb: 2 }}>
                                {messageError}
                                </Alert>
                            </Collapse>
                        </Box>
                    </form>
                    <h2 style={{fontSize:'1.2rem', textAlign:'center',marginTop:'20px', marginBottom:'10px'}}>Horários em Aberto</h2>
                    <Box className={clsx(classes.widthBox, 'gridTop')}>
                        <DataGrid
                            sx={{ maxHeight: 475 }}
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            autoHeight
                            autoPageSize
                            // initialState={{
                            //     sorting: {
                            //     sortModel: [{ field: 'dataInicio', sort: 'desc' }],
                            //     },
                            // }}
                        />
                    </Box>
                    <h2 style={{fontSize:'1.2rem', textAlign:'center',marginTop:'30px', marginBottom:'10px'}}>Horários Finalizados</h2>
                    <Box className={clsx(classes.widthBox, 'gridTop')}>
                        <DataGrid
                            sx={{ maxHeight: 475 }}
                            rows={rows2}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            autoHeight
                            autoPageSize
                        />
                    </Box>
                </div>
            </div>
        </div>
    );
}
 
export default Mecanico;
