import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import ServerInfo from '../common/ServerInfo'
import Stack from '@mui/material/Stack'


function LogIn(props: ServerInfo) {
  const { t } = useTranslation()

  const Features = () => {
    const featureArray = t('features')
      .split('\n')
      .filter((value) => value != '' && value != '\n')
    return (
      <Box sx={{
        display: {
          xs: 'none',
          md: 'block',
        },
        marginTop: '20px',
      }}>
        <Stack
          spacing='5px'
          margin='auto'
          marginLeft={{
            xs: '100px',
            lg: '150px',
          }}
        >
          {featureArray.map((value, index) => {
            return (
              <Box
                key={index.toString()}
              >
                {value}
              </Box>
            )
          })}
        </Stack>
      </Box>
    )
  }

  const Slogan = () => {
    return (
      <React.Fragment>
        <h3>
          {t('appTitle') + ': ' + t('appDescription')}
        </h3>
        <Features />
      </React.Fragment>
    )
  }

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
        <Slogan />
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

export default LogIn