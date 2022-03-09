import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate, useLocation} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import availableLang from '../i18n/langs.json';

function ImcAppBar() {
  const {t, i18n} = useTranslation();
  const headerHeight = 70;

  const [langId, setLangId] = (() => {
    let i = 0;
    for (let id = 0; id < availableLang.length; id++) {
      if (availableLang[id] === i18n.language) {
        i = id;
        break;
      }
    }
    return useState(i);
  })();

  const logoTooltip = () => {
    return <div>{t('backToHomePage')}</div>;
  };

  const Logo = () => {
    const logoFontSize = 20;
    const logoLineHeight = 26;
    const navigate = useNavigate();
    return (
      <Tooltip title={logoTooltip()} placement='bottom'>
        <ButtonBase
          onClick={() => {
            navigate('/');
          }}
        >
          {/* Add a logo pic here */}
          <Box
            sx={{
              width: 'fit-content',
              lineHeight: `${logoLineHeight}px`,
              fontSize: `${logoFontSize}px`,
              fontWeight: 'bold',
            }}
          >
            {t('appTitle')}
          </Box>
        </ButtonBase>
      </Tooltip>
    );
  };

  const pageButton = (
      pageName: string,
      path: string,
      displayTextKey: string,
  ) => {
    const pageTitleFontSize = 16;

    const navigate = useNavigate();
    const location = useLocation();

    const curPageSelected = (): boolean => {
      let curPath = location.pathname;
      if (curPath.endsWith('?')) {
        curPath = curPath.slice(0, curPath.length - 1);
      }
      return curPath === path;
    };

    return (
      <ButtonBase
        sx={{
          height: '100%',
        }}
        onClick={() => {
          navigate(path);
        }}
      >
        <Box
          sx={{
            marginLeft: '10px',
            marginRight: '10px',
            // position: 'relative',
          }}
        >
          <Box
            sx={{
              // TODO: change color
              color: curPageSelected() ?
                'secondary.light' :
                'primary.contrastText',
              fontSize: `${pageTitleFontSize}px`,
              fontWeight: 'bold',
            }}
          >
            {t(displayTextKey)}
          </Box>
        </Box>
        {/* <Box sx={{
                    height: `${Math.round(headerHeight / 10)}px`,
                    width: '100%',
                    position: 'absolute',
                    bottom: '0',
                }}>
                </Box> */}
      </ButtonBase>
    );
  };

  const changeLanguage = () => {
    // Not sure why i18n.languages not returning right results
    // console.log(availableLang, langId)
    const nextLangId = (langId + 1) % availableLang.length;
    setLangId(nextLangId);
    i18n.changeLanguage(availableLang[nextLangId]);
  };

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
    );
  };

  return (
    <AppBar position='sticky'>
      <Box
        sx={{
          width: '100%',
          height: `${headerHeight}px`,
          display: 'flex',
        }}
      >
        <Box
          sx={{
            margin: 'auto',
            marginLeft: '10px',
            width: {
              xs: '12%',
              sm: '10%',
              md: '8%',
              lg: '5%',
            },
          }}
        >
          <Logo />
        </Box>

        <Stack
          direction='row'
          alignItems='center'
          justifyContent='flex-start'
          marginLeft={{
            xs: '10px',
            md: '40px',
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
          {pageButton('overview', '/overview', 'overview')}
          {pageButton('dev-tool', '/dev-tool', 'devTool')}
        </Stack>

        <Box
          sx={{
            margin: 'auto',
            marginRight: '10px',
            width: {
              xs: '12%',
              sm: '10%',
              md: '8%',
              lg: '5%',
            },
          }}
        >
          <LanguageSelector />
        </Box>
      </Box>
    </AppBar>
  );
}

export default ImcAppBar;
