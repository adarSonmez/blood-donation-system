import { Link, Typography } from '@mui/material'
import { CopyrightContainer } from './Copyright.styles'

function CopyRight() {
  return (
    <CopyrightContainer>
      <Typography variant="body2" align="center">
        {'Copyright © '}
        <Link href="https://adarsonmez.software/">
          Adar Sönmez
        </Link>{' '}
        {new Date().getFullYear()}
      </Typography>
    </CopyrightContainer>
  )
}

export default CopyRight
