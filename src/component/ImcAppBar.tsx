import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import availableLang from '../i18n/langs.json'


function Header() {
    const { t, i18n } = useTranslation()
    const headerHeight = 70

    const [langId, setLangId] = (() => {
        var i = 0;
        for (let id = 0; id < availableLang.length; id++) {
            if (availableLang[id] == i18n.language) {
                i = id
                break
            }
        }
        return useState(i)
    })()

    const logoTooltip = () => {
        return (
            <div>{t('appDescription')}</div>
        )
    }

    const Logo = () => {
        const logoFontSize = 18
        const logoLineHeight = 25
        return (
            <Tooltip title={logoTooltip()} placement="bottom">
                {/* Add a logo pic here */}
                <Box sx={{
                    width: 'fit-content',
                    lineHeight: `${logoLineHeight}px`,
                    fontSize: `${logoFontSize}px`,
                }}>
                    {t('appTitle')}
                </Box>
            </Tooltip>
        )
    }

    const pageButton = (pageName: string) => {
        return (
            <>{pageName}</>
        )
    }

    const changeLanguage = () => {
        // Not sure why i18n.languages not returning right results
        // console.log(availableLang, langId)
        const nextLangId = (langId + 1) % availableLang.length
        setLangId(nextLangId)
        i18n.changeLanguage(availableLang[nextLangId])
    }

    const LanguageSelector = () => {
        return (
            <Button
                variant='contained'
                onClick={changeLanguage}
                color='secondary'
                size='small'
            >
                {t(i18n.language)}
            </Button>
        )
    }

    return (
        <AppBar position='sticky'>
            <Box sx={{
                width: '100%',
                height: `${headerHeight}px`,
                display: 'flex',
            }}>
                <Box sx={{
                    margin: 'auto',
                    marginLeft: '10px',
                    width: {
                        xs: '12%',
                        sm: '10%',
                        md: '8%',
                        lg: '5%',
                    },
                }}>
                    <Link to='/'>
                        <Logo />
                    </Link>
                </Box>

                <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='flex-start'
                    spacing={2}
                    marginLeft={{
                        xs: '10px',
                        md: '40px'
                    }}
                    sx={{
                        width: {
                            xs: '76%',
                            sm: '80%',
                            md: '84%',
                            lg: '90%',
                        },
                    }}
                >
                    <Link to='general-info'>
                        {pageButton('general-info')}
                    </Link>
                    <Link to='/dev-tool'>
                        {pageButton('dev-tool')}
                    </Link>
                </Stack>

                <Box sx={{
                    margin: 'auto',
                    marginRight: '10px',
                    width: {
                        xs: '12%',
                        sm: '10%',
                        md: '8%',
                        lg: '5%',
                    },
                }}>
                    <LanguageSelector />
                </Box>
            </Box>
        </AppBar>
    )
}

export default Header