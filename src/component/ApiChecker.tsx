import React, { useState, createRef } from 'react'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import NotStartedOutlined from '@ricons/material/NotStartedOutlined'
import ErrorRound from '@ricons/material/ErrorRound'
import CheckCircleRound from '@ricons/material/CheckCircleRound'
import ApiList, { Api } from './ApiList'
import ServerInfo from '../common/ServerInfo'


const strLen = (str: string): number => {
  var len = 0
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
      len += 2
    } else {
      len++
    }
  }
  return len
}


function ApiChecker(props: ServerInfo) {
  const { t, i18n } = useTranslation()

  const [textInput, setTextInput] = useState(props.serverAddr)
  const defaultApiURL = props.serverAddr

  const concatURL = (tail: string): string => {
    const addr = textInput.length == 0 ? defaultApiURL : textInput
    if (addr.endsWith('/')) {
      return addr.substring(0, addr.length - 1) + tail
    } else {
      return addr + tail
    }
  }

  const getCheckPromise = (api: Api): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const req = new XMLHttpRequest()
        req.onreadystatechange = function () {
          if (req.readyState == 4) {
            // console.log(req.responseType)
            if (req.status == 200) {
              // validate the response
              const res = JSON.parse(req.responseText)
              console.log(res)
              api.requiredResponseField.forEach((field) => {
                if (!(field in res)) {
                  resolve(false)
                  return
                }
              })
            } else {
              // record the error
              resolve(false)
              return
            }
            resolve(true)
          }
        }
        req.open(api.method, concatURL(api.url), true)
        req.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
        req.send(null)
      }, 5000)
    })
  }

  const apiChecker: Array<() => void> = []
  const maxApiNameLen = Math.max(
    // api names are all english
    Math.max(...ApiList.map((value) => value.name.length)),
    // i18n of 'runAllTest' might have chinese
    strLen(t('runAllTest')),
  )

  return (
    <Box sx={{
      margin: 'auto',
      marginTop: '20px',
      width: {
        xs: '60%',
        sm: '50%',
        md: '30%',
        xl: '18%',
      },
    }}>
      <Stack
        direction='column'
        spacing={2}
        alignItems='flex-start'
        justifyContent='flex-start'
      >
        <Box>
          <TextField
            type='url'
            variant='outlined'
            label={t('testServerApiURL')}
            defaultValue={defaultApiURL}
            onChange={(event) => {
              setTextInput(event.target.value)
              props.setServerAddr(event.target.value)
            }}
          />
        </Box>
        <Stack
          direction='row'
          spacing={2}
          alignItems='center'
          justifyContent='flex-start'
        >
          <IconButton onClick={() => {
            apiChecker.forEach((checker) => {
              checker()
            })
          }}>
            <SvgIcon color='info' fontSize='medium' sx={{
              margin: 'auto',
            }}>
              <NotStartedOutlined />
            </SvgIcon>
          </IconButton>
          <Box sx={{
            width: `${maxApiNameLen * 8}px`,
          }}>
            {t('runAllTest')}
          </Box>
        </Stack>
        {
          ApiList.map((api) => {
            const [firstTime, setFirstTime] = useState(true)
            const [testing, setTesting] = useState(false)
            const [success, setSuccess] = useState(false)

            const checkThisApi = () => {
              if (firstTime) {
                setFirstTime(false)
              }
              setTesting(true)
              console.log(`Testing '${api.name}' by querying '${concatURL(api.url)}'`)
              getCheckPromise(api)
                .then(value => {
                  setTesting(false)
                  setSuccess(value)
                })
                .catch(err => {
                  console.log(err)
                  setTesting(false)
                  setSuccess(false)
                })
            }

            apiChecker.push(checkThisApi)

            return (
              <Stack
                key={api.name}
                direction='row'
                spacing={4}
                alignItems='center'
                justifyContent='flex-start'
              >
                <IconButton onClick={checkThisApi}>
                  <SvgIcon color='info' fontSize='medium' sx={{
                    margin: 'auto',
                  }}>
                    <NotStartedOutlined />
                  </SvgIcon>
                </IconButton>

                <Box sx={{
                  margin: 'auto',
                  width: `${maxApiNameLen * 8}px`,
                }}>
                  {api.name}
                </Box>

                <Box>
                  {!firstTime && testing && <CircularProgress color='info' size='16px' sx={{
                    margin: 'auto',
                  }} />}
                  {!firstTime && !testing && !success && <IconButton>
                    <SvgIcon color='error' fontSize='medium' sx={{
                      margin: 'auto',
                    }}>
                      <ErrorRound />
                    </SvgIcon>
                  </IconButton>}
                  {!firstTime && !testing && success && <IconButton>
                    <SvgIcon color='success' fontSize='medium' sx={{
                      margin: 'auto',
                    }}>
                      <CheckCircleRound />
                    </SvgIcon>
                  </IconButton>}
                </Box>
              </Stack>
            )
          })
        }
      </Stack>
    </Box>
  )
}

export default ApiChecker