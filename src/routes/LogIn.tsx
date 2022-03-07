import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import ServerInfo from '../common/ServerInfo'
import Stack from '@mui/material/Stack'
import TweenOne, { TweenOneGroup } from 'rc-tween-one'


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
                <TweenOne
                  style={{
                    paddingLeft: '70px',
                    opacity: 0.3,
                    filter: 'blur(3px),'
                  }}
                  animation={[
                    { x: '-70px', y: '10px', blur: '0px', opacity: 1, duration: 400 + Number(index) * 100 }
                  ]}
                >
                  {value}
                </TweenOne>
              </Box>
            )
          })
          }
        </Stack >
      </Box >
    )
  }

  const Slogan = () => {
    return (
      <h3>
        {t('appTitle') + ': ' + t('appDescription')}
      </h3>
    )
  }

  const Description = () => {
    return (
      <Box>
        <TweenOne
          style={{
            paddingLeft: '70px',
            opacity: 0.3,
            filter: 'blur(3px),'
          }}
          animation={[
            { x: '-70px', y: '10px', blur: '0px', opacity: 1, duration: 400 }
          ]}
        >
          <Slogan />
        </TweenOne>
        <Features />
      </Box>
    )
  }

  return (
    <Box
      marginTop={'30px'}
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row-reverse',
        },
      }}
    >
      <Box
        width='fit-content'
        margin={{
          xs: 'auto',
          md: 'auto',
        }}
        marginRight={{
          xs: 'auto',
          md: '12vw',
        }}
        marginTop={{
          xs: '20px',
          md: '15vh',
        }}
      >
        <Description />
      </Box>
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