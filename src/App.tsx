import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();

  return (
    <div className="App">
      <h1>{t('appTitle')}</h1>
      <h2>{t('appDescription')}</h2>
    </div>
  )
}

export default App
