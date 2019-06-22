import styled from 'styled-components'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import Theme from '../../constants/Theme'

export const UserIcon = styled(Ionicons)`
  font-size: 20px;
  color: #2472f2;
  padding: 5px;
`
export const PinIconWrapper = styled.View`
  height: 40px;
  width: 40px;
  background-color: ${({ color }) => color || Theme.color.greenLight};
  border-radius: 20px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`
export const PinIcon = styled(Ionicons)`
  font-size: 20px;
  color: #ffffff;
  padding: 5px;
  height: 30px;
  width: 30px;
  background-color: ${({ color }) => color || Theme.color.greenLight};
  border-radius: 15px;
`
export const PinIconFa = styled(FontAwesome)`
  font-size: 20px;
  color: #ffffff;
  padding: 5px;
`
