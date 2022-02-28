import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AppBar from '@mui/material/AppBar'
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
            <div id='header-app-tool-tip'>{t('appDescription')}</div>
        )
    }

    const Logo = () => {
        const logoFontSize = 18
        const logoLineHeight = 25
        const pTop = Math.round((headerHeight - logoLineHeight) / 2)
        return (
            <Box>
                <Tooltip title={logoTooltip()} placement="bottom">
                    <Box sx={{
                        paddingTop: `${pTop}px`,
                        paddingLeft: '20px',
                        width: 'fit-content',
                        lineHeight: `${logoLineHeight}px`,
                        fontSize: `${logoFontSize}px`,
                    }}>
                        {t('appTitle')}
                    </Box>
                </Tooltip>
            </Box>
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
        const buttonSize = 30
        const pTop = Math.round((headerHeight - buttonSize) / 2)
        return (
            <Box sx={{
                paddingTop: `${pTop}px`,
                paddingRight: '16px',
            }}>
                <Box sx={{
                    width: 'fit-content',
                }}>
                    <Button
                        variant='contained'
                        onClick={changeLanguage}
                        color='secondary'
                        size='small'
                    >
                        {t(i18n.language)}
                    </Button>
                </Box>
            </Box>
        )
    }

    return (
        <AppBar position='sticky'>
            <Box sx={{
                height: `${headerHeight}px`,
                top: '0',
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <Logo />
                <LanguageSelector />
            </Box>
        </AppBar>
    )
}

export default Header