import styled from 'styled-components'
import { Ionicons } from '@expo/vector-icons'
import Theme from '../../constants/Theme'

export const PinIcon = styled(Ionicons)`
  font-size: 20px;
  color: #ffffff;
  padding: 5px;
  height: 30px;
  width: 30px;
  background-color: ${Theme.color.greenLight};
  border-radius: 15px;
  overflow: hidden;
`
