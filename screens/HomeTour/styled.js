import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const Logo = styled.Image`
  height: 100px;
`

export const Button = styled.TouchableOpacity`
  padding: 10px;
  background-color: ${({ color }) => color || 'royalblue'};
  border-radius: 5;
  padding: 10px 20px 10px 20px;
  box-shadow: 0px 4px #0002;
`

export const BtnTitle = styled.Text`
  font-size: 16;
  font-weight: bold;
  color: white;
`
