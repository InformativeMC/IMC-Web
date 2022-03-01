import React, { useState, createRef } from 'react'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import NotStartedOutlined from '@ricons/material/NotStartedOutlined'
import ErrorRound from '@ricons/material/ErrorRound'
import CheckCircleRound from '@ricons/material/CheckCircleRound'
import ApiList, { Api } from './ApiList'



function ApiChecker() {
    const { t, i18n } = useTranslation()

    const [textInput, setTextInput] = useState('')
    const defaultApiURL = 'http://localhost:3030/'

    const concatURL = (tail: string): string => {
        const addr = textInput.length == 0 ? defaultApiURL : textInput
        if (addr == null) {
            return tail
        } else {
            if (addr.endsWith('/')) {
                return addr.substring(0, addr.length - 1) + tail
            } else {
                return addr + tail
            }
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
                req.open("GET", concatURL(api.url), true)
                req.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
                req.send(null)
            }, 5000);
        })
    }

    const apiChecker: Array<() => void> = []

    return (
        <Box>
            <Box sx={{
                margin: 'auto',
                marginTop: '20px',
                width: 'fit-content',
            }}>
                <TextField
                    type='url'
                    variant="outlined"
                    label={t('serverApiURL')}
                    defaultValue={defaultApiURL}
                    onChange={(event) => {
                        setTextInput(event.target.value)
                    }}
                />
            </Box>
            <Box sx={{
                margin: 'auto',
                marginTop: '20px',
                width: 'fit-content',
                display: 'flex',
            }}>
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
                    margin: 'auto',
                    width: 'fit-content',
                }}>
                    {t('runAllTest')}
                </Box>
            </Box>
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
                        <Box
                            key={api.name}
                            sx={{
                                margin: 'auto',
                                width: 'fit-content',
                                marginTop: '10px',
                                display: 'flex',
                            }}
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
                                marginLeft: '5px',
                                width: 'fit-content',
                            }}>
                                {api.name}
                            </Box>
                            {!firstTime && testing && <CircularProgress color='info' size='16px' sx={{
                                margin: 'auto',
                                marginLeft: '5px',
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
                    )
                })
            }
        </Box >
    )
}

export default ApiChecker