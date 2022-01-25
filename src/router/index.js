import Vue from 'vue'
import VueRouter from 'vue-router'

const RootLogin = () => import('../components/login/RootLogin')
const LoginBar = () => import('../components/templates/bars/LoginBar')
const AtendimentoBar = () => import('../components/templates/bars/AtendimentoBar')
const MobileNavigator = () => import('../components/templates/navigations/MobileNavigator')
const RootAtendimento = () => import('../components/atendimento/RootAtendimento')
const ListAtendimento = () => import('../components/atendimento/ListAtendimento')
const CadAtendimento =  () => import('../components/atendimento/CadAtendimento')
const EditAtendimento = () => import('../components/atendimento/EditAtendimento')
const RootCliente = () => import('../components/cliente/RootCliente')
const ListCliente = () => import('../components/cliente/ListCliente')
const CadCliente = () => import('../components/cliente/CadCliente')
const EditCliente = () => import('../components/cliente/EditCliente')
const RootTecnico = () => import('../components/tecnico/RootTecnico')
const ListTecnico = () => import('../components/tecnico/ListTecnico')
const CadTecnico = () => import('../components/tecnico/CadTecnico')
const EditTecnico = () => import('../components/tecnico/EditTecnico')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    components:{
      page: RootLogin
    },
    children:[
      {
        path:'',
        components:{
          appbar: LoginBar
        }
      }
    ]
  },
  {
    path: '/atendimentos',
    components:{
      page: RootAtendimento
    },
    children:[
      {
        path:'',
        components:{
          appbar: AtendimentoBar,
          content: ListAtendimento,
          mobilenavigator: MobileNavigator
        },
      },
      {
        path: 'cadastro/',
        components:{
          appbar: AtendimentoBar,
          content: CadAtendimento,
          mobilenavigator: MobileNavigator
        }
      },
      {
        path: 'editar/:codigo/',
        props: true,
        name: 'editarAtendimento',
        components:{
          appbar: AtendimentoBar,
          content: EditAtendimento,
          mobilenavigator: MobileNavigator
        }
      }
    ]
  },
  {
    path: '/clientes/',
    components:{
      page: RootCliente
    },
    children:[
      {
        path: '',
        components:{
          appbar: AtendimentoBar,
          content: ListCliente,
          mobilenavigator: MobileNavigator
        }
      },
      {
        path: 'cadastro/',
        components:{
          appbar: AtendimentoBar,
          content: CadCliente,
          mobilenavigator: MobileNavigator
        }
      },
      {
        path: 'editar/:codigo/',
        props: true,
        name: 'editarCliente',
        components:{
          appbar: AtendimentoBar,
          content: EditCliente,
          mobileNavigator: MobileNavigator
        }
      }
    ]
  },
  {
    path: '/tecnicos/',
    components:{
      page: RootTecnico
    },
    children:[
      {
        path: '',
        components:{
          appbar: AtendimentoBar,
          content: ListTecnico,
          mobilenavigator: MobileNavigator
        }
      },
      {
        path: 'cadastro/',
        components:{
          appbar: AtendimentoBar,
          content: CadTecnico,
          mobilenavigator: MobileNavigator
        }
      },
      {
        path: 'editar/:codigo/',
        props: true,
        name: 'editarTecnico',
        components:{
          appbar: AtendimentoBar,
          content: EditTecnico,
          mobilenavigator: MobileNavigator
        }
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
