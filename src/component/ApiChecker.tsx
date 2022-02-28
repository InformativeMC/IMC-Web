import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import NotStartedOutlined from '@ricons/material/NotStartedOutlined'
import ApiList, { Api } from './ApiList'

function ApiChecker() {
    const getChecker = (api: Api) => {
        return () => { console.log(`Testing '${api.name}' by querying '${api.url}'`) }
    }

    return (
        <Box>
            {ApiList.map((api) => (
                <Box
                    key={api.name}
                    sx={{
                        margin: 'auto',
                        width: '25%',
                        marginTop: '10px',
                        display: 'flex',
                    }}
                >
                    <IconButton onClick={getChecker(api)}>
                        <SvgIcon color='info' fontSize='medium' sx={{
                            margin: 'auto',
                        }}>
                            <NotStartedOutlined />
                        </SvgIcon>
                    </IconButton>
                    <Box sx={{
                        margin: 'auto',
                        marginLeft: '5px',
                    }}>
                        {api.name}
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default ApiChecker