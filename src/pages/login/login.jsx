
/*Páginas e relacionados ao react*/
import React, { useState, useRef, } from "react"
import { useStyle } from './style'
import { useNavigate, Link } from 'react-router-dom'
import LogoNovo from '../../assets/img/fontanella-oficina-logo-branco.png'

/*Imports da raiz*/
import usuarios from '../../services/login_service/index'
import './style.jsx'

/*Components*/
import { Row, Col, FormGroup, Label, Input, Button } from 'reactstrap'
import { Grid } from "@material-ui/core"
import LoadingBackdrop from "../../components/loading/loading"


const Login = () => {
    const classes = useStyle()
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [loginToken, setLoginToken] = useState('')
    const [loading, setLoading] = useState(false)

    const campoEnter = useRef(null);
    const campoPassword = useRef(null);

    let navigate = useNavigate()

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            switch (e.target.name) {
                case 'user':
                    if (campoPassword.current) {
                        campoPassword.current.focus();
                    }
                    break;
                case 'password':
                    if (campoEnter.current) {
                        campoEnter.current.focus();
                    }
                    break;
                default:
                    break;
            }
        }
    };
    
    const onSubmit = async (e) => {
        e.preventDefault()
        const dataUsuario = {
            user,
            password,
            loginToken
        }

        if(user === '' || password === ''){
            return alert('Não foi possível logar! Digite corretamente os dados.')
        }else{
            try{
                let response = await usuarios.postUsuario(dataUsuario)
                let nomeOficina = response.data.nomeOficina
                if(response.success == false){
                    alert(response.message)
                }else{
                    localStorage.setItem('oficina', nomeOficina)
                    navigate("//")
                }
            }catch{
            }
        }
    };
  
    return (
        <div className={classes.root}>
            <Grid className={classes.alignTitleFontanella}>
                <img src={LogoNovo} className={classes.teste}/>
            </Grid>
            <form onSubmit={onSubmit}>
                <Grid className={classes.bodyLogin}>
                    <p className={classes.alignTitleLogin}>Faça o login para acessar o sistema</p>
                    <Row>
                        <Col md={12}>
                            <FormGroup id="showUser">
                                <Label for="user">Nome do Usuário</Label>
                                <Input type="text" id="user" name="user" value={user} onChange={(e) => setUser(e.target.value)} onKeyPress={handleKeyPress} />
                            </FormGroup>
                        </Col>
                    </Row> 
                    <Row>
                        <Col md={12}>
                            <FormGroup id="showPassword">
                                <Label for="password">Senha</Label>
                                <Input type="password" id="password" name="password" innerRef={campoPassword} value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress}/>
                            </FormGroup>
                        </Col>
                    </Row> 
                    <Row>
                        <Col md={12}>
                            <Button type="submit" innerRef={campoEnter} className={classes.entrar}>Entrar</Button>
                        </Col>
                    </Row>
                </Grid>
            </form>
            <Grid className={classes.fixedFontanella}>© Fontanella Transportes. Todos os direitos reservados</Grid>
        </div>
    );
}
 
export default Login;
