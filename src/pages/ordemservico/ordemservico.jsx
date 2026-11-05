import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useStyle } from './style';
import Header from '../../components/header/header';
import ordensServico from "../../services/ordemservico_service";
import mecanicos from '../../services/mecanico_service'

import walkin from '../../assets/img/walkin.svg';
import walkout from '../../assets/img/walkout.svg';

/* Components */
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import clsx from 'clsx';
import { Label, Input, Row, Col } from 'reactstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2';

import Select from "react-select";
ChartJS.register(ArcElement, Tooltip, Legend)

const OrdemServico = () => {
    let navigate = useNavigate();
    const location = useLocation();
    const gridRef = useRef(null);

    const classes = useStyle();
    const [open, setOpen] = useState(false);
    const [messageError, setMessageError] = useState(false);
    const [nomeOficina, setNomeOficina] = useState('');
    const [horarios, setHorarios] = useState('');
    const [horas, setHoras] = useState('');
    const [totalList, setTotalList] = useState([]);
    const [selectableList, setSelectableList] = useState([]);
    const [mecanicoSemOS, setMecanicoSemOS] = useState([]);
    let isOnChange = false; 

    const [dataSubmit, setDataSubmit] = useState({
        ordemServico: '',
    });

    const handleChange = (event) => {
        setDataSubmit({
            ...dataSubmit,
            [event.target.name]: event.target.value
        });
    };

    const getSetores = async () => {
        try {
            let response = await mecanicos.getSetores();
            setSelectableList(response.data.data.setores)
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }

    const postMecanicosHorarios = async (list) => {
        try {
            let response = await mecanicos.postMecanicosHorarios(list);
            if (response.data.success) {
                setHoras(response.data.data.horas);
                setHorarios(response.data.data.horarios);
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const handleChangeTotalList = () => {
        isOnChange = true;
        handleSearch();
    };

    const handleSearch = async () => {
        let storedTotalList = [];
    
        if (localStorage.getItem('setor')) {
            storedTotalList = JSON.parse(localStorage.getItem('setor'));
        }
    
        try {
            let list = storedTotalList.length > 0 && !isOnChange ? storedTotalList : totalList;    
            let response = await mecanicos.postSearchMecanico(list);
    
            if (response.data.success) {
                try {
                    postMecanicosHorarios(list); 
                    setMecanicoSemOS(response.data.data.mecanicos);
                } catch (error) {
                    console.error('Error in postMecanicosHorarios or setMecanicoSemOS:', error); 
                    throw error; 
                }
    
                setTotalList(list);
                localStorage.setItem('setor', JSON.stringify(list));
                isOnChange = false;
            }
        } catch (error) {
            console.error('Error in handleSearch:', error); 
            postMecanicosHorarios()
            setMecanicoSemOS()
        }
    };

    const onSubmit = async (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            try {
                let response = await ordensServico.postOrdemServico(dataSubmit);
                if (response.data.success) {
                    setOpen(false);
                    let ordemServico = { ordemServico: dataSubmit.ordemServico, horarios: response.data.data, nomeOficina: nomeOficina };
                    navigate("/mecanico", { state: { ordemServico } });
                }
                if (!response.data.success) {
                    document.getElementById('ordemServico').value = '';
                    setOpen(true);
                    setMessageError(response.data.message);
                }
            } catch (error) {
                console.log('Error submitting form:', error);
            }
        }
    };

    const handleMultipleChange = (selectedOptions) => {
        setTotalList(selectedOptions); 
    };

    useEffect(() => {
        if (!localStorage.getItem('TOKEN_KEY')) {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        if (localStorage.getItem('oficina')) {
            setNomeOficina(localStorage.getItem('oficina'));
        }
    }, []);

    useEffect(()=>{
        const interval = setInterval(() => {
            handleSearch();
        }, 300000);

        return () => clearInterval(interval);
    })

    useEffect(() => {
        getSetores();
        handleSearch();
    }, []);
    
    return (
        <div className="topO">
            <Header/>
            <Row className={classes.row}>
                <div className={classes.colOficina}>
                    <div className={classes.boxForm}>
                        <div>
                            <form onSubmit={onSubmit}>
                                <h2 className={classes.sizeSubTitle} style={{fontSize:'1.5rem'}}>{nomeOficina != null ? nomeOficina : null}</h2>
                                <Row >
                                    <Col md={12} style={{display:'flex', justifyContent:'center'}}>
                                        <b style={{fontSize:'1.5rem'}}>Escaneie o QR Code ou digite o código da Ordem de Serviço.</b>
                                    </Col>
                                </Row>
                                <Row style={{display:'flex', justifyContent:'center', marginTop:'20px'}}>
                                    <Col md={6}>
                                        {/* <Label for="ordemServico" style={{fontSize:'1.2rem',marginTop:'10px'}}>Código da Ordem de Serviço </Label> */}
                                        <Input type="number" id="ordemServico" name="ordemServico" autoFocus required="required" onChange={handleChange} onKeyDown={(e) => onSubmit(e)}/>
                                    </Col>
                                </Row>
                                <Box sx={{ width: '100%'}}>
                                    <Collapse in={open} style={{marginTop:'10px'}}>
                                        <Alert severity="error" style={{fontSize:'1.3rem',alignItems:'center'}} action={
                                            <IconButton aria-label="close" color="inherit" size="small" onClick={() => { setOpen(false);}}>
                                                <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                        } sx={{ mb: 2 }}>
                                        {messageError}
                                        </Alert>
                                    </Collapse>
                                </Box>
                            </form>
                        </div>
                    </div>
                    <Row>
                        <Col md={6}>
                            <Row className={classes.boxHoras}>
                                <Col md={12} className={classes.justifyCenter}><b>Horas Trabalhadas no Dia</b></Col>
                                <Col md={12} className={classes.justifyCenter}><b>{horas.diario}</b></Col>
                            </Row>
                        </Col>
                        <Col md={6}>
                            <Row className={classes.boxHoras}>
                                <Col md={12} className={classes.justifyCenter}><b>Horas Trabalhadas no Mês</b></Col>
                                <Col md={12} className={classes.justifyCenter}><b>{horas.mensal}</b></Col>
                            </Row>
                        </Col>
                    </Row>
                    <div className={classes.boxGrafico}>
                        <h2 style={{marginBottom:'20px', textAlign:'center'}}>Mecânicos sem Ordem de Serviço</h2>
                        <Row>
                            <Col md={2}>
                                <b>Código</b>    
                            </Col>
                            <Col md={7}>
                                <b>Mecânico</b>    
                            </Col>
                            <Col md={3} className={classes.justifyCenter}>
                                <b>Setor</b> 
                            </Col>
                        </Row>
                        <Row>
                        {
                            Array.from(mecanicoSemOS).map((item, index) => (
                                <>  
                                    <div style={{marginTop:'10px'}} className={index % 2 === 0 ? classes.corSim : null}>
                                        <Row>
                                            <Col md={2}>
                                                {item.codigo}
                                            </Col>
                                            <Col md={7}>
                                                {item.nome}
                                            </Col>
                                            <Col md={3} className={classes.justifyCenter}>
                                                {item.setor.descricao}
                                            </Col>
                                        </Row> 
                                    </div>             
                                </>
                            ))
                        }
                        </Row>
                    </div>                   
                </div>
                <div className={classes.colMovimentacao}> 
                    <div className={classes.boxMovimentacao}>
                        <Row style={{display:'flex', justifyContent:'center', marginBottom:'20px'}}>
                            <Col md={9}>
                                <Label for="ordemServico" style={{fontSize:'1.2rem'}}>Setor</Label>
                                <Select
                                    value={totalList}
                                    onChange={handleMultipleChange}
                                    options={Array.from(selectableList)}
                                    className={clsx(classes.select)}
                                    placeholder="Selecione um setor"
                                    isMulti
                                />
                            </Col>
                            <Col md={3} style={{display:'flex', justifyContent:'center'}}>
                                <button className={clsx('buttonSuccess',classes.buttonSearch)} onClick={handleChangeTotalList}>Pesquisar</button>
                            </Col>
                        </Row>
                        <h2 style={{marginBottom:'20px'}}>Ultimas Movimentações</h2>
                        <Row>
                            <Col md={2}>
                                <b>Frota</b>    
                            </Col>
                            <Col md={6}>
                                <b>Mecânico</b>    
                            </Col>
                            <Col md={2} className={classes.justifyCenter}>
                                <b>O.S</b> 
                            </Col>
                            <Col md={2} className={classes.justifyCenter}>
                                <b>Atividade</b> 
                            </Col>
                        </Row>
                        {
                            Array.from(horarios).map((item, index) => (
                                <>  
                                    <div style={{marginTop:'10px'}} className={index % 2 === 0 ? classes.corSim : null}>
                                        <Row>
                                            <Col md={2}>
                                                {item.ordemServico.veiculo.frota}
                                            </Col>
                                            <Col md={6}>
                                                {item.horario.mecanico.nome}
                                            </Col>
                                            <Col md={2} className={classes.justifyCenter}>
                                                {item.ordemServico.codigo}
                                            </Col>
                                            <Col md={2} className={classes.justifyCenter}>
                                                {item.tipo == 'S' ? <img src={walkout} className={classes.logoWalk}/> : <img src={walkin} className={classes.logoWalk}/>}
                                            </Col>
                                        </Row> 
                                    </div>             
                                </>
                            ))
                        }
                    </div>
                </div>
            </Row>
        </div>
    );
}
 
export default OrdemServico;
