import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './header.css'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import availableLang from '../i18n/langs.json'


function Header() {
    const { t, i18n } = useTranslation();

    const [langId, setLangId] = useState(0)

    const tooltip = () => {
        return (
            <div id='header-app-tool-tip'>{t('appDescription')}</div>
        )
    }

    const changeLanguage = () => {
        // Not sure why i18n.languages not returning right results
        console.log(availableLang, langId)
        setLangId((langId + 1) % availableLang.length)
        i18n.changeLanguage(availableLang[langId])
    }

    return (
        <div id='header-container'>
            <div id='header-strip'>
                <Tooltip title={tooltip()} placement="bottom">
                    <div id='header-app-name'>{t('appTitle')}</div>
                </Tooltip>

                <div id="header-language-switcher">
                    <div id='header-cur-lang-text'>{t('currentLang') + ": "}</div>
                    <Button variant="text" onClick={changeLanguage}>{i18n.language}</Button>
                </div>
            </div>
        </div>
    )
}

export default Header