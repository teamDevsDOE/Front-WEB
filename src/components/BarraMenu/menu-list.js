import AutoModeSharpIcon from '@mui/icons-material/AutoModeSharp';
import DiscountIcon from '@mui/icons-material/Discount';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const listLinks = [
    {
        id:1,
        label:'Acompanhamento de pacientes',
        link:'/ScheduleList',
        icon: AutoModeSharpIcon
    },
    {
        id:2,
        label:'Cadastro de Bonus',
        link:'/Recompensa',
        icon: DiscountIcon
    },
    {
        id:3,
        label:'Cadastro de Data e Hora',
        link:'/Agendamento',
        icon: CalendarMonthOutlinedIcon
    },
    {
        id:4,
        label:'Bonus cadastrados',
        link:'/bonus',
        icon: InventoryOutlinedIcon
    },
    {
        id:5,
        label:'Acompanhamento Finalizado',
        link:'/Finalizados',
        icon: CheckCircleIcon
    },
]

export default listLinks