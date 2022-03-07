import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import ServerInfo from '../common/ServerInfo'


function Login(props: ServerInfo) {
  const { t } = useTranslation()
  return (
    <Box
      marginTop={'30px'}
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
      }}
    >
      <Box
        width='fit-content'
        margin={{
          xs: 'auto',
          md: 'auto',
        }}
        marginLeft={{
          xs: 'auto',
          md: '15vw',
        }}
      >
        <h3>
          Slogan!!!
        </h3>
      </Box>
      <Box
        width='fit-content'
        margin={{
          xs: 'auto',
          md: 'auto',
        }}
        marginRight={{
          xs: 'auto',
          md: '22vw',
        }}
        marginTop={{
          xs: '20px',
          md: '15vh',
        }}
      >
        <TextField
          type='url'
          variant='outlined'
          label={t('serverApiURL')}
          defaultValue={props.serverAddr}
          onChange={(event) => {
            props.setServerAddr(event.target.value)
          }}
        />
      </Box>
    </Box>
  )
}

export default Login